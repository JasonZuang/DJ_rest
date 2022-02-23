import React, {useEffect, useState} from "react";
import RoomPage from "./RoomPage"
import CreateRoomPage from "./CreateRoomPage"
import Room from './Room'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography,ButtonGroup } from "@material-ui/core";
import {useHistory} from "react-router-dom"

function HomePage(){
    const [roomCode,setRoomCode] = useState("");
    const history = useHistory();
    //Checking to see if User has already established a session
    //Connecting him with the room if room exists under session "room_code"
    
    useEffect(()=>{
        
        fetch('/api/user-in-room').then((response)=>response.json())
        .then((data)=>{
            setRoomCode(data.code);
        })
    })

    const clearRoomCode = () =>{
        setRoomCode("");
    }
    return(
        <>
            
                <Switch>
                    <Route exact path="/">
                        <div className="center">
                            <Grid container spacing={1} alignItems ="center" direction="column">
                                <Grid item xs={12} align="center">
                                    <Typography variant = "h3" component="h3">
                                        Home Page
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Typography variant = "p" component="p">
                                            {roomCode?`Previous Room Code: ${roomCode}`:"Welcome First Timer"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <ButtonGroup disableElevation variant="contained">
                                    {roomCode? (
                                        <>
                                            <Button variant = "contained" to ={`/room/${roomCode}`}component={Link}>
                                                Join Previous Room
                                            </Button>
                                            <Button variant = "contained" to ='/join' component={Link}>
                                                Join New Room
                                            </Button>
                                        </>

                                    ) : (
                                        <Button variant = "contained" to ="/join" component={Link}>
                                            Join Room
                                        </Button>
                                    )}
                                    <div>
                                        <Button variant = "contained" to ="/create" component={Link}>
                                            Create Room
                                        </Button>
                                    </div>
                                    
                                    </ButtonGroup>
                                    
                                </Grid>
                            </Grid>
                        </div>
                    
                    </Route>
                    <Route path="/join" component={RoomPage} />
                    <Route path="/create" component={CreateRoomPage} />
                    <Route path="/room/:roomCode"
                           render={(props)=>{
                            return <Room {...props} leaveRoomCallBack= {clearRoomCode}/>;
                            
                        }}/>
                </Switch>
            
        </>
    )
}

export default HomePage;