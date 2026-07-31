import django_filters
from .models import Task

class TaskFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')  

    class Meta:
        model = Task
        fields = ['title', 'completed']  # Allow filtering by title and completed status