import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, XCircle, Award, RotateCcw, Sparkles, 
  HelpCircle, ArrowUpDown, Globe, Printer, ShieldCheck, 
  Search, Book, Shield, Library, Film, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playSuccessChime, playErrorSound, speakText } from '../utils/audio';

export default function LearningChartQuiz({ soundEnabled, voiceEnabled }) {
  // Correct ordered steps
  const correctOrder = [
    {
      id: 'step-1',
      correctStep: 1,
      title: 'Enter the Website Name',
      description: 'Write the website name into your browser.',
      analogy: 'Writing a letter with a recipient name',
      icon: Search,
      color: '#00f2fe'
    },
    {
      id: 'step-2',
      correctStep: 2,
      title: 'DNS Translates the Name',
      description: 'The DNS converts the website name into an IP address.',
      analogy: 'The Phonebook looking up phone numbers',
      icon: Book,
      color: '#9d4edd'
    },
    {
      id: 'step-3',
      correctStep: 3,
      title: 'Router Guides the Data',
      description: 'Routers direct the data to the correct server.',
      analogy: 'The Traffic Cop directing cars on fast routes',
      icon: Shield,
      color: '#10b981'
    },
    {
      id: 'step-4',
      correctStep: 4,
      title: 'Server Provides the Website',
      description: 'The server sends the website data to your computer.',
      analogy: 'The Library lending out books & media',
      icon: Library,
      color: '#ff4757'
    },
    {
      id: 'step-5',
      correctStep: 5,
      title: 'You Watch the Video',
      description: 'The video appears on your screen for you to watch.',
      analogy: 'Enjoying the story & playing games!',
      icon: Film,
      color: '#f59e0b'
    }
  ];

  // Shuffled pool of cards to place
  const [unplacedCards, setUnplacedCards] = useState([]);
  // Slots 1 to 5, each containing either null or an item
  const [slots, setSlots] = useState({ 1: null, 2: null, 3: null, 4: null, 5: null });
  const [selectedCard, setSelectedCard] = useState(null);
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  // Initialize with shuffled cards
  useEffect(() => {
    resetQuiz();
    if (voiceEnabled) {
      speakText("Welcome to the Learning Chart interactive quiz! Arrange the 5 steps in the correct order to show how finding a website works.");
    }
  }, [voiceEnabled]);

  const resetQuiz = () => {
    // Fisher-Yates shuffle
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    setUnplacedCards(shuffled);
    setSlots({ 1: null, 2: null, 3: null, 4: null, 5: null });
    setSelectedCard(null);
    setIsCompleted(false);
    setShowCertificate(false);
  };

  // Place card into slot
  const placeInSlot = (slotNumber, cardToPlace) => {
    const card = cardToPlace || selectedCard;
    if (!card) return;

    // Check if slot already occupied, return current occupant to unplaced
    const existingOccupant = slots[slotNumber];
    const newUnplaced = unplacedCards.filter(c => c.id !== card.id);
    if (existingOccupant && existingOccupant.id !== card.id) {
      newUnplaced.push(existingOccupant);
    }

    // Also remove from any other slot it was in
    const updatedSlots = { ...slots };
    Object.keys(updatedSlots).forEach(key => {
      if (updatedSlots[key]?.id === card.id) {
        updatedSlots[key] = null;
      }
    });

    updatedSlots[slotNumber] = card;
    setSlots(updatedSlots);
    setUnplacedCards(newUnplaced);
    setSelectedCard(null);

    // Audio cue
    if (soundEnabled) {
      if (card.correctStep === slotNumber) {
        playSuccessChime();
      } else {
        playClickSound();
      }
    }

    // Check completion
    checkCompletion(updatedSlots);
  };

  const removeFromSlot = (slotNumber) => {
    const occupant = slots[slotNumber];
    if (!occupant) return;
    if (soundEnabled) playClickSound();

    setSlots({ ...slots, [slotNumber]: null });
    setUnplacedCards([...unplacedCards, occupant]);
  };

  const checkCompletion = (currentSlots) => {
    const allFilled = Object.values(currentSlots).every(v => v !== null);
    if (allFilled) {
      const allCorrect = Object.entries(currentSlots).every(
        ([slotNum, item]) => item.correctStep === parseInt(slotNum, 10)
      );

      if (allCorrect) {
        setIsCompleted(true);
        if (soundEnabled) playSuccessChime();
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
        if (voiceEnabled) {
          speakText("Incredible job! You mastered all 5 steps of how the Internet works! Your certificate is ready.");
        }
      } else {
        if (soundEnabled) playErrorSound();
        if (voiceEnabled) {
          speakText("Some steps are out of order! Look at the hints and try swapping them.");
        }
      }
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotNum) => {
    e.preventDefault();
    if (draggedItem) {
      placeInSlot(slotNum, draggedItem);
      setDraggedItem(null);
    }
  };

  // Calculate current score
  const correctCount = Object.entries(slots).filter(
    ([slotNum, item]) => item && item.correctStep === parseInt(slotNum, 10)
  ).length;

  return (
    <div className="app-container" style={{ margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Quiz Header Banner */}
      <div className="glass-panel" style={{
        padding: '1.5rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.2)',
              color: 'var(--accent-emerald)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '800'
            }}>
              Module 3: Assessment
            </span>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>My Learning Chart: How to Find a Website</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Arrange the 5 steps in the correct order (1 through 5) from entering the URL to watching the video!
          </p>
        </div>

        {/* Score & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '6px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Score:</span>
            <span style={{
              fontSize: '1.1rem',
              fontWeight: '800',
              color: correctCount === 5 ? 'var(--accent-emerald)' : 'var(--accent-cyan)'
            }}>
              {correctCount} / 5
            </span>
          </div>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              resetQuiz();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            <RotateCcw size={15} /> Reset Quiz
          </button>
        </div>
      </div>

      {/* Main Drag-and-Drop Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Left Column: Target Slots 1 to 5 */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
              The 5 Ordered Steps (Drop or Tap to Place):
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Step 1 ➔ Step 5
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[1, 2, 3, 4, 5].map((slotNum) => {
              const item = slots[slotNum];
              const isCorrect = item && item.correctStep === slotNum;
              const isWrong = item && item.correctStep !== slotNum;

              return (
                <div
                  key={slotNum}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slotNum)}
                  onClick={() => {
                    if (selectedCard) {
                      placeInSlot(slotNum);
                    }
                  }}
                  style={{
                    minHeight: '85px',
                    borderRadius: '14px',
                    border: isCorrect
                      ? '2px solid var(--accent-emerald)'
                      : isWrong
                      ? '2px dashed var(--accent-rose)'
                      : selectedCard
                      ? '2px dashed var(--accent-cyan)'
                      : '2px dashed rgba(255, 255, 255, 0.15)',
                    background: isCorrect
                      ? 'rgba(16, 185, 129, 0.12)'
                      : isWrong
                      ? 'rgba(255, 71, 87, 0.1)'
                      : 'rgba(0, 0, 0, 0.3)',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    cursor: selectedCard ? 'pointer' : 'default'
                  }}
                >
                  {/* Slot Number Badge */}
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: isCorrect ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.08)',
                    color: isCorrect ? '#0a0f1d' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {isCorrect ? '✓' : slotNum}
                  </div>

                  {/* Slot Contents */}
                  {item ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <strong style={{ fontSize: '0.9rem', color: isCorrect ? 'var(--accent-emerald)' : '#fff' }}>
                            {item.title}
                          </strong>
                          {isCorrect && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                              (Correct!)
                            </span>
                          )}
                          {isWrong && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-rose)', fontWeight: '700' }}>
                              (Misplaced)
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromSlot(slotNum);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-muted)',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: '600'
                        }}
                        title="Remove from slot"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div style={{ color: selectedCard ? 'var(--accent-cyan)' : 'var(--text-dim)', fontSize: '0.82rem' }}>
                      {selectedCard ? `Tap here to place "${selectedCard.title}" in Step ${slotNum}` : `Step ${slotNum} is empty (Drop card here)`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Cards to Order & Certificate */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Unplaced Cards Pool */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                Draggable Cards ({unplacedCards.length} Remaining):
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Drag or click a card, then choose its step
              </span>
            </div>

            {unplacedCards.length === 0 && !isCompleted && (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-muted)',
                fontSize: '0.88rem'
              }}>
                All cards have been placed! Check your slots on the left.
              </div>
            )}

            {unplacedCards.length === 0 && isCompleted && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--accent-emerald)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Award size={48} color="var(--accent-emerald)" />
                <h4 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>
                  🎉 100% Mastery Achieved!
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  You correctly ordered all 5 steps of the Internet journey!
                </p>
                <button
                  onClick={() => {
                    if (soundEnabled) playSuccessChime();
                    setShowCertificate(true);
                  }}
                  style={{
                    marginTop: '0.5rem',
                    background: 'linear-gradient(135deg, var(--accent-emerald), #00f2fe)',
                    color: '#0a0f1d',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Award size={18} /> View & Print Certificate
                </button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {unplacedCards.map((card) => {
                const Icon = card.icon;
                const isSelected = selectedCard?.id === card.id;

                return (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card)}
                    onClick={() => {
                      if (soundEnabled) playClickSound();
                      setSelectedCard(isSelected ? null : card);
                    }}
                    style={{
                      background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'grab',
                      boxShadow: isSelected ? 'var(--glow-cyan)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: `${card.color}25`,
                        color: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.88rem', color: '#fff' }}>
                          {card.title}
                        </strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {card.description}
                        </div>
                      </div>
                    </div>

                    {/* Quick Step Buttons for Accessibility */}
                    <div style={{ display: 'flex', gap: '3px' }} onClick={(e) => e.stopPropagation()}>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => placeInSlot(num, card)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: 'var(--text-muted)',
                            fontSize: '0.72rem',
                            fontWeight: '700'
                          }}
                          title={`Place directly into Step ${num}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Learning Analogy Cheat Sheet */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
              💡 Quick Analogy Memory Helper:
            </h4>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>• <strong>Postal Mail</strong> ➔ Data Packets</div>
              <div>• <strong>Home Address</strong> ➔ Device IP Address</div>
              <div>• <strong>Contacts Phonebook</strong> ➔ DNS Directory</div>
              <div>• <strong>Traffic Cop</strong> ➔ Network Router</div>
              <div>• <strong>Public Library</strong> ➔ Web Server</div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Master Certificate Modal */}
      {showCertificate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '1rem'
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              maxWidth: '680px',
              width: '100%',
              background: '#0a0f1d',
              borderRadius: '24px',
              border: '3px solid var(--accent-cyan)',
              padding: '2.5rem 2rem',
              boxShadow: '0 0 50px rgba(0, 242, 254, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCertificate(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            {/* Certificate Header Badge */}
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f2fe, #9d4edd)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              marginBottom: '1rem',
              boxShadow: 'var(--glow-cyan)'
            }}>
              🏆
            </div>

            <span style={{
              fontSize: '0.8rem',
              fontWeight: '800',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              Official Certificate of Mastery
            </span>

            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0', color: '#fff' }}>
              Junior Internet Architect
            </h2>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '480px' }}>
              This certifies that the student has demonstrated full understanding of how data moves across the global internet using the 5 core networking analogies.
            </p>

            {/* Editable Name Field */}
            <div style={{ margin: '1.5rem 0', width: '100%', maxWidth: '380px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>
                Student Name:
              </span>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '2px solid var(--accent-cyan)',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  color: '#fff',
                  fontSize: '1.3rem',
                  fontFamily: 'var(--font-heading)',
                  textAlign: 'center',
                  fontWeight: '700'
                }}
              />
            </div>

            {/* Verification Stats */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.75rem 1.75rem',
              borderRadius: '14px',
              marginBottom: '1.5rem',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Score: </span>
                <strong style={{ color: 'var(--accent-emerald)' }}>5 / 5 (100%)</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Grade Level: </span>
                <strong style={{ color: '#fff' }}>Grade 6 Tech Science</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Status: </span>
                <strong style={{ color: 'var(--accent-cyan)' }}>Verified Master</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => window.print()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '12px',
                  background: 'var(--accent-cyan)',
                  color: '#0a0f1d',
                  fontSize: '0.88rem',
                  fontWeight: '800'
                }}
              >
                <Printer size={16} /> Print / Save PDF
              </button>

              <button
                onClick={() => setShowCertificate(false)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  fontWeight: '600'
                }}
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
