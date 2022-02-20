import React from "react";
import Hello from "./Hello"
import HomePage from "./HomePage"
import RoomPage from "./RoomPage"
import CreateRoomPage from "./CreateRoomPage"
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom"

function App(){
    return(
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/join" element={<RoomPage/>}/>
                    <Route exact path="/create" element={<CreateRoomPage/>}/>
                </Routes>
            </Router>
        </>
    )
}
export default App;