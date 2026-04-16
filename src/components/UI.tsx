
import React from 'react';
import { Leaf, Sprout, Flower2, MapPin } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'lg', 
  fullWidth = true,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-[32px] transition-all active:scale-95 touch-manipulation shadow-soft';
  
  const variants = {
    primary: 'bg-primary text-text-main hover:opacity-90',
    secondary: 'bg-secondary text-text-main hover:opacity-90',
    outline: 'border-2 border-primary text-text-main bg-white hover:bg-primary/10',
    ghost: 'bg-transparent text-text-muted hover:bg-bg-main'
  };
  
  const sizes = {
    md: 'px-5 py-3 text-lg',
    lg: 'px-7 py-5 text-[20px]',
    xl: 'px-9 py-6 text-2xl'
  };
  
  const width = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Chip: React.FC<{ label: string; active?: boolean; onClick?: () => void; variant?: 'default' | 'status' }> = ({ label, active, onClick, variant = 'default' }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-lg font-bold transition-all ${
        active 
          ? 'bg-primary text-text-main shadow-soft border-2 border-primary' 
          : 'bg-white text-text-muted border-2 border-border-main hover:border-primary/50'
      }`}
    >
      {label}
    </button>
  );
};

export const StatusBadge: React.FC<{ status: 'seed' | 'sprout' | 'flower'; label?: string }> = ({ status, label }) => {
  const configs = {
    seed: { icon: <Leaf size={20} />, color: 'bg-primary/20 text-text-main', text: '씨앗 (모집 중)' },
    sprout: { icon: <Sprout size={20} />, color: 'bg-success/20 text-success', text: '새싹 (확정됨)' },
    flower: { icon: <Flower2 size={20} />, color: 'bg-flower/20 text-flower', text: '꽃 (완료됨)' }
  };
  
  const config = configs[status];
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${config.color}`}>
      {config.icon}
      <span>{label || config.text}</span>
    </div>
  );
};

export const SeedCount: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft border border-border-main">
    <Leaf size={18} className="text-primary" />
    <span className="font-bold text-text-main">{count}개</span>
  </div>
);
