import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6703ceb20016d684e2f1');

export const account = new Account(client);
export const databases = new Databases(client);

export { client };

export const saveImageHistory = async (email: string, prompt: string, imageUrl: string) => {
  try {
    const response = await databases.createDocument(
      "Imagebanao",
      "history",
      ID.unique(),
      {
        email: email,
        prompt: prompt,
        url: imageUrl,
        
      }
    );
    return response;
  } catch (error) {
    console.error('Error saving image history:', error);
    throw error;
  }
};