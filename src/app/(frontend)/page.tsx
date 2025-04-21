"use client"
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import './styles.css'
import RecordingButton from './recordingbutton'
import { useState } from 'react';



export default function HomePage() {
  // const headers = await getHeaders()
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })

  
  const [isRecording, setButton] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <RecordingButton isRecording = {isRecording} setButton = {setButton}/>
    </div>
  )
}
