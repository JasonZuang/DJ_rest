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
import {Collapse} from "@material-ui/core"
//Imports from Material UI

function CreateRoomPage(props){
    const defaultVotes = 0;
    
    const defaultProps = {
        votesToSkip:props.votesToSkip,
        guestCanPause:props.guestCanPause,
        update:props.update,
        roomCode:props.roomCode,
        updateCallBack:props.updateCallBack,
        errorMsg:"",
        successMsg:""
    }
    const [values,setValues] = useState(defaultProps);
    const history = useHistory();
    const title = values.update? "Settings":"Create Room";
    useEffect(()=>{
        console.log(`guest Pause change to ${values.guestCanPause}`);
    },[values.guestCanPause]);

    const handleVotes = (e) => {
        e.preventDefault();
        const val = e.target.value;
        setValues({
            ...values,
            votesToSkip:val
        });
        
    };

    const handleGuestPause = (e) => {
        e.preventDefault();
        const gp = e.target.value === "true";
        setValues({
            ...values,
            guestCanPause:gp,
        });
    }

    const handleUpdateButtonPressed = () =>{
        const send = {
            method:"PATCH",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                guestPause:values.guestCanPause,
                skipVotes:values.votesToSkip,
                code:values.roomCode
            })
        };
        fetch('/api/update-room', send).then((response)=>{
            if(response.ok){
                setValues({
                    ...props,
                    successMsg:"Update Successful"
                })
                    
                
            }else{
               setValues({
                   ...props,
                    errorMsg:"Error Updating"
               })     
            }
        }).then((data)=> {
            //history.push('/room/'+data.code)

            values.updateCallBack();
        });

    }
    
    const handleCreateRoom = () =>{
        
        const send = {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                guestPause:values.guestCanPause,
                skipVotes:values.votesToSkip,
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

    const renderCreateButton = () =>{
        return (
            <>
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
            </>
        )
    }
    const renderUpdateButton = () =>{
    return (
        <>
            <Grid item xs={12} align="center">
            <Button variant="contained" onClick={handleUpdateButtonPressed}>
                Update
            </Button>
            </Grid>
        </>
    )
        
    }
    return(
        <div className='center'>  
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse in={values.errorMsg!="" || values.successMsg!=""}>
                        {values.successMsg}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant = 'h4'>{title}</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component='fieldset'>
                        <FormHelperText>
                            <div align="center">
                                Guest Control of Playback
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={values.guestCanPause? "true":"false"} onChange={handleGuestPause}>
                            {console.log(values.guestCanPause? "true":"false")}
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
                {values.update? renderUpdateButton():renderCreateButton()}
            </Grid>
        </div>
    )
    //12 in Grid is the entire width of the grid
}
export default CreateRoomPage;