import json
import os

from chatterbot import ChatBot
from chatterbot.ext.django_chatterbot import settings
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from django.template import RequestContext
from django.views.generic import View
from django.views.generic.base import TemplateView
from oauth2client.service_account import ServiceAccountCredentials

from ECPlazaTools.settings import GOOGLE_VIEW_ID, KEY_FILEPATH, SCOPE

TITLE = ('pe-7s-rocket', 'ECPlaza Tools', '모든 도구를 사용할수있어요.')


class ChatterBotAppView(TemplateView):
    template_name = 'main/index.html'


class ChatterBotApiView(View):
    """ Provide an API endpoint to interact with ChatterBot. """
    chat_bot = ChatBot(**settings.CHATTERBOT)
    # trainer = ChatterBotCorpusTrainer(chatbot)
    # trainer.train(
    #     "chatterbot.corpus.english.greetings",
    #     "chatterbot.corpus.english.conversations"
    #     "chatterbot.corpus.korean"
    # )

    def post(self, request, *args, **kwargs):
        """
        Return a response to the statement in the posted data.
        * The JSON data should contain a 'text' attribute.
        """
        input_data = json.loads(request.body.decode('utf-8'))

        if 'text' not in input_data:
            return JsonResponse({
                'text': [
                    'The attribute "text" is required.'
                ]
            }, status=400)

        response = self.chat_bot.get_response(input_data)

        response_data = response.serialize()

        return JsonResponse(response_data, status=200)

    def get(self, request, *args, **kwargs):
        """ Return data corresponding to the current conversation. """
        return JsonResponse({
            'name': self.chat_bot.name
        })


@login_required
def token(request):
    return render(request, 'main/token.html', {'token': ServiceAccountCredentials.from_json_keyfile_name(KEY_FILEPATH, SCOPE).get_access_token().access_token})


@login_required
def index(request):
    return render(request, 'main/index.html', {'title': TITLE, 'google_view_id': GOOGLE_VIEW_ID})


def terms(request):
    return render(request, 'main/terms+conditions.html', {'title': TITLE})


def policy(request):
    return render(request, 'main/policy.html', {'title': TITLE})


def handler403(request, *args):
    response = render(request, 'errors/403.html', context=RequestContext(request))
    response.status_code = 403
    return response


def handler404(request, *args):
    response = render(request, 'errors/404.html', context=RequestContext(request))
    response.status_code = 404
    return response


def handler410(request, *args):
    response = render(request, 'errors/410.html', context=RequestContext(request))
    response.status_code = 410
    return response
