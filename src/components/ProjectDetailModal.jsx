import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBorder from './AnimatedBorder';
import FocusTrap from 'focus-trap-react';

export default function ProjectDetailModal({ project, onClose, originRect }) {
  const modalRef = useRef(null);
  const { slug } = project;
  // Ref and state for measuring actual modal dimensions & radius
  const detailRef = useRef(null);
  const [modalSize, setModalSize] = useState({ width: 0, height: 0, borderRadius: 16 });
  useEffect(() => {
    if (!detailRef.current) return;
    const node = detailRef.current;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const style = getComputedStyle(node);
        const br = parseFloat(style.borderRadius) || 16;
        setModalSize({ width, height, borderRadius: br });
      }
    });
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, [detailRef]);
  // Determine stroke width: 4px default, 2px on narrow modals
  const strokeWidth = modalSize.width < 400 ? 2 : 4;

  // Compute transform-origin based on clicked card position
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');
  useLayoutEffect(() => {
    if (!originRect) return;
    const x = originRect.x + originRect.width / 2;
    const y = originRect.y + originRect.height / 2;
    setTransformOrigin(`${x}px ${y}px`);
  }, [originRect]);

  // Burst effect on mount with unique animation per project
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = modalRef.current;
    if (!container) return;
    let isMounted = true;
    const launchBursts = async () => {
      try {
        const mojs = (await import('@mojs/core')).default;
        const bursts = [];
        switch (slug) {
          case 'animated-card-sports':
            bursts.push(new mojs.Burst({
              parent: container,
              radius: { 0: 100 },
              count: 15,
              children: {
                shape: 'polygon',
                points: 6,
                fill: ['#00eaff', '#00ff85', '#6f00ff'],
                radius: { 10: 0 },
                duration: 800,
                easing: 'quad.out'
              }
            }));
            break;
          case 'sample-animated-card':
            bursts.push(new mojs.Burst({
              parent: container,
              shape: 'circle',
              count: 18,
              radius: { 0: 120 },
              fill: ['#00cfff', '#5f5fff', '#e0e0e0'],
              children: { duration: 1200, easing: 'cubic.out', stroke: '#5f5fff', strokeWidth: 2 }
            }));
            bursts.push(new mojs.Burst({
              parent: container,
              shape: 'rect',
              count: 8,
              radius: { 0: 80 },
              fill: '#e0e0e0',
              delay: 200
            }));
            break;
          case 'animated-card-copy':
            bursts.push(new mojs.Burst({
              parent: container,
              shape: 'star',
              points: 5,
              count: 10,
              radius: { 0: 140 },
              degreeShift: 'stagger(0,10)',
              fill: ['#ffe066', '#a259ff', '#ff6f91', '#34d399', '#38bdf8'],
              duration: 1000
            }));
            bursts.push(new mojs.Burst({
              parent: container,
              shape: 'circle',
              count: 16,
              radius: { 0: 100 },
              fill: '#ffffff',
              delay: 200,
              duration: 800
            }));
            bursts.push(new mojs.Burst({
              parent: container,
              shape: 'polygon',
              points: 7,
              count: 7,
              radius: { 0: 80 },
              fill: '#a259ff',
              delay: 400,
              duration: 800
            }));
            break;
          default:
            bursts.push(new mojs.Burst({
              parent: container,
              radius: { 0: 100 },
              count: 15,
              children: {
                shape: 'circle',
                fill: ['#f472b6', '#818cf8', '#facc15', '#34d399', '#38bdf8'],
                radius: { 10: 0 },
                duration: 800,
                easing: 'quad.out'
              }
            }));
        }
        console.log('Modal slug:', slug, 'ref:', container);
        bursts.forEach((b, i) => {
          const delay = b.opts?.delay || 0;
          setTimeout(() => { if (isMounted) b.play(); }, delay);
        });
      } catch (err) {
        console.error('mo.js burst error:', err);
      }
    };
    launchBursts();
    return () => { isMounted = false; };
  }, [slug]);

  // Handle Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const { data, body } = project;
  const { title, thumbnail, shortDesc, problemStatement, techStack = [], links = {} } = data;

  // Determine thumbnail source
  let imgSrc = '';
  if (thumbnail) {
    if (typeof thumbnail === 'object' && thumbnail.src) {
      imgSrc = thumbnail.src;
    } else if (typeof thumbnail === 'string' && thumbnail.startsWith('/')) {
      imgSrc = thumbnail;
    } else if (typeof thumbnail === 'string') {
      imgSrc = `/src/assets/project-thumbnails/${thumbnail.replace(/^.*[\\/]/, '')}`;
    }
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg"
        style={{ perspective: '1000px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
          <motion.div
            ref={detailRef}
          className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-sm max-h-[80vh] flex flex-col"
          style={{ transformOrigin }}
          initial={{ scale: 0.5, opacity: 0, rotateY: 90, rotateX: -8 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0, rotateX: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateY: 90, rotateX: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Animated game-like border */}
        <AnimatedBorder
          slug={slug}
          width={modalSize.width}
          height={modalSize.height}
          borderRadius={modalSize.borderRadius}
          strokeWidth={strokeWidth}
        />
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary hover:text-accent-red"
            aria-label="Close Modal"
          >
            ✕
          </button>

          {/* Content */}
          <div
            className="overflow-y-auto max-h-full"
            style={{ padding: `calc(1.5rem + ${strokeWidth}px)` }}
          >
          <article className="space-y-4 text-primary">
            <header className="text-center space-y-2">
              <h2 className="text-3xl font-heading font-bold">{title}</h2>
              <p className="text-sm text-secondary">{shortDesc}</p>
            </header>

            {imgSrc && (
              <img
                src={imgSrc}
                alt={`Thumbnail for ${title}`}
                className="w-full h-auto rounded-md shadow-lg"
              />
            )}

            {body && (
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: body }} />
              </div>
            )}

            {problemStatement && (
              <section>
                <h3 className="text-xl font-semibold">Problem / Solution</h3>
                <p>{problemStatement}</p>
              </section>
            )}

            {techStack.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold">Tech Stack</h3>
                <ul className="list-disc list-inside">
                  {techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </section>
            )}

            {(links.live || links.repo) && (
              <footer className="flex gap-4 justify-center mt-4">
                {links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-accent-green text-black rounded hover:opacity-90"
                  >
                    Live Demo
                  </a>
                )}
                {links.repo && (
                  <a
                    href={links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-accent-magenta text-black rounded hover:opacity-90"
                  >
                    GitHub Repo
                  </a>
                )}
              </footer>
            )}
          </article>

          </div>
          {/* Decorative Animations */}
          <style jsx>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 10s ease infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-16px); }
            }
            .animate-float { animation: float 3s ease-in-out infinite; }
            @keyframes float2 {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(12px); }
            }
            .animate-float2 { animation: float2 4s ease-in-out infinite; }
            @keyframes float3 {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .animate-float3 { animation: float3 2.5s ease-in-out infinite; }
          `}</style>
          </motion.div>
        </FocusTrap>
    </motion.div>
    </AnimatePresence>,
    document.body
  );
}