
import React from 'react';
import { Button, Chip, StatusBadge } from '../components/UI';
import { Meetup, UserProfile } from '../types';
import { ChevronLeft, Send, CheckCircle2, Clock, Bell, Leaf, Sprout } from 'lucide-react';

// --- JoinConfirmationScreen ---
interface JoinConfirmationScreenProps {
  meetup: Meetup;
  user?: UserProfile;
  onConfirm: () => void;
  onBack: () => void;
}

export const JoinConfirmationScreen: React.FC<JoinConfirmationScreenProps> = ({ meetup, user, onConfirm, onBack }) => {
  const [message, setMessage] = React.useState('안녕하세요. 함께하고 싶어요');
  const presets = [
    '안녕하세요. 함께하고 싶어요',
    '시간 괜찮아요',
    '장소 확인했어요'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-main paper-texture">
      <header className="p-4 flex items-center gap-4 border-b border-border-main bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft size={32} />
        </button>
        <h1 className="text-xl font-bold font-serif">씨앗 심기</h1>
      </header>

      <main className="flex-1 p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-text-main leading-tight font-serif">씨앗을 심고<br />참여 신청을 보낼까요?</h2>
          <p className="text-lg text-text-muted">방장님께 전달할 인사를 선택해 주세요.</p>
          
          <div className="flex flex-col gap-3">
            {presets.map(p => (
              <button 
                key={p} 
                onClick={() => setMessage(p)}
                className={`text-left p-5 rounded-[24px] text-lg font-bold transition-all border-2 ${
                  message === p 
                    ? 'bg-white border-primary text-text-main shadow-soft' 
                    : 'bg-white/50 border-transparent text-text-muted'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-border-main border-dashed rounded-[32px] space-y-4 shadow-soft">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-text-muted">신청하는 모임</p>
            <StatusBadge status={meetup.status} label={meetup.status === 'seed' ? '씨앗' : '새싹'} />
          </div>
          <h3 className="text-xl font-bold text-text-main leading-tight">{meetup.title}</h3>
          <div className="flex items-center justify-between pt-4 border-t border-border-main">
            <div className="flex items-center gap-2 text-text-muted">
              <Clock size={18} />
              <span className="font-bold">{meetup.time}</span>
            </div>
            <div className="flex items-center gap-1 text-primary font-bold">
              <Leaf size={16} />
              <span>{meetup.seedsRequired}개 차감</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button onClick={onConfirm}>
            씨앗 심고 신청하기
          </Button>
          <Button variant="ghost" onClick={onBack}>
            나중에 할게요
          </Button>
        </div>
      </main>
    </div>
  );
};

// --- JoinSentScreen ---
interface JoinSentScreenProps {
  onBrowse: () => void;
  onViewMyRequests: () => void;
}

export const JoinSentScreen: React.FC<JoinSentScreenProps> = ({ onBrowse, onViewMyRequests }) => (
  <div className="flex flex-col min-h-screen bg-bg-main p-6 paper-texture">
    <div className="flex-1 flex flex-col justify-center items-center text-center gap-10">
      <div className="w-24 h-24 bg-primary rounded-[32px] flex items-center justify-center text-text-main shadow-soft rotate-6">
        <Send size={48} />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-text-main leading-tight font-serif">
          씨앗을 성공적으로<br />심었어요!
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          방장님이 확인하면 알려드릴게요.<br />모임이 확정되면 새싹으로 피어납니다.
        </p>
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center gap-4 p-5 bg-white rounded-[24px] border-2 border-border-main shadow-soft">
          <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center text-success">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-lg font-bold text-text-main">참여 신청 완료</p>
        </div>
        <div className="flex items-center gap-4 p-5 bg-white rounded-[24px] border-2 border-border-main shadow-soft">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
            <Sprout size={24} />
          </div>
          <p className="text-lg font-bold text-text-main">새싹 피어나기 대기 중</p>
        </div>
      </div>

      <div className="w-full space-y-3 pt-8">
        <Button onClick={onBrowse}>
          다른 씨앗 둘러보기
        </Button>
        <Button variant="ghost" onClick={onViewMyRequests}>
          내 신청 내역 보기
        </Button>
      </div>
    </div>
  </div>
);
