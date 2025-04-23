'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mic, Upload as UploadIcon, Square, Loader2 } from 'lucide-react'

export default function VoiceRecorder() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Audio Transcription</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex gap-4 w-full mb-6">
          <Button className="flex-1 flex-col h-32" variant="outline">
            <Mic className="h-8 w-8 mb-2" />
            Record
          </Button>
          <Button className="flex-1 flex-col h-32" variant="outline">
            <UploadIcon className="h-8 w-8 mb-2" />
            Upload
          </Button>
        </div>

        <div className="text-center py-6 mb-6">
          <div className="text-lg mb-4">Recording...</div>
          <Button className="h-12 w-12 rounded-full bg-red-500 mx-auto">
            <Square className="h-6 w-6 text-white" />
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          <audio controls className="w-full bg-gray-100 p-2 rounded" />
          <Button className="w-full">
            <Loader2 className="animate-spin mr-2" />
            Transcribe
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <h3 className="font-medium mb-2">Transcription</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </CardContent>
    </Card>
  )
}