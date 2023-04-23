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
        ("select", "Select"),
    ]
    questionId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    surveyId = models.ForeignKey(Survey, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Answer(models.Model):
    answerId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    isCheck = models.BooleanField()
    questionId = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Respondent(models.Model):
    respondentId = models.AutoField(primary_key=True)
    phoneNumber = models.CharField(max_length=20)
    surveyId = models.ForeignKey(Survey, on_delete=models.CASCADE)

    def __str__(self):
        return self.phoneNumber


class Response(models.Model):
    responseId = models.AutoField(primary_key=True)

    surveyId = models.ForeignKey(Survey, on_delete=models.CASCADE)
    respondentId = models.ForeignKey(Respondent, on_delete=models.CASCADE)
    questionId = models.ForeignKey(Question, on_delete=models.CASCADE)
    answerId = models.ForeignKey(Answer, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.responseId)


class Soron(models.Model):
    uid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
