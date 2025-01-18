'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

export default function CreateAlbum() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you'd send this data to your backend
    console.log('Creating album:', { title, description })
    toast({
      title: 'Album Created',
      description: `Your album "${title}" has been created successfully.`,
    })
    // Redirect to albums page after creation
    router.push('/albums')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Album</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Album Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <Button type="submit">Create Album</Button>
      </form>
    </div>
  )
}

