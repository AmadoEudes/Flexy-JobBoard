# Generated by Django 5.0.3 on 2024-03-11 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_anuncio_categoria'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anuncio',
            name='ruta',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]