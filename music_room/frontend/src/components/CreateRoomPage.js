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
//Imports from Material UI

function CreateRoomPage(){
    const defaultVotes = 0;
    const [guestPause,setGuestPause] = useState(true);
    const [votesSkip, setVotesSkip] = useState(0);
    const history = useHistory();
    useEffect(()=>{
        console.log(`guest Pause change to ${guestPause}`);
    },[guestPause]);

    const handleVotes = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setVotesSkip(val);
        console.log(votesSkip);
    };

    const handleGuestPause = (e) => {
        e.preventDefault();
        const gp = e.target.value === "true";
        setGuestPause(gp);
    }

    const handleCreateRoom = () =>{
        
        const send = {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                guestPause:guestPause,
                skipVotes:votesSkip
            })
        };
        fetch('/api/create-room', send).then((response)=>
            response.json()
        ).then((data)=> {
            //history.push('/room/'+data.code)
            console.log(data.code);
            history.push('/room/'+data.code);
        });
        console.log(send);
    }
    return(
        <>  
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant = 'h4'>Create Room</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component='fieldset'>
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={guestPause? "true":"false"} onChange=        {handleGuestPause}>
                            <FormControlLabel value="true" control={<Radio/>}
                                                           label="Play/Pause"
                                                           labelPlacement="bottom"/>
                            <FormControlLabel value="false"  control={<Radio/> }onChange={handleGuestPause}
                                                           label="No Control"
                                                           labelPlacement="bottom"/>

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true} type="number" defaultValue={defaultVotes}
                                   inputProps={{
                                       min:1,
                                       style:{textAlign:"center"}
                                   }}
                                   onChange={handleVotes}/>
                                    <FormHelperText>
                                        <div align="center">
                                            Votes Required To Skip Song
                                        </div>
                                    </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" onClick={handleCreateRoom}>
                        Create Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" to='/' component={Link}>
                        Back To Home
                    </Button>
                </Grid>
            </Grid>
        </>
    )
    //12 in Grid is the entire width of the grid
}
export default CreateRoomPage;