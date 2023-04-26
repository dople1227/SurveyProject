"""
- DML 담당
- rest API를 구현할 뷰를 함수나 클래스로 정의
- MVC의 Controller 와 유사

select: GET 요청으로 리소스 조회
insert: POST 요청으로 새로운 리소스 생성
update: PUT 요청으로 기존 리소스 수정
delete: DELETE 요청으로 기존 리소스 삭제
"""
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, action
from django.shortcuts import render
from .serializers import (
    SurveySerializer,
    QuestionSerializer,
    AnswerSerializer,
    RespondentSerializer,
    ResponseSerializer,
    SoronSerializer,
    DetailSerializer,
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
from django.http import JsonResponse


# 장고서버에서 build된 리액트 파일 실행 (localhost:8000)
def survey_list(request):
    return render(request, "index.html", {})


# logger 사용
logger = logging.getLogger(__name__)


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

    # 페이징처리용
    def get_queryset(self):
        return Survey.objects.order_by("surveyId")

    # GET요청 (SELECT) (특정설문지의 정보 )
    def retrieve(self, request, pk=None):
        # Survey 테이블에서 surveyId에 해당하는정보 GET
        survey = self.get_object()
        # Question 테이블에서 surveyId에 해당하는정보 GET
        questions = Question.objects.filter(surveyId=survey.pk)
        # Answer 테이블에서 questionId가 questions테이블에 있는Id로만 GET
        answers = Answer.objects.filter(questionId__in=questions)

        response_data = {
            "surveyName": survey.name,
            "questions": [],
        }
        for question in questions:
            answer_data = []
            for answer in answers.filter(questionId=question):
                answer_data.append(
                    {
                        "answerId": answer.answerId,
                        "answerName": answer.name,
                        "isCheck": answer.isCheck,
                    }
                )
            response_data["questions"].append(
                {
                    "questionId": question.questionId,
                    "questionName": question.name,
                    "questionType": question.type,
                    "answers": answer_data,
                }
            )
        return JsonResponse(response_data)

    # POST요청 (CREATE)
    def create(self, request, *args, **kwargs):
        data = request.data
        with transaction.atomic():
            # Survey
            survey_serializer = SurveySerializer(data={"name": data.get("surveyName")})
            survey_serializer.is_valid(raise_exception=True)
            survey_instance = survey_serializer.save()

            # Question, Answer
            questions_data = data.get("questions", [])
            for question_data in questions_data:
                # Question
                question_serializer = QuestionSerializer(
                    data={
                        "name": question_data.get("questionName"),
                        "type": question_data.get("questionType"),
                        "surveyId": survey_instance.pk,
                    }
                )
                question_serializer.is_valid(raise_exception=True)
                question_instance = question_serializer.save()

                # Answer
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
                    answer_serializer.save()
        return DRFResponse({"successMessage": "설문지가 정상적으로 등록되었습니다."})

    # PUT요청 (UPDATE)
    def update(self, request, *args, **kwargs):
        survey_id = kwargs.get("pk")
        data = request.data

        try:
            survey_instance = Survey.objects.get(pk=survey_id)
        except Survey.DoesNotExist:
            return DRFResponse({"errorMessage": "존재하지 않는 설문지입니다."}, status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():
            # Survey 수정
            survey_serializer = SurveySerializer(survey_instance, data={"name": data.get("surveyName")})
            survey_serializer.is_valid(raise_exception=True)
            survey_instance = survey_serializer.save()

            # 동적으로 질문,응답 생성, 삭제가 가능한 페이지이기에 기존 질문,응답 DELETE
            question_queryset = Question.objects.filter(surveyId=survey_id)
            # QuerySet에서 questionId만 추출해서 튜플이 아닌 리스트 형태로 반환(flat=true)
            question_ids = question_queryset.values_list("questionId", flat=True)
            # in 연산자를 이용하여 questionId가 question_ids에 있는 레코드를 찾음
            Answer.objects.filter(questionId__in=question_ids).delete()
            question_queryset.delete()

            # Question, Answer INSERT
            questions_data = data.get("questions", [])
            for question_data in questions_data:
                # Question
                question_serializer = QuestionSerializer(
                    data={
                        "name": question_data.get("questionName"),
                        "type": question_data.get("questionType"),
                        "surveyId": survey_instance.pk,
                    }
                )
                question_serializer.is_valid(raise_exception=True)
                question_instance = question_serializer.save()

                # Answer
                answers_data = question_data.get("answers", [])
                for answer_data in answers_data:
                    answer_id = answer_data.get("answerId")

                    answer_serializer = AnswerSerializer(
                        data={
                            "name": answer_data.get("answerName"),
                            "isCheck": answer_data.get("isCheck"),
                            "questionId": question_instance.pk,
                        }
                    )
                    answer_serializer.is_valid(raise_exception=True)
                    answer_serializer.save()
                # UPDATE결과 쓸모없어진 더미 데이터 제거.
                # answer_ids = [answer["answerId"] for answer in answers_data if answer.get("answerId")]
                # answer_queryset.exclude(pk__in=answer_ids).delete()

        return DRFResponse({"successMessage": "설문지가 정상적으로 등록되었습니다."})

    # DELETE요청 (DELETE)
    def delete_by_surveyId(self, surveyId):
        # Survey
        Survey.objects.filter(surveyId=surveyId).delete()

        return DRFResponse({"successMessage": "설문지가 정상적으로 삭제되었습니다."})


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


class DetailViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = DetailSerializer

    # Survey 테이블에서 surveyId에 해당하는정보 GET
    def retrieve(self, request, pk=None):
        survey = self.get_object()
        # Question 테이블에서 surveyId에 해당하는정보 GET
        questions = Question.objects.filter(surveyId=survey.pk)
        # Answer 테이블에서 questionId가 questions테이블에 있는Id로만 GET
        answers = Answer.objects.filter(questionId__in=questions)

        response_data = {
            "surveyName": survey.name,
            "questions": [],
        }
        for question in questions:
            answer_data = []
            for answer in answers.filter(questionId=question):
                answer_data.append(
                    {
                        "answerId": answer.answerId,
                        "answerName": answer.name,
                        "isCheck": answer.isCheck,
                    }
                )
            response_data["questions"].append(
                {
                    "questionId": question.questionId,
                    "questionName": question.name,
                    "questionType": question.type,
                    "answers": answer_data,
                }
            )
        return JsonResponse(response_data)


class SoronViewSet(viewsets.ModelViewSet):
    queryset = Soron.objects.all()
    serializer_class = SoronSerializer
