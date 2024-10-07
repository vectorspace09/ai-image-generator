'use server'

import { revalidatePath } from 'next/cache'
import { saveImageHistory } from '@/lib/appwrite'
import { currentUser } from '@clerk/nextjs/server'

export async function generateImage(prompt: string) {
  try {
    const user = await currentUser()
    const UserID = user?.id
    if (!UserID || !user?.emailAddresses[0]?.emailAddress) {
      throw new Error('User not authenticated or email not available')
    }

    const userEmail = user.emailAddresses[0].emailAddress

    const response = await fetch('https://api.cloudflare.com/client/v4/accounts/b2c67197adc0298d019076ab73c4d650/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 6uEXW4_mFYw0KCKWW4RONJoYFak2gmAx-rIzSKZp`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    const data = await response.arrayBuffer()
    const base64 = Buffer.from(data).toString('base64')
    const imageUrl = `data:image/png;base64,${base64}`
    
    // Save the generated image to Appwrite
    await saveImageHistory(userEmail, prompt, imageUrl)

    revalidatePath('/')
    return { success: true, imageUrl }
  } catch (error) {
    console.error('Error generating image:', error)
    return { success: false, error: 'Failed to generate image' }
  }
}