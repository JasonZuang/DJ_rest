from django.urls import path
from .views import RoomApiView,CreateRoomView,GetRoom

urlpatterns = [
    path('',RoomApiView.as_view(),name='roomAPIView'),
    path('create-room',CreateRoomView.as_view(),name="createRoomAPI"),
    path('get-room',GetRoom.as_view(),name='getroom')
]
