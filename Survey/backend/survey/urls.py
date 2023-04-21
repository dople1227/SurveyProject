from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'survey', views.SurveyViewSet)
router.register(r'question', views.QuestionViewSet)
router.register(r'answer', views.AnswerViewSet)
router.register(r'respondent', views.RespondentViewSet)
router.register(r'response', views.ResponseViewSet)
router.register(r'soron', views.ResponseViewSet)


urlpatterns = [
    path("", views.survey_list, name='survey_list'),
    path('api/', include(router.urls)),     
    # path('api/survey/create', SurveyCreateAPIView.as_view(), name='survey_create'),
]