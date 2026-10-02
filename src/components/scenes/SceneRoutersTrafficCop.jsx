import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle2, RotateCcw, Compass, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { playClickSound, playWhooshSound, playSuccessChime, speakText } from '../../utils/audio';

export default function SceneRoutersTrafficCop({ soundEnabled, voiceEnabled }) {
  // Routes state
  const [routeABlocked, setRouteABlocked] = useState(false);
  const [isPacketsFlowing, setIsPacketsFlowing] = useState(true);
  const [mode, setMode] = useState('both'); // 'traffic_cop', 'router', 'both'

  useEffect(() => {
    if (voiceEnabled) {
      speakText("At a busy crossroad, a traffic cop watches for traffic jams and waves cars down the quickest streets. An Internet Router does the exact same job! It inspects data packets and sends them down the fastest, clearest network cables.");
    }
  }, [voiceEnabled]);

  const toggleRouteBlock = () => {
    if (soundEnabled) playClickSound();
    const nextState = !routeABlocked;
    setRouteABlocked(nextState);
    if (nextState && voiceEnabled) {
      speakText("Route A is blocked! Watch the Router instantly redirect packets to the backup path!");
    } else if (!nextState && voiceEnabled) {
      speakText("Route A cleared! The Router resumes using the high-speed fiber link.");
    }
  };

  const handleReset = () => {
    if (soundEnabled) playClickSound();
    setRouteABlocked(false);
    setIsPacketsFlowing(true);
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
              background: 'rgba(16, 185, 129, 0.2)',
              color: 'var(--accent-emerald)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              Scene 4 of 5
            </span>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Routers: The Internet Traffic Cops</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Key Concept: Routers guide data packets along the fastest, safest paths and re-route around network jams!
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
            onClick={toggleRouteBlock}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '12px',
              background: routeABlocked 
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#fff',
              fontSize: '0.88rem',
              fontWeight: '700',
              boxShadow: routeABlocked ? 'var(--glow-emerald)' : '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}
          >
            <AlertTriangle size={16} />
            {routeABlocked ? 'Clear Traffic Jam on Route A' : 'Simulate Traffic Jam on Route A'}
          </button>
        </div>
      </div>

      {/* Side-by-Side Analogy Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {/* Real World Card */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>👮‍♂️</span>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Traffic Cop at an Intersection</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            When Main Street is closed due to road work or an accident, the traffic cop stands in the middle and waves drivers down Oak Street so nobody gets stuck.
          </p>
        </div>

        {/* Digital Router Card */}
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔀</span>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Network Router on the Internet</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            When an undersea cable is cut or a city experiences peak network congestion, the router reads the destination IP and redirects data along a clear backup cable!
          </p>
        </div>
      </div>

      {/* Live Interactive Routing Visualizer */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 29, 0.98) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2rem 1.5rem',
        minHeight: '380px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Network Diagram View */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          maxWidth: '880px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Incoming Source */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            width: '130px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(79, 172, 254, 0.15)',
              border: '2px solid var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem'
            }}>
              💻
            </div>
            <strong style={{ fontSize: '0.82rem', marginTop: '6px' }}>Student Laptop</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Sending Packets</span>
          </div>

          {/* Center: The Router / Traffic Cop Hub */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            width: '180px',
            textAlign: 'center'
          }}>
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 15px rgba(16, 185, 129, 0.4)',
                  '0 0 35px rgba(16, 185, 129, 0.8)',
                  '0 0 15px rgba(16, 185, 129, 0.4)'
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.35) 100%)',
                border: '2px solid var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '2.4rem' }}>👮‍♂️</span>
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                background: 'var(--accent-emerald)',
                color: '#0a0f1d',
                fontSize: '0.65rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                ROUTER
              </div>
            </motion.div>
            <strong style={{ fontSize: '0.85rem', marginTop: '12px', color: 'var(--accent-emerald)' }}>
              Traffic Cop Router
            </strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Active Routing Decisions
            </span>
          </div>

          {/* Paths Diagram SVG */}
          <svg style={{
            position: 'absolute',
            top: 0,
            left: '100px',
            right: '100px',
            width: 'calc(100% - 200px)',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            {/* Left line to router */}
            <line x1="20" y1="50%" x2="42%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeDasharray="6 4" />
            {/* Route A (Top) */}
            <path
              d="M 280 190 Q 360 80, 560 140"
              fill="none"
              stroke={routeABlocked ? 'rgba(255, 71, 87, 0.5)' : 'rgba(0, 242, 254, 0.7)'}
              strokeWidth="4"
              strokeDasharray={routeABlocked ? '8 6' : 'none'}
            />
            {/* Route B (Bottom) */}
            <path
              d="M 280 190 Q 360 300, 560 240"
              fill="none"
              stroke={routeABlocked ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.15)'}
              strokeWidth="4"
            />
          </svg>

          {/* Right: Destination Website Server */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            width: '130px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(157, 78, 221, 0.15)',
              border: '2px solid var(--accent-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem'
            }}>
              🌐
            </div>
            <strong style={{ fontSize: '0.82rem', marginTop: '6px' }}>Destination</strong>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>CoolGames Server</span>
          </div>
        </div>

        {/* Dynamic Route Comparison Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Route A Info */}
          <div style={{
            padding: '0.65rem 1rem',
            borderRadius: '12px',
            background: routeABlocked ? 'rgba(255, 71, 87, 0.15)' : 'rgba(0, 242, 254, 0.1)',
            border: routeABlocked ? '1px solid rgba(255, 71, 87, 0.4)' : '1px solid rgba(0, 242, 254, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <span style={{ fontSize: '1rem' }}>{routeABlocked ? '🚫' : '⚡'}</span>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: routeABlocked ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>
                Route A (Fiber Cable): {routeABlocked ? 'BLOCKED / CONGESTED' : 'OPEN (Fastest: 12ms)'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {routeABlocked ? 'Traffic cop says: Detour!' : 'Primary optimal path'}
              </div>
            </div>
          </div>

          {/* Route B Info */}
          <div style={{
            padding: '0.65rem 1rem',
            borderRadius: '12px',
            background: routeABlocked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            border: routeABlocked ? '1px solid var(--accent-emerald)' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <span style={{ fontSize: '1rem' }}>🛰️</span>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: routeABlocked ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                Route B (Satellite Link): {routeABlocked ? 'ACTIVE (Re-routed: 38ms)' : 'STANDBY (Backup)'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {routeABlocked ? 'Packets reaching destination without loss!' : 'Available if Route A gets congested'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
