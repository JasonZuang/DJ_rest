import React from "react";
import RoomPage from "./RoomPage"
import CreateRoomPage from "./CreateRoomPage"
import Room from './Room'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function HomePage(){
    return(
        <>
            
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className="center">
                            <h1>Home Page</h1>
                            <Grid container spacing={1} alignItems ="center" direction="column">
                                <Grid item xs={12} align="center">
                                    <Button variant = "contained" to ="/join" component={Link}>
                                        Join Room
                                    </Button>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Button variant = "contained" to ="/create" component={Link}>
                                        Create Room
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    
                    </Route>
                    <Route path="/join" component={RoomPage} />
                    <Route path="/create" component={CreateRoomPage} />
                    <Route path="/room/:roomCode" component={Room} />
                </Switch>
            </Router>
        </>
    )
}

export default HomePage;