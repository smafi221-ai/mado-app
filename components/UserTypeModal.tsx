'use client';

import { useState, useEffect } from 'react';
import { gtagEvent } from '@/lib/gtag';

const USER_TYPE_KEY = 'userType';
type UserType = 'personal' | 'facility';

export default function UserTypeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(USER_TYPE_KEY)) setOpen(true);
  }, []);

  function select(type: UserType) {
    localStorage.setItem(USER_TYPE_KEY, type);
    gtagEvent('select_user_type', { user_type: type });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-7 w-full max-w-[340px] flex flex-col items-center gap-4 shadow-xl">
        {/* ロゴ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="MaDo" width={200} height={50} />

        {/* タイトル */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A6B45]">MaDoへようこそ</h2>
          <p className="text-sm text-gray-500 mt-1">はじめに教えてください</p>
        </div>

        {/* ボタン */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => select('personal')}
            className="w-full bg-[#2E9E6B] hover:bg-[#268A5E] active:bg-[#1E7550] text-white text-lg font-bold py-4 rounded-2xl transition-colors"
          >
            🏠 個人・自宅利用
          </button>
          <button
            onClick={() => select('facility')}
            className="w-full bg-white hover:bg-green-50 text-[#2E9E6B] border-2 border-[#2E9E6B] text-lg font-bold py-4 rounded-2xl transition-colors"
          >
            🏥 施設・法人
          </button>
        </div>

        {/* 注記 */}
        <p className="text-xs text-gray-400">※選択後すぐにご利用いただけます</p>
      </div>
    </div>
  );
}
