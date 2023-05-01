"""
- url처리 담당
"""

from django.urls import path, include
from rest_framework import routers
from . import views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r"survey", views.SurveyViewSet)
# router.register(r"detail", views.SurveyViewSet)
# router.register(r"question", views.QuestionViewSet)
# router.register(r"answer", views.AnswerViewSet)
# router.register(r"respondent", views.RespondentViewSet)
# router.register(r"response", views.ResponseViewSet)


urlpatterns = [
    path("", views.SurveyViewSet.as_view({"get": "list_view"}), name="list"),
    path("list/", views.SurveyViewSet.as_view({"get": "list_view"}), name="list"),
    path("detail/<int:pk>/", views.SurveyViewSet.as_view({"get": "detail_view"}), name="detail"),
    # path("detail/", views.detail_view, name="detail"),
    # api/내에 router에 등록된 경로들을 모두 등록
    path("api/", include(router.urls)),
]


# router = routers.DefaultRouter()
# router.register(r"survey", views.SurveyViewSet)

# urlpatterns = [
#     path("api/", include(router.urls)),
# ]


# class SurveyViewSet(viewsets.ModelViewSet):
#     def get_1(self, request):
#         print("1")

#     def get_2(self, request):
#         print("2")

#     def get_3(self, request, pk=None):
#         print("3")

#     def get_4(self, request, pk=None):
#         print("4")
