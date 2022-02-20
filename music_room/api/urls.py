from django.urls import path
from .views import RoomApiView

urlpatterns = [
    path('',RoomApiView.as_view(),name='roomAPIView')
]
