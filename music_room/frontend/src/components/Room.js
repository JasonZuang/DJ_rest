import React, {useState,useEffect} from 'react';

function Room(props){
    //props.match contains information on how a <Route Path> matched the URL
    //Match has params- which has the key value pairs parsed from the URL
    //isExact-true of URL matched
    //path the path pattern matched to
    //url the matched protion of the URL
    const [roomCode,setRoomCode] = useState(props.match.params.roomCode);
    const initalState= {
        votesSkip:0,
        isHost:false,
        guestPause:true
    }
    const[roomData,setRoomData] = useState(initalState);

    useEffect(()=>{
        fetch('/api/get-room'+"?code="+roomCode)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setRoomData({
                ...roomData,
                votesSkip:data.skipVotes,
                isHost:data.is_host,
                guestPause:data.guestPause
            })
        })
    },[roomCode])
    
    return(
        <>
                <h1>Room Code: {roomCode}</h1>
                <p>Votes to Skip: {roomData.votesSkip}</p>
                <p>Is Host? {roomData.isHost ? "Yes" : "Not Host"}</p>
                <p>Can Guest Pause? {roomData.guestPause ? "Guests May Pause" : "Guests May Not Pause"}</p>
            
        </>
    )
}

export default Room;