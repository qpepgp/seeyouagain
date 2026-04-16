
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Meetup, UserProfile } from '../types';
import { MOCK_MEETUPS } from '../data/mockData';
import { Heart, X, MapPin, Clock, Users, Leaf, ArrowLeft } from 'lucide-react';
import { StatusBadge } from '../components/UI';

interface SwipeScreenProps {
  user?: UserProfile;
  onFinish: (interestedIds: string[]) => void;
  onBack: () => void;
}

export const SwipeScreen: React.FC<SwipeScreenProps> = ({ user, onFinish, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interestedIds, setInterestedIds] = useState<string[]>([]);
  
  const meetups = MOCK_MEETUPS;
  const currentMeetup = meetups[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setInterestedIds(prev => [...prev, currentMeetup.id]);
    }
    
    if (currentIndex < meetups.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished all cards
      const finalInterested = direction === 'right' 
        ? [...interestedIds, currentMeetup.id] 
        : interestedIds;
      onFinish(finalInterested);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F2] paper-texture overflow-hidden">
      <header className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-text-main" />
        </button>
        <h1 className="text-xl font-bold text-text-main font-serif">모임 골라보기</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-sm aspect-[3/4] relative">
          <AnimatePresence mode="popLayout">
            {currentMeetup ? (
              <SwipeCard 
                key={currentMeetup.id} 
                meetup={currentMeetup} 
                onSwipe={handleSwipe} 
              />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/50 rounded-[40px] border-2 border-dashed border-border-main"
              >
                <Leaf size={48} className="text-primary mb-4 opacity-30" />
                <p className="text-lg font-bold text-text-muted">모든 모임을 확인했어요!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex items-center gap-8">
          <button 
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-border-main text-text-muted hover:scale-110 active:scale-95 transition-transform"
          >
            <X size={32} />
          </button>
          <button 
            onClick={() => handleSwipe('right')}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl text-white hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart size={40} fill="currentColor" />
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-text-muted">
            왼쪽은 <span className="text-text-main">관심없음</span>, 오른쪽은 <span className="text-primary">관심있음</span>
          </p>
          <p className="text-xs text-text-muted mt-2 opacity-60">
            {currentIndex + 1} / {meetups.length}
          </p>
        </div>
      </div>
    </div>
  );
};

const SwipeCard: React.FC<{ meetup: Meetup; onSwipe: (dir: 'left' | 'right') => void }> = ({ meetup, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const heartOpacity = useTransform(x, [50, 150], [0, 1]);
  const xOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 bg-white rounded-[40px] shadow-2xl border-2 border-border-main overflow-hidden cursor-grab active:cursor-grabbing"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
    >
      {/* Visual Feedback Overlays */}
      <motion.div 
        style={{ opacity: heartOpacity }}
        className="absolute inset-0 bg-primary/10 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="bg-white p-6 rounded-full shadow-xl">
          <Heart size={64} className="text-primary" fill="currentColor" />
        </div>
      </motion.div>
      <motion.div 
        style={{ opacity: xOpacity }}
        className="absolute inset-0 bg-text-muted/10 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="bg-white p-6 rounded-full shadow-xl">
          <X size={64} className="text-text-muted" />
        </div>
      </motion.div>

      <div className="h-full flex flex-col">
        {/* Card Content */}
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <StatusBadge status={meetup.status} />
            <span className="text-sm font-bold text-text-muted">{meetup.distance}</span>
          </div>

          <h3 className="text-2xl font-bold text-text-main mb-6 leading-tight font-serif">
            {meetup.title}
          </h3>

          <p className="text-text-muted leading-relaxed mb-8 line-clamp-4">
            {meetup.description}
          </p>

          <div className="space-y-4 mt-auto">
            <div className="flex items-center gap-3 text-text-main">
              <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center">
                <Clock size={20} className="text-primary" />
              </div>
              <span className="font-bold">{meetup.time}</span>
            </div>
            <div className="flex items-center gap-3 text-text-main">
              <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center">
                <MapPin size={20} className="text-primary" />
              </div>
              <span className="font-bold">{meetup.place}</span>
            </div>
            <div className="flex items-center gap-3 text-text-main">
              <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center">
                <Users size={20} className="text-primary" />
              </div>
              <span className="font-bold">{meetup.participants} / {meetup.maxParticipants}명</span>
            </div>
          </div>
        </div>

        {/* Host Info Footer */}
        <div className="bg-bg-main p-6 flex items-center justify-between border-t border-border-main border-dashed">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/40 rounded-full flex items-center justify-center font-bold text-text-main">
              {meetup.hostName[0]}
            </div>
            <div>
              <p className="font-bold text-text-main text-sm">{meetup.hostName}</p>
              <p className="text-xs text-text-muted font-bold">{meetup.hostAgeGroup}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-border-main shadow-sm">
            <Leaf size={16} className="text-primary" />
            <span className="text-sm font-bold text-text-main">{meetup.seedsRequired}개</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
