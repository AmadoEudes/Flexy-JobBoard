from django.urls import include, path
from django import urls
from .views import UsuarioDetails, UsuarioList, helloworld
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'anuncios', views.AnuncioViewSet)
router.register(r'usuarios', views.UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UsuarioList.as_view(), name='usuario-list'),
    path('user/<int:pk>/', UsuarioDetails.as_view(), name='usuario-detail'),
    path('hello/', helloworld, name='hello'),
]