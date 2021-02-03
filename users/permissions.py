from rest_framework.permissions import BasePermission

from users.filter import *


class CustomPermission:

    @staticmethod
    def has_permission(request, view):
        if fundamental().skip_check(view, request) in [True, False]:
            return fundamental().skip_check(view, request) in [True, False]
        try:
            username = request.user.username
            module = view.model
            method = request.method
            module_id = fundamental().get_model_id(module)
            method_dict = {'GET': 'read', 'POST': 'create', 'PUT': 'update', 'DELETE': 'delete'}
            method = method_dict[method]
            return fundamental().user_role_permission(username)['permissions'][module_id][method]
        except Exception as e:
            print(e)
            return False

    @staticmethod
    def has_object_permission(request, view, obj):
        try:
            pk = view.kwargs['pk']
            return get_query(request, view.model).queryset().filter(id=pk).count() > 0
        except Exception as e:
            print(e)
            return True


class AdminOnly(BasePermission):
    message = 'You are not authorized to access this page'

    def has_permission(self, request, view):
        return request.user.is_superuser


class OnlyRead(BasePermission):
    message = 'You are not authorized to access this page'

    def has_permission(self, request, view):
        return request.method == 'GET'


class IsOwnerProfile(BasePermission):
    message = 'You are not authorized to update this data'

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if str(request.method) in view.IsOwner_method:
            return obj.user.username == request.user.username
        # Instance must have an attribute named `owner`.
        return True
