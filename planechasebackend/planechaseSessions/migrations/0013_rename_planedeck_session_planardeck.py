# Generated by Django 4.2.9 on 2024-01-23 22:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planechaseSessions', '0012_alter_session_planedeck'),
    ]

    operations = [
        migrations.RenameField(
            model_name='session',
            old_name='planeDeck',
            new_name='planarDeck',
        ),
    ]
