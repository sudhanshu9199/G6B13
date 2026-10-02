import React, { useState } from 'react';
import Header from './components/Header';
import StoryboardView from './components/StoryboardView';
import FullJourney from './components/FullJourney';
import LearningChartQuiz from './components/LearningChartQuiz';
import { Sparkles, Globe, Route, Award, ArrowRight } from 'lucide-react';
import { playClickSound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('storyboard'); // 'storyboard', 'journey', 'quiz'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
      />

      {/* Hero Welcome Bar */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(0, 242, 254, 0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '2.5rem 1.5rem 1.5rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0, 242, 254, 0.1)',
            color: 'var(--accent-cyan)',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: '700',
            marginBottom: '0.85rem',
            border: '1px solid rgba(0, 242, 254, 0.25)'
          }}>
            <Sparkles size={14} />
            <span>Interactive 6th Grade Computer Science Learning Lab</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            lineHeight: 1.15,
            marginBottom: '0.75rem'
          }}>
            How Does the <span className="gradient-text">Internet</span> Really Work?
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '680px',
            margin: '0 auto 1.5rem auto'
          }}>
            Learn abstract networking concepts through fun real-world analogies: 
            <strong> Postal Mail</strong>, <strong>Home Addresses</strong>, <strong>Phonebooks</strong>, 
            <strong> Traffic Cops</strong>, and <strong>Libraries</strong>.
          </p>

          {/* Quick Jump Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('storyboard');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                background: activeTab === 'storyboard' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.06)',
                color: activeTab === 'storyboard' ? '#0a0f1d' : '#fff',
                fontSize: '0.88rem',
                fontWeight: '700',
                border: activeTab === 'storyboard' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Globe size={16} /> Explore the 5 Analogies
            </button>

            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('journey');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                background: activeTab === 'journey' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.06)',
                color: activeTab === 'journey' ? '#0a0f1d' : '#fff',
                fontSize: '0.88rem',
                fontWeight: '700',
                border: activeTab === 'journey' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Route size={16} /> The Full 5-Step Journey
            </button>

            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('quiz');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                background: activeTab === 'quiz' ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.06)',
                color: activeTab === 'quiz' ? '#0a0f1d' : '#fff',
                fontSize: '0.88rem',
                fontWeight: '700',
                border: activeTab === 'quiz' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Award size={16} /> Take the Learning Chart Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View Switcher */}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {activeTab === 'storyboard' && (
          <StoryboardView
            soundEnabled={soundEnabled}
            voiceEnabled={voiceEnabled}
          />
        )}

        {activeTab === 'journey' && (
          <FullJourney
            soundEnabled={soundEnabled}
            voiceEnabled={voiceEnabled}
          />
        )}

        {activeTab === 'quiz' && (
          <LearningChartQuiz
            soundEnabled={soundEnabled}
            voiceEnabled={voiceEnabled}
          />
        )}
      </main>

      {/* Educational Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(10, 15, 29, 0.95)',
        padding: '2rem 1.5rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1rem', color: '#fff' }}>
              How the Internet Works • Grade 6 Animated Curriculum
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', margin: '4px 0 0 0' }}>
              Designed with interactive visual analogies: Postal System, IP Addresses, DNS Phonebook, Router Traffic Cop, and Server Library.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>⚡ Zero lag client-side simulation</span>
            <span>🎧 Web Audio + Speech Narration</span>
            <span>🎓 100% Curriculum Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
