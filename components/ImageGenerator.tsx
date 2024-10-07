"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { generateImage } from '@/app/actions/generateImage'

const ImageGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      const result = await generateImage(prompt)
      
      if (result.success && result.imageUrl) {
        setImage(result.imageUrl)
        toast({
          title: "Success",
          description: "Image generated successfully.",
        })
      } else {
        throw new Error(result.error || 'Failed to generate image')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Image'
          )}
        </Button>
      </form>
      {image && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Generated Image</h2>
          <div className="relative w-full h-[512px]">
            <Image 
              src={image} 
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

export default ImageGenerator