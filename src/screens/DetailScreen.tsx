
import React from 'react';
import { Button, StatusBadge, SeedCount } from '../components/UI';
import { Meetup, UserProfile } from '../types';
import { Clock, MapPin, ChevronLeft, Heart, Leaf } from 'lucide-react';

interface DetailScreenProps {
  meetup: Meetup;
  user?: UserProfile;
  onBack: () => void;
  onJoin: () => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ meetup, user, onBack, onJoin }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main paper-texture">
      <header className="p-4 flex items-center justify-between border-b border-border-main bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeft size={32} />
          </button>
          <h1 className="text-xl font-bold truncate font-serif">모임 상세</h1>
        </div>
        {user && <SeedCount count={user.seeds} />}
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="aspect-video bg-gray-100 relative">
          <img 
            src={`https://picsum.photos/seed/${meetup.id}/800/450`} 
            alt="장소 이미지" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm font-bold">
            {meetup.distance} 거리
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <StatusBadge status={meetup.status} />
            <h2 className="text-[28px] font-bold text-text-main leading-tight font-serif">
              {meetup.title}
            </h2>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-[32px] border-2 border-border-main shadow-soft">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-text-muted font-bold text-sm">만나는 시간</p>
                <p className="text-xl font-bold text-text-main">{meetup.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-text-muted font-bold text-sm">만나는 장소</p>
                <p className="text-xl font-bold text-text-main leading-tight">{meetup.place}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-main font-serif">함께 나눌 이야기</h3>
            <p className="text-[18px] text-text-main leading-relaxed whitespace-pre-wrap">
              {meetup.description}
            </p>
          </div>

          <div className="flex items-center gap-4 p-5 bg-white border-2 border-border-main rounded-[32px] shadow-soft">
            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center text-2xl font-bold text-text-main">
              {meetup.hostName[0]}
            </div>
            <div>
              <p className="text-text-muted font-bold text-sm">방장님</p>
              <p className="text-xl font-bold text-text-main">{meetup.hostName} ({meetup.hostAgeGroup})</p>
            </div>
          </div>

          <div className="bg-primary/10 p-5 rounded-[24px] border-2 border-primary/20 space-y-2">
            <div className="flex items-center gap-2 text-text-main font-bold">
              <Leaf size={20} className="text-primary" />
              <span>씨앗 심기 안내</span>
            </div>
            <p className="text-text-muted leading-relaxed">
              이 모임에 참여하려면 <span className="font-bold text-text-main">씨앗 {meetup.seedsRequired}개</span>가 필요해요. 모임이 끝나면 다시 돌려드리고, 추가 선물도 드려요!
            </p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-border-main flex gap-4 shadow-2xl">
        <button className="p-5 bg-bg-main rounded-[24px] text-text-muted border-2 border-border-main">
          <Heart size={28} />
        </button>
        <Button onClick={onJoin}>
          씨앗 심고 같이 가기
        </Button>
      </footer>
    </div>
  );
};
