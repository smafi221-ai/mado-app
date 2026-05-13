'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { channels, CATEGORIES, type Category } from '@/lib/channels';
import { getFavorites, toggleFavorite } from '@/lib/favorites';

type Filter = Category | '全て';

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Filter>('全て');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const filtered =
    activeCategory === '全て'
      ? channels
      : channels.filter((c) => c.category === activeCategory);

  function handleFavorite(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setFavorites(toggleFavorite(id));
  }

  return (
    <div className="min-h-screen bg-[#F5FBF7]">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 border-b border-[#D4EDE2]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="MaDo" width={280} height={56}/>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {(['全て', ...CATEGORIES] as Filter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-7 py-3 rounded-full text-lg font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#2E9E6B] text-white'
                  : 'bg-white text-[#2E9E6B] border-2 border-[#2E9E6B] hover:bg-green-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Channel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filtered.map((channel) => (
            <div
              key={channel.id}
              className="bg-white rounded-3xl overflow-hidden cursor-pointer border border-[#D4EDE2] hover:border-[#2E9E6B] transition-colors"
              onClick={() => router.push(`/watch/${channel.id}`)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${channel.youtubeId}/hqdefault.jpg`}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
                <button
                  onClick={(e) => handleFavorite(e, channel.id)}
                  className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-2xl shadow-sm hover:scale-110 transition-transform"
                  aria-label={
                    favorites.includes(channel.id) ? 'お気に入り解除' : 'お気に入り登録'
                  }
                >
                  {favorites.includes(channel.id) ? '★' : '☆'}
                </button>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">{channel.name}</h2>
                    <p className="text-lg text-[#2E9E6B] mt-1">📍 {channel.location}</p>
                  </div>
                  <span className="text-base bg-green-50 text-[#2E9E6B] border border-[#D4EDE2] px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {channel.category}
                  </span>
                </div>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  {channel.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/watch/${channel.id}`);
                  }}
                  className="mt-6 w-full bg-[#2E9E6B] hover:bg-[#268A5E] active:bg-[#1E7550] text-white text-xl font-bold py-4 rounded-3xl transition-colors"
                >
                  ▶ 視聴する
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center text-gray-400 py-12 text-base">
        © 2025 MaDo — あなたのそばに、外の世界を
      </footer>
    </div>
  );
}
