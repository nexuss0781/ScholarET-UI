import React, { useState, useEffect, useRef, useId } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { playPop } from '../utils/audio';

export type MascotMood = 'idle' | 'reading' | 'cheering' | 'explaining' | 'thinking';

interface MascotProps {
  mood?: MascotMood;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withPedestal?: boolean;
  interactive?: boolean;
  speechText?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'idle',
  size = 'md',
  className = '',
  withPedestal = false,
  interactive = true,
  speechText,
}) => {
  const uid = useId().replace(/:/g, '_'); // Safe CSS/SVG ID prefix
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [showQuip, setShowQuip] = useState(false);
  const [currentQuip, setCurrentQuip] = useState('Study with me!');
  const [earTwitch, setEarTwitch] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);

  // Natural Eye Blink Loop (every 3.0 - 5.5 seconds with organic double-blinks)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const scheduleBlink = () => {
      const delay = 2800 + Math.random() * 2600;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          // 30% chance of an authentic double-blink for lifelike organic realism
          if (Math.random() < 0.3) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => setIsBlinking(false), 110);
            }, 160);
          }
          scheduleBlink();
        }, 130);
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Occasional Ear Tuft Micro-Twitch (like a real owl tuning in to sound)
  useEffect(() => {
    let earTimeout: NodeJS.Timeout;
    const scheduleEarTwitch = () => {
      const delay = 4000 + Math.random() * 4000;
      earTimeout = setTimeout(() => {
        setEarTwitch(true);
        setTimeout(() => {
          setEarTwitch(false);
          scheduleEarTwitch();
        }, 320);
      }, delay);
    };
    scheduleEarTwitch();
    return () => clearTimeout(earTimeout);
  }, []);

  // Interactive Pupil Cursor Tracking (smooth dampened mouse follower)
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp pupil offset smoothly between -4.5 and +4.5 pixels
      const clampedX = Math.max(-4.5, Math.min(4.5, deltaX * 4.5));
      const clampedY = Math.max(-3.5, Math.min(3.5, deltaY * 3.5));

      setEyeOffset({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Dimension scaling
  const sizeMap = {
    xs: { w: 40, h: 42 },
    sm: { w: 76, h: 78 },
    md: { w: 146, h: 148 },
    lg: { w: 190, h: 194 },
    xl: { w: 250, h: 256 },
  };

  const dim = sizeMap[size];

  // Interactive Tap / Click Reaction
  const handleTap = () => {
    if (!interactive) return;
    playPop(true);
    setIsJumping(true);
    const quips = [
      'lim x→0 (sin x / x) = 1',
      'd/dx [e^x] = e^x — flawless!',
      'Theorems = Dopamine!',
      'Continuous & Differentiable!',
      '14-Day Study Streak! 🔥',
      'Euler: e^(iπ) + 1 = 0',
      'L\'Hôpital\'s Rule mastered!',
    ];
    setCurrentQuip(quips[Math.floor(Math.random() * quips.length)]);
    setShowQuip(true);

    setTimeout(() => setIsJumping(false), 650);
    setTimeout(() => setShowQuip(false), 2600);
  };

  // Organic diaphragm breathing & bobbing animation
  const bodyMotion = {
    idle: {
      y: [0, -4, 0],
      rotate: [0, 0.5, -0.5, 0],
      transition: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' as const }
    },
    reading: {
      y: [0, -3, 0],
      rotate: [0, -0.8, 0.8, 0],
      transition: { duration: 4.0, repeat: Infinity, ease: 'easeInOut' as const }
    },
    cheering: {
      y: [0, -18, 0],
      scale: [1, 1.09, 0.97, 1],
      rotate: [0, -2.5, 2.5, 0],
      transition: { duration: 0.62, repeat: Infinity, ease: 'easeOut' as const }
    },
    explaining: {
      y: [0, -4, 0],
      rotate: [0, 1.4, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const }
    },
    thinking: {
      y: [0, -3, 0],
      rotate: [-2, 0, -2],
      transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const }
    }
  };

  const tasselMotion = {
    idle: { rotate: [0, 6, -3, 0], transition: { duration: 3.4, repeat: Infinity } },
    reading: { rotate: [0, 4, 0], transition: { duration: 4.0, repeat: Infinity } },
    cheering: { rotate: [-28, 32, -28], transition: { duration: 0.62, repeat: Infinity } },
    explaining: { rotate: [-8, 14, -8], transition: { duration: 2.2, repeat: Infinity } },
    thinking: { rotate: [0, 5, 0], transition: { duration: 3.2, repeat: Infinity } }
  };

  // Eyeball gaze calculation based on mood
  const gazeX = mood === 'reading' ? 0 : mood === 'thinking' ? -2.5 : eyeOffset.x;
  const gazeY = mood === 'reading' ? 3.2 : mood === 'thinking' ? -2.0 : eyeOffset.y;

  return (
    <div
      ref={mascotRef}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Speech Quip Bubble on Click / Hover */}
      {(showQuip || speechText) && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          className="absolute -top-13 z-40 bg-white border-2 border-[#008080] text-[#008080] font-black text-xs px-3.5 py-1.5 rounded-2xl shadow-[0_4px_0_#d1b8a5] whitespace-nowrap flex items-center gap-1.5 pointer-events-none"
        >
          <Sparkles className="w-3.5 h-3.5 fill-[#FE7F2D] text-[#FE7F2D]" />
          <span>{speechText || currentQuip}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-[#008080] transform rotate-45" />
        </motion.div>
      )}

      {/* Main Procedural Animated Vector Mascot */}
      <motion.div
        animate={isJumping ? { y: [0, -20, 0], scale: [1, 1.12, 0.95, 1] } : bodyMotion[mood]}
        transition={{ duration: isJumping ? 0.6 : 3.4, ease: 'easeOut' }}
        whileHover={interactive ? { scale: 1.05, cursor: 'pointer' } : {}}
        whileTap={interactive ? { scale: 0.94 } : {}}
        onClick={handleTap}
        style={{ width: dim.w, height: dim.h }}
        className="relative overflow-visible group"
      >
        <svg
          viewBox="0 0 220 230"
          className="w-full h-full drop-shadow-[0_12px_20px_rgba(35,61,77,0.18)] overflow-visible"
        >
          <defs>
            {/* 1. Subsurface Tawny Feather Gradients */}
            <radialGradient id={`${uid}-faceDiscLight`} cx="50%" cy="46%" r="58%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="55%" stopColor="#F8EDE1" />
              <stop offset="85%" stopColor="#EAD3BE" />
              <stop offset="100%" stopColor="#D9BA9F" />
            </radialGradient>

            <linearGradient id={`${uid}-owlFurGrad`} x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#DC8243" />
              <stop offset="28%" stopColor="#BE6327" />
              <stop offset="70%" stopColor="#9C4713" />
              <stop offset="100%" stopColor="#6C2D08" />
            </linearGradient>

            <linearGradient id={`${uid}-earFluffLight`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A869" />
              <stop offset="100%" stopColor="#BD5F22" />
            </linearGradient>

            {/* 2. Realistic Multi-tone Amber Iris Gradient */}
            <radialGradient id={`${uid}-irisGrad`} cx="42%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFC86B" />
              <stop offset="35%" stopColor="#FFA638" />
              <stop offset="70%" stopColor="#E36B10" />
              <stop offset="92%" stopColor="#A84405" />
              <stop offset="100%" stopColor="#4A1E04" />
            </radialGradient>

            {/* 3. Deep Cornea Glass Sheen */}
            <linearGradient id={`${uid}-corneaGlint`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* 4. Spectacle Lens Coated Reflection Flare */}
            <linearGradient id={`${uid}-lensFlare`} x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="30%" stopColor="#A6E8E8" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* 5. Tortoiseshell Acetate Frame Mottling */}
            <linearGradient id={`${uid}-tortoiseShell`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E4857" />
              <stop offset="25%" stopColor="#1E333F" />
              <stop offset="50%" stopColor="#7E3A10" />
              <stop offset="75%" stopColor="#233D4D" />
              <stop offset="100%" stopColor="#122028" />
            </linearGradient>

            {/* 6. Horn Keratin Beak Gradient with Ridge Highlight */}
            <linearGradient id={`${uid}-beakHorn`} x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#FFC187" />
              <stop offset="35%" stopColor="#FE7F2D" />
              <stop offset="80%" stopColor="#CF5709" />
              <stop offset="100%" stopColor="#8C3300" />
            </linearGradient>

            {/* 7. Ocean Teal Fleece Hoodie Fabric Gradient */}
            <linearGradient id={`${uid}-hoodieFleece`} x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#00A8A8" />
              <stop offset="25%" stopColor="#009191" />
              <stop offset="65%" stopColor="#008080" />
              <stop offset="100%" stopColor="#005353" />
            </linearGradient>

            <linearGradient id={`${uid}-hoodieRibbed`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#006C6C" />
              <stop offset="100%" stopColor="#004545" />
            </linearGradient>

            {/* 8. Scholar Mortarboard Cap Gradients */}
            <linearGradient id={`${uid}-mortarboardCap`} x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#3A576B" />
              <stop offset="45%" stopColor="#233D4D" />
              <stop offset="85%" stopColor="#172935" />
              <stop offset="100%" stopColor="#0E1920" />
            </linearGradient>

            {/* 9. Silk Tassel Gradient in Pumpkin #FE7F2D */}
            <linearGradient id={`${uid}-tasselSilk`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFA665" />
              <stop offset="40%" stopColor="#FE7F2D" />
              <stop offset="75%" stopColor="#E26511" />
              <stop offset="100%" stopColor="#B34400" />
            </linearGradient>

            {/* 10. Embossed Gold Foil Monogram */}
            <linearGradient id={`${uid}-goldFoil`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="40%" stopColor="#FFCE54" />
              <stop offset="75%" stopColor="#D99B16" />
              <stop offset="100%" stopColor="#9E6B05" />
            </linearGradient>

            {/* 11. Textbook Leather Cover */}
            <linearGradient id={`${uid}-bookCover`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005D5D" />
              <stop offset="25%" stopColor="#008080" />
              <stop offset="75%" stopColor="#006666" />
              <stop offset="100%" stopColor="#004242" />
            </linearGradient>

            {/* Filters for Micro-depth & Realistic Drop Shadows */}
            <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#233D4D" floodOpacity="0.28" />
            </filter>
            <filter id={`${uid}-softShadow`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#233D4D" floodOpacity="0.18" />
            </filter>
            <filter id={`${uid}-specularGlow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Golden Math Sparks in Cheering Mode */}
          {mood === 'cheering' && (
            <g className="animate-pulse">
              <text x="24" y="38" fill="#FE7F2D" fontSize="13" fontWeight="900" fontFamily="monospace">∫ dx</text>
              <text x="168" y="36" fill="#008080" fontSize="13" fontWeight="900" fontFamily="monospace">∑ i=1</text>
              <text x="12" y="94" fill="#FE7F2D" fontSize="12" fontWeight="900" fontFamily="monospace">π</text>
              <text x="184" y="88" fill="#008080" fontSize="12" fontWeight="900" fontFamily="monospace">Δt</text>
              <circle cx="28" cy="56" r="3" fill="#FE7F2D" filter={`url(#${uid}-specularGlow)`} />
              <circle cx="180" cy="60" r="3" fill="#008080" filter={`url(#${uid}-specularGlow)`} />
              <polygon points="108,10 111,18 119,21 111,24 108,32 105,24 97,21 105,18" fill="#FFC86B" />
            </g>
          )}

          {/* ============================================================== */}
          {/* 1. OWLL EAR TUFTS ("HORNS") WITH MULTI-TIERED FEATHERS        */}
          {/* ============================================================== */}
          <g>
            {/* Left Ear Horn (With Micro-Twitch Physics) */}
            <motion.g
              animate={earTwitch ? { rotate: [-4, 6, -2, 0] } : {}}
              transition={{ duration: 0.3 }}
              style={{ originX: '62px', originY: '48px' }}
            >
              {/* Back dark shadow plume */}
              <path d="M 64 52 C 40 22 48 8 68 28 Z" fill={`url(#${uid}-owlFurGrad)`} />
              {/* Mid tawny feather tuft */}
              <path d="M 66 50 C 46 26 56 16 70 32 Z" fill={`url(#${uid}-earFluffLight)`} />
              {/* Front bright ginger barb tip */}
              <path d="M 68 46 C 54 28 62 22 72 35 Z" fill="#FFA665" />
            </motion.g>

            {/* Right Ear Horn */}
            <motion.g
              animate={earTwitch ? { rotate: [4, -6, 2, 0] } : {}}
              transition={{ duration: 0.3, delay: 0.05 }}
              style={{ originX: '158px', originY: '48px' }}
            >
              {/* Back dark shadow plume */}
              <path d="M 156 52 C 180 22 172 8 152 28 Z" fill={`url(#${uid}-owlFurGrad)`} />
              {/* Mid tawny feather tuft */}
              <path d="M 154 50 C 174 26 164 16 150 32 Z" fill={`url(#${uid}-earFluffLight)`} />
              {/* Front bright ginger barb tip */}
              <path d="M 152 46 C 166 28 158 22 148 35 Z" fill="#FFA665" />
            </motion.g>
          </g>

          {/* ============================================================== */}
          {/* 2. SCHOLAR MORTARBOARD CAP (3D PERSPECTIVE & SILK TASSEL)      */}
          {/* ============================================================== */}
          <g transform="translate(110, 38)">
            {/* Skullcap Underside Ring */}
            <ellipse cx="0" cy="11" rx="42" ry="14" fill="#0E1920" />
            {/* Cast Shadow of Diamond Board onto Forehead */}
            <polygon points="0,-18 64,-1 0,18 -64,-1" fill="#122028" opacity="0.4" transform="translate(0, 4)" />
            {/* 3D Diamond Board */}
            <polygon points="0,-20 64,-2 0,16 -64,-2" fill={`url(#${uid}-mortarboardCap)`} filter={`url(#${uid}-shadow)`} />
            {/* Top Facet Bevel Highlight */}
            <polygon points="0,-20 64,-2 0,-1 -64,-2" fill="rgba(255,255,255,0.16)" />
            {/* Gold Central Apex Button with Thread Wrap Texture */}
            <circle cx="0" cy="-2" r="5.5" fill={`url(#${uid}-goldFoil)`} stroke="#8C3300" strokeWidth="1.2" />
            <circle cx="0" cy="-2" r="2.5" fill="#FFE28A" />

            {/* Braided Silk Tassel in Pumpkin #FE7F2D with Dynamic Pendulum Motion */}
            <motion.g
              animate={tasselMotion[mood]}
              style={{ originX: '0px', originY: '-2px' }}
            >
              {/* Braided Silk Cord */}
              <path d="M 0 -2 C 26 4 40 18 46 36" stroke="#FE7F2D" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              {/* Golden Ferrule Band */}
              <circle cx="46" cy="37" r="4.8" fill={`url(#${uid}-goldFoil)`} stroke="#8C3300" strokeWidth="1" />
              {/* Silk Fringe Skirt (Layered Strands) */}
              <path d="M 42 38 L 50 38 L 54 62 L 38 62 Z" fill={`url(#${uid}-tasselSilk)`} />
              {/* Fine Individual Silk Fibers */}
              <line x1="41" y1="38" x2="39" y2="62" stroke="#D95707" strokeWidth="0.9" />
              <line x1="44" y1="38" x2="43" y2="62" stroke="#FFA665" strokeWidth="0.9" />
              <line x1="47" y1="38" x2="47" y2="62" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.6" />
              <line x1="50" y1="38" x2="51" y2="62" stroke="#FFA665" strokeWidth="0.9" />
              <line x1="53" y1="38" x2="54" y2="62" stroke="#D95707" strokeWidth="0.9" />
            </motion.g>
          </g>

          {/* ============================================================== */}
          {/* 3. HEAD ANATOMY & PLUMAGE TEXTURES                             */}
          {/* ============================================================== */}
          {/* Main Head Mass */}
          <ellipse cx="110" cy="102" rx="64" ry="56" fill={`url(#${uid}-owlFurGrad)`} filter={`url(#${uid}-shadow)`} />

          {/* Forehead Plumage Chevrons (Layered Down Feathers) */}
          <g opacity="0.35" stroke="#FFA665" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M 98 62 Q 110 68 122 62" />
            <path d="M 94 68 Q 110 75 126 68" />
            <path d="M 90 74 Q 110 82 130 74" />
          </g>

          {/* Heart-Shaped Facial Disc (Signature Barn/Horned Owl Mask) */}
          <path
            d="M 110 72
               C 138 52, 175 66, 171 104
               C 167 138, 126 150, 110 154
               C 94 150, 53 138, 49 104
               C 45 66, 82 52, 110 72 Z"
            fill={`url(#${uid}-faceDiscLight)`}
            filter={`url(#${uid}-softShadow)`}
          />

          {/* Radiating Facial Disc Feather Fringes */}
          <path
            d="M 110 76
               C 134 58, 166 70, 163 102
               C 159 130, 123 144, 110 148
               C 97 144, 61 130, 57 102
               C 54 70, 86 58, 110 76 Z"
            fill="none"
            stroke="#D9BA9F"
            strokeWidth="1.8"
            strokeDasharray="2.5 3.5"
          />

          {/* Rosy Scholar Cheeks (Warm Subsurface Scatter Blush) */}
          <circle cx="64" cy="120" r="11" fill="#FE7F2D" fillOpacity="0.25" filter={`url(#${uid}-specularGlow)`} />
          <circle cx="156" cy="120" r="11" fill="#FE7F2D" fillOpacity="0.25" filter={`url(#${uid}-specularGlow)`} />

          {/* ============================================================== */}
          {/* 4. EYES BEHIND SPECTACLES (PUPIL TRACKING & REALISTIC DEPTH)    */}
          {/* ============================================================== */}
          <g transform="translate(110, 102)">
            {/* Eye Sockets Depth Contour */}
            <circle cx="-28" cy="0" r="20" fill="#FFFFFF" stroke="#EAD3BE" strokeWidth="2.5" />
            <circle cx="28" cy="0" r="20" fill="#FFFFFF" stroke="#EAD3BE" strokeWidth="2.5" />

            {/* Ambient Shadow Ring inside Sockets */}
            <circle cx="-28" cy="0" r="19" fill="none" stroke="#D1A78B" strokeWidth="2.2" opacity="0.3" />
            <circle cx="28" cy="0" r="19" fill="none" stroke="#D1A78B" strokeWidth="2.2" opacity="0.3" />

            {/* --- LEFT EYE: Multi-layer Amber Iris with Radial Striations & Glints --- */}
            <g transform={`translate(${-28 + gazeX}, ${gazeY})`}>
              {/* Dark Limbal Ring (Edge of iris) */}
              <circle cx="0" cy="0" r="13" fill="#3D1804" />
              {/* Multi-tone Radial Gradient Amber Iris */}
              <circle cx="0" cy="0" r="12" fill={`url(#${uid}-irisGrad)`} />

              {/* Iris Micro-Striations (Radial Fibers) */}
              <g stroke="#FFF0B8" strokeWidth="0.8" opacity="0.45">
                <line x1="0" y1="-12" x2="0" y2="-7" />
                <line x1="8" y1="-8" x2="5" y2="-5" />
                <line x1="12" y1="0" x2="7" y2="0" />
                <line x1="8" y1="8" x2="5" y2="5" />
                <line x1="0" y1="12" x2="0" y2="7" />
                <line x1="-8" y1="8" x2="-5" y2="5" />
                <line x1="-12" y1="0" x2="-7" y2="0" />
                <line x1="-8" y1="-8" x2="-5" y2="-5" />
              </g>

              {/* Deep Charcoal Pupil */}
              <circle cx="0" cy="0" r="8.5" fill="#172935" />

              {/* Primary Star/Window Specular Catchlight */}
              <circle cx="-3.5" cy="-3.8" r="3.4" fill="#FFFFFF" />
              {/* Secondary Warm Bounce Glint */}
              <circle cx="3" cy="2.8" r="1.5" fill="#FFF2D6" opacity="0.85" />
            </g>

            {/* --- RIGHT EYE: Multi-layer Amber Iris --- */}
            <g transform={`translate(${28 + gazeX}, ${gazeY})`}>
              <circle cx="0" cy="0" r="13" fill="#3D1804" />
              <circle cx="0" cy="0" r="12" fill={`url(#${uid}-irisGrad)`} />

              {/* Iris Micro-Striations */}
              <g stroke="#FFF0B8" strokeWidth="0.8" opacity="0.45">
                <line x1="0" y1="-12" x2="0" y2="-7" />
                <line x1="8" y1="-8" x2="5" y2="-5" />
                <line x1="12" y1="0" x2="7" y2="0" />
                <line x1="8" y1="8" x2="5" y2="5" />
                <line x1="0" y1="12" x2="0" y2="7" />
                <line x1="-8" y1="8" x2="-5" y2="5" />
                <line x1="-12" y1="0" x2="-7" y2="0" />
                <line x1="-8" y1="-8" x2="-5" y2="-5" />
              </g>

              <circle cx="0" cy="0" r="8.5" fill="#172935" />
              <circle cx="-3.5" cy="-3.8" r="3.4" fill="#FFFFFF" />
              <circle cx="3" cy="2.8" r="1.5" fill="#FFF2D6" opacity="0.85" />
            </g>

            {/* Organic Eyelids on Blink */}
            {isBlinking && (
              <g>
                <path d="M -48 0 C -48 -20, -8 -20, -8 0 C -8 20, -48 20, -48 0 Z" fill="#DC8243" />
                <path d="M 8 0 C 8 -20, 48 -20, 48 0 C 48 20, 8 20, 8 0 Z" fill="#DC8243" />
                <path d="M -46 0 Q -28 6 -10 0" stroke="#6C2D08" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 10 0 Q 28 6 46 0" stroke="#6C2D08" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Cheering Mode Happy Curved Crescent Eyes */}
            {mood === 'cheering' && !isBlinking && (
              <g>
                <rect x="-48" y="-20" width="40" height="40" fill="#FFFDF7" />
                <rect x="8" y="-20" width="40" height="40" fill="#FFFDF7" />
                <path d="M -44 4 Q -28 -12 -12 4" stroke="#233D4D" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                <path d="M 12 4 Q 28 -12 44 4" stroke="#233D4D" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                {/* Cheerful Golden Cheek Sparkles */}
                <polygon points="-28,-6 -26,-2 -22,0 -26,2 -28,6 -30,2 -34,0 -30,-2" fill="#FE7F2D" />
                <polygon points="28,-6 30,-2 34,0 30,2 28,6 26,2 22,0 26,-2" fill="#FE7F2D" />
              </g>
            )}

            {/* ============================================================== */}
            {/* 5. TORTOISESHELL READING SPECTACLES (LAYERED BEVEL & LENS GLARE) */}
            {/* ============================================================== */}
            {/* Soft Ambient Cast Shadow of Spectacles onto Face */}
            <ellipse cx="-28" cy="5" rx="24" ry="23" fill="none" stroke="#233D4D" strokeWidth="3.5" opacity="0.14" />
            <ellipse cx="28" cy="5" rx="24" ry="23" fill="none" stroke="#233D4D" strokeWidth="3.5" opacity="0.14" />

            {/* Left Acetate Rim */}
            <circle cx="-28" cy="0" r="23" fill="rgba(255,255,255,0.08)" stroke={`url(#${uid}-tortoiseShell)`} strokeWidth="4.6" />
            <circle cx="-28" cy="0" r="21.5" fill="none" stroke="#FE7F2D" strokeWidth="1.2" opacity="0.65" />
            {/* Top Rim Specular Bevel Highlight */}
            <path d="M -44 -14 Q -28 -24 -12 -14" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Optical Coated Lens Reflection Flare */}
            <ellipse cx="-28" cy="-3" rx="19" ry="18" fill={`url(#${uid}-lensFlare)`} />
            <path d="M -42 -10 Q -28 -18 -14 -8" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />

            {/* Right Acetate Rim */}
            <circle cx="28" cy="0" r="23" fill="rgba(255,255,255,0.08)" stroke={`url(#${uid}-tortoiseShell)`} strokeWidth="4.6" />
            <circle cx="28" cy="0" r="21.5" fill="none" stroke="#FE7F2D" strokeWidth="1.2" opacity="0.65" />
            <path d="M 12 -14 Q 28 -24 44 -14" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <ellipse cx="28" cy="-3" rx="19" ry="18" fill={`url(#${uid}-lensFlare)`} />
            <path d="M 14 -10 Q 28 -18 42 -8" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />

            {/* Tortoiseshell Bridge with Arch & Structural Ridge */}
            <path d="M -6 -3 Q 0 -9 6 -3" stroke={`url(#${uid}-tortoiseShell)`} strokeWidth="4.6" fill="none" strokeLinecap="round" />
            <path d="M -5 -3 Q 0 -8 5 -3" stroke="#FE7F2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Silver Temple Corner Screws */}
            <circle cx="-51" cy="-2" r="1.8" fill="#D9E2E8" stroke="#233D4D" strokeWidth="0.8" />
            <circle cx="51" cy="-2" r="1.8" fill="#D9E2E8" stroke="#233D4D" strokeWidth="0.8" />
            {/* Temples Extending Back */}
            <path d="M -51 -2 L -62 -5" stroke={`url(#${uid}-tortoiseShell)`} strokeWidth="3.6" strokeLinecap="round" />
            <path d="M 51 -2 L 62 -5" stroke={`url(#${uid}-tortoiseShell)`} strokeWidth="3.6" strokeLinecap="round" />

            {/* Silicone Nose Pads Resting on Beak */}
            <ellipse cx="-7" cy="8" rx="2" ry="3.5" fill="#EAEAEA" opacity="0.8" />
            <ellipse cx="7" cy="8" rx="2" ry="3.5" fill="#EAEAEA" opacity="0.8" />
          </g>

          {/* ============================================================== */}
          {/* 6. KERATIN BEAK & EXPRESSION (NARES & MANDIBLE)                 */}
          {/* ============================================================== */}
          <g transform="translate(110, 116)">
            {/* Open Joyful Beak in Cheering / Explaining Mode */}
            {(mood === 'cheering' || mood === 'explaining') ? (
              <g>
                {/* Open Mouth Interior Depth */}
                <ellipse cx="0" cy="8" rx="9" ry="8" fill="#6C2D08" />
                {/* Pink Tongue */}
                <path d="M -5 10 Q 0 6 5 10 Q 0 14 -5 10 Z" fill="#FF8D66" />
                {/* Upper Mandible */}
                <path d="M -9 -5 Q 0 -9 9 -5 L 7 6 Q 0 10 -7 6 Z" fill={`url(#${uid}-beakHorn)`} filter={`url(#${uid}-shadow)`} />
                {/* Lower Mandible */}
                <path d="M -6 11 Q 0 16 6 11 L 4 14 Q 0 17 -4 14 Z" fill={`url(#${uid}-beakHorn)`} />
              </g>
            ) : (
              // Closed Dignified Scholar Beak
              <g>
                {/* Upper Mandible with Keratin Curvature */}
                <path d="M -9 -5 Q 0 -9 9 -5 L 7 13 Q 0 19 -7 13 Z" fill={`url(#${uid}-beakHorn)`} filter={`url(#${uid}-shadow)`} />
                {/* Nostril Nares */}
                <ellipse cx="-4" cy="-1" rx="0.9" ry="1.4" fill="#7E3A10" transform="rotate(-15 -4 -1)" />
                <ellipse cx="4" cy="-1" rx="0.9" ry="1.4" fill="#7E3A10" transform="rotate(15 4 -1)" />
                {/* Center Culmen Ridge Specular Highlight */}
                <path d="M 0 -6 L 0 15" stroke="#FFE2B8" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                {/* Gentle Smile Curve at Base */}
                <path d="M -5 14 Q 0 17 5 14" stroke="#8C3300" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* 7. OCEAN TEAL FLEECE HOODIE APPAREL                            */}
          {/* ============================================================== */}
          <g>
            {/* Main Fleece Torso */}
            <path
              d="M 50 152
                 C 50 138, 74 132, 110 132
                 C 146 132, 170 138, 170 152
                 L 178 198
                 C 178 206, 170 210, 158 210
                 L 62 210
                 C 50 210, 42 206, 42 198 Z"
              fill={`url(#${uid}-hoodieFleece)`}
              filter={`url(#${uid}-shadow)`}
            />

            {/* Volumetric Cowl Collar Roll */}
            <path
              d="M 70 140 C 88 156, 132 156, 150 140 C 158 154, 142 164, 110 164 C 78 164, 62 154, 70 140 Z"
              fill={`url(#${uid}-hoodieRibbed)`}
            />

            {/* Kangaroo Pouch Pocket */}
            <path
              d="M 72 178
                 L 148 178
                 L 154 200
                 C 150 203, 70 203, 66 200 Z"
              fill="#006C6C"
              stroke="#005353"
              strokeWidth="1.6"
            />
            {/* Pocket Double-Needle Seam Lines */}
            <path d="M 74 181 L 146 181" stroke="#009A9A" strokeWidth="1.2" strokeDasharray="2 3" />
            <line x1="72" y1="178" x2="66" y2="200" stroke="#009A9A" strokeWidth="1.5" />
            <line x1="148" y1="178" x2="154" y2="200" stroke="#009A9A" strokeWidth="1.5" />

            {/* Silver Metal Cord Grommets (Eyelets) */}
            <circle cx="98" cy="154" r="3.2" fill="#D9E2E8" stroke="#172935" strokeWidth="1" />
            <circle cx="98" cy="154" r="1.6" fill="#005353" />

            <circle cx="122" cy="154" r="3.2" fill="#D9E2E8" stroke="#172935" strokeWidth="1" />
            <circle cx="122" cy="154" r="1.6" fill="#005353" />

            {/* Braided Cotton Drawstrings with Pumpkin Aglet Dipped Tips */}
            <path d="M 98 156 Q 95 174 92 188" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <rect x="90.5" y="188" width="3.5" height="7" rx="1.7" fill="#FE7F2D" stroke="#CF5709" strokeWidth="0.8" />
            <line x1="91.5" y1="189" x2="91.5" y2="194" stroke="#FFA665" strokeWidth="0.8" />

            <path d="M 122 156 Q 125 174 128 188" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <rect x="126.5" y="188" width="3.5" height="7" rx="1.7" fill="#FE7F2D" stroke="#CF5709" strokeWidth="0.8" />
            <line x1="127.5" y1="189" x2="127.5" y2="194" stroke="#FFA665" strokeWidth="0.8" />

            {/* Ribbed Bottom Waistband Hem */}
            <path d="M 50 205 L 170 205" stroke={`url(#${uid}-hoodieRibbed)`} strokeWidth="5" strokeLinecap="round" />

            {/* Embroidered AP Calculus Crest: Golden Integral Symbol */}
            <g transform="translate(110, 172)">
              <circle cx="0" cy="0" r="8" fill="#005757" stroke={`url(#${uid}-goldFoil)`} strokeWidth="1.2" />
              <text x="0" y="4.5" fill={`url(#${uid}-goldFoil)`} fontSize="12" fontWeight="900" textAnchor="middle">
                ∫
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* 8. WINGS & INTERACTIVE ACTIONS (READING / CHEERING / IDLE)     */}
          {/* ============================================================== */}
          {mood === 'cheering' ? (
            // Cheering Wings Raised High with Layered Primary/Secondary Flight Feathers!
            <g>
              {/* Left Wing Fanned High */}
              <g filter={`url(#${uid}-shadow)`}>
                <path
                  d="M 52 152 C 22 126, 12 78, 26 56 C 36 72, 46 90, 50 102 C 52 86, 58 96, 60 114 L 60 154 Z"
                  fill={`url(#${uid}-owlFurGrad)`}
                />
                {/* Secondary Feather Scallops */}
                <path d="M 28 62 C 38 78, 48 94, 52 108" stroke="#FFA665" strokeWidth="2" fill="none" />
                <path d="M 38 78 C 48 92, 56 106, 58 122" stroke="#FFA665" strokeWidth="2" fill="none" />
              </g>

              {/* Right Wing Fanned High */}
              <g filter={`url(#${uid}-shadow)`}>
                <path
                  d="M 168 152 C 198 126, 208 78, 194 56 C 184 72, 174 90, 170 102 C 168 86, 162 96, 160 114 L 160 154 Z"
                  fill={`url(#${uid}-owlFurGrad)`}
                />
                <path d="M 192 62 C 182 78, 172 94, 168 108" stroke="#FFA665" strokeWidth="2" fill="none" />
                <path d="M 182 78 C 172 92, 164 106, 162 122" stroke="#FFA665" strokeWidth="2" fill="none" />
              </g>
            </g>
          ) : mood === 'reading' || mood === 'thinking' ? (
            // Hands Holding Open Illuminated Textbook with Gilded Pages
            <g transform="translate(110, 182)">
              <g transform="translate(-52, -12)">
                {/* Book Base Cover */}
                <rect x="0" y="0" width="104" height="38" rx="5" fill={`url(#${uid}-bookCover)`} filter={`url(#${uid}-shadow)`} />
                {/* Center Spine Crease */}
                <rect x="50" y="0" width="4" height="38" fill="#004242" />

                {/* Left Gilded Page Block */}
                <path d="M 6 4 L 48 4 L 48 34 L 6 34 Z" fill="#FFFDF8" stroke="#EAD3BE" strokeWidth="1" />
                {/* Right Gilded Page Block */}
                <path d="M 56 4 L 98 4 L 98 34 L 56 34 Z" fill="#FFFDF8" stroke="#EAD3BE" strokeWidth="1" />

                {/* Printed Math Formulas & Theorems */}
                <line x1="12" y1="10" x2="42" y2="10" stroke="#008080" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="12" y1="16" x2="36" y2="16" stroke="#D1B8A5" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="12" y1="22" x2="30" y2="22" stroke="#D1B8A5" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="12" y1="28" x2="40" y2="28" stroke="#D1B8A5" strokeWidth="1.6" strokeLinecap="round" />

                <line x1="62" y1="10" x2="92" y2="10" stroke="#FE7F2D" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="62" y1="16" x2="86" y2="16" stroke="#D1B8A5" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="62" y1="22" x2="76" y2="22" stroke="#D1B8A5" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="62" y1="28" x2="88" y2="28" stroke="#D1B8A5" strokeWidth="1.6" strokeLinecap="round" />

                {/* Satin Ribbon Bookmark in Pumpkin #FE7F2D */}
                <path d="M 50 0 L 50 42 L 46 39 L 42 42 L 42 0 Z" fill={`url(#${uid}-tasselSilk)`} />

                {/* Archie's Rounded Wing Paws Gripping Book Edges */}
                <circle cx="5" cy="20" r="7" fill="#DC8243" stroke="#6C2D08" strokeWidth="1" />
                <circle cx="99" cy="20" r="7" fill="#DC8243" stroke="#6C2D08" strokeWidth="1" />
              </g>
            </g>
          ) : mood === 'explaining' ? (
            // Left Arm Raised in Explanatory Gesture, Right Arm at Side
            <g>
              {/* Left Explaining Wing */}
              <path
                d="M 50 152 C 28 142, 18 120, 24 98 C 32 108, 44 122, 52 136 Z"
                fill={`url(#${uid}-owlFurGrad)`}
                filter={`url(#${uid}-shadow)`}
              />
              <circle cx="24" cy="98" r="6" fill="#DC8243" />
              {/* Right Wing Resting */}
              <path
                d="M 170 152 C 184 162, 188 184, 178 196 C 172 196, 166 188, 164 180 Z"
                fill={`url(#${uid}-owlFurGrad)`}
              />
              <circle cx="172" cy="194" r="5.5" fill="#AF5C26" />
            </g>
          ) : (
            // Default Resting Wings at Sides with Layered Primaries
            <g>
              {/* Left Wing */}
              <path
                d="M 50 152 C 34 162, 30 186, 42 198 C 48 198, 54 190, 56 180 Z"
                fill={`url(#${uid}-owlFurGrad)`}
              />
              <circle cx="48" cy="196" r="5.5" fill="#AF5C26" />

              {/* Right Wing */}
              <path
                d="M 170 152 C 186 162, 190 186, 178 198 C 172 198, 166 190, 164 180 Z"
                fill={`url(#${uid}-owlFurGrad)`}
              />
              <circle cx="172" cy="196" r="5.5" fill="#AF5C26" />
            </g>
          )}

          {/* ============================================================== */}
          {/* 9. TALONS & FEET GROUNDED (PUMPKIN #FE7F2D KERATIN)           */}
          {/* ============================================================== */}
          <g transform="translate(110, 210)">
            {/* Left Foot: 3 Talons with Nails */}
            <path d="M -26 0 L -31 7 L -22 7 Z" fill="#FE7F2D" stroke="#CF5709" strokeWidth="0.8" />
            <path d="M -20 0 L -22 8 L -15 8 Z" fill="#FFA665" stroke="#CF5709" strokeWidth="0.8" />
            <path d="M -14 0 L -14 7 L -9 7 Z" fill="#FE7F2D" stroke="#CF5709" strokeWidth="0.8" />

            {/* Right Foot: 3 Talons with Nails */}
            <path d="M 14 0 L 9 7 L 14 7 Z" fill="#FE7F2D" stroke="#CF5709" strokeWidth="0.8" />
            <path d="M 20 0 L 15 8 L 22 8 Z" fill="#FFA665" stroke="#CF5709" strokeWidth="0.8" />
            <path d="M 26 0 L 22 7 L 31 7 Z" fill="#FE7F2D" stroke="#CF5709" strokeWidth="0.8" />
          </g>
        </svg>
      </motion.div>

      {/* Stacked Hardcover Textbooks Pedestal (When withPedestal is true) */}
      {withPedestal && (
        <div className="flex flex-col items-center -mt-2 pointer-events-none">
          {/* Top Volume: AP Calculus BC (Ocean Teal #008080) */}
          <div className="w-30 sm:w-34 h-4.5 bg-[#008080] rounded-sm border-2 border-[#005a5a] shadow-xs relative flex items-center justify-between px-2 transform -rotate-1">
            <span className="w-10 h-1 bg-white/40 rounded-full" />
            <span className="font-mono text-[8px] font-black text-white/95 tracking-wider">AP CALC BC</span>
            <span className="w-2.5 h-4.5 bg-[#FE7F2D] rounded-xs shadow-xs -mr-1" />
          </div>

          {/* Middle Volume: AP Physics Mechanics (Pumpkin #FE7F2D) */}
          <div className="w-34 sm:w-38 h-4.5 bg-[#FE7F2D] rounded-sm border-2 border-[#cf5c15] shadow-xs relative flex items-center justify-between px-2 transform rotate-1 -mt-0.5">
            <span className="w-12 h-1 bg-white/40 rounded-full" />
            <span className="font-mono text-[8px] font-black text-white/95 tracking-wider">PHYSICS C</span>
            <span className="w-2.5 h-4.5 bg-[#008080] rounded-xs shadow-xs -ml-1" />
          </div>

          {/* Bottom Volume: Real Analysis & Proofs (Charcoal #233D4D) */}
          <div className="w-36 sm:w-42 h-5 bg-[#233D4D] rounded-sm border-2 border-[#14242e] shadow-md relative flex items-center justify-between px-2 -mt-0.5">
            <span className="w-14 h-1 bg-white/30 rounded-full" />
            <span className="font-mono text-[8px] font-black text-[#F4E1D2] tracking-wider">ANALYSIS & PROOFS</span>
            <span className="w-3 h-2 bg-[#FE7F2D] rounded-xs" />
          </div>
        </div>
      )}

      {/* Dynamic Ground Contact Shadow */}
      <motion.div
        animate={
          isJumping || mood === 'cheering'
            ? { scale: [1, 0.65, 1], opacity: [0.38, 0.1, 0.38] }
            : { scale: [1, 0.88, 1], opacity: [0.38, 0.24, 0.38] }
        }
        transition={{ duration: isJumping || mood === 'cheering' ? 0.62 : 3.4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-30 sm:w-40 h-3.5 bg-[#233D4D]/25 rounded-full blur-[3.5px] mt-1 pointer-events-none"
      />
    </div>
  );
};
