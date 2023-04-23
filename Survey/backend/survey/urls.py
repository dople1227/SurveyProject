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
    path("api/", include(router.urls)),
    # add 경로에 대한 라우팅
    path("add/", TemplateView.as_view(template_name="index.html"), name="add"),
    # list 경로에 대한 라우팅
    path("list/", TemplateView.as_view(template_name="index.html"), name="add"),
    # path('api/survey/create', SurveyCreateAPIView.as_view(), name='survey_create'),
]
