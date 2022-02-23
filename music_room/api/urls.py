from django.urls import path
from .views import RoomApiView,CreateRoomView,GetRoom,JoinRoom,UserInRoom,LeaveRoom

urlpatterns = [
    path('',RoomApiView.as_view(),name='roomAPIView'),
    path('create-room',CreateRoomView.as_view(),name="createRoomAPI"),
    path('get-room',GetRoom.as_view(),name='getroom'),
    path('join-room',JoinRoom.as_view(),name="joinroom"),
    path('user-in-room',UserInRoom.as_view(),name="userInRom"),
    path('leave-room', LeaveRoom.as_view(), name= "leaveroom")
]
