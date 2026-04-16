
import React from 'react';
import { Button, StatusBadge, Chip, SeedCount } from '../components/UI';
import { MOCK_MEETUPS } from '../data/mockData';
import { Meetup, UserProfile } from '../types';
import { Search, MapPin, Clock, Users, Leaf, Sprout, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface BrowseScreenProps {
  user?: UserProfile;
  onSelectMeetup: (id: string) => void;
  onVerify: () => void;
  onStartSwipe: () => void;
  onCreate: () => void;
}

export const BrowseScreen: React.FC<BrowseScreenProps> = ({ user, onSelectMeetup, onVerify, onStartSwipe, onCreate }) => {
  const [filter, setFilter] = React.useState('전체');
  const categories = ['전체', '산책', '차 한잔', '식사', '지금 가능'];

  const filteredMeetups = MOCK_MEETUPS.filter(m => {
    if (filter === '전체') return true;
    if (filter === '지금 가능') return m.time === '지금 가능';
    return m.category === filter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg-main paper-texture">
      <header className="bg-white/80 backdrop-blur-md p-6 sticky top-0 z-10 border-b border-border-main">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-text-main" />
            </div>
            <h1 className="text-2xl font-bold text-text-main font-serif">다시봄</h1>
          </div>
          {user && <SeedCount count={user.seeds} />}
        </div>
        
        <div className="bg-bg-main p-4 rounded-[24px] border-2 border-border-main flex items-center gap-3">
          <MapPin size={20} className="text-primary" />
          <div className="flex-1">
            <p className="text-xs font-bold text-text-muted">내 주변 3km</p>
            <p className="text-lg font-bold text-text-main">
              {user?.isNeighborhoodVerified ? '서울시 성동구 성수동' : '동네 인증이 필요해요'}
            </p>
          </div>
          {!user?.isNeighborhoodVerified && (
            <button onClick={onVerify} className="text-sm font-bold text-primary underline">인증하기</button>
          )}
        </div>
      </header>

      {/* Main Discovery Section: Swipe Mode */}
      <div className="px-6 pt-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-text-main font-serif">오늘의 인연 찾기</h2>
          <p className="text-sm text-text-muted">나와 잘 맞는 모임을 하나씩 살펴보세요</p>
        </div>
        
        <button 
          onClick={onStartSwipe}
          className="w-full bg-white border-2 border-primary/30 p-8 rounded-[40px] flex flex-col items-center justify-center gap-6 group active:scale-[0.98] transition-all shadow-soft relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />

          <div className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform relative z-10">
            <Heart size={48} fill="currentColor" className="animate-pulse" />
          </div>
          
          <div className="text-center relative z-10">
            <p className="text-2xl font-bold text-text-main font-serif mb-2">하나씩 골라보기</p>
            <div className="flex items-center justify-center gap-2 text-primary font-bold">
              <span>지금 바로 시작하기</span>
              <span className="text-xl">→</span>
            </div>
          </div>

          <div className="flex -space-x-3 mt-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-bg-main flex items-center justify-center text-xs font-bold text-text-muted shadow-sm">
                {['김', '이', '박', '최'][i-1]}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">
              +26
            </div>
          </div>
        </button>
      </div>

      <div className="px-6 pt-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-text-main font-serif">전체 모임 둘러보기</h2>
          <div className="flex items-center gap-1 text-text-muted">
            <Search size={16} />
            <span className="text-xs font-bold">검색</span>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-x-auto flex gap-2 no-scrollbar px-6">
        {categories.map(cat => (
          <Chip 
            key={cat} 
            label={cat} 
            active={filter === cat} 
            onClick={() => setFilter(cat)} 
          />
        ))}
      </div>

      <main className="flex-1 space-y-8 pb-32 pt-4 overflow-hidden">
        {/* 곧 피어날 새싹 모임 (Sprout) */}
        <div className="space-y-4">
          <div className="px-6 flex justify-between items-end">
            <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
              <Sprout size={24} className="text-success" />
              곧 피어날 새싹 모임
            </h2>
            <span className="text-xs font-bold text-text-muted">옆으로 넘겨보세요</span>
          </div>
          
          <div className="flex overflow-x-auto gap-4 px-6 pb-4 snap-x snap-mandatory no-scrollbar">
            {filteredMeetups.filter(m => m.status === 'sprout').map(meetup => (
              <div key={meetup.id} className="min-w-[85%] sm:min-w-[320px] snap-center">
                <MeetupCard meetup={meetup} onClick={() => onSelectMeetup(meetup.id)} />
              </div>
            ))}
            {filteredMeetups.filter(m => m.status === 'sprout').length === 0 && (
              <div className="w-full py-12 text-center text-text-muted font-medium bg-white/50 rounded-[28px] border-2 border-dashed border-border-main mx-6">
                해당하는 모임이 아직 없어요.
              </div>
            )}
          </div>
        </div>

        {/* 심을 준비된 씨앗 모임 (Seed) */}
        <div className="space-y-4">
          <div className="px-6 flex justify-between items-end">
            <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
              <Leaf size={24} className="text-primary" />
              심을 준비된 씨앗 모임
            </h2>
            <span className="text-xs font-bold text-text-muted">옆으로 넘겨보세요</span>
          </div>
          
          <div className="flex overflow-x-auto gap-4 px-6 pb-4 snap-x snap-mandatory no-scrollbar">
            {filteredMeetups.filter(m => m.status === 'seed').map(meetup => (
              <div key={meetup.id} className="min-w-[85%] sm:min-w-[320px] snap-center">
                <MeetupCard meetup={meetup} onClick={() => onSelectMeetup(meetup.id)} />
              </div>
            ))}
            {filteredMeetups.filter(m => m.status === 'seed').length === 0 && (
              <div className="w-full py-12 text-center text-text-muted font-medium bg-white/50 rounded-[28px] border-2 border-dashed border-border-main mx-6">
                해당하는 모임이 아직 없어요.
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 left-0 right-0 px-6">
        <Button size="lg" className="shadow-2xl" onClick={onCreate}>
          + 씨앗 심기 (모임 만들기)
        </Button>
      </div>
    </div>
  );
};


const MeetupCard: React.FC<{ meetup: Meetup; onClick: () => void }> = ({ meetup, onClick }) => {
  const createdAt = new Date(meetup.createdAt).getTime();
  const now = Date.now();
  const hoursPassed = (now - createdAt) / (1000 * 60 * 60);
  const hoursRemaining = Math.max(0, 24 - hoursPassed);
  const sunlightPercentage = (hoursRemaining / 24) * 100;
  
  const isExpiringSoon = hoursRemaining < 6;
  const isCritical = hoursRemaining < 2;

  return (
    <div 
      onClick={onClick}
      className={`bg-white p-5 rounded-[28px] border-2 active:scale-[0.98] transition-all shadow-soft relative overflow-hidden ${
        isCritical ? 'border-flower/40 bg-flower/5' : 'border-border-main'
      }`}
      style={{ 
        opacity: isCritical ? 0.85 : 1,
        filter: isExpiringSoon ? `grayscale(${20 - (hoursRemaining * 3)}%)` : 'none'
      }}
    >
      {/* Sunlight Gauge (햇살 게이지) */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-bg-main">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${sunlightPercentage}%` }}
          className={`h-full ${isExpiringSoon ? 'bg-flower' : 'bg-primary'}`}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="flex justify-between items-start mb-4 mt-2">
        <div className="flex items-center gap-2">
          <StatusBadge status={meetup.status} />
          {isExpiringSoon && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCritical ? 'bg-flower text-white animate-pulse' : 'bg-flower/20 text-flower'}`}>
              {isCritical ? '곧 사라져요!' : '햇살이 지고 있어요'}
            </span>
          )}
        </div>
        <span className="text-sm font-bold text-text-muted">{meetup.distance}</span>
      </div>
      
      <h3 className={`text-[20px] font-bold text-text-main mb-4 leading-tight ${isCritical ? 'text-flower' : ''}`}>
        {meetup.title}
      </h3>
      
      <div className="flex items-center gap-4 text-text-muted mb-4">
        <div className="flex items-center gap-1.5">
          <Clock size={16} />
          <span className="text-sm font-bold">{meetup.time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={16} />
          <span className="text-sm font-bold">{meetup.participants}/{meetup.maxParticipants}명</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className={`text-xs font-bold ${isExpiringSoon ? 'text-flower' : 'text-text-muted'}`}>
            남은 햇살: {Math.floor(hoursRemaining)}시간
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-main border-dashed">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center text-xs font-bold">
            {meetup.hostName[0]}
          </div>
          <span className="text-sm font-bold text-text-main">{meetup.hostName} · {meetup.hostAgeGroup}</span>
        </div>
        <div className="flex items-center gap-1 text-primary font-bold">
          <Leaf size={14} />
          <span className="text-sm">{meetup.seedsRequired}개</span>
        </div>
      </div>
    </div>
  );
};
