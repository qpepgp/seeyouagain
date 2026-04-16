
import React from 'react';
import { Button, StatusBadge, Chip, SeedCount } from '../components/UI';
import { MOCK_MEETUPS } from '../data/mockData';
import { Meetup, UserProfile } from '../types';
import { Search, MapPin, Clock, Users, Leaf, Sprout } from 'lucide-react';

interface BrowseScreenProps {
  user?: UserProfile;
  onSelectMeetup: (id: string) => void;
  onVerify: () => void;
  onCreate: () => void;
}

export const BrowseScreen: React.FC<BrowseScreenProps> = ({ user, onSelectMeetup, onVerify, onCreate }) => {
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

      <div className="p-4 overflow-x-auto flex gap-2 no-scrollbar">
        {categories.map(cat => (
          <Chip 
            key={cat} 
            label={cat} 
            active={filter === cat} 
            onClick={() => setFilter(cat)} 
          />
        ))}
      </div>

      <main className="flex-1 p-4 space-y-6 pb-32">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-main flex items-center gap-2 px-2">
            <Sprout size={24} className="text-success" />
            곧 피어날 새싹 모임
          </h2>
          <div className="grid gap-4">
            {filteredMeetups.filter(m => m.status === 'sprout').map(meetup => (
              <MeetupCard key={meetup.id} meetup={meetup} onClick={() => onSelectMeetup(meetup.id)} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-main flex items-center gap-2 px-2">
            <Leaf size={24} className="text-primary" />
            심을 준비된 씨앗 모임
          </h2>
          <div className="grid gap-4">
            {filteredMeetups.filter(m => m.status === 'seed').map(meetup => (
              <MeetupCard key={meetup.id} meetup={meetup} onClick={() => onSelectMeetup(meetup.id)} />
            ))}
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

const MeetupCard: React.FC<{ meetup: Meetup; onClick: () => void }> = ({ meetup, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-5 rounded-[28px] border-2 border-border-main active:scale-[0.98] transition-all shadow-soft relative overflow-hidden"
  >
    <div className="flex justify-between items-start mb-4">
      <StatusBadge status={meetup.status} />
      <span className="text-sm font-bold text-text-muted">{meetup.distance}</span>
    </div>
    
    <h3 className="text-[20px] font-bold text-text-main mb-4 leading-tight">
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
