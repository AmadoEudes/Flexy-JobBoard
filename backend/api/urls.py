from django.urls import include, path
from django import urls
from .views import AnuncioDetails, AnuncioList, UsuarioDetails, UsuarioList, helloworld
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

router = routers.DefaultRouter()
router.register(r'anuncios', views.AnuncioViewSet)
router.register(r'usuarios', views.UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UsuarioList.as_view(), name='usuario-list'),
    path('user/<int:pk>/', UsuarioDetails.as_view(), name='usuario-detail'),
    path('jobs/', AnuncioList.as_view(), name='anuncio-list'),
    path('job/<int:pk>/', AnuncioDetails.as_view(), name='anuncio-detail'),
    path('profile/', views.ProfileView.as_view()),
    path('api/auth/', views.CustomAuthToken.as_view()),
    path('createUser/', views.CrearUsuario.as_view()),
    path('hello/', helloworld, name='hello'),
]
