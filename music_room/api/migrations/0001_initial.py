# Generated by Django 4.0.2 on 2022-02-20 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default='', max_length=8, unique=True)),
                ('host', models.CharField(max_length=50, unique=True)),
                ('guestPause', models.BooleanField(default=True)),
                ('skipVotes', models.IntegerField(default=1)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
