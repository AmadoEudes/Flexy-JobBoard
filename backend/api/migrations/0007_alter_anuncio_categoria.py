# Generated by Django 5.0.3 on 2024-03-11 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_usuario_contrasenia_usuario_departamento_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anuncio',
            name='categoria',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
