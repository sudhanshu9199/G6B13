import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, HardDrive, Play, CheckCircle2, RotateCcw, Send, Film, Gamepad2, FileText, ArrowRight } from 'lucide-react';
import { playClickSound, playWhooshSound, playSuccessChime, speakText } from '../../utils/audio';

export default function SceneServersLibrary({ soundEnabled, voiceEnabled }) {
  const libraryCatalog = [
    {
      id: 'video',
      title: 'YouTube Gaming Video',
      icon: Film,
      type: 'Video Stream',
      analogyItem: 'Borrowing a DVD / Video Tape from the Library',
      url: 'https://youtube.com/watch?v=coolgames',
      color: '#ff4757',
      contentPreview: '🎮 Playing "Pixel Racer 3D" (1080p 60FPS)!'
    },
    {
      id: 'game',
      title: 'CoolGames Game Level',
      icon: Gamepad2,
      type: 'Game Asset File',
      analogyItem: 'Borrowing a Board Game from the Library Shelf',
      url: 'https://coolgames.com/level1.json',
      color: '#00f2fe',
      contentPreview: '🕹️ Level 1 Loaded: "Cyber Neon City" Ready!'
    },
    {
      id: 'article',
      title: 'Science Encyclopedia Article',
      icon: FileText,
      type: 'Web Document',
      analogyItem: 'Checking out a Reference Book from the Stacks',
      url: 'https://wikipedia.org/wiki/Solar_System',
      color: '#10b981',
      contentPreview: '🪐 "The Solar System": 8 Planets, Asteroid Belt!'
    }
  ];

  const [selectedItem, setSelectedItem] = useState(libraryCatalog[0]);
  const [requestState, setRequestState] = useState('idle'); // 'idle', 'requesting', 'searching', 'streaming', 'playing'

  useEffect(() => {
    if (voiceEnabled) {
      speakText("A server is like a gigantic digital library! When you want to watch a YouTube video, your computer asks the server for the file. The server finds the video on its hard drives and streams it back to your screen.");
    }
  }, [voiceEnabled]);

  const handleSendRequest = () => {
    if (soundEnabled) playClickSound();
    setRequestState('requesting');

    setTimeout(() => {
      if (soundEnabled) playWhooshSound();
      setRequestState('searching');
    }, 900);

    setTimeout(() => {
      if (soundEnabled) playWhooshSound();
      setRequestState('streaming');
    }, 2000);

    setTimeout(() => {
      if (soundEnabled) playSuccessChime();
      setRequestState('playing');
      if (voiceEnabled) {
        speakText(`Server successfully retrieved ${selectedItem.title} and delivered it to your screen!`);
      }
    }, 3200);
  };

  const handleReset = () => {
    if (soundEnabled) playClickSound();
    setRequestState('idle');
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Scene Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: 'rgba(255, 71, 87, 0.2)',
              color: 'var(--accent-rose)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              Scene 5 of 5
            </span>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Servers: The Giant Digital Libraries</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Key Concept: A server is a powerful computer running 24/7 that stores websites, videos, and games, waiting to serve them to visitors!
          </p>
        </div>

        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 0.9rem',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.06)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          <RotateCcw size={15} /> Reset
        </button>
      </div>

      {/* Side-by-Side Analogy Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {/* Library Analogy */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🏛️</span>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>The Town Public Library</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            You walk up to the librarian desk, ask for "Harry Potter Book 3", the librarian locates it on row 4 shelf B, and hands the book to you to read.
          </p>
        </div>

        {/* Server Datacenter */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🖥️</span>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>The Web Server Datacenter</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            Your browser sends a request for <code>coolgames.com/video.mp4</code>. The server finds the video on its fast SSD drives and streams it to your screen!
          </p>
        </div>
      </div>

      {/* Interactive Library Request Stage */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 29, 0.98) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2rem 1.5rem',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {/* Step 1: Choose File to Request */}
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Choose what you want to borrow/request from the Server:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {libraryCatalog.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setSelectedItem(item);
                    setRequestState('idle');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? `2px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#fff' : 'var(--text-muted)',
                    boxShadow: isSelected ? `0 0 15px ${item.color}40` : 'none'
                  }}
                >
                  <Icon size={18} color={item.color} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Network Request Animation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '1.5rem 1rem',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {/* User Screen / Client */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '180px',
            textAlign: 'center',
            zIndex: 2
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(79, 172, 254, 0.15)',
              border: '2px solid var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              💻
            </div>
            <strong style={{ fontSize: '0.85rem', marginTop: '6px' }}>Client Computer</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              "The Library Visitor"
            </span>
          </div>

          {/* Data Highway In-Between */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {requestState === 'idle' && (
              <button
                onClick={handleSendRequest}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                  color: '#0a0f1d',
                  fontSize: '0.88rem',
                  fontWeight: '800',
                  boxShadow: 'var(--glow-cyan)'
                }}
              >
                <Send size={16} /> Request File from Server
              </button>
            )}

            {requestState === 'requesting' && (
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 60, opacity: 1 }}
                style={{
                  background: 'var(--accent-cyan)',
                  color: '#0a0f1d',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '800'
                }}
              >
                GET Request ➔
              </motion.div>
            )}

            {requestState === 'searching' && (
              <div style={{
                color: 'var(--accent-amber)',
                fontSize: '0.82rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <HardDrive size={16} /> Server searching storage drives...
              </div>
            )}

            {requestState === 'streaming' && (
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: -60, opacity: 1 }}
                style={{
                  background: 'var(--accent-emerald)',
                  color: '#0a0f1d',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '800'
                }}
              >
                ⬅ Streaming File Packets!
              </motion.div>
            )}

            {requestState === 'playing' && (
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                ✅ Stream Complete & Playing!
              </span>
            )}

            {/* Cable Line */}
            <div style={{
              width: '80%',
              height: '3px',
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-rose))',
              marginTop: '10px'
            }} />
          </div>

          {/* Server Rack / Library Storage */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '180px',
            textAlign: 'center',
            zIndex: 2
          }}>
            <motion.div
              animate={{
                boxShadow: requestState === 'searching' || requestState === 'streaming'
                  ? '0 0 30px rgba(255, 71, 87, 0.8)'
                  : '0 0 10px rgba(255, 71, 87, 0.2)'
              }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(255, 71, 87, 0.2)',
                border: '2px solid var(--accent-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}
            >
              🖥️
            </motion.div>
            <strong style={{ fontSize: '0.85rem', marginTop: '6px', color: 'var(--accent-rose)' }}>
              Web Server Rack
            </strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              "The Digital Librarian"
            </span>
          </div>
        </div>

        {/* Video / File Player Output Display */}
        {requestState === 'playing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '16px',
              border: `2px solid ${selectedItem.color}`,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: `0 0 25px ${selectedItem.color}30`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{
                  background: selectedItem.color,
                  color: '#0a0f1d',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}>
                  NOW PLAYING ON CLIENT
                </span>
                <strong style={{ fontSize: '0.95rem' }}>{selectedItem.title}</strong>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                ● 60 FPS • 0% Packet Loss
              </span>
            </div>

            {/* Mock Player Screen */}
            <div style={{
              height: '110px',
              borderRadius: '12px',
              background: 'radial-gradient(circle at center, rgba(30, 41, 67, 0.9), rgba(15, 23, 42, 1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: '700',
              gap: '0.75rem'
            }}>
              <Play size={28} color={selectedItem.color} fill={selectedItem.color} />
              <span>{selectedItem.contentPreview}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
