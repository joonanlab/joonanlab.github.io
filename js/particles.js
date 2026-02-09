/* === Particle Constellation + Attention Hero Canvas === */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height, animId;
  let mouseX = -1000, mouseY = -1000;
  let particles = [];
  let attentionPairs = [];
  let lastAttentionTime = 0;

  const CRIMSON = [212, 59, 86];
  const GOLD = [245, 197, 66];
  const WHITE = [255, 255, 255];
  const PARTICLE_COUNT = 90;
  const CONNECTION_DIST = 150;
  const MOUSE_RADIUS = 200;
  const ATTENTION_INTERVAL = 2500;
  const ATTENTION_DURATION = 1800;
  const ATTENTION_PAIRS = 4;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const useGold = Math.random() < 0.3;
      const color = useGold ? GOLD : CRIMSON;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.4 + 0.2,
        color: color,
        attentionGlow: 0,
      });
    }
  }

  function pickAttentionPairs() {
    attentionPairs = [];
    for (let k = 0; k < ATTENTION_PAIRS; k++) {
      const a = Math.floor(Math.random() * PARTICLE_COUNT);
      let b = Math.floor(Math.random() * PARTICLE_COUNT);
      while (b === a) b = Math.floor(Math.random() * PARTICLE_COUNT);
      attentionPairs.push([a, b]);
    }
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    // Refresh attention pairs periodically
    if (time - lastAttentionTime > ATTENTION_INTERVAL) {
      pickAttentionPairs();
      lastAttentionTime = time;
    }

    // Attention progress (0 → 1 → 0)
    const attElapsed = time - lastAttentionTime;
    const attProgress = Math.min(attElapsed / ATTENTION_DURATION, 1);
    const attAlpha = Math.sin(attProgress * Math.PI);

    // Mark attention particles
    particles.forEach(p => { p.attentionGlow = 0; });
    attentionPairs.forEach(([a, b]) => {
      particles[a].attentionGlow = Math.max(particles[a].attentionGlow, attAlpha);
      particles[b].attentionGlow = Math.max(particles[b].attentionGlow, attAlpha);
    });

    const CONN_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

    // Update positions
    particles.forEach(p => {
      const dmx = mouseX - p.x;
      const dmy = mouseY - p.y;
      const mouseDistSq = dmx * dmx + dmy * dmy;
      if (mouseDistSq < MOUSE_RADIUS_SQ && mouseDistSq > 0) {
        const mouseDist = Math.sqrt(mouseDistSq);
        const force = (MOUSE_RADIUS - mouseDist) / MOUSE_RADIUS * 0.02;
        p.speedX += dmx / mouseDist * force;
        p.speedY += dmy / mouseDist * force;
      }

      p.speedX *= 0.99;
      p.speedY *= 0.99;
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    });

    // Draw base connections (batched)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(212, 59, 86, 0.1)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < CONN_DIST_SQ) {
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
        }
      }
    }
    ctx.stroke();

    // Mouse connections (batched)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(245, 197, 66, 0.15)';
    ctx.lineWidth = 0.6;
    for (let i = 0; i < particles.length; i++) {
      const dmx = mouseX - particles[i].x;
      const dmy = mouseY - particles[i].y;
      const mouseDistSq = dmx * dmx + dmy * dmy;
      if (mouseDistSq < MOUSE_RADIUS_SQ) {
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
      }
    }
    ctx.stroke();

    // Draw attention connections (bright gold beams)
    attentionPairs.forEach(([a, b]) => {
      const pa = particles[a];
      const pb = particles[b];
      const beamAlpha = attAlpha * 0.35;

      if (beamAlpha > 0.01) {
        // Traveling pulse along the beam
        const pulsePos = attProgress;
        const pulseX = pa.x + (pb.x - pa.x) * pulsePos;
        const pulseY = pa.y + (pb.y - pa.y) * pulsePos;

        // Beam line
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(245, 197, 66, ${beamAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Traveling pulse dot
        const pulseSize = 2.5 * attAlpha;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${attAlpha * 0.7})`;
        ctx.fill();

        // Pulse glow
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 197, 66, ${attAlpha * 0.12})`;
        ctx.fill();
      }
    });

    // Draw particles
    particles.forEach(p => {
      const flicker = Math.sin(time * 0.001 + p.x * 0.01) * 0.1;
      const baseAlpha = Math.max(0, Math.min(1, p.opacity + flicker));
      const [r, g, b] = p.color;

      // Attention glow boost
      const glowBoost = p.attentionGlow;
      const finalAlpha = Math.min(1, baseAlpha + glowBoost * 0.4);
      const finalSize = p.size + glowBoost * 2;

      ctx.beginPath();
      ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
      ctx.fill();

      // Glow ring for attention-active or large particles
      if (glowBoost > 0.1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 197, 66, ${glowBoost * 0.08})`;
        ctx.fill();

        // Outer ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 197, 66, ${glowBoost * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else if (p.size > 2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha * 0.1})`;
        ctx.fill();
      }
    });

    animId = requestAnimationFrame(animate);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  window.addEventListener('resize', resize);
  resize();
  animId = requestAnimationFrame(animate);
})();
