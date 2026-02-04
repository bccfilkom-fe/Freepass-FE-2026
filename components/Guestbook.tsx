import React, { useState, useRef, useLayoutEffect } from 'react';
import { useGuestbookStore, GuestbookEntry } from '../store/useGuestbookStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../logo.png';

const Guestbook: React.FC = () => {
  const { entries, addEntry, removeEntry, updateEntry } = useGuestbookStore();
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');

  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const fogRef = useRef<HTMLDivElement>(null);
  const runesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(listRef.current?.children || [], {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });

      if (runesRef.current) {
        Array.from(runesRef.current.children).forEach((rune, i) => {
          gsap.to(rune as Element, {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            rotation: "random(-20, 20)",
            opacity: "random(0.1, 0.4)",
            duration: "random(5, 10)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
          });
        });
      }

      if (fogRef.current) {
        gsap.to(fogRef.current, {
          backgroundPosition: "200% 0%",
          duration: 60,
          repeat: -1,
          ease: "linear"
        });
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        if (runesRef.current) {
          gsap.to(runesRef.current, {
            x: x,
            y: y,
            duration: 1,
            ease: "power2.out"
          });
        }

        if (fogRef.current) {
          gsap.to(fogRef.current, {
            x: -x * 0.5,
            y: -y * 0.5,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    addEntry(newName, newMessage);
    setNewName('');
    setNewMessage('');

    setTimeout(() => {
      const firstChild = listRef.current?.firstElementChild;
      if (firstChild) {
        gsap.fromTo(firstChild,
          { opacity: 0, height: 0, marginBottom: 0 },
          { opacity: 1, height: "auto", marginBottom: "1rem", duration: 0.5, ease: "power2.out" }
        );
      }
    }, 10);
  };

  const startEdit = (entry: GuestbookEntry) => {
    setEditingId(entry.id);
    setEditMessage(entry.message);
  };

  const saveEdit = (id: string) => {
    updateEntry(id, editMessage);
    setEditingId(null);
  };

  const ancientRunes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛇ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

  return (
    <section ref={containerRef} className="relative z-30 bg-[#0a0502] text-white py-32 px-4 md:px-20 min-h-screen flex flex-col items-center overflow-hidden">

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a120b] via-[#0f0a06] to-black"></div>

      <div
        ref={fogRef}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
        }}
      ></div>

      <div ref={runesRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[#FFD700] opacity-10 font-cinzel select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 3 + 1}rem`,
              filter: 'blur(2px)'
            }}
          >
            {ancientRunes[Math.floor(Math.random() * ancientRunes.length)]}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0502_90%)] pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10">

        <div className="text-center mb-16">
          <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          <h2 className="text-5xl md:text-7xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#B8860B] mb-4 drop-shadow-md">
            The Traveler's Log
          </h2>
          <p className="font-cinzel text-[#8D6E63] text-lg tracking-[0.2em] uppercase">
            Leave your mark before the journey ends
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 opacity-60">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#FFD700]"></div>
            <div className="w-2 h-2 rotate-45 border border-[#FFD700]"></div>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#FFD700]"></div>
          </div>
        </div >

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mb-20 p-8 md:p-10 rounded-xl relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 18, 11, 0.95) 0%, rgba(15, 10, 6, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.15), transparent)',
              animation: 'shimmer 3s infinite'
            }}></div>
          </div>

          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
              50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.6); }
            }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            <div className="md:col-span-4 space-y-2">
              <label className="text-xs font-cinzel text-[#FFD700] uppercase tracking-widest ml-1">Name</label>
              <input
                type="text"
                placeholder="Frodo..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-transparent border-b border-[#3E2723] text-[#E0E0E0] px-2 py-3 focus:outline-none focus:border-[#FFD700] focus:bg-[#FFD700]/5 transition-all font-serif text-lg placeholder-[#3E2723]"
              />
            </div>
            <div className="md:col-span-8 space-y-2">
              <label className="text-xs font-cinzel text-[#FFD700] uppercase tracking-widest ml-1">Message</label>
              <input
                type="text"
                placeholder="Speak friend and enter..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-transparent border-b border-[#3E2723] text-[#E0E0E0] px-2 py-3 focus:outline-none focus:border-[#FFD700] focus:bg-[#FFD700]/5 transition-all font-serif text-lg placeholder-[#3E2723]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="group/btn relative px-8 py-3.5 bg-gradient-to-r from-[#2c1810] to-[#1a100a] text-[#FFD700] font-cinzel font-bold tracking-widest uppercase border-2 border-[#5D4037] hover:border-[#FFD700] transition-all duration-300 overflow-hidden rounded-sm"
              style={{
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
              }}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover/btn:scale-105 transition-transform">
                <span>Inscribe</span>
                <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3E2723] to-[#5D4037] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 215, 0, 0.1)'
              }}></div>
            </button>
          </div>
        </form>

        <div ref={listRef} className="space-y-8 pl-4 border-l border-[#3E2723]/30 relative">

          {entries.length === 0 ? (
            <p className="text-center font-cinzel text-white/20 text-xl py-10">The pages are silent...</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="relative pl-8 group">
                <div className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-[#1a120b] border-2 border-[#5D4037] group-hover:border-[#FFD700] transition-all duration-300 shadow-[0_0_10px_black]">
                  <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-0 group-hover:opacity-60"></div>
                </div>

                <div className="relative p-6 rounded-sm transition-all duration-300 group-hover:translate-x-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(18, 12, 8, 0.8) 0%, rgba(10, 6, 4, 0.9) 100%)',
                    border: '1px solid rgba(62, 39, 35, 0.5)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(93, 64, 55, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(62, 39, 35, 0.5)';
                  }}
                >

                  <div className="flex flex-wrap justify-between items-baseline mb-4 border-b border-[#2c1810] pb-2">
                    <h3 className="font-cinzel text-xl text-[#E0E0E0] group-hover:text-[#FFD700] transition-colors">
                      {entry.name}
                    </h3>
                    <span className="text-xs font-cinzel text-[#5D4037]">{entry.timestamp}</span>
                  </div>

                  {editingId === entry.id ? (
                    <div className="animate-fade-in">
                      <textarea
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        className="w-full bg-[#0a0502] border border-[#3E2723] text-[#d4c5b0] p-3 font-serif rounded focus:outline-none focus:border-[#FFD700] italic"
                        rows={3}
                      />
                      <div className="flex gap-3 mt-3 justify-end font-cinzel text-xs">
                        <button onClick={() => setEditingId(null)} className="px-4 py-1 text-[#8D6E63] hover:text-[#d4c5b0] transition-colors">Cancel</button>
                        <button onClick={() => saveEdit(entry.id)} className="px-4 py-1 bg-[#2E7D32]/20 text-[#4CAF50] border border-[#2E7D32]/50 hover:bg-[#2E7D32]/40 transition-colors">Save Changes</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#d4c5b0]/90 font-serif text-lg italic leading-relaxed">
                      "{entry.message}"
                    </p>
                  )}

                  {!editingId && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={() => startEdit(entry)} className="p-1 text-[#5D4037] hover:text-[#FFD700] transition-colors" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => removeEntry(entry.id)} className="p-1 text-[#5D4037] hover:text-red-500 transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-20 opacity-30">
          <div className="w-16 h-[1px] bg-[#FFD700]"></div>
          <div className="text-[#FFD700] font-serif text-xs">✦</div>
          <div className="w-16 h-[1px] bg-[#FFD700]"></div>
        </div>

      </div >
    </section >
  );
};

export default Guestbook;