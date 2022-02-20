from django.urls import path
from .views import RoomApiView,CreateRoomView

urlpatterns = [
    path('',RoomApiView.as_view(),name='roomAPIView'),
    path('create-room',CreateRoomView.as_view(),name="createRoomAPI")
]
