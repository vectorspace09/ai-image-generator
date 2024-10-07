'use client'

import React, { useState, useEffect } from 'react';
import { generateImage } from '@/app/actions/generateImage';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');

  const prompts = [
    "A serene landscape with a misty mountain range...",
    "A futuristic cityscape with flying cars...",
    "A magical forest with glowing mushrooms...",
    "An underwater scene with bioluminescent creatures...",
    "A steampunk-inspired clockwork mechanism..."
  ];

  useEffect(() => {
    let promptIndex = 0;
    let charIndex = 0;
    const typingEffect = setInterval(() => {
      if (charIndex < prompts[promptIndex].length) {
        setPlaceholderText(prev => prev + prompts[promptIndex].charAt(charIndex));
        charIndex++;
      } else {
        setTimeout(() => {
          setPlaceholderText('');
          promptIndex = (promptIndex + 1) % prompts.length;
          charIndex = 0;
        }, 1000);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await generateImage(prompt);
      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else {
        setError(result.error || 'Failed to generate image');
      }
    } catch  {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">AI Image Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            className="w-full py-4 px-6 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            id="prompt"
            type="text"
            placeholder={placeholderText}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          className="w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Image'
          )}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-lg">
          {error}
        </div>
      )}
      {generatedImage && (
        <div className="mt-8">
          <img src={generatedImage} alt="Generated" className="w-full rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;