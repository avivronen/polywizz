from django import forms

from .models import Search


class SearchForm(forms.ModelForm):
    class Meta:
        model = Search
        # fields = ['user_name', 'review-text', 'rating']
        fields = '__all__'
        required = []


        # exclude = ['']
