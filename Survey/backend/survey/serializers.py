"""
-모델객체와 json데이터 간의 변환을 담당
-fields엔 필드명을 하나씩 적어도 되나,
 Model의 필드 전부를 serialize하고싶다면 간단하게 '__all__'만 입력하면 된다.
"""
from rest_framework import serializers  
from .models import Survey, Question, Answer, Respondent, Response, Soron

class SoronSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soron
        fields = '__all__'

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'


class RespondentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respondent
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
    
    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        question = Question.objects.create(**validated_data)
        for answer_data in answers_data:
            Answer.objects.create(question=question, **answer_data)
        return question


class SurveySerializer(serializers.ModelSerializer):       
    class Meta:
        model = Survey        
        fields = '__all__'
    
    # 설문지의 총 문항수를 알기 위해 Question테이블 필드 가져옴        
    serializer_class  = QuestionSerializer
    def get_queryset(self):
        return Question.objects.prefetch_related('')
    
    # 설문지를 생성하려면 필요한것들
    # Survey의 name
    # Respondent의 phoneNumber
    # (다중값)Question의 name
    # (다중값)Answer의 name
    # (다중값)Response의 isChecked
    questions = QuestionSerializer(many=True)
    respondents = RespondentSerializer(many=True)
    
    def create(self, validated_data):
        # validated_data로부터 questions와 respondents 데이터 추출
        questions_data = validated_data.pop('questions')
        respondents_data = validated_data.pop('respondents')

        # Survey 모델 객체 생성
        survey = Survey.objects.create(**validated_data)
        
        for question_data in questions_data:
            # 해당 Question에 대한 Answer 데이터를 추출
            answers_data = question_data.pop('answers')
            # Question 객체 생성
            question = Question.objects.create(survey=survey, **question_data)

            for answer_data in answers_data:
                # Answer 객체 생성
                Answer.objects.create(question=question, **answer_data)
        
        for respondent_data in respondents_data:
            # Respondent 객체 생성
            respondent = Respondent.objects.create(survey=survey, **respondent_data)
            
            # survey.questions.all()을 사용하여 Survey에 연결된 Question 모델의 모든 객체를 가져옴
            for question in survey.questions.all():
                # 해당 Question 객체에 대한 Response 객체의 id를 request.data에서 가져옴
                answer_id = self.context['request'].data.get(f'question_{question.id}')
                
                # id를 사용하여 Answer 객체를 가져옴
                answer = Answer.objects.get(id=answer_id)
                
                # Response 객체 생성
                Response.objects.create(survey=survey, respondent=respondent, question=question, answer=answer, is_check=True)
        # 생성된 Survey 객체 반환
        return survey