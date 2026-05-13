'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { channels } from '@/lib/channels';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

const EMBED_PARAMS =
  'autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&color=white';

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <p className="text-2xl text-gray-300 mb-6">チャンネルが見つかりません</p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#2E9E6B] hover:bg-[#268A5E] text-white text-xl font-bold px-8 py-4 rounded-2xl"
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
      {/* Video — できる限り全画面に近く表示 */}
      <div className="w-full" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${channel.youtubeId}?${EMBED_PARAMS}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={channel.name}
        />
      </div>

      {/* Controls — 動画の下に配置 */}
      <div className="bg-black px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="bg-gray-800 hover:bg-gray-700 text-white text-lg font-bold px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          ← 戻る
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-lg font-bold truncate">{channel.name}</h1>
          <p className="text-[#5FAD8E] text-sm">📍 {channel.location}</p>
        </div>
        <button
          onClick={handleFavorite}
          className={`flex items-center gap-1 px-4 py-3 rounded-2xl text-xl font-medium transition-colors whitespace-nowrap ${
            isFav
              ? 'text-yellow-400 bg-gray-800'
              : 'text-gray-400 bg-gray-800 hover:text-yellow-300'
          }`}
          aria-label={isFav ? 'お気に入り解除' : 'お気に入り登録'}
        >
          {isFav ? '★' : '☆'}
          <span className="text-sm">{isFav ? 'お気に入り済み' : 'お気に入り'}</span>
        </button>
      </div>

      {/* Description */}
      <div className="bg-gray-900 px-5 py-5 flex-1">
        <p className="text-gray-200 text-lg leading-relaxed">{channel.description}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-5 bg-[#2E9E6B] hover:bg-[#268A5E] text-white text-lg font-bold px-6 py-3 rounded-2xl transition-colors"
        >
          ← チャンネル一覧に戻る
        </button>
      </div>
    </div>
  );
}
