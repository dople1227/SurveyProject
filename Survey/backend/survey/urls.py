"""
- url처리 담당
"""

from django.urls import path, include
from rest_framework import routers
from . import views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r"survey", views.SurveyViewSet)
router.register(r"question", views.QuestionViewSet)
router.register(r"answer", views.AnswerViewSet)
router.register(r"respondent", views.RespondentViewSet)
router.register(r"response", views.ResponseViewSet)


urlpatterns = [
    path("", views.survey_list, name="survey_list"),
    # api/내에 router에 등록된 경로들을 모두 등록
    path("api/", include(router.urls)),
    # add 경로에 대한 라우팅
    path("form/<int:pk>", TemplateView.as_view(template_name="index.html"), name="form"),
    # list 경로에 대한 라우팅
    path("list/", TemplateView.as_view(template_name="index.html"), name="add"),
    path("detail/<int:pk>", TemplateView.as_view(template_name="index.html"), name="detail"),
    path("respondent/", TemplateView.as_view(template_name="index.html"), name="respondent"),
    # path('api/survey/create', SurveyCreateAPIView.as_view(), name='survey_create'),
]
