from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics,status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

#Api view for list of Rooms
#Pulls all the available/created rooms to display on REST framework page
class RoomApiView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
#Get request for specific Room in database
#we will pass 'code' in the url with the unique code to room
#If room returns from ORM send back first room found
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    def get(self,request,format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'No Room Found':'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request':'Code Parameter Not Found'}, status=status.HTTP_400_BAD_REQUEST)

#When Host leaves the room the Cache is cleared
#The room the host is hosting is deleted from database
class LeaveRoom(APIView):
    def post(self,request,format=None):
        if "room_code" in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            rooms = Room.objects.filter(host=host_id)
            if len(rooms) >0:
                room = rooms[0]
                room.delete()
            return Response({'Message':'You Left the Room'}, status=status.HTTP_200_OK)
            
#Only new thing here is that request sessions is a dictionary that allows
#Session information to be stored in the dict thats relevant to the user
class JoinRoom(APIView):
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get('code')
        if code != None:
            roomResult = Room.objects.filter(code=code)
            if len(roomResult) >0:
                room = roomResult[0]
                self.request.session['room_code'] = code
                return Response({'Message':'Joined'}, status=status.HTTP_200_OK)
            return Response({'Bad Request':'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request':'No Code'}, status=status.HTTP_400_BAD_REQUEST)

#Creates a session key if new user, Otherwise sets the session key as ID for host
#If data inputed into serializer works, then it would create a session key and create new room
#else it pulls a pre-existing room and then updates the vote counts information
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
                self.request.session['room_code'] = room.code
            else:
                room = Room(host=host,guestPause = guestPause, skipVotes=skipVotes)
                room.save()
                self.request.session['room_code'] = room.code

            return Response(RoomSerializer(room).data,status=status.HTTP_201_CREATED)


class UserInRoom(APIView):
    def get(self,request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data,status = status.HTTP_200_OK)



#Update room settings using settings urls
class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer
    def patch(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guestPause = serializer.data.get('guestPause')
            skipVotes = serializer.data.get('skipVotes')
            code = serializer.data.get('code')
            rooms = Room.objects.filter(code=code)
            
            if not rooms.exists():
                return Response({'No Room Found':'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
            room = rooms[0]
            userId = self.request.session.session_key
            if userId != room.host:
                Response({'Forbidden':"Invalid Host"},status=status.HTTP_403_FORBIDDEN)
            room.guestPause = guestPause
            room.skipVotes = skipVotes
            room.save(update_fields=['guestPause','skipVotes'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        return Response({'Bad Request':"Invalid Data"},status=status.HTTP_400_BAD_REQUEST)