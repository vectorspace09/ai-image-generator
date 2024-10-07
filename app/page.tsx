import ImageGenerator from '@/components/ImageGenerator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Generate Image</CardTitle>
          <CardDescription>Enter a description to generate an AI image.</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageGenerator />
        </CardContent>
      </Card>
    </div>
  )
}