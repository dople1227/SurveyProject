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
from rest_framework.views import APIView
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
from .models import Survey, Question, Answer, Response, Respondent, Soron
from rest_framework import viewsets, pagination
from django.core.exceptions import ValidationError
from rest_framework import status
from functools import wraps
import logging
from django.db import transaction
from rest_framework.response import Response as DRFResponse
from django.db.models import Count
from django.http import JsonResponse
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination


# 페이징처리를 위해 response.data.count변수값 설정
class CustomPagination(PageNumberPagination):
    page_size = 5

    def get_paginated_response(self, data):
        return DRFResponse(
            {
                "count": self.page.paginator.count,
                "results": data,
                #  "page_range": list(self.page.paginator.page_range),
            }
        )


# logger 사용
logger = logging.getLogger(__name__)


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    pagination_class = CustomPagination

    # GET요청 (SELECT) (특정설문지의 정보 )
    def detail_view(self, request, pk=None):
        print("detail")
        # Survey 테이블에서 surveyId에 해당하는정보 GET
        survey = self.get_object()
        # survey = Survey.objects.filter(surveyId=pk).first()
        # Question 테이블에서 surveyId에 해당하는정보 GET
        questions = Question.objects.filter(surveyId=survey.pk)
        # Answer 테이블에서 questionId가 questions테이블에 있는Id로만 GET
        answers = Answer.objects.filter(questionId__in=questions)

        response_data = {"surveyId": survey.surveyId, "surveyName": survey.name, "questions": []}
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

    # GET요청
    def list_view(self, request):
        surveys = self.queryset.order_by("surveyId")
        paginater = CustomPagination()
        result_page = paginater.paginate_queryset(surveys, request)
        response_data = []

        for survey in result_page:
            # Question 테이블에서 surveyId에 해당하는정보 GET
            questions = Question.objects.filter(surveyId=survey.surveyId)
            # Answer 테이블에서 questionId가 questions테이블에 있는Id로만 GET
            answers = Answer.objects.filter(questionId__in=questions)
            survey_data = {
                "surveyId": survey.surveyId,
                "name": survey.name,
                "questionCount": questions.count(),
                "answerCount": answers.count(),
            }
            response_data.append(survey_data)
        return paginater.get_paginated_response(response_data)

    # GET요청 (설문지 수정 시 필요한 해당 설문지의 정보 GET)
    def retrieve(self, request, pk=None):
        print("retrieve")
        # Survey 테이블에서 surveyId에 해당하는정보 GET
        survey = self.get_object()
        # Question 테이블에서 surveyId에 해당하는정보 GET
        questions = Question.objects.filter(surveyId=survey.pk)
        # Answer 테이블에서 questionId가 questions테이블에 있는Id로만 GET
        answers = Answer.objects.filter(questionId__in=questions)

        response_data = {"surveyName": survey.name, "questions": []}
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

    # POST요청 (CREATE) (설문지 생성)
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

    # PUT요청 (UPDATE) (설문지 수정)
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

        return DRFResponse({"successMessage": "설문지가 정상적으로 등록되었습니다."})

    # DELETE요청 (DELETE) (설문지 삭제)
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
    def detail(self, request, pk=None):
        survey = self.get_object()
        # Question 테이블에서 surveyId에 해당하는정보 GET
        questions = Question.objects.filter(surveyId=survey.pk)
        # Answer 테이블에서 questionId가 questions테이블에 있는Id로만 GET
        answers = Answer.objects.filter(questionId__in=questions)

        response_data = {
            "surveyName": survey.name,
            "test": 1,
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
