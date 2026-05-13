'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { channels } from '@/lib/channels';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  const channel = channels.find((c) => c.id === params.id);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (!channel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <p className="text-2xl text-gray-300 mb-6">チャンネルが見つかりません</p>
        <button
          onClick={() => router.push('/')}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-8 py-4 rounded-2xl"
        >
          ← トップに戻る
        </button>
      </div>
    );
  }

  function handleFavorite() {
    setFavorites(toggleFavorite(channel!.id));
  }

  const isFav = favorites.includes(channel.id);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold px-6 py-3 rounded-2xl flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          ← 戻る
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-xl font-bold truncate">{channel.name}</h1>
          <p className="text-green-400 text-base">📍 {channel.location}</p>
        </div>
        <button
          onClick={handleFavorite}
          className={`text-3xl px-4 py-3 rounded-2xl transition-colors whitespace-nowrap ${
            isFav
              ? 'text-yellow-400 bg-gray-700'
              : 'text-gray-400 bg-gray-800 hover:text-yellow-300'
          }`}
          aria-label={isFav ? 'お気に入り解除' : 'お気に入り登録'}
        >
          {isFav ? '★' : '☆'}
          <span className="text-base ml-1 font-medium">
            {isFav ? 'お気に入り済み' : 'お気に入り'}
          </span>
        </button>
      </div>

      {/* Video */}
      <div className="flex-1 relative" style={{ minHeight: '60vh' }}>
        <iframe
          src={`https://www.youtube.com/embed/${channel.youtubeId}?autoplay=1`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={channel.name}
        />
      </div>

      {/* Description */}
      <div className="bg-gray-900 px-5 py-5">
        <p className="text-gray-200 text-lg leading-relaxed">{channel.description}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-lg font-bold px-6 py-3 rounded-2xl transition-colors"
        >
          ← チャンネル一覧に戻る
        </button>
      </div>
    </div>
  );
}
