from django.contrib import admin
from .models import Usuario,Anuncio

@admin.register(Anuncio)
class AnuncioAdmin(admin.ModelAdmin):
    search_fields = ('titulo', 'id')
    list_display = ('titulo', 'id', 'descripcion')

admin.site.register(Usuario)