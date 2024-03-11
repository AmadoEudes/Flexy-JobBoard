from django.db import models

class Usuario(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    correo_electronico = models.EmailField()
    fecha_nacimiento = models.DateField()
    genero = models.CharField(max_length=1)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    contrasenia = models.CharField(max_length=100, null=True, blank=True)
    identificacion = models.CharField(max_length=20, null=True, blank=True)
    departamento = models.CharField(max_length=100, null=True, blank=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)
    metodo_pago = models.CharField(max_length=100, null=True, blank=True)
    estado = models.CharField(max_length=1, null=True, blank=True)

    def nombre_completo(self):
        return f'{self.nombres} {self.apellidos}'

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
    categoria = models.CharField(max_length=50, null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    direccion = models.CharField(max_length=100, null=True, blank=True)
    u_latitud = models.CharField(max_length=50, null=True, blank=True)
    u_longitud = models.CharField(max_length=50, null=True, blank=True)
    tiempo = models.CharField(max_length=50, null=True, blank=True)
    genero = models.CharField(max_length=10, null=True, blank=True)
    fecha_fin = models.DateField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(null=True, blank=True)
    fechaUpdate = models.DateTimeField(null=True, blank=True)
    ruta = models.CharField(max_length=500, null=True, blank=True)
    estado = models.CharField(max_length=1, null=True, blank=True)    

    def __str__(self):
        return self.titulo
    class Meta:
        verbose_name = 'Anuncio'
        verbose_name_plural = 'Anuncios'
        db_table = 'anuncio'