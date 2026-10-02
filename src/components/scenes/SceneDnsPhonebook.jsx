import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, Book, ArrowRight, CheckCircle2, RotateCcw, Sparkles, Server } from 'lucide-react';
import { playClickSound, playSuccessChime, playWhooshSound, speakText } from '../../utils/audio';

export default function SceneDnsPhonebook({ soundEnabled, voiceEnabled }) {
  const dnsDirectory = {
    'www.coolgames.com': '123.123.123.123',
    'www.youtube.com': '172.217.16.206',
    'www.nasa.gov': '23.45.18.99',
    'www.wikipedia.org': '208.80.154.224'
  };

  const contactsList = [
    { name: 'Best Friend Leo', number: '(555) 019-2834', icon: '👦' },
    { name: 'Grandma Rosa', number: '(555) 014-9912', icon: '👵' },
    { name: 'Pizza Palace', number: '(555) 018-7721', icon: '🍕' }
  ];

  const [inputUrl, setInputUrl] = useState('www.coolgames.com');
  const [activeStep, setActiveStep] = useState(0); // 0: Idle, 1: Browser Asking, 2: DNS Searching, 3: Found & Translating, 4: Connected
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (voiceEnabled) {
      speakText("Imagine trying to remember a 10-digit phone number for every friend! Instead, your phone has a Contacts List. In the same way, the Domain Name System is the internet's giant phonebook that translates human-friendly names like coolgames.com into computer IP numbers!");
    }
  }, [voiceEnabled]);

  const handleStartLookup = (urlToLookup) => {
    const targetUrl = urlToLookup || inputUrl;
    if (soundEnabled) playClickSound();
    setActiveStep(1);

    // Sequence the animation steps
    setTimeout(() => {
      if (soundEnabled) playWhooshSound();
      setActiveStep(2);
    }, 1000);

    setTimeout(() => {
      if (soundEnabled) playWhooshSound();
      setActiveStep(3);
    }, 2200);

    setTimeout(() => {
      if (soundEnabled) playSuccessChime();
      setActiveStep(4);
      if (voiceEnabled) {
        speakText(`DNS translated ${targetUrl} into IP address ${dnsDirectory[targetUrl] || '123.123.123.123'}!`);
      }
    }, 3400);
  };

  const handleSelectContact = (contact) => {
    if (soundEnabled) playClickSound();
    setSelectedContact(contact);
  };

  const handleReset = () => {
    if (soundEnabled) playClickSound();
    setActiveStep(0);
    setSelectedContact(null);
  };

  const currentIp = dnsDirectory[inputUrl] || '123.123.123.123';

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
              background: 'rgba(157, 78, 221, 0.2)',
              color: 'var(--accent-purple)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              Scene 3 of 5
            </span>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>DNS: The Internet Phonebook</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Key Concept: Humans remember names (like coolgames.com), but computers only speak in numbers (IP addresses)!
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

      {/* Side-by-Side Analogy Showcase */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Real-World Analogy: Phone Contacts */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Phone size={18} />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Everyday Life: Phone Contacts</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Tap a friend's name to dial their number</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contactsList.map((contact, i) => (
              <div
                key={i}
                onClick={() => handleSelectContact(contact)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  background: selectedContact?.name === contact.name ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedContact?.name === contact.name ? '1px solid var(--accent-amber)' : '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{contact.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{contact.name}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-amber)' }}>
                  {contact.number}
                </div>
              </div>
            ))}
          </div>

          {selectedContact && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '0.85rem',
                padding: '0.6rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.1)',
                fontSize: '0.78rem',
                color: '#fed7aa'
              }}
            >
              📞 <strong>Dialing:</strong> You clicked "{selectedContact.name}", so your phone dialed <code>{selectedContact.number}</code>!
            </motion.div>
          )}
        </div>

        {/* Digital Analogy: DNS Browser Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0, 242, 254, 0.15)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Book size={18} />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Internet: DNS (Domain Name System)</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Translates domain names to IP addresses</div>
            </div>
          </div>

          {/* Quick Pick Domain Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
            {Object.keys(dnsDirectory).map((site) => (
              <button
                key={site}
                onClick={() => {
                  setInputUrl(site);
                  handleStartLookup(site);
                }}
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: inputUrl === site ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: inputUrl === site ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  border: inputUrl === site ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {site}
              </button>
            ))}
          </div>

          {/* Simulated Browser Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            borderRadius: '12px',
            padding: '6px 10px',
            gap: '0.5rem',
            boxShadow: 'var(--glow-cyan)'
          }}>
            <Search size={16} color="var(--accent-cyan)" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="e.g. www.coolgames.com"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                width: '100%',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleStartLookup(inputUrl)}
              disabled={activeStep > 0 && activeStep < 4}
              style={{
                background: 'var(--accent-cyan)',
                color: '#0a0f1d',
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: '700'
              }}
            >
              Translate
            </button>
          </div>
        </div>
      </div>

      {/* Animated DNS Translation Process Visualizer */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.7) 0%, rgba(10, 15, 29, 0.95) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2rem',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          maxWidth: '820px',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* User's Browser */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: 'center',
            width: '180px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(79, 172, 254, 0.15)',
              border: activeStep >= 1 ? '2px solid var(--accent-blue)' : '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: activeStep >= 1 ? '0 0 20px rgba(79, 172, 254, 0.4)' : 'none'
            }}>
              💻
            </div>
            <strong style={{ fontSize: '0.88rem' }}>Your Web Browser</strong>
            <span style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '2px 6px',
              borderRadius: '4px',
              color: 'var(--accent-cyan)'
            }}>
              {inputUrl}
            </span>
          </div>

          {/* Middle Connection / Flight Data */}
          <div style={{
            flex: 1,
            minWidth: '180px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            {activeStep === 0 && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Click "Translate" above to watch DNS in action!
              </span>
            )}

            {activeStep === 1 && (
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 60, opacity: 1 }}
                style={{
                  background: 'var(--accent-blue)',
                  color: '#0a0f1d',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}
              >
                Query: "What is IP of {inputUrl}?" ➔
              </motion.div>
            )}

            {activeStep === 2 && (
              <div style={{ color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: '700' }}>
                📖 DNS Server flipping through records...
              </div>
            )}

            {activeStep >= 3 && (
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: -60, opacity: 1 }}
                style={{
                  background: 'var(--accent-emerald)',
                  color: '#0a0f1d',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}
              >
                ⬅ Found IP: {currentIp}
              </motion.div>
            )}

            {/* Connecting Line */}
            <div style={{
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
              marginTop: '10px'
            }} />
          </div>

          {/* DNS Server Rack */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: 'center',
            width: '180px'
          }}>
            <motion.div
              animate={{
                boxShadow: activeStep === 2 || activeStep === 3 
                  ? '0 0 30px rgba(157, 78, 221, 0.8)' 
                  : '0 0 10px rgba(157, 78, 221, 0.2)'
              }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(157, 78, 221, 0.2)',
                border: '2px solid var(--accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}
            >
              📖
            </motion.div>
            <strong style={{ fontSize: '0.88rem', color: 'var(--accent-purple)' }}>DNS Server</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              "The Giant Phonebook"
            </span>
          </div>
        </div>

        {/* Translation Banner Result */}
        {activeStep === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginTop: '1.5rem',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid var(--accent-emerald)',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontSize: '0.88rem'
            }}
          >
            <CheckCircle2 size={20} color="var(--accent-emerald)" />
            <span>
              <strong>Translation Complete:</strong> <code>{inputUrl}</code> ➔ <code>{currentIp}</code>. The computer now knows where to send the packets!
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
