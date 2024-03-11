from django.urls import include, path
from django import urls
from .views import AnuncioDetails, AnuncioList, UsuarioDetails, UsuarioList, helloworld
from rest_framework import routers
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
        
    path('hello/', helloworld, name='hello'),
]