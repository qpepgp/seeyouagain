
import React from 'react';
import { Button, Chip } from '../components/UI';
import { MapPin, ChevronLeft, ShieldCheck, Heart } from 'lucide-react';

// --- PreJoinScreen ---
interface PreJoinScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const PreJoinScreen: React.FC<PreJoinScreenProps> = ({ onContinue, onBack }) => (
  <div className="flex flex-col min-h-screen bg-bg-main p-6 paper-texture">
    <div className="flex-1 flex flex-col justify-center gap-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-text-main leading-tight font-serif">
          따뜻한 만남을 위해<br />동네를 확인해 주세요
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          가까운 이웃끼리 안심하고 만날 수 있도록,<br />한 번만 동네 인증을 진행할게요.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-5 bg-white rounded-[24px] border-2 border-border-main shadow-soft">
          <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center text-success">
            <ShieldCheck size={28} />
          </div>
          <p className="text-lg font-bold text-text-main">정확한 위치는 보이지 않아요</p>
        </div>
        <div className="flex items-center gap-4 p-5 bg-white rounded-[24px] border-2 border-border-main shadow-soft">
          <div className="w-12 h-12 bg-flower/20 rounded-2xl flex items-center justify-center text-flower">
            <Heart size={28} />
          </div>
          <p className="text-lg font-bold text-text-main">인증된 이웃만 만날 수 있어요</p>
        </div>
      </div>

      <div className="space-y-3 pt-8">
        <Button onClick={onContinue}>
          내 동네 확인하고 참여하기
        </Button>
        <Button variant="ghost" onClick={onBack}>
          나중에 하고 둘러보기 계속
        </Button>
      </div>
    </div>
  </div>
);

// --- NeighborhoodVerificationScreen ---
interface NeighborhoodVerificationScreenProps {
  onVerify: () => void;
  onBack: () => void;
}

export const NeighborhoodVerificationScreen: React.FC<NeighborhoodVerificationScreenProps> = ({ onVerify, onBack }) => (
  <div className="flex flex-col min-h-screen bg-bg-main paper-texture">
    <header className="p-4 flex items-center gap-4 border-b border-border-main bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <button onClick={onBack} className="p-2 -ml-2">
        <ChevronLeft size={32} />
      </button>
      <h1 className="text-xl font-bold font-serif">동네 인증</h1>
    </header>

    <main className="flex-1 p-6 flex flex-col gap-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-text-main leading-tight font-serif">
          지금 계신 곳이<br />성수동이 맞나요?
        </h2>
        <p className="text-lg text-text-muted leading-relaxed">
          현재 위치를 기준으로 동네를 확인해요.<br />집 주소는 절대 공개되지 않으니 안심하세요.
        </p>
      </div>

      <div className="flex-1 bg-white rounded-[40px] border-2 border-border-main relative overflow-hidden flex items-center justify-center shadow-soft">
        <div className="absolute inset-0 bg-primary/5 paper-texture"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-text-main shadow-soft animate-bounce">
            <MapPin size={40} />
          </div>
          <div className="bg-white px-6 py-3 rounded-full border-2 border-border-main shadow-soft">
            <p className="font-bold text-xl">서울 성동구 성수동</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Chip label="현재 위치 기반 확인" active />
        <Chip label="3km 이내 이웃 연결" active />
      </div>

      <Button onClick={onVerify}>
        이 동네로 인증하기
      </Button>
    </main>
  </div>
);
