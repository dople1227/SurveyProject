"""
- url처리 담당
- router.register()로 자동 생성되는 url
list(): GET /api/survey/
create(): POST /api/survey/
retrieve(): GET /api/survey/{pk}/
update(): PUT /api/survey/{pk}/
partial_update(): PATCH /api/survey/{pk}/
destroy(): DELETE /api/survey/{pk}/
"""

from django.urls import path, include, re_path
from rest_framework import routers
from . import views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r"survey", views.SurveyViewSet)
router.register(r"list", views.SurveyViewSet)
router.register(r"response", views.ResponseViewSet)
router.register(r"detail", views.DetailViewSet)


urlpatterns = [
    # api/내에 router에 등록된 경로들을 모두 등록
    path("api/", include(router.urls)),
    # router로 관리되지않는 추가 url처리
    # path("api/list/", views.SurveyViewSet.as_view({"get": "list_view"}), name="apilist"),
    # frontend url처리 (reload시 서버에 url요청하기때문)
    path("", TemplateView.as_view(template_name="index.html"), name="list"),
    path("list/", TemplateView.as_view(template_name="index.html"), name="list"),
    path("form/", TemplateView.as_view(template_name="index.html"), name="form"),
    path("form/<int:pk>", TemplateView.as_view(template_name="index.html"), name="form"),
    path("detail/<int:pk>", TemplateView.as_view(template_name="index.html"), name="detail"),
    path("response/<int:pk>", TemplateView.as_view(template_name="index.html"), name="response"),
]
