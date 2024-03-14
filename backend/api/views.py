from django.http import HttpResponse, HttpRequest
from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializer import UsuarioSerializer, AnuncioSerializer
from .models import Usuario, Anuncio
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User

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

class ProfileView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user.email),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                        context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'username': user.username,
            'firstname': user.first_name,
            'lastname': user.last_name,
            'user_id': user.pk,
            'email': user.email,
        })
class CrearUsuario(APIView):
    def post(self, request, format=None):
        serializer = UsuarioSerializer(data=request.data)
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            # Crear usuario en la tabla Usuario
            usuario = serializer.save()

            # Extraer datos del JSON
            nombres = serializer.validated_data.get('nombres')
            apellidos = serializer.validated_data.get('apellidos')
            correo_electronico = serializer.validated_data.get('correo_electronico')
            contrasenia = serializer.validated_data.get('contrasenia')

            # Crear usuario en la tabla auth_user
            user = User.objects.create_user(username=correo_electronico, email=correo_electronico, password=contrasenia, first_name=nombres, last_name=apellidos)
            token = Token.objects.create(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Hello World
def helloworld(HttpRequest):
    return HttpResponse('Hello, World!')
