"""
-rest API를 구현할 뷰를 함수나 클래스로 정의
-rest_framework에서 제공하는 ViewSet, APIView, GenericAPIView등을 상속받아 사용

select: GET 요청으로 리소스 조회
insert: POST 요청으로 새로운 리소스 생성
update: PUT 요청으로 기존 리소스 수정
delete: DELETE 요청으로 기존 리소스 삭제
"""
from django.shortcuts import render
from .serializers import SurveySerializer, QuestionSerializer, AnswerSerializer, RespondentSerializer, ResponseSerializer, SoronSerializer
from .models import Survey, Question, Answer, Respondent, Response, Soron
from rest_framework import viewsets


def survey_list(request):
    return render(request, 'index.html', {})

    
class SurveyViewSet(viewsets.ModelViewSet):  
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer


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