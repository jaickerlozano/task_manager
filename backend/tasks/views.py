from .serializers import TaskSerializer
from rest_framework import viewsets
from .models import Task
from django_filters.rest_framework import DjangoFilterBackend
from .filters import TaskFilter

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['completed']  # Allow filtering by the 'completed' field
    filterset_class = TaskFilter
