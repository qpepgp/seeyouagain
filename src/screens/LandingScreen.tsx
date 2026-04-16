
import React from 'react';
import { Button } from '../components/UI';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { DasiBomSymbol } from '../components/DasiBomSymbol';

interface LandingScreenProps {
  onLogin: () => void;
  onBrowse: () => void;
}

const PoemLine = ({ first, rest, delay }: { first: string; rest: string; delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 1, ease: "easeOut" }}
    className="flex items-start gap-4"
  >
    <span className="text-4xl font-bold text-[#FF8B94] font-serif drop-shadow-sm">{first}</span>
    <span className="text-xl font-medium text-text-main leading-relaxed pt-2 font-serif">{rest}</span>
  </motion.div>
);

export const LandingScreen: React.FC<LandingScreenProps> = ({ onLogin, onBrowse }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F2] paper-texture splash-gradient p-8 overflow-hidden">
      {/* 1. Symbol Section */}
      <div className="mt-12 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "backOut" }}
        >
          <DasiBomSymbol size="lg" />
        </motion.div>
      </div>

      {/* 2. Poem Section */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="w-full max-w-xs space-y-10">
          <PoemLine 
            first="다" 
            rest="다시 나갈 이유가 생겼다" 
            delay={0.8} 
          />
          <PoemLine 
            first="시" 
            rest="시간도 있고, 동네도 같고, 취미도 같은 사람이" 
            delay={2.0} 
          />
          <PoemLine 
            first="봄" 
            rest="봄처럼 내 곁에 나타났다" 
            delay={3.2} 
          />
        </div>
      </div>

      {/* 3. Action Buttons Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="w-full max-w-md mx-auto space-y-5 mb-10"
      >
        <div className="text-center">
          <p className="text-sm font-bold text-text-muted opacity-80">가장 빠르고 간편한 시작</p>
        </div>
        
        <Button 
          onClick={onLogin}
          className="bg-[#FEE500] text-[#3C1E1E] border-none shadow-soft hover:bg-[#FADA0A] h-16 text-xl rounded-[24px] font-bold"
        >
          <MessageCircle size={26} className="mr-3 fill-current" />
          카카오로 3초 만에 시작하기
        </Button>

        <button 
          onClick={onBrowse}
          className="w-full py-2 text-text-muted font-bold text-lg hover:text-text-main transition-colors underline underline-offset-8 decoration-border-main"
        >
          게스트로 둘러보기
        </button>
      </motion.div>
    </div>
  );
};
