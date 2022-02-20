from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics,status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

#Api view for list of Rooms
#Pulls all the available/created rooms to display on REST framework page
class RoomApiView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

#Creates a session key if new user, Otherwise sets the session key as ID for host
#If data inputed into serializer works, then it would create a session key and 
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guestPause = serializer.data.get('guestPause')
            skipVotes = serializer.data.get('skipVotes')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guestPause = guestPause
                room.skipVotes = skipVotes
                room.save(update_fields=['guestPause','skipVotes'])
            else:
                room = Room(host=host,guestPause = guestPause, skipVotes=skipVotes)
                room.save()

            return Response(RoomSerializer(room).data,status=status.HTTP_201_CREATED)