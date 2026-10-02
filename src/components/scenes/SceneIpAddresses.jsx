import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Laptop, Watch, Tv, Tablet, Send, AlertCircle, CheckCircle2, RotateCcw, Home, Network } from 'lucide-react';
import { playClickSound, playSuccessChime, playErrorSound, playWhooshSound, speakText } from '../../utils/audio';

export default function SceneIpAddresses({ soundEnabled, voiceEnabled }) {
  const initialDevices = [
    { id: 'phone', name: 'Smartphone', icon: Smartphone, ip: '192.168.1.2', assigned: true, houseNumber: '102 Elm St' },
    { id: 'laptop', name: 'School Laptop', icon: Laptop, ip: '192.168.1.3', assigned: true, houseNumber: '104 Elm St' },
    { id: 'watch', name: 'Smartwatch', icon: Watch, ip: '192.168.1.4', assigned: true, houseNumber: '106 Elm St' },
    { id: 'tv', name: 'Smart TV', icon: Tv, ip: '192.168.1.5', assigned: true, houseNumber: '108 Elm St' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, ip: '192.168.1.6', assigned: false, houseNumber: '110 Elm St' }
  ];

  const [devices, setDevices] = useState(initialDevices);
  const [senderId, setSenderId] = useState('phone');
  const [recipientId, setRecipientId] = useState('tv');
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);
  const [missingIpMode, setMissingIpMode] = useState(false);

  useEffect(() => {
    if (voiceEnabled) {
      speakText("Every house on your street has a unique house number. Similarly, every phone, laptop, and smartwatch connected to the internet has a unique IP address so it can receive messages!");
    }
  }, [voiceEnabled]);

  const toggleIpAssignment = (id) => {
    if (soundEnabled) playClickSound();
    setDevices(devices.map(d => d.id === id ? { ...d, assigned: !d.assigned } : d));
  };

  const handleSendMessage = () => {
    const sender = devices.find(d => d.id === senderId);
    const recipient = devices.find(d => d.id === recipientId);

    if (soundEnabled) playWhooshSound();
    setIsSending(true);
    setMessageStatus('delivering');

    setTimeout(() => {
      setIsSending(false);
      if (!recipient.assigned) {
        if (soundEnabled) playErrorSound();
        setMessageStatus('lost');
        if (voiceEnabled) {
          speakText(`Delivery Failed! The ${recipient.name} does not have an IP address, so the network couldn't find it!`);
        }
      } else {
        if (soundEnabled) playSuccessChime();
        setMessageStatus('success');
        if (voiceEnabled) {
          speakText(`Delivered successfully to ${recipient.name} at IP ${recipient.ip}!`);
        }
      }
    }, 1400);
  };

  const handleReset = () => {
    if (soundEnabled) playClickSound();
    setDevices(initialDevices);
    setMessageStatus(null);
    setMissingIpMode(false);
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
              background: 'rgba(79, 172, 254, 0.2)',
              color: 'var(--accent-blue)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              Scene 2 of 5
            </span>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>IP Addresses (The Home Address)</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Key Concept: Every connected gadget needs its own unique address to send & receive information.
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
          <RotateCcw size={15} /> Reset Lab
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.7) 0%, rgba(10, 15, 29, 0.95) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem'
      }}>
        {/* Real-World Analogy Ribbon: Street Houses vs Digital Devices */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Home size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#ffeedd' }}>Real World: Physical Home Numbers</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                102 Elm St • 104 Elm St • 106 Elm St • 108 Elm St
              </p>
            </div>
          </div>

          <div style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)' }}>➔</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(0, 242, 254, 0.15)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Network size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>Digital World: IP Addresses</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                192.168.1.2 • 192.168.1.3 • 192.168.1.4 • 192.168.1.5
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Device Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1rem', color: '#fff' }}>Click any device to connect / disconnect its IP:</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Tip: Try turning OFF an IP to see what happens!</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem'
          }}>
            {devices.map((device) => {
              const Icon = device.icon;
              const isSender = senderId === device.id;
              const isRecipient = recipientId === device.id;

              return (
                <motion.div
                  key={device.id}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: device.assigned 
                      ? 'rgba(30, 41, 67, 0.7)' 
                      : 'rgba(255, 71, 87, 0.08)',
                    borderRadius: '16px',
                    border: device.assigned 
                      ? isRecipient 
                        ? '2px solid var(--accent-emerald)' 
                        : isSender 
                        ? '2px solid var(--accent-blue)' 
                        : '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px dashed rgba(255, 71, 87, 0.4)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    position: 'relative',
                    boxShadow: isRecipient ? 'var(--glow-emerald)' : isSender ? '0 0 20px rgba(79, 172, 254, 0.3)' : 'none'
                  }}
                >
                  {/* Status Indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: device.assigned ? 'var(--accent-emerald)' : 'var(--accent-rose)'
                  }} />

                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: device.assigned ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: device.assigned ? 'var(--accent-cyan)' : 'var(--text-dim)'
                  }}>
                    <Icon size={28} />
                  </div>

                  <strong style={{ fontSize: '0.92rem' }}>{device.name}</strong>

                  {/* IP Address Badge */}
                  <button
                    onClick={() => toggleIpAssignment(device.id)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      background: device.assigned ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 71, 87, 0.2)',
                      color: device.assigned ? 'var(--accent-cyan)' : 'var(--accent-rose)',
                      border: device.assigned ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid rgba(255, 71, 87, 0.5)',
                      cursor: 'pointer'
                    }}
                    title="Click to toggle IP address on/off"
                  >
                    {device.assigned ? `IP: ${device.ip}` : 'NO IP ADDRESS! ❌'}
                  </button>

                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Analogous to: {device.houseNumber}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Delivery Test Box */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>FROM (Sender):</span>
                <select
                  value={senderId}
                  onChange={(e) => setSenderId(e.target.value)}
                  style={{
                    background: '#1e293b',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem'
                  }}
                >
                  {devices.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.assigned ? d.ip : 'No IP'})</option>
                  ))}
                </select>
              </div>

              <div style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>➔</div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>TO (Recipient):</span>
                <select
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  style={{
                    background: '#1e293b',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem'
                  }}
                >
                  {devices.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.assigned ? d.ip : 'No IP'})</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={isSending || senderId === recipientId}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '12px',
                background: isSending 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                color: '#0a0f1d',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: isSending || senderId === recipientId ? 'not-allowed' : 'pointer',
                boxShadow: 'var(--glow-cyan)'
              }}
            >
              <Send size={16} />
              {isSending ? 'Routing Packet...' : 'Transmit Test Packet'}
            </button>
          </div>

          {/* Feedback Display */}
          <AnimatePresence>
            {messageStatus === 'delivering' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '0.8rem',
                  borderRadius: '10px',
                  background: 'rgba(0, 242, 254, 0.1)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <div style={{ animation: 'spin 1s linear infinite' }}>⚙️</div>
                Network looking up destination IP address...
              </motion.div>
            )}

            {messageStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <CheckCircle2 size={18} />
                <span>
                  <strong>Success!</strong> The packet arrived safely because the destination device had a verified unique IP address!
                </span>
              </motion.div>
            )}

            {messageStatus === 'lost' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 71, 87, 0.15)',
                  border: '1px solid rgba(255, 71, 87, 0.4)',
                  color: 'var(--accent-rose)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <AlertCircle size={18} />
                <span>
                  <strong>Error: Destination Unreachable!</strong> Just like mail carriers cannot deliver a package to a house with no number, the internet cannot deliver data to a device without an IP!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
