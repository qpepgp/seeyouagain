import React from 'react';
import { AppState, Screen, UserProfile } from './types';
import { MOCK_MEETUPS } from './data/mockData';
import { LandingScreen } from './screens/LandingScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { BrowseScreen } from './screens/BrowseScreen';
import { DetailScreen } from './screens/DetailScreen';
import { 
  PreJoinScreen, 
  NeighborhoodVerificationScreen
} from './screens/VerificationScreens';
import { JoinConfirmationScreen, JoinSentScreen } from './screens/JoinScreens';
import { CreateMeetupScreen, ConfirmedScreen } from './screens/FinalScreens';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [state, setState] = React.useState<AppState>({
    currentScreen: 'LANDING',
    joinRequestSent: false,
  });

  const navigate = (screen: Screen, extra: Partial<AppState> = {}) => {
    setState(prev => ({ ...prev, currentScreen: screen, ...extra }));
  };

  const selectedMeetup = MOCK_MEETUPS.find(m => m.id === state.selectedMeetupId);

  const handleLogin = () => {
    navigate('ONBOARDING');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    navigate('BROWSE', { user: profile });
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'LANDING':
        return (
          <LandingScreen 
            onLogin={handleLogin}
            onBrowse={() => navigate('BROWSE')} 
          />
        );
      case 'ONBOARDING':
        return (
          <OnboardingScreen 
            onComplete={handleOnboardingComplete}
          />
        );
      case 'BROWSE':
        return (
          <BrowseScreen 
            user={state.user}
            onSelectMeetup={(id) => navigate('DETAIL', { selectedMeetupId: id })}
            onVerify={() => navigate('VERIFY_NEIGHBORHOOD')}
            onCreate={() => {
              if (state.user?.isNeighborhoodVerified) {
                navigate('CREATE');
              } else {
                navigate('PRE_JOIN');
              }
            }}
          />
        );
      case 'DETAIL':
        return selectedMeetup ? (
          <DetailScreen 
            meetup={selectedMeetup}
            user={state.user}
            onBack={() => navigate('BROWSE')}
            onJoin={() => {
              if (state.user?.isNeighborhoodVerified) {
                navigate('JOIN_CONFIRM');
              } else {
                navigate('PRE_JOIN');
              }
            }}
          />
        ) : null;
      case 'PRE_JOIN':
        return (
          <PreJoinScreen 
            onContinue={() => navigate('VERIFY_NEIGHBORHOOD')}
            onBack={() => navigate('BROWSE')}
          />
        );
      case 'VERIFY_NEIGHBORHOOD':
        return (
          <NeighborhoodVerificationScreen 
            onVerify={() => {
              if (state.user) {
                const updatedUser = { ...state.user, isNeighborhoodVerified: true };
                navigate('BROWSE', { user: updatedUser });
              } else {
                navigate('LANDING');
              }
            }}
            onBack={() => navigate('BROWSE')}
          />
        );
      case 'JOIN_CONFIRM':
        return selectedMeetup ? (
          <JoinConfirmationScreen 
            meetup={selectedMeetup}
            user={state.user}
            onConfirm={() => {
              if (state.user) {
                const updatedUser = { ...state.user, seeds: state.user.seeds - 10 };
                navigate('JOIN_SENT', { user: updatedUser, joinRequestSent: true });
              }
            }}
            onBack={() => navigate('DETAIL')}
          />
        ) : null;
      case 'JOIN_SENT':
        return (
          <JoinSentScreen 
            onBrowse={() => navigate('BROWSE')}
            onViewMyRequests={() => navigate('CONFIRMED')}
          />
        );
      case 'CREATE':
        return (
          <CreateMeetupScreen 
            onBack={() => navigate('BROWSE')}
            onCreate={() => navigate('BROWSE')}
          />
        );
      case 'CONFIRMED':
        return (
          <ConfirmedScreen 
            onBack={() => navigate('BROWSE')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bg-main shadow-2xl relative overflow-hidden font-sans paper-texture">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
