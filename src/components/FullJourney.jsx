import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Search, Book, Shield, Library, Monitor, Zap, CheckCircle2, 
  Sparkles, Gamepad2, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playWhooshSound, playSuccessChime, speakText } from '../utils/audio';

export default function FullJourney({ soundEnabled, voiceEnabled }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 2x
  const [miniScore, setMiniScore] = useState(0);

  const steps = [
    {
      step: 1,
      title: 'User Types Website Name',
      analogy: 'Writing a letter with a recipient name',
      node: 'Client Browser',
      icon: Search,
      color: '#00f2fe',
      desc: 'The student types "www.coolgames.com" into their browser URL bar and hits Enter.',
      packetInspector: {
        stage: 'Request Creation',
        srcIp: '192.168.1.15 (Your Laptop)',
        dstIp: 'UNKNOWN (Need DNS Lookup)',
        header: 'GET /index.html HTTP/2',
        payload: 'Domain Query: www.coolgames.com',
        location: 'Browser Memory'
      }
    },
    {
      step: 2,
      title: 'DNS Translates the Name',
      analogy: 'Looking up a friend in the Phonebook',
      node: 'DNS Directory',
      icon: Book,
      color: '#9d4edd',
      desc: 'The query reaches the DNS Server. DNS checks its directory and maps "www.coolgames.com" to IP address 123.123.123.123.',
      packetInspector: {
        stage: 'DNS Name Resolution',
        srcIp: '8.8.8.8 (DNS Server)',
        dstIp: '192.168.1.15 (Your Laptop)',
        header: 'DNS RESPONSE 200 OK',
        payload: 'www.coolgames.com = 123.123.123.123',
        location: 'DNS Resolver Cache'
      }
    },
    {
      step: 3,
      title: 'Router Guides the Data',
      analogy: 'The Traffic Cop directing fast lanes',
      node: 'Traffic Cop Router',
      icon: Shield,
      color: '#10b981',
      desc: 'With the destination IP known, the Router calculates the quickest, least congested fiber-optic path across the world.',
      packetInspector: {
        stage: 'Routing & Packet Forwarding',
        srcIp: '192.168.1.15 (Client)',
        dstIp: '123.123.123.123 (CoolGames Server)',
        header: 'TCP HANDSHAKE / SYN-ACK',
        payload: 'Fiber Optic Hop 4: Backbone Gateway',
        location: 'High-Speed Fiber Route A (14ms latency)'
      }
    },
    {
      step: 4,
      title: 'Server Provides Website',
      analogy: 'The Library fetching your requested book',
      node: 'CoolGames Datacenter',
      icon: Library,
      color: '#ff4757',
      desc: 'The CoolGames server receives the request, gathers HTML, CSS, JavaScript, and game sprites, and transmits them back in data packets.',
      packetInspector: {
        stage: 'Server Response Transmission',
        srcIp: '123.123.123.123 (Server)',
        dstIp: '192.168.1.15 (Client)',
        header: 'HTTP/2 200 OK (Content-Type: text/html)',
        payload: '<!DOCTYPE html><html>...CoolGames Assets...</html>',
        location: 'Server Outbound Queue'
      }
    },
    {
      step: 5,
      title: 'Website Renders on Screen!',
      analogy: 'Reading the book & playing the game!',
      node: 'Client Screen',
      icon: Monitor,
      color: '#f59e0b',
      desc: 'The browser reassembles all data packets in order, parses code, renders graphics, and displays the game live on screen!',
      packetInspector: {
        stage: 'DOM Painting & Execution',
        srcIp: '123.123.123.123',
        dstIp: '192.168.1.15',
        header: 'COMPLETE (0 dropped packets)',
        payload: 'Interactive Game Canvas Activated',
        location: 'GPU / Screen Buffer'
      }
    }
  ];

  const narrationMap = {
    1: "Step 1: You type www.coolgames.com in your web browser.",
    2: "Step 2: The request visits the DNS phonebook server, which translates the domain name into IP address 123.123.123.123.",
    3: "Step 3: The network router acts like a traffic cop, steering your request along the quickest fiber optic highway.",
    4: "Step 4: The CoolGames server acts like a giant library, packaging the website code and streaming it back.",
    5: "Step 5: Your browser receives the packets, reassembles them, and renders the website live on your screen!"
  };

  // Step change trigger
  const goToStep = (stepNum) => {
    if (soundEnabled) {
      if (stepNum === 5) playSuccessChime();
      else playWhooshSound();
    }
    setCurrentStep(stepNum);

    if (stepNum === 5) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }

    if (voiceEnabled) {
      speakText(narrationMap[stepNum]);
    }
  };

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const delay = (4000 / playbackSpeed);
      timer = setTimeout(() => {
        if (currentStep < 5) {
          goToStep(currentStep + 1);
        } else {
          setIsPlaying(false);
        }
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, playbackSpeed]);

  const togglePlay = () => {
    if (soundEnabled) playClickSound();
    if (!isPlaying && currentStep === 5) {
      goToStep(1);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if (soundEnabled) playClickSound();
    setIsPlaying(false);
    goToStep(1);
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="app-container" style={{ margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header & Controls Bar */}
      <div className="glass-panel" style={{
        padding: '1.25rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: 'rgba(0, 242, 254, 0.15)',
              color: 'var(--accent-cyan)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '800'
            }}>
              The Full Journey Synthesis
            </span>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>How a Website Loads from Start to Finish</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Trace a single click to www.coolgames.com through all 5 networking checkpoints!
          </p>
        </div>

        {/* Playback Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1);
            }}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: '700'
            }}
          >
            Speed: {playbackSpeed}x
          </button>

          <button
            onClick={handleReset}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Restart Tour"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={togglePlay}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.25rem',
              borderRadius: '12px',
              background: isPlaying 
                ? 'rgba(255, 71, 87, 0.2)' 
                : 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
              color: isPlaying ? 'var(--accent-rose)' : '#0a0f1d',
              border: isPlaying ? '1px solid var(--accent-rose)' : 'none',
              fontSize: '0.88rem',
              fontWeight: '800',
              boxShadow: isPlaying ? 'none' : 'var(--glow-cyan)'
            }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause Tour' : 'Auto Play Journey'}</span>
          </button>
        </div>
      </div>

      {/* Step Stepper Navigation Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem'
      }}>
        {steps.map((st) => {
          const Icon = st.icon;
          const isActive = currentStep === st.step;
          const isDone = currentStep > st.step;

          return (
            <button
              key={st.step}
              onClick={() => goToStep(st.step)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1rem',
                borderRadius: '14px',
                background: isActive 
                  ? 'rgba(30, 41, 67, 0.95)' 
                  : isDone 
                  ? 'rgba(16, 185, 129, 0.08)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: isActive 
                  ? `2px solid ${st.color}` 
                  : isDone 
                  ? '1px solid rgba(16, 185, 129, 0.3)' 
                  : '1px solid rgba(255, 255, 255, 0.06)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                boxShadow: isActive ? `0 0 20px ${st.color}40` : 'none',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: isActive ? `${st.color}25` : isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? st.color : isDone ? 'var(--accent-emerald)' : 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.8rem',
                flexShrink: 0
              }}>
                {isDone ? '✓' : st.step}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.68rem', color: isActive ? st.color : 'var(--text-dim)', fontWeight: '700' }}>
                  Step {st.step}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {st.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Map & Visualizer */}
      <div className="glass-panel" style={{
        padding: '2rem 1.5rem',
        minHeight: '440px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '2rem'
      }}>
        {/* Animated Network Pipeline Nodes */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '0 1rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Station 1: Client Laptop */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            textAlign: 'center',
            width: '130px'
          }}>
            <motion.div
              animate={{
                scale: currentStep === 1 ? [1, 1.1, 1] : 1,
                boxShadow: currentStep === 1 ? 'var(--glow-cyan)' : 'none'
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: currentStep === 1 ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: currentStep === 1 ? '2px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem'
              }}
            >
              💻
            </motion.div>
            <strong style={{ fontSize: '0.82rem', marginTop: '6px' }}>1. Browser</strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>IP: 192.168.1.15</span>
          </div>

          <div style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>➔</div>

          {/* Station 2: DNS Server */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            textAlign: 'center',
            width: '130px'
          }}>
            <motion.div
              animate={{
                scale: currentStep === 2 ? [1, 1.1, 1] : 1,
                boxShadow: currentStep === 2 ? 'var(--glow-purple)' : 'none'
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: currentStep === 2 ? 'rgba(157, 78, 221, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: currentStep === 2 ? '2px solid var(--accent-purple)' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem'
              }}
            >
              📖
            </motion.div>
            <strong style={{ fontSize: '0.82rem', marginTop: '6px' }}>2. DNS Server</strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>"Phonebook"</span>
          </div>

          <div style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>➔</div>

          {/* Station 3: Router */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            textAlign: 'center',
            width: '130px'
          }}>
            <motion.div
              animate={{
                scale: currentStep === 3 ? [1, 1.1, 1] : 1,
                boxShadow: currentStep === 3 ? 'var(--glow-emerald)' : 'none'
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: currentStep === 3 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: currentStep === 3 ? '2px solid var(--accent-emerald)' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem'
              }}
            >
              👮‍♂️
            </motion.div>
            <strong style={{ fontSize: '0.82rem', marginTop: '6px' }}>3. Router</strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>"Traffic Cop"</span>
          </div>

          <div style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>➔</div>

          {/* Station 4: Server */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            textAlign: 'center',
            width: '130px'
          }}>
            <motion.div
              animate={{
                scale: currentStep === 4 ? [1, 1.1, 1] : 1,
                boxShadow: currentStep === 4 ? '0 0 25px rgba(255, 71, 87, 0.5)' : 'none'
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: currentStep === 4 ? 'rgba(255, 71, 87, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: currentStep === 4 ? '2px solid var(--accent-rose)' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem'
              }}
            >
              🏛️
            </motion.div>
            <strong style={{ fontSize: '0.82rem', marginTop: '6px' }}>4. Server</strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>"The Library"</span>
          </div>

          <div style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>➔</div>

          {/* Station 5: Rendered Screen */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            textAlign: 'center',
            width: '130px'
          }}>
            <motion.div
              animate={{
                scale: currentStep === 5 ? [1, 1.15, 1] : 1,
                boxShadow: currentStep === 5 ? '0 0 30px rgba(245, 158, 11, 0.6)' : 'none'
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: currentStep === 5 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: currentStep === 5 ? '2px solid var(--accent-amber)' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem'
              }}
            >
              🎉
            </motion.div>
            <strong style={{ fontSize: '0.82rem', marginTop: '6px' }}>5. Webpage Live</strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Render Complete!</span>
          </div>
        </div>

        {/* Step Explanation Banner */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '16px',
            border: `1px solid ${currentStepData.color}40`,
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <span style={{
                background: currentStepData.color,
                color: '#0a0f1d',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                STEP {currentStep} OF 5
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{currentStepData.title}</strong>
              <span style={{ fontSize: '0.78rem', color: currentStepData.color }}>({currentStepData.analogy})</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
              {currentStepData.desc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => goToStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                color: currentStep === 1 ? 'var(--text-dim)' : '#fff',
                fontSize: '0.82rem',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={16} /> Prev Step
            </button>
            <button
              onClick={() => goToStep(Math.min(5, currentStep + 1))}
              disabled={currentStep === 5}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: currentStep === 5 ? 'rgba(255, 255, 255, 0.06)' : 'var(--accent-cyan)',
                color: currentStep === 5 ? 'var(--text-dim)' : '#0a0f1d',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: currentStep === 5 ? 'not-allowed' : 'pointer'
              }}
            >
              Next Step <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Live Packet Inspector HUD OR Step 5 Live Game */}
        {currentStep < 5 ? (
          <div style={{
            background: 'rgba(10, 15, 29, 0.95)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            borderRadius: '16px',
            padding: '1.25rem',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                  PACKET INSPECTOR HUD (LIVE NETWORK TRACE)
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                Location: {currentStepData.packetInspector.location}
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
              fontSize: '0.78rem'
            }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '8px 12px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)' }}>STAGE:</span>{' '}
                <span style={{ color: 'var(--accent-cyan)' }}>{currentStepData.packetInspector.stage}</span>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '8px 12px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)' }}>SOURCE IP:</span>{' '}
                <span style={{ color: '#4ade80' }}>{currentStepData.packetInspector.srcIp}</span>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '8px 12px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)' }}>DESTINATION IP:</span>{' '}
                <span style={{ color: '#f87171' }}>{currentStepData.packetInspector.dstIp}</span>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '8px 12px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-dim)' }}>DATA PAYLOAD:</span>{' '}
                <span style={{ color: '#fed7aa' }}>{currentStepData.packetInspector.payload}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Step 5 Culmination: CoolGames Website Renders Live on Screen with a Playable Interactive Mini-Game! */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 67, 0.95), rgba(15, 23, 42, 0.98))',
              border: '2px solid var(--accent-emerald)',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: 'var(--glow-emerald)'
            }}
          >
            {/* Simulated Browser Frame */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '10px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: '12px', fontFamily: 'var(--font-mono)' }}>
                  🔒 https://www.coolgames.com (Rendered from 123.123.123.123)
                </span>
              </div>
              <span style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: 'var(--accent-emerald)',
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                100% Loaded in 42ms
              </span>
            </div>

            {/* Playable Mini-Game inside the rendered website! */}
            <div style={{
              background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Gamepad2 size={24} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>
                  CoolGames: Space Data Collector!
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '480px', margin: 0 }}>
                The HTML & Game engine was transmitted through the DNS, Router, and Server! Tap the buttons to collect packets!
              </p>

              <div style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)'
              }}>
                Packets Collected: {miniScore}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setMiniScore(prev => prev + 1);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                    color: '#0a0f1d',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: 'var(--glow-cyan)'
                  }}
                >
                  🚀 Catch Data Packet! (+1)
                </button>
                <button
                  onClick={() => {
                    if (soundEnabled) playSuccessChime();
                    setMiniScore(0);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-muted)',
                    padding: '0.65rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  Reset Score
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
