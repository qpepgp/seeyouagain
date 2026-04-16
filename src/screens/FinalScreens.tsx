
import React from 'react';
import { Button, Chip, StatusBadge } from '../components/UI';
import { ChevronLeft, MapPin, Share2, MessageCircle, Navigation, Leaf, Sprout, Flower2, Clock } from 'lucide-react';

// --- CreateMeetupScreen ---
interface CreateMeetupScreenProps {
  onBack: () => void;
  onCreate: () => void;
}

export const CreateMeetupScreen: React.FC<CreateMeetupScreenProps> = ({ onBack, onCreate }) => {
  const [activity, setActivity] = React.useState('산책');
  const [place, setPlace] = React.useState('서울숲');
  const [time, setTime] = React.useState('오후 3시');
  const [count, setCount] = React.useState('2명');

  const activityOptions = ['산책', '차 한잔', '식사', '장보기'];
  const placeOptions = ['서울숲', '왕십리역', '성수동 카페거리', '뚝섬한강공원'];
  const timeOptions = ['지금 바로', '오후 3시', '오후 5시', '저녁 6시'];

  return (
    <div className="flex flex-col min-h-screen bg-bg-main paper-texture">
      <header className="p-4 flex items-center gap-4 border-b border-border-main bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft size={32} />
        </button>
        <h1 className="text-xl font-bold font-serif">씨앗 심기 (모임 만들기)</h1>
      </header>

      <main className="flex-1 p-6 space-y-10">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-text-main leading-tight font-serif">
            어떤 씨앗을 심을까요?
          </h2>
          
          <div className="space-y-8 text-2xl font-bold text-text-main leading-[2] font-serif">
            <div>
              오늘 
              <span className="mx-2 px-4 py-1 bg-primary/20 text-text-main rounded-full border-2 border-primary/30">{activity}</span>
              같이 하실 분을 찾고 있어요.
            </div>
            <div>
              장소는 
              <span className="mx-2 px-4 py-1 bg-secondary/30 text-text-main rounded-full border-2 border-secondary/50">{place}</span>
              이고,
            </div>
            <div>
              시간은 
              <span className="mx-2 px-4 py-1 bg-success/20 text-success rounded-full border-2 border-success/30">{time}</span>
              에 만나요.
            </div>
            <div>
              함께하는 인원은 
              <span className="mx-2 px-4 py-1 bg-flower/20 text-flower rounded-full border-2 border-flower/30">{count}</span>
              정도면 좋아요.
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-lg font-bold text-text-muted">무엇을 할까요?</p>
            <div className="flex flex-wrap gap-2">
              {activityOptions.map(opt => (
                <Chip key={opt} label={opt} active={activity === opt} onClick={() => setActivity(opt)} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-bold text-text-muted">어디서 만날까요?</p>
            <div className="flex flex-wrap gap-2">
              {placeOptions.map(opt => (
                <Chip key={opt} label={opt} active={place === opt} onClick={() => setPlace(opt)} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-bold text-text-muted">언제 만날까요?</p>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map(opt => (
                <Chip key={opt} label={opt} active={time === opt} onClick={() => setTime(opt)} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] border-2 border-border-main border-dashed shadow-soft">
          <p className="text-text-muted text-lg leading-relaxed">
            모든 모임은 24시간 후에 자동으로 사라져요. 오늘 하루의 소중한 인연을 만들어보세요.
          </p>
        </div>

        <div className="pt-4 pb-12">
          <Button onClick={onCreate}>
            씨앗 심기 완료
          </Button>
        </div>
      </main>
    </div>
  );
};

// --- ConfirmedScreen ---
interface ConfirmedScreenProps {
  onBack: () => void;
}

export const ConfirmedScreen: React.FC<ConfirmedScreenProps> = ({ onBack }) => (
  <div className="flex flex-col min-h-screen bg-bg-main paper-texture">
    <header className="p-4 flex items-center gap-4 border-b border-border-main bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <button onClick={onBack} className="p-2 -ml-2">
        <ChevronLeft size={32} />
      </button>
      <h1 className="text-xl font-bold font-serif">나의 새싹 모임</h1>
    </header>

    <main className="flex-1 p-6 space-y-8">
      <div className="text-center space-y-6 py-10">
        <div className="w-24 h-24 bg-success/20 rounded-[32px] flex items-center justify-center text-success mx-auto shadow-soft rotate-3">
          <Sprout size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-text-main font-serif">새싹이 피어났어요!</h2>
          <p className="text-lg text-text-muted">오늘 함께 만나기로 약속했어요.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[40px] space-y-8 border-2 border-border-main shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full -mr-12 -mt-12"></div>
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary shadow-soft">
            <MapPin size={28} />
          </div>
          <div>
            <p className="text-text-muted font-bold text-sm">만나는 곳</p>
            <p className="text-2xl font-bold text-text-main">서울숲 2번 출입구 앞</p>
          </div>
        </div>
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-soft">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-text-muted font-bold text-sm">만나는 시간</p>
            <p className="text-2xl font-bold text-text-main">오늘 오후 3:00</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border-main">
          <Navigation size={20} className="text-primary" />
          <p className="text-lg font-bold text-text-main">길 찾기 안내</p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border-main">
          <Share2 size={20} className="text-success" />
          <p className="text-lg font-bold text-text-main">가족에게 일정 공유하기</p>
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <Button variant="primary">
          <Navigation size={24} className="mr-2" />
          가는 법 보기
        </Button>
        <Button variant="ghost">
          약속 취소하기
        </Button>
      </div>
    </main>
  </div>
);
