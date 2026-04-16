
import React from 'react';
import { Meetup, UserProfile } from '../types';
import { MOCK_MEETUPS } from '../data/mockData';
import { ArrowLeft, Leaf, MessageCircle, Heart } from 'lucide-react';
import { Button, StatusBadge } from '../components/UI';
import { motion } from 'motion/react';

interface MatchListScreenProps {
  user?: UserProfile;
  interestedIds: string[];
  onSelectMeetup: (id: string) => void;
  onBack: () => void;
}

export const MatchListScreen: React.FC<MatchListScreenProps> = ({ user, interestedIds, onSelectMeetup, onBack }) => {
  const interestedMeetups = MOCK_MEETUPS.filter(m => interestedIds.includes(m.id));

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F2] paper-texture">
      <header className="bg-white/80 backdrop-blur-md p-6 sticky top-0 z-10 border-b border-border-main flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-text-main" />
        </button>
        <h1 className="text-xl font-bold text-text-main font-serif">내가 찜한 모임</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 p-6 space-y-6 pb-32">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Heart size={28} className="text-primary" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-main font-serif">관심 있는 모임</h2>
            <p className="text-sm font-bold text-text-muted">{interestedMeetups.length}개의 씨앗을 발견했어요</p>
          </div>
        </div>

        {interestedMeetups.length > 0 ? (
          <div className="grid gap-6">
            {interestedMeetups.map((meetup, index) => (
              <motion.div
                key={meetup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectMeetup(meetup.id)}
                className="bg-white p-6 rounded-[32px] border-2 border-border-main shadow-soft active:scale-[0.98] transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <StatusBadge status={meetup.status} />
                  <span className="text-sm font-bold text-text-muted">{meetup.distance}</span>
                </div>
                
                <h3 className="text-xl font-bold text-text-main mb-4 leading-tight">
                  {meetup.title}
                </h3>
                
                <div className="flex items-center justify-between pt-4 border-t border-border-main border-dashed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center text-xs font-bold">
                      {meetup.hostName[0]}
                    </div>
                    <span className="text-sm font-bold text-text-main">{meetup.hostName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary font-bold">
                    <Leaf size={16} />
                    <span className="text-sm">{meetup.seedsRequired}개</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-bg-main rounded-full flex items-center justify-center mb-6">
              <Leaf size={40} className="text-text-muted opacity-30" />
            </div>
            <p className="text-lg font-bold text-text-muted mb-2">아직 찜한 모임이 없어요</p>
            <p className="text-sm text-text-muted">다시 둘러보며 마음에 드는 모임을 찾아보세요.</p>
            <Button onClick={onBack} className="mt-8 w-auto px-8">
              다시 둘러보기
            </Button>
          </div>
        )}
      </main>

      <div className="fixed bottom-8 left-0 right-0 px-6">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-[32px] border-2 border-border-main shadow-2xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-muted ml-2">궁금한 점이 있다면?</span>
            <span className="text-sm font-bold text-text-main ml-2">고객센터에 물어보기</span>
          </div>
          <button className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-text-main shadow-soft">
            <MessageCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
