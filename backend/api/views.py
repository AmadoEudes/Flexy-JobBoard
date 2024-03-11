from django.http import HttpResponse, HttpRequest
from rest_framework import viewsets, generics
from .serializer import UsuarioSerializer, AnuncioSerializer
from .models import Usuario, Anuncio
from rest_framework.decorators import action
from rest_framework.response import Response

class AnuncioViewSet(viewsets.ModelViewSet):
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    # Acción personalizada para buscar anuncios con múltiples parámetros
    @action(detail=False, methods=['get'])
    def buscar(self, request):
        # Obtener parámetros de la solicitud
        titulo = request.query_params.get('titulo', None)
        u_latitud = request.query_params.get('latitud', None)
        u_longitud = request.query_params.get('longitud', None)
        fecha_creacion = request.query_params.get('fecha_creacion', None)
        usuario = request.query_params.get('usuario', None)

        # Filtrar anuncios basados en los parámetros recibidos
        anuncios = Anuncio.objects.all()
        if titulo:
            anuncios = anuncios.filter(titulo__icontains=titulo)
        if u_latitud:
            anuncios = anuncios.filter(u_latitud=u_latitud)
        if u_longitud:
            anuncios = anuncios.filter(u_longitud=u_longitud)
        if fecha_creacion:
            anuncios = anuncios.filter(fecha_creacion=fecha_creacion)
        if usuario:
            anuncios = anuncios.filter(usuario=usuario)

        # Serializar los anuncios y devolverlos en la respuesta
        serializer = AnuncioSerializer(anuncios, many=True)
        return Response(serializer.data)
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

#Anuncio por id - get, update, delete
class AnuncioDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer

#Obtener anuncios
class AnuncioList(generics.ListCreateAPIView):
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer


#Hello World
def helloworld(HttpRequest):
    return HttpResponse('Hello, World!')
