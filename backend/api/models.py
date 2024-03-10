from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField()
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1)

    def nombre_completo(self):
        return f'{self.nombre} {self.apellido}'

    def __str__(self):
        return self.nombre_completo()
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        db_table = 'usuario'
        

class Anuncio(models.Model):
    usuario = models.ForeignKey(Usuario, null=True, blank=True, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.titulo