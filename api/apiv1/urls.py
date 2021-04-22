from django.urls import path

from . import views

urlpatterns = [
    path("", views.api_version, name="api-version"),
    path("search", views.search, name="search"),
]
