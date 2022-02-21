import React from "react";
import RoomPage from "./RoomPage"
import CreateRoomPage from "./CreateRoomPage"
import Room from './Room'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
function HomePage(){
    return(
        <>
            
            <Router>
                <Switch>
                    <Route exact path="/">
                        <h1>Home Page</h1>
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