import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function History() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Generation History</CardTitle>
          <CardDescription>View your previously generated images.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your generation history will appear here.</p>
        </CardContent>
      </Card>
    </div>
  )
}