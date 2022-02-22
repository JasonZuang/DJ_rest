import React, {useState,useEffect} from "react";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import  Typography  from "@material-ui/core/Typography";
import { FormLabel, TextField } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import {Link} from "react-router-dom";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";


function RoomPage(){
    const defaultRoomData = {
        code:"",
        error:""
    };
    const history = useHistory();
    const [roomData,setRoomData] = useState(defaultRoomData);
    const handleInput = (e) =>{
        e.preventDefault();
        const code = e.target.value;
        setRoomData({
            ...roomData,
            code:code
        })
    };
    const handleJoin = () =>{
        const send = {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                code:roomData.code
            })
        };
        fetch('/api/join-room', send).then((response)=>{
            if(response.ok){
                history.push("/room/"+roomData.code)
            }
            else{
                setRoomData({
                    ...roomData,
                    error:"Room Not Found"
                });
            }
        }).catch((e)=>{console.log(e)})
    }
    return(
        <div className="center">
            <Grid container spacing={1} alignItems ="center" direction="column">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error={roomData.error}
                        label="Code"
                        placeholder="Enter A Room Code"
                        value={roomData.code}
                        helperText={roomData.error}
                        onChange={handleInput}
                    />
                <Grid item xs={12} align="center">
                    <Button variant = "contained" to ="/" component={Link}>
                        Back Home
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant = "contained" onClick={handleJoin}>
                        Join
                    </Button>
                </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default RoomPage;