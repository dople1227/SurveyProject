"""
- DDL 담당
- 테이블 구조를 코드로 정의하고 build 시 DB와 연동됨
"""

from django.db import models
from django.core.exceptions import ValidationError


class Survey(models.Model):
    surveyId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Question(models.Model):
    TYPE_CHOICES = [
        ("checkbox", "Checkbox"),
        ("radio", "Radio"),
    ]
    questionId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    surveyId = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="question")

    def __str__(self):
        return self.name


class Answer(models.Model):
    answerId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    # isCheck = models.BooleanField()
    questionId = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answer")

    def __str__(self):
        return self.name


class Respondent(models.Model):
    respondentId = models.AutoField(primary_key=True)
    phoneNumber = models.CharField(max_length=20)
    surveyId = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="respondent")

    def __str__(self):
        return self.phoneNumber


class Response(models.Model):
    responseId = models.AutoField(primary_key=True)
    surveyId = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="response")
    respondentId = models.ForeignKey(Respondent, on_delete=models.CASCADE, related_name="response")
    questionId = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="response")
    answerId = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name="response")
    isCheck = models.BooleanField()

    def __str__(self):
        return str(self.responseId)


class Soron(models.Model):
    uid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
