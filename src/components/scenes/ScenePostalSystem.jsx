import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Sparkles, ArrowRight, RotateCcw, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { playClickSound, playMorphSound, playWhooshSound, speakText } from '../../utils/audio';

export default function ScenePostalSystem({ soundEnabled, voiceEnabled }) {
  // Stages: 
  // 1: Write letter & envelope
  // 2: Place in mailbox
  // 3: Morph physical into digital data packet
  // 4: Packet travels across the digital highway
  const [stage, setStage] = useState(1);
  const [packetType, setPacketType] = useState('email'); // 'email', 'website', 'video'

  const narrationMap = {
    1: "Think of sending a letter. You write your message, put it in an envelope, write a delivery address, and stick on a stamp!",
    2: "When you drop your envelope into the mailbox, the postal service begins the journey to deliver it to the right destination.",
    3: "Magic happens on the Internet! The physical letter morphs into a digital data packet with digital headers and binary data.",
    4: "Just like postal trucks drive letters across highways, network cables and radio signals beam your data packets across the world!"
  };

  useEffect(() => {
    if (voiceEnabled) {
      speakText(narrationMap[stage]);
    }
  }, [stage, voiceEnabled]);

  const handleNext = () => {
    if (soundEnabled) {
      if (stage === 2) playMorphSound();
      else playClickSound();
    }
    setStage((prev) => (prev < 4 ? prev + 1 : 1));
  };

  const handleReset = () => {
    if (soundEnabled) playClickSound();
    setStage(1);
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
              background: 'rgba(255, 118, 117, 0.2)',
              color: 'var(--accent-orange)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              Scene 1 of 5
            </span>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>The Postal System Analogy</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Core Concept: The Internet works just like a high-speed, worldwide postal network!
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
          <button
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '12px',
              background: stage === 2 
                ? 'linear-gradient(135deg, #00f2fe 0%, #9d4edd 100%)' 
                : 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: '700',
              boxShadow: stage === 2 ? '0 0 20px rgba(0, 242, 254, 0.4)' : '0 4px 15px rgba(255, 118, 117, 0.3)'
            }}
          >
            {stage === 1 && <span>Drop Letter in Mailbox &rarr;</span>}
            {stage === 2 && <span>✨ Morph Letter into Digital Packet! &rarr;</span>}
            {stage === 3 && <span>Stream Packet Across Internet &rarr;</span>}
            {stage === 4 && <span>Replay Scene ↺</span>}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div style={{
        minHeight: '380px',
        background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.7) 0%, rgba(10, 15, 29, 0.95) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        {/* Stage Progress Pills */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          display: 'flex',
          gap: '0.5rem',
          background: 'rgba(0, 0, 0, 0.4)',
          padding: '4px 12px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {['1. Physical Letter', '2. Postal Box', '3. Morphing Transition', '4. Digital Packet Highway'].map((title, i) => (
            <span
              key={i}
              onClick={() => {
                if (soundEnabled) playClickSound();
                setStage(i + 1);
              }}
              style={{
                fontSize: '0.72rem',
                fontWeight: stage === i + 1 ? '700' : '500',
                color: stage === i + 1 ? 'var(--accent-cyan)' : 'var(--text-dim)',
                cursor: 'pointer',
                padding: '2px 8px',
                borderRadius: '999px',
                background: stage === i + 1 ? 'rgba(0, 242, 254, 0.15)' : 'transparent'
              }}
            >
              {title}
            </span>
          ))}
        </div>

        {/* Animation Content Area */}
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            {stage === 1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}
              >
                {/* Physical Envelope Illustration */}
                <div style={{
                  width: '320px',
                  height: '200px',
                  background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                  borderRadius: '16px',
                  border: '2px solid #fed7aa',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
                  position: 'relative',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#431407'
                }}>
                  {/* Postal Stamp */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '45px',
                    height: '55px',
                    border: '2px dashed #ea580c',
                    borderRadius: '4px',
                    background: '#ffedd5',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6rem',
                    fontWeight: '800',
                    color: '#c2410c'
                  }}>
                    <span>POST</span>
                    <span style={{ fontSize: '1.1rem' }}>✉️</span>
                    <span>1st Class</span>
                  </div>

                  {/* Return Address */}
                  <div style={{ fontSize: '0.75rem', lineHeight: '1.3', opacity: 0.8 }}>
                    <strong>FROM:</strong><br />
                    Maya (6th Grade)<br />
                    104 Maple Street, Apt 3B
                  </div>

                  {/* Recipient Address */}
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    paddingLeft: '2rem',
                    color: '#1e293b'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>DELIVER TO:</span><br />
                    Grandma Rosa<br />
                    742 Evergreen Terrace<br />
                    Springfield, USA
                  </div>

                  {/* Envelope Flap line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50px',
                    borderBottom: '1px solid rgba(194, 65, 12, 0.2)',
                    pointerEvents: 'none'
                  }} />
                </div>

                <div style={{ textAlign: 'center', maxWidth: '420px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffedd5' }}>Step 1: The Physical Letter</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Just like a real letter needs a clear <strong>destination address</strong>, any message on the computer must know where it is traveling!
                  </p>
                </div>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="stage2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {/* Physical Envelope Moving into Mailbox */}
                <motion.div
                  animate={{
                    x: [0, 40, 70],
                    y: [0, -20, 30],
                    scale: [1, 0.85, 0.4],
                    opacity: [1, 0.9, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut"
                  }}
                  style={{
                    width: '180px',
                    height: '110px',
                    background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
                    borderRadius: '10px',
                    border: '2px solid #fdba74',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    padding: '0.75rem',
                    color: '#7c2d12',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  ✉️ Letter to Grandma
                  <div style={{ fontSize: '0.65rem', color: '#9a3412', marginTop: '6px' }}>
                    742 Evergreen Terr.
                  </div>
                </motion.div>

                {/* Mailbox Graphic */}
                <div style={{
                  width: '150px',
                  height: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  {/* Mailbox Body */}
                  <div style={{
                    width: '120px',
                    height: '140px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    borderRadius: '60px 60px 8px 8px',
                    border: '3px solid #60a5fa',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem 0.5rem',
                    position: 'relative'
                  }}>
                    {/* Mail Slot */}
                    <div style={{
                      width: '75px',
                      height: '12px',
                      background: '#0f172a',
                      borderRadius: '6px',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.8)',
                      marginBottom: '1rem'
                    }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#fff' }}>U.S. MAIL</span>
                    <span style={{ fontSize: '1.4rem', marginTop: '4px' }}>📮</span>
                  </div>
                  {/* Post */}
                  <div style={{
                    width: '24px',
                    height: '70px',
                    background: '#475569',
                    borderRadius: '2px'
                  }} />
                </div>

                <div style={{ maxWidth: '320px' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#93c5fd' }}>Step 2: Dropped in Mailbox</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Once deposited, the letter enters a sorted collection point. Next, watch how the physical postal concept translates into <strong>digital internet data</strong>!
                  </p>
                </div>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div
                key="stage3"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  width: '100%'
                }}
              >
                {/* Morphing Visual: Left is Physical Letter, Middle is Morph Sparkle, Right is Cyber Data Packet */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  width: '100%'
                }}>
                  {/* Fading Paper Letter */}
                  <motion.div
                    animate={{
                      opacity: [1, 0.4, 1],
                      rotate: [-2, 2, -2]
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    style={{
                      width: '200px',
                      background: 'rgba(254, 215, 170, 0.15)',
                      border: '1px dashed #fed7aa',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>✉️</div>
                    <strong style={{ fontSize: '0.85rem', color: '#fed7aa' }}>Physical Envelope</strong>
                    <div style={{ fontSize: '0.72rem', color: '#fdba74', marginTop: '4px' }}>
                      To: Grandma Rosa<br />
                      742 Evergreen Terr.
                    </div>
                  </motion.div>

                  {/* Morph Core with Binary Energy */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(0, 242, 254, 0.4) 0%, rgba(157, 78, 221, 0.2) 70%, transparent 100%)',
                      border: '2px solid var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--glow-cyan)'
                    }}
                  >
                    <Sparkles size={32} color="var(--accent-cyan)" />
                  </motion.div>

                  {/* Emergent Glowing Digital Data Packet */}
                  <motion.div
                    animate={{
                      scale: [0.98, 1.03, 0.98],
                      boxShadow: [
                        '0 0 20px rgba(0, 242, 254, 0.3)',
                        '0 0 40px rgba(0, 242, 254, 0.7)',
                        '0 0 20px rgba(0, 242, 254, 0.3)'
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      width: '260px',
                      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(99, 102, 241, 0.25) 100%)',
                      border: '2px solid var(--accent-cyan)',
                      borderRadius: '16px',
                      padding: '1rem',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{
                        background: 'var(--accent-cyan)',
                        color: '#0a0f1d',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}>
                        IP PACKET #084
                      </span>
                      <Zap size={16} color="var(--accent-cyan)" />
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{ color: '#38bdf8' }}>
                        <span style={{ color: '#94a3b8' }}>SRC:</span> 192.168.1.15
                      </div>
                      <div style={{ color: '#4ade80' }}>
                        <span style={{ color: '#94a3b8' }}>DST:</span> 142.250.190.46
                      </div>
                      <div style={{ color: '#f43f5e' }}>
                        <span style={{ color: '#94a3b8' }}>TYPE:</span> {packetType.toUpperCase()} DATA
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Packet Type Picker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '6px 14px',
                  borderRadius: '12px'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Packet payload type:</span>
                  {['email', 'website', 'video'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        if (soundEnabled) playClickSound();
                        setPacketType(type);
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'capitalize',
                        background: packetType === type ? 'var(--accent-cyan)' : 'transparent',
                        color: packetType === type ? '#0a0f1d' : 'var(--text-muted)'
                      }}
                    >
                      {type === 'email' ? '✉️ Email' : type === 'website' ? '🌐 Web Page' : '🎬 YouTube Video'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === 4 && (
              <motion.div
                key="stage4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  width: '100%'
                }}
              >
                {/* Digital Highway Animation */}
                <div style={{
                  width: '100%',
                  height: '180px',
                  background: 'radial-gradient(circle at center, rgba(30, 41, 67, 0.8), rgba(15, 23, 42, 0.95))',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 2rem'
                }}>
                  {/* Sender Computer */}
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ fontSize: '2.4rem' }}>💻</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                      Sender Computer
                    </span>
                  </div>

                  {/* Fiber Optic Cables SVG */}
                  <svg style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                  }}>
                    <path
                      d="M 120 90 Q 250 30, 400 90 T 680 90"
                      fill="none"
                      stroke="rgba(0, 242, 254, 0.2)"
                      strokeWidth="6"
                    />
                    <path
                      d="M 120 90 Q 250 150, 400 90 T 680 90"
                      fill="none"
                      stroke="rgba(157, 78, 221, 0.2)"
                      strokeWidth="6"
                    />
                  </svg>

                  {/* Flying Packets */}
                  <motion.div
                    animate={{
                      x: [0, 520],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut"
                    }}
                    style={{
                      position: 'absolute',
                      left: '120px',
                      top: '68px',
                      background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
                      color: '#0a0f1d',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontWeight: '800',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: 'var(--glow-cyan)',
                      zIndex: 3
                    }}
                  >
                    <span>⚡ [DATA PACKET]</span>
                  </motion.div>

                  {/* Destination Server/Device */}
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ fontSize: '2.4rem' }}>🖥️</div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                      Grandma's Screen
                    </span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '0.85rem 1.25rem',
                  maxWidth: '650px',
                  textAlign: 'center'
                }}>
                  <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                    🎉 The Analogy in a Nutshell:
                  </strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    The postal system breaks big trucks of mail into envelopes. Similarly, the Internet breaks your emails, pictures, and videos into small digital chunks called <strong>Packets</strong>!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Comparison Grid: Real World vs Internet */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #ff7675' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📮</span>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>The Physical Postal System</h4>
          </div>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>You write letters on paper and seal them in envelopes.</li>
            <li>You write a street address and postal zip code.</li>
            <li>Post offices and delivery vans physically carry the letters.</li>
            <li>Delivery takes hours or days.</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>⚡</span>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>The Internet Network</h4>
          </div>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Digital messages, images, and videos are split into <strong>Data Packets</strong>.</li>
            <li>Every packet gets tagged with an <strong>IP Address</strong>.</li>
            <li>Light inside fiber cables and radio waves carry the packets.</li>
            <li>Delivery takes only milliseconds (fractions of a second)!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
