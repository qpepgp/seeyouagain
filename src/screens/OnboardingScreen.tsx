
import React from 'react';
import { Button, Chip } from '../components/UI';
import { AgeGroup, UserProfile } from '../types';
import { Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

const NICKNAME_ADJECTIVES = ['행복한', '따뜻한', '정겨운', '지혜로운', '푸른', '빛나는'];
const NICKNAME_NOUNS = ['나비', '햇살', '이웃', '샘', '숲', '바람'];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [ageGroup, setAgeGroup] = React.useState<AgeGroup>('60대');
  const [nickname, setNickname] = React.useState('');

  React.useEffect(() => {
    generateNickname();
  }, []);

  const generateNickname = () => {
    const adj = NICKNAME_ADJECTIVES[Math.floor(Math.random() * NICKNAME_ADJECTIVES.length)];
    const noun = NICKNAME_NOUNS[Math.floor(Math.random() * NICKNAME_NOUNS.length)];
    setNickname(`${adj} ${noun}`);
  };

  const handleComplete = () => {
    onComplete({
      nickname,
      ageGroup,
      seeds: 50,
      isNeighborhoodVerified: false
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-main p-6">
      <div className="flex-1 flex flex-col justify-center gap-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-text-main leading-tight">
            반가워요!<br />어떻게 불러드릴까요?
          </h1>
          <p className="text-lg text-text-muted">
            다시봄에서는 예쁜 닉네임을 사용해요.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-text-muted">내 닉네임</label>
            <div className="flex items-center gap-4 p-5 bg-white rounded-[24px] border-2 border-border-main shadow-soft">
              <span className="text-2xl font-bold text-text-main flex-1">{nickname}</span>
              <button 
                onClick={generateNickname}
                className="p-2 bg-primary/20 rounded-full text-text-main hover:bg-primary/30 transition-colors"
              >
                <Sparkles size={24} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-text-muted">연령대 선택</label>
            <div className="flex gap-3">
              {(['50대', '60대', '70대'] as AgeGroup[]).map(group => (
                <Chip 
                  key={group} 
                  label={group} 
                  active={ageGroup === group} 
                  onClick={() => setAgeGroup(group)} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 p-5 rounded-[24px] border-2 border-secondary/50">
          <p className="text-text-main text-lg leading-relaxed">
            가입 선물로 <span className="font-bold text-success">씨앗 50개</span>를 드려요! 씨앗은 모임에 참여할 때 사용돼요.
          </p>
        </div>

        <Button onClick={handleComplete}>
          다시봄 시작하기
        </Button>
      </div>
    </div>
  );
};
