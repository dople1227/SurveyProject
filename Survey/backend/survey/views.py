"""
-rest API를 구현할 뷰를 함수나 클래스로 정의
-rest_framework에서 제공하는 ViewSet, APIView, GenericAPIView등을 상속받아 사용

select: GET 요청으로 리소스 조회
insert: POST 요청으로 새로운 리소스 생성
update: PUT 요청으로 기존 리소스 수정
delete: DELETE 요청으로 기존 리소스 삭제
"""
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.shortcuts import render
from .serializers import (
    SurveySerializer,
    QuestionSerializer,
    AnswerSerializer,
    RespondentSerializer,
    ResponseSerializer,
    SoronSerializer,
)
from .models import Survey, Question, Answer, Respondent, Response, Soron
from rest_framework import viewsets
from django.core.exceptions import ValidationError
from rest_framework import status
from functools import wraps
import logging
from django.db import transaction
from rest_framework.response import Response as DRFResponse
from django.db.models import Count


def survey_list(request):
    return render(request, "index.html", {})


# logger 사용
logger = logging.getLogger(__name__)


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

    # POST요청 시
    def create(self, request, *args, **kwargs):
        data = request.data
        with transaction.atomic():
            # Survey
            survey_serializer = SurveySerializer(data={"name": data.get("surveyName")})
            survey_serializer.is_valid(raise_exception=True)
            survey_instance = survey_serializer.save()

            # Question, Answer, Response
            questions_data = data.get("questions", [])
            for question_data in questions_data:
                question_serializer = QuestionSerializer(
                    data={
                        "name": question_data.get("questionName"),
                        "type": question_data.get("questionType"),
                        "surveyId": survey_instance.pk,
                    }
                )
                question_serializer.is_valid(raise_exception=True)
                question_instance = question_serializer.save()

                answers_data = question_data.get("answers", [])
                for answer_data in answers_data:
                    answer_serializer = AnswerSerializer(
                        data={
                            "name": answer_data.get("answerName"),
                            "isCheck": answer_data.get("isCheck"),
                            "questionId": question_instance.pk,
                        }
                    )
                    answer_serializer.is_valid(raise_exception=True)
                    answer_instance = answer_serializer.save()

        return DRFResponse({"successMessage": "설문지가 정상적으로 등록되었습니다."})


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class RespondentViewSet(viewsets.ModelViewSet):
    queryset = Respondent.objects.all()
    serializer_class = RespondentSerializer


class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer


class SoronViewSet(viewsets.ModelViewSet):
    queryset = Soron.objects.all()
    serializer_class = SoronSerializer
