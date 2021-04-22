from django.db import models


# Create your models here.

class Search(models.Model):
    keyword = models.CharField(max_length=20, blank=True)
    user = models.CharField(max_length=20, blank=True)
    language = models.CharField(max_length=20, blank=True)
