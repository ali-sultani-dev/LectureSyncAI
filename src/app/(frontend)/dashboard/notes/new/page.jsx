'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mic, Upload as UploadIcon, Square } from 'lucide-react'

export default function VoiceRecorder() {
  const [mode, setMode] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const inputRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioUrl(url)
        setMode('preview')
      }
      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
      setMode('record')
    } catch (err) {
      console.error('Microphone access error:', err)
      alert('Unable to access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop())
      setIsRecording(false)
    }
  }

  const chooseUpload = () => inputRef.current.click()
  const onFile = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAudioBlob(file)
    setAudioUrl(url)
    setMode('preview')
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Audio Transcription</CardTitle>
      </CardHeader>

      <CardContent>
        {!mode && (
          <div className="flex gap-4 w-full">
            <Button onClick={startRecording} className="flex-1 flex-col h-32" variant="outline">
              <Mic className="h-8 w-8 mb-2" />
              Record
            </Button>
            <Button onClick={chooseUpload} className="flex-1 flex-col h-32" variant="outline">
              <UploadIcon className="h-8 w-8 mb-2" />
              Upload
            </Button>
            <input ref={inputRef} type="file" accept="audio/*" hidden onChange={onFile} />
          </div>
        )}

        {mode === 'record' && isRecording && (
          <div className="text-center py-6">
            <div className="text-lg mb-4">Recording...</div>
            <Button onClick={stopRecording} className="h-12 w-12 rounded-full bg-red-500 mx-auto">
              <Square className="h-6 w-6 text-white" />
            </Button>
          </div>
        )}

        {mode === 'preview' && audioUrl && (
          <div className="space-y-4">
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
