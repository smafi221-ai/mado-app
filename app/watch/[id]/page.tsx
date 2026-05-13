'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { channels } from '@/lib/channels';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

const EMBED_PARAMS =
  'autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&playsinline=1';

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

      {/* Video — 最上部、スマホ画面いっぱい */}
      <div
        style={{
          width: '100vw',
          height: 'max(56.25vw, 250px)',
          flexShrink: 0,
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${channel.youtubeId}?${EMBED_PARAMS}`}
          style={{ width: '100%', height: '100%', display: 'block', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={channel.name}
        />
      </div>

      {/* 戻る・お気に入り — 横並び */}
      <div className="flex gap-3 px-4 py-4">
        <button
          onClick={() => router.back()}
          className="flex-1 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white text-lg font-bold py-3 rounded-2xl transition-colors"
        >
          ← 戻る
        </button>
        <button
          onClick={handleFavorite}
          className={`flex-1 text-lg font-bold py-3 rounded-2xl transition-colors ${
            isFav
              ? 'bg-yellow-500 text-black'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          }`}
          aria-label={isFav ? 'お気に入り解除' : 'お気に入り登録'}
        >
          {isFav ? '★ お気に入り済み' : '☆ お気に入り'}
        </button>
      </div>

      {/* チャンネル情報 */}
      <div className="px-4 pb-4 flex-1">
        <h1 className="text-white text-xl font-bold">{channel.name}</h1>
        <p className="text-[#5FAD8E] text-base mt-1">📍 {channel.location}</p>
        <p className="text-gray-300 text-base mt-3 leading-relaxed">{channel.description}</p>
      </div>

      {/* チャンネル一覧に戻る — 最下部 */}
      <div className="px-4 pb-8 pt-2">
        <button
          onClick={() => router.push('/')}
          className="w-full bg-[#2E9E6B] hover:bg-[#268A5E] active:bg-[#1E7550] text-white text-lg font-bold py-4 rounded-2xl transition-colors"
        >
          ← チャンネル一覧に戻る
        </button>
      </div>

    </div>
  );
}
