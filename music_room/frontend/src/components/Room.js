import React, {useState,useEffect,useCallback} from 'react';
import Grid from "@material-ui/core/Grid";
import  Typography  from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link, useHistory} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage"
function Room(props){
    //props.match contains information on how a <Route Path> matched the URL
    //Match has params- which has the key value pairs parsed from the URL
    //isExact-true of URL matched
    //path the path pattern matched to
    //url the matched protion of the URL
    const history = useHistory();
    const [roomCode,setRoomCode] = useState(props.match.params.roomCode);
    const initalState= {
        votesSkip:0,
        isHost:false,
        guestPause:true,
        showSettings:false
    }
    const[roomData,setRoomData] = useState(initalState);

    
        useEffect(()=>{
            fetch('/api/get-room'+"?code="+roomCode)
            .then((res) => {
                if(!res.ok){
                    props.leaveRoomCallBack();
                    history.push('/');
                } 

                return res.json();
            
            })
            .then((data) => {
                console.log(data);
                setRoomData({
                    ...roomData,
                    votesSkip:data.skipVotes,
                    isHost:data.is_host,
                    guestPause:data.guestPause,
                    showSettings:false
                })
            })
        },[roomCode,roomData.votesSkip,roomData.guestPause]);
    const getRoomDetails = useCallback(() =>{
        fetch('/api/get-room'+"?code="+roomCode)
            .then((res) => {
                if(!res.ok){
                    props.leaveRoomCallBack();
                    history.push('/');
                } 

                return res.json();
            
            })
            .then((data) => {
                console.log(data);
                setRoomData({
                    ...roomData,
                    votesSkip:data.skipVotes,
                    isHost:data.is_host,
                    guestPause:data.guestPause,
                    showSettings:false
                })
            })
    },[]);
    const leaveRoom = () => {
        const send = {
            method:"POST",
            headers:{"Content-Type":"application/json"}
        };
        fetch("/api/leave-room", send).then((r)=>{console.log(r.json)});
        props.leaveRoomCallBack();
        history.push('/');
    }
    
    const updateShowSettings = (v) =>{
        setRoomData(
            {...roomData,
            showSettings:v}
        )
    }
    const showSettings = () => {
        return(
            <Grid container spacing ={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                    votesToSkip={roomData.votesSkip}
                    guestCanPause = {roomData.guestPause}
                    update={true} 
                    roomCode = {roomCode}
                    updateCallBack={getRoomDetails}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant ='contained' onClick={()=> updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }
    const renderSettingsButton = () => {
        return (
            <>
                <Grid item xs={12} align="center">
                    <Button variant ='contained' onClick = {()=>{updateShowSettings(true)}}>
                        Settings
                    </Button>

                </Grid>
            </>
        )
    }
    if(roomData.showSettings){
        return showSettings();
    }
    return(
        <>
            <div className='center'>
            <Grid container spacing={4} alignItems ="center" direction="column">
                <Grid item xs={12} align="center">
                    <Typography variant ='h4' component = 'h4'>
                        Room Code : {roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant ='p' component = 'p'>
                        Votes to Skip: {roomData.votesSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant ='p' component = 'p'>
                        {roomData.isHost ? "You are the Host (Note: If you leave this room, the room will be deleted)" : "You are a guest of this room"}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant ='p' component = 'p'>
                        Can Guest Pause? {roomData.guestPause ? "Guests May Pause" : "Guests May Not Pause"}
                    </Typography>
                </Grid>
                {roomData.isHost? renderSettingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button variant ='contained' onClick={leaveRoom}>
                        Leave Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant ='contained' to='/' component={Link}>
                        Back Home
                    </Button>
                </Grid>
               
            </Grid>
            </div>
        </>
    )
}

export default Room;