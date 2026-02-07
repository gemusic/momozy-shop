import React from 'react';
import { motion } from 'framer-motion';

interface ScratchAnimationProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  className?: string;
  intensity?: 'light' | 'medium' | 'brutal';
}

export function ScratchAnimation({ 
  children, 
  direction = 'left', 
  delay = 0, 
  className = '',
  intensity = 'medium'
}: ScratchAnimationProps) {
  
  // Configuration des intensités d'animation
  const intensityConfig = {
    light: { distance: 100, rotation: 3, scale: 0.95, damping: 30, stiffness: 120 },
    medium: { distance: 200, rotation: 6, scale: 0.8, damping: 25, stiffness: 100 },
    brutal: { distance: 300, rotation: 12, scale: 0.7, damping: 20, stiffness: 80 }
  };

  const config = intensityConfig[intensity];

  // Configuration des directions
  const getInitialTransform = () => {
    const randomRotation = Math.random() > 0.5 ? config.rotation : -config.rotation;
    
    switch (direction) {
      case 'left':
        return { x: -config.distance, rotate: randomRotation };
      case 'right':
        return { x: config.distance, rotate: randomRotation };
      case 'top':
        return { y: -config.distance, rotate: randomRotation };
      case 'bottom':
        return { y: config.distance, rotate: randomRotation };
      default:
        return { x: -config.distance, rotate: randomRotation };
    }
  };

  const getFinalTransform = () => {
    const finalRotation = Math.random() > 0.5 ? 2 : -2; // Légère inclinaison finale
    return { x: 0, y: 0, rotate: finalRotation };
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: config.scale,
        ...getInitialTransform()
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        ...getFinalTransform()
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        damping: config.damping,
        stiffness: config.stiffness,
        duration: 0.8,
        delay: delay
      }}
      whileHover={{
        rotate: 0, // Se redresse au hover
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
}

// Composant pour les animations de grille avec effet décalé
interface ScratchGridProps {
  children: React.ReactNode[];
  className?: string;
  intensity?: 'light' | 'medium' | 'brutal';
  staggerDelay?: number;
}

export function ScratchGrid({ 
  children, 
  className = '', 
  intensity = 'medium',
  staggerDelay = 0.1 
}: ScratchGridProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScratchAnimation
          key={index}
          direction={index % 2 === 0 ? 'left' : 'right'}
          delay={index * staggerDelay}
          intensity={intensity}
        >
          {child}
        </ScratchAnimation>
      ))}
    </div>
  );
}