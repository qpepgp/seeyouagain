
import React from 'react';
import { Button } from '../components/UI';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingScreenProps {
  onLogin: () => void;
  onBrowse: () => void;
}

const DasiBomSymbol = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="32" r="12" fill="#FFD3B6" />
    <path d="M40 44C40 44 32 52 32 60C32 68 40 68 40 68C40 68 48 68 48 60C48 52 40 44 40 44Z" fill="#A8E6CF" />
    <path d="M40 44L40 68" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="32" r="12" stroke="#2D3436" strokeWidth="2" />
  </svg>
);

const PoemLine = ({ first, rest, delay }: { first: string; rest: string; delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className="flex items-start gap-4"
  >
    <span className="text-3xl font-bold text-flower font-serif">{first}</span>
    <span className="text-xl font-medium text-text-main leading-relaxed pt-1">{rest}</span>
  </motion.div>
);

export const LandingScreen: React.FC<LandingScreenProps> = ({ onLogin, onBrowse }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main paper-texture splash-gradient p-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-16">
        {/* Symbol Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <DasiBomSymbol />
        </motion.div>

        {/* Poem Section */}
        <div className="w-full max-w-xs space-y-8">
          <PoemLine 
            first="다" 
            rest="다시 나갈 이유가 생겼다" 
            delay={0.5} 
          />
          <PoemLine 
            first="시" 
            rest="시간도 있고, 동네도 같고, 취미도 같은 사람이" 
            delay={1.5} 
          />
          <PoemLine 
            first="봄" 
            rest="봄처럼 내 곁에 나타났다" 
            delay={2.5} 
          />
        </div>
      </div>

      {/* Action Buttons Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="space-y-4 pb-8"
      >
        <div className="text-center mb-4">
          <p className="text-sm font-bold text-text-muted">가장 빠르고 간편한 시작</p>
        </div>
        <Button 
          onClick={onLogin}
          className="bg-[#FEE500] text-[#3C1E1E] border-none shadow-soft hover:bg-[#FADA0A] h-16 text-xl rounded-[20px]"
        >
          <MessageCircle size={24} className="mr-3 fill-current" />
          카카오로 3초 만에 시작하기
        </Button>
        <button 
          onClick={onBrowse}
          className="w-full py-4 text-text-muted font-bold text-lg hover:text-text-main transition-colors"
        >
          게스트로 둘러보기
        </button>
      </motion.div>
    </div>
  );
};
