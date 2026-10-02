import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Home, Book, Shield, Library, CheckCircle } from 'lucide-react';
import ScenePostalSystem from './scenes/ScenePostalSystem';
import SceneIpAddresses from './scenes/SceneIpAddresses';
import SceneDnsPhonebook from './scenes/SceneDnsPhonebook';
import SceneRoutersTrafficCop from './scenes/SceneRoutersTrafficCop';
import SceneServersLibrary from './scenes/SceneServersLibrary';
import { playClickSound, stopSpeaking } from '../utils/audio';

export default function StoryboardView({ soundEnabled, voiceEnabled }) {
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    {
      id: 0,
      title: 'The Postal System',
      subtitle: 'Networks & Packets',
      icon: Mail,
      color: '#ff7675',
      component: ScenePostalSystem
    },
    {
      id: 1,
      title: 'Home Addresses',
      subtitle: 'Device IP Addresses',
      icon: Home,
      color: '#4facfe',
      component: SceneIpAddresses
    },
    {
      id: 2,
      title: 'The Phonebook',
      subtitle: 'DNS Domain Lookup',
      icon: Book,
      color: '#9d4edd',
      component: SceneDnsPhonebook
    },
    {
      id: 3,
      title: 'The Traffic Cop',
      subtitle: 'Smart Routers',
      icon: Shield,
      color: '#10b981',
      component: SceneRoutersTrafficCop
    },
    {
      id: 4,
      title: 'The Grand Library',
      subtitle: 'Web Servers',
      icon: Library,
      color: '#ff4757',
      component: SceneServersLibrary
    }
  ];

  const handleSceneChange = (index) => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setCurrentScene(index);
  };

  const handlePrev = () => {
    if (currentScene > 0) handleSceneChange(currentScene - 1);
  };

  const handleNext = () => {
    if (currentScene < scenes.length - 1) handleSceneChange(currentScene + 1);
  };

  const CurrentComponent = scenes[currentScene].component;

  return (
    <div className="app-container" style={{ margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Visual Analogy Roadmap Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        {scenes.map((scene, idx) => {
          const Icon = scene.icon;
          const isActive = currentScene === idx;
          const isDone = currentScene > idx;

          return (
            <button
              key={scene.id}
              onClick={() => handleSceneChange(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                borderRadius: '16px',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(30, 41, 67, 0.95), rgba(22, 30, 49, 0.95))' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: isActive 
                  ? `2px solid ${scene.color}` 
                  : '1px solid rgba(255, 255, 255, 0.07)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                boxShadow: isActive ? `0 0 20px ${scene.color}35` : 'none',
                textAlign: 'left',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: isActive ? `${scene.color}25` : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? scene.color : 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={18} />
              </div>

              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.7rem', color: isActive ? scene.color : 'var(--text-dim)', fontWeight: '700' }}>
                  Scene {idx + 1}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {scene.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Scene Container */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentComponent
              soundEnabled={soundEnabled}
              voiceEnabled={voiceEnabled}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pagination Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(10, 15, 29, 0.5)'
        }}>
          <button
            onClick={handlePrev}
            disabled={currentScene === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              background: currentScene === 0 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.08)',
              color: currentScene === 0 ? 'var(--text-dim)' : '#fff',
              fontSize: '0.88rem',
              fontWeight: '600',
              cursor: currentScene === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft size={16} /> Previous Scene
          </button>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            Scene {currentScene + 1} of {scenes.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentScene === scenes.length - 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              background: currentScene === scenes.length - 1 
                ? 'rgba(255, 255, 255, 0.03)' 
                : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
              color: currentScene === scenes.length - 1 ? 'var(--text-dim)' : '#0a0f1d',
              fontSize: '0.88rem',
              fontWeight: '700',
              cursor: currentScene === scenes.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Next Scene <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
