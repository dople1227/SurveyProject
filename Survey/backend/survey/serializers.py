"""
- DML, 데이터 가공, 유효성 검사 담당
- 모델객체와 json데이터 간의 변환을 담당
- 유효성 검사 담당
- fields엔 컬럼명을 하나씩 적어도 되지만,
- Model의 필드 전부를 serialize하고싶다면 간단하게 '__all__'만 입력하면 된다.
"""
from rest_framework import serializers
from .models import Survey, Question, Answer, Respondent, Response, Soron
import re
import json


# 시리얼라이저의 공통로직을 구현 (serializers.ModelSerializer대신 BaseSerializer 오버라이드해서 사용하면됨)
class BaseSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        # If there are validation errors, return the first error message in response.data.errorMessage
        # if self.errors:
        #     errors = list(self.errors.values())[0]
        #     error_messages = []
        #     for error in errors:
        #         if isinstance(error, str):
        #             error_messages.append(error)
        #         elif isinstance(error, dict):
        #             for key, value in error.items():
        #                 error_messages.append(value)
        #         else:
        #             error_messages.append(str(error))
        #     return {"errorMessage": error_messages[0]}

        ret = super().to_representation(instance)
        # if "non_field_errors" in ret:
        #     ret["errorMessage"] = ret.pop("non_field_errors")[0]
        return ret


# Soron
class SoronSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soron
        fields = "__all__"


# Survey
class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = "__all__"

    name = serializers.CharField(error_messages={"blank": "설문지명은 반드시 입력되어야 합니다."})


# Question
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"

    name = serializers.CharField(error_messages={"blank": "질문명은 반드시 입력되어야 합니다."})

    def validate_type(self, value):
        if value not in dict(Question.TYPE_CHOICES).keys():
            raise serializers.ValidationError("잘못된 질문유형이 입력되었습니다.")
        return value


# Answer
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"

    name = serializers.CharField(error_messages={"blank": "선택지명은 반드시 입력되어야 합니다."})

    def validate_isCheck(self, value):
        if not isinstance(value, bool):
            raise serializers.ValidationError("잘못된 응답값이 입력되었습니다.")
        return value


# Response
class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = "__all__"


# Respondent
class RespondentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respondent
        fields = "__all__"

    phoneNumber = serializers.CharField(error_messages={"blank": "전화번호를 입력해주세요."})

    def validate_phoneNumber(self, value):
        if not value:
            raise serializers.ValidationError("전화번호를 입력해주세요.")
        # 공백과 하이픈 제거
        value = value.strip().replace("-", "")
        # 숫자가 아닌 문자를 포함하고 있는 경우
        if not value.isdigit():
            raise serializers.ValidationError("전화번호는 숫자만 입력 가능합니다.")
        # 9~11자리 숫자 형태인지 검사
        if not re.match(r"^\d{9,11}$", value):
            raise serializers.ValidationError("전화번호는 하이픈 제외 9~11자리여야 합니다.")
        return value


# Detail
class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = "__all__"
