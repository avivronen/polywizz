import requests
from django.http import JsonResponse, Http404, response

# Create your views here.
from apiv1.forms import SearchForm


def api_version(request):
    res = {'version': '1.0.0'}
    return JsonResponse(res)


def build_search_query(form):
    term = ''

    if form.cleaned_data['keyword']:
        term = f"{term}{form.cleaned_data['keyword']} "

    if form.cleaned_data['user']:
        term = f"{term}user:{form.cleaned_data['user']} "

    if form.cleaned_data['language']:
        term = f"{term}language:{form.cleaned_data['language']} "

    return term


def search(request):

    form = SearchForm(request.GET)
    valid = form.is_valid()
    query = build_search_query(form)

    if not valid or not query:
        res = {'error': 'True', 'error_text': 'Invalid Search Params'}
        return JsonResponse(res)

    url = f"https://api.github.com/legacy/repos/search/{query}"

    r = requests.get(url)
    r = r.json()
    return JsonResponse(r)
