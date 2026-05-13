export type Category = '自然' | '商店街' | '都市' | '温泉街';

export type Channel = {
  id: string;
  name: string;
  location: string;
  description: string;
  youtubeId: string;
  category: Category;
};

export const CATEGORIES: Category[] = ['都市', '商店街', '自然', '温泉街'];

export const channels: Channel[] = [
  {
    id: '1',
    name: '渋谷スクランブル交差点',
    location: '東京都 渋谷区',
    description: '世界一有名な交差点をテレビ朝日がライブ配信。昼夜問わず賑わう東京の鼓動を感じてください。',
    youtubeId: '8H3nRCFVR6Y',
    category: '都市',
  },
  {
    id: '2',
    name: '新宿・歌舞伎町 4K（テイケイ屋上）',
    location: '東京都 新宿区',
    description: '眠らない街・歌舞伎町をビル屋上から4K映像で。ネオンと人波が織りなす夜景は必見です。',
    youtubeId: 'ErHJBXTmm2Q',
    category: '都市',
  },
  {
    id: '3',
    name: '新宿・歌舞伎町 2号機',
    location: '東京都 新宿区',
    description: '歌舞伎町を別アングルで捉えたライブカメラ。1号機と合わせてご覧いただけます。',
    youtubeId: 'gFRtAAmiFbE',
    category: '都市',
  },
  {
    id: '4',
    name: '大阪・心斎橋筋商店街',
    location: '大阪府 大阪市',
    description: '大阪随一の繁華街・心斎橋筋をリアルタイムで。活気あふれる関西の日常をどうぞ。',
    youtubeId: 'YZMZSqz9fx8',
    category: '商店街',
  },
  {
    id: '5',
    name: '京都・花見小路（公式）',
    location: '京都府 京都市 祇園',
    description: '祇園の象徴・花見小路を公式カメラでライブ配信。舞妓さんとすれ違えるかも。',
    youtubeId: 'X5rq4ioggLk',
    category: '商店街',
  },
  {
    id: '6',
    name: '草津温泉・湯畑',
    location: '群馬県 草津町',
    description: '日本三名泉のひとつ・草津温泉の中心地「湯畑」。湯けむり漂う風情ある景色を。',
    youtubeId: 'GrEEoEmmrKs',
    category: '温泉街',
  },
  {
    id: '7',
    name: '富士山・本栖湖（山梨放送）',
    location: '山梨県 富士河口湖町',
    description: '千円札の裏面にも描かれた絶景。本栖湖越しに望む富士山を山梨放送がお届けします。',
    youtubeId: 'x1OxXSmMPYY',
    category: '自然',
  },
  {
    id: '8',
    name: '富士山・河口湖 4K',
    location: '山梨県 富士河口湖町',
    description: '河口湖越しに望む富士山を4K映像でお楽しみください。天気によって刻々と変わる表情が魅力。',
    youtubeId: 'Sv9hcJ3k5h4',
    category: '自然',
  },
  {
    id: '9',
    name: '富士山・さった峠',
    location: '静岡県 静岡市',
    description: '広重の浮世絵「東海道五十三次」と同じ構図で眺める富士山。海・鉄道・富士山が一望できます。',
    youtubeId: 'GsD9QQEKSzQ',
    category: '自然',
  },
];
