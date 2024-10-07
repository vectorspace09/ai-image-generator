import React from 'react';
import Image from 'next/image';
import { Models } from 'appwrite';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { currentUser } from '@clerk/nextjs/server';
import DownloadButton from './DownloadButton';

async function getImageHistory() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  
  if (!userEmail) {
    return [];
  }

  try {
    const response = await databases.listDocuments(
      "Imagebanao",
      "history",
      [
        Query.equal('email', userEmail),
        Query.orderDesc('$createdAt'),
      ]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching image history:', error);
    return [];
  }
}

export default async function ImageHistory() {
  const history = await getImageHistory();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {history.map((item: Models.Document) => (
        <div key={item.$id} className="border rounded-lg p-4">
          <Image src={item.url} alt={item.prompt} width={300} height={300} className="w-full h-auto" />
          <p className="mt-2 text-sm">{item.prompt}</p>
          <p className="text-xs text-gray-500">{new Date(item.$createdAt).toLocaleString()}</p>
          <DownloadButton url={item.url} prompt={item.prompt} />
        </div>
      ))}
    </div>
  );
}