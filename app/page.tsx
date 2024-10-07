import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ImageGenerator from "@/components/ImageGenerator";
import ImageHistory from "@/components/ImageHistory";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Image Generator</h1>
          <UserButton />
        </header>
        <div className="mt-8 space-y-8">
          <section className="bg-white shadow rounded-lg p-6">
            <ImageGenerator />
          </section>
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
            <ImageHistory />
          </section>
        </div>
      </div>
    </main>
  );
}