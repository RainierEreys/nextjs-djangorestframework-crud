from rest_framework import viewsets, permissions
from .models import Tasks
from .serializers import TaskSerializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    permission_classes = [permissions.AllowAny] #PARA PODER ACCEDER SIN AUTENTICARSE
    serializer_class = TaskSerializers
    
    @action(methods=['post'], detail=True)
    def done(self, request, pk=None):
        task = self.get_object()
        task.done = not task.done
        task.save()
        return Response({
            'status': 'task done' if task.done else 'task undone'
        }, status=status.HTTP_200_OK)