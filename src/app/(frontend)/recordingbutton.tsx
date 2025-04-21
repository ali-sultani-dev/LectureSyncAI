import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import Button from '@mui/material/Button';

export default function RecordingButton({isRecording, setButton}:{isRecording: boolean, setButton: React.Dispatch<React.SetStateAction<boolean>>}) {
    if(isRecording){
        return (
            <Button variant="contained" color = "error" sx={ { borderRadius: 28 } }  startIcon={<MicIcon />}onClick={() => {
                setButton(false);
          }} >Recording</Button>
        )
    } return(
        <Button variant = "contained" color = "success" sx={ { borderRadius: 28 } }  startIcon={<MicIcon />} onClick={() => {
            setButton(true);
      }}>Press to Record</Button>
       

    )
  
}
