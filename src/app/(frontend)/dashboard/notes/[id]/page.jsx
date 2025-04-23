'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronsUpDown,
  Play,
  Pause,
  Share2,
  Download,
  Clock,
} from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export default function Note() {
  const { id } = useParams()
  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () =>
      fetch(`/api/notes/${id}?depth=1`, { credentials: 'include' }).then((r) =>
        r.json()
      ),
    enabled: !!id,
  })

  useEffect(() => {
    const src = note?.audioFile?.url
    if (!src) return

    const audio = audioRef.current
    if (!audio) return

    const onMeta = () => setDuration(audio.duration)
    const onTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)

    return () => {
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('timeupdate', onTime)
    }
  }, [note?.audioFile?.url])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  if (isLoading) return <div>Loading…</div>
  if (isError || !note) return <div>Error loading note.</div>

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-4xl p-6 md:p-8">
        {note.audioFile?.url && (
          <audio
            ref={audioRef}
            src={note.audioFile.url}
            preload="metadata"
          />
        )}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <p className="text-sm text-muted-foreground">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <div className="flex-1">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: duration
                        ? `${(currentTime / duration) * 100}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {Math.floor(currentTime / 60)}:
                  {String(Math.floor(currentTime % 60)).padStart(2, '0')} /{' '}
                  {Math.floor(duration / 60)}:
                  {String(Math.floor(duration % 60)).padStart(2, '0')}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-2 -mb-3.5">
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-2"
            >
              <div className="flex items-center space-x-4 px-4">
                <h4 className="text-sm font-semibold">Transcript</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle>Transcript</CardTitle>
                    <CardDescription>
                      Full lecture transcript
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RichText data={note.transcript} />
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </CardFooter>
        </Card>

        <Card className="mb-6 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle>Summary</CardTitle>
            <CardDescription>AI-generated summary</CardDescription>
          </CardHeader>
          <CardContent>
            <RichText data={note.summary} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}