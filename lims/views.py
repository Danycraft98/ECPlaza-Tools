from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import *


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    model = serializer_class().Meta().model
    permission_classes = [IsAuthenticated, CustomPermission]

    def get_queryset(self):
        return get_query(self.request, self.model).queryset()


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    model = serializer_class().Meta().model
    permission_classes = [IsAuthenticated, CustomPermission]
    model = serializer_class().Meta().model

    def get_queryset(self):
        print(self.request.user.username, self.request.method, self.model)
        return get_query(self.request, self.model).queryset()
    # def perform_create(self, serializer):
    #     serializer.save(created_by=self.request.user)


class FieldViewSet(viewsets.ModelViewSet):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer
    model = serializer_class().Meta().model
    permission_classes = [IsAuthenticated, CustomPermission]
    model = serializer_class().Meta().model

    def get_queryset(self):
        print(self.request.user)
        return get_query(self.request, self.model).queryset()


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    model = serializer_class().Meta().model
    permission_classes = [IsAuthenticated, CustomPermission]
    model = serializer_class().Meta().model

    def get_queryset(self):
        print(self.request.user)
        return get_query(self.request, self.model).queryset()


class SampleViewSet(viewsets.ModelViewSet):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer
    model = serializer_class().Meta().model
    permission_classes = [IsAuthenticated, CustomPermission]
    model = serializer_class().Meta().model

    def get_queryset(self):
        print(self.request.user)
        return get_query(self.request, self.model).queryset()


class SampleTestViewSet(viewsets.ModelViewSet):
    queryset = SampleTest.objects.all()
    serializer_class = SampleTestSerializer
    model = serializer_class().Meta().model
    permission_classes = [IsAuthenticated, CustomPermission]
    model = serializer_class().Meta().model

    def get_queryset(self):
        print(self.request.user)
        return get_query(self.request, self.model).queryset()


class ResultFieldsViewSet(viewsets.ModelViewSet):
    queryset = ResultFields.objects.all()
    serializer_class = ResultFieldsSerializer
    model = serializer_class().Meta().model
    permission_classes = [IsAuthenticated, CustomPermission]
    model = serializer_class().Meta().model

    def get_queryset(self):
        print(self.request.user)
        return get_query(self.request, self.model).queryset()
