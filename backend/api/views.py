from django.http import HttpResponse, HttpRequest
from rest_framework import viewsets, generics
from .serializer import UsuarioSerializer, AnuncioSerializer
from .models import Usuario, Anuncio

class AnuncioViewSet(viewsets.ModelViewSet):
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

#Usario por id - get, update, delete
class UsuarioDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

#Obtener usuarios
class UsuarioList(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

#Hello World
def helloworld(HttpRequest):
    return HttpResponse('Hello, World!')
