"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState('')
  const { toast } = useToast()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('text_prompts[0][text]', prompt)
      formData.append('cfg_scale', '7')
      formData.append('height', '512')
      formData.append('width', '512')
      formData.append('steps', '30')
      formData.append('samples', '1')
      formData.append('prompt', prompt)

      const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/ultra', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer sk-2WUJYuTa9t1Al8Fx8njEfhZiBMMewRPHmyaXbvuK9BODiNWr`,
          'Accept': 'application/json'
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      const imageUrl = `data:image/png;base64,${data.image}`
      setGeneratedImage(imageUrl)
      toast({
        title: "Success",
        description: "Image generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Image Description</Label>
          <Input
            id="prompt"
            placeholder="Describe an image..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Image'
          )}
        </Button>
      </form>
      {generatedImage && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Generated Image</h2>
          <div className="relative w-full h-[512px]">
            <Image 
              src={generatedImage} 
              alt="Generated image" 
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}