from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response

from users.install import *
from users.permissions import *
from .serializers import *


# class ProfileViewSet(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = [CustomPermission]
#     model=serializer_class().Meta().model
#     def get_queryset(self):
#         print(self.request.user)
#         return get_query(self.request,self.model).queryset()


def PermissionView(request):
    if request.user.is_authenticated:
        perm = fundamental().user_role_permission(username=str(request.user))
        return JsonResponse(perm, safe=False)
    else:
        return Response({"msg": "Not LoggedIn"}, status=400)


def InstallView(request):
    msg = install().install()
    return JsonResponse(msg, safe=False)
