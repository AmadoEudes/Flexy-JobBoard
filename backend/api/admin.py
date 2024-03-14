from django.contrib import admin
from .models import Usuario,Anuncio
from rest_framework.authtoken.admin import TokenAdmin

@admin.register(Anuncio)
class AnuncioAdmin(admin.ModelAdmin):
    search_fields = ('titulo', 'id')
    list_display = ('titulo', 'id', 'descripcion')

admin.site.register(Usuario)

TokenAdmin.raw_id_fields = ['user']