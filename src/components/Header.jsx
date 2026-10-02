import React from 'react';
import { Globe, Volume2, VolumeX, Sparkles, BookOpen, Route, CheckSquare, Mic, MicOff } from 'lucide-react';
import { playClickSound, stopSpeaking } from '../utils/audio';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  soundEnabled, 
  setSoundEnabled,
  voiceEnabled,
  setVoiceEnabled
}) {
  const tabs = [
    { id: 'storyboard', label: '1. Analogies & Storyboard', icon: BookOpen, badge: '5 Scenes' },
    { id: 'journey', label: '2. The Full Journey', icon: Route, badge: 'Interactive' },
    { id: 'quiz', label: '3. Learning Chart Quiz', icon: CheckSquare, badge: 'Earn Badge' }
  ];

  const handleTabClick = (tabId) => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setActiveTab(tabId);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 15, 29, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.85rem 1.5rem',
      transition: 'all 0.3s ease'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #9d4edd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
            color: '#0a0f1d'
          }}>
            <Globe size={26} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: '#fff',
                fontFamily: 'var(--font-heading)'
              }}>
                Net<span style={{ color: 'var(--accent-cyan)' }}>Quest</span>
              </span>
              <span style={{
                background: 'rgba(0, 242, 254, 0.15)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Grade 6 Science
              </span>
            </div>
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              margin: 0
            }}>
              How the Internet Works • Visual Analogies & Simulation
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          gap: '4px'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '12px',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(157, 78, 221, 0.25))' 
                    : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  border: isActive ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 15px rgba(0, 242, 254, 0.2)' : 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--accent-cyan)' : 'currentColor'} />
                <span>{tab.label}</span>
                <span style={{
                  fontSize: '0.68rem',
                  padding: '1px 6px',
                  borderRadius: '6px',
                  background: isActive ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#fff' : 'var(--text-dim)'
                }}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Audio & Narration Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={toggleVoice}
            title={voiceEnabled ? 'Narration Voice Enabled (Click to Mute)' : 'Enable Kid-Friendly Voice Narration'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.85rem',
              borderRadius: '10px',
              background: voiceEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              color: voiceEnabled ? 'var(--accent-emerald)' : 'var(--text-dim)',
              border: voiceEnabled ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}
          >
            {voiceEnabled ? <Mic size={15} /> : <MicOff size={15} />}
            <span>Voice {voiceEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: soundEnabled ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              color: soundEnabled ? 'var(--accent-cyan)' : 'var(--text-dim)',
              border: soundEnabled ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
