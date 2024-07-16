from rest_framework import serializers
from .models import Tasks




class TaskSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ('id', 'title', 'department', 'description', 'done', 'created')
        read_only_fields = ('id', 'created')
        
    