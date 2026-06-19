'use client'

/**
 * ConstellationHero — full-bleed dark hero with a mouse-reactive constellation
 * canvas behind the headline. Decorative; aria-hidden on the canvas itself.
 *
 * Performance / accessibility:
 *   - Honors prefers-reduced-motion: paints once, no rAF loop
 *   - Reduces node count on viewports < 768px (~30% off)
 *   - Cleans up rAF + listeners on unmount
 */

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useLang } from '@/contexts/LangContext'
import { AN_TOKENS } from '@/lib/redesign-tokens'

const NODE_COUNT_DESKTOP = 90
const NODE_COUNT_MOBILE = 63 // ~30% reduction per handoff

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  tier: 1 | 2 | 3
  phase: number
}

export function ConstellationHero() {
  const { lang } = useLang()
  const { resolvedTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const showCanvas = !mounted || resolvedTheme === 'dark'
  // Themed ink color used for connecting lines and dim nodes. We read it via
  // a ref so the existing rAF-driven draw loop picks up changes without
  // having to be torn down and rebuilt on every theme toggle.
  const inkRef = useRef<{ r: number; g: number; b: number }>({ r: 245, g: 239, b: 227 })
  // Hook for the canvas effect to register a one-shot repaint, used so a
  // theme change can force a redraw even when prefers-reduced-motion has
  // disabled the rAF loop.
  const repaintRef = useRef<() => void>(() => {})

  useEffect(() => {
    // 245,239,227 = warm cream (an-dark-ink) for the dark backdrop
    //  26, 20, 16 = warm near-black (an-light-ink) for the cream backdrop
    inkRef.current =
      resolvedTheme === 'dark' ? { r: 245, g: 239, b: 227 } : { r: 26, g: 20, b: 16 }
    repaintRef.current()
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let raf = 0
    let t = 0
    let nodes: Node[] = []
    let edges: [number, number][] = []
    const mouse = { x: -9999, y: -9999 }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function init() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const N = w < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP
      nodes = []
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: 0.8 + Math.random() * 2.2,
          tier: Math.random() > 0.85 ? 1 : Math.random() > 0.5 ? 2 : 3,
          phase: Math.random() * Math.PI * 2,
        })
      }

      edges = []
      for (let i = 0; i < N; i++) {
        const dists: { j: number; d: number }[] = []
        for (let j = 0; j < N; j++) {
          if (i === j) continue
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          dists.push({ j, d: dx * dx + dy * dy })
        }
        dists.sort((a, b) => a.d - b.d)
        const k = 1 + Math.floor(Math.random() * 3)
        for (let m = 0; m < k; m++) {
          if (dists[m].d < 80000) edges.push([i, dists[m].j])
        }
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      const g = ctx.createRadialGradient(w * 0.5, h * 0.4, 100, w * 0.5, h * 0.5, w)
      g.addColorStop(0, 'rgba(196, 30, 58, 0.05)')
      g.addColorStop(1, 'rgba(15, 14, 13, 0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const d2 = dx * dx + dy * dy
          if (d2 < 30000 && d2 > 100) {
            const d = Math.sqrt(d2)
            n.x += (dx / d) * 0.3
            n.y += (dy / d) * 0.3
          }
        }
      }

      const ink = inkRef.current
      for (const [a, b] of edges) {
        const A = nodes[a]
        const B = nodes[b]
        const dx = A.x - B.x
        const dy = A.y - B.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d > 280) continue
        const alpha = (1 - d / 280) * 0.35
        ctx.strokeStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${alpha})`
        ctx.lineWidth = 0.7
        ctx.beginPath()
        ctx.moveTo(A.x, A.y)
        ctx.lineTo(B.x, B.y)
        ctx.stroke()
      }

      for (const n of nodes) {
        const pulse = reduceMotion ? 0.5 : (Math.sin(t * 0.0015 + n.phase) + 1) / 2
        const baseAlpha = n.tier === 1 ? 1 : n.tier === 2 ? 0.7 : 0.35
        if (n.tier === 1) {
          const gg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18)
          gg.addColorStop(0, `rgba(196, 30, 58, ${0.5 + pulse * 0.3})`)
          gg.addColorStop(1, 'rgba(196, 30, 58, 0)')
          ctx.fillStyle = gg
          ctx.beginPath()
          ctx.arc(n.x, n.y, 18, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = AN_TOKENS.red
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 1, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${baseAlpha * (0.7 + pulse * 0.3)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduceMotion) {
        t += 16
        raf = requestAnimationFrame(draw)
      }
    }

    init()
    draw()
    // Expose draw() so the theme-change effect can request a one-shot
    // repaint when the rAF loop is disabled (prefers-reduced-motion).
    repaintRef.current = () => draw()

    const onMove = (e: MouseEvent) => {
      if (!canvas) return
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onResize = () => {
      cancelAnimationFrame(raf)
      init()
      draw()
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--an-surface-bg)',
        color: 'var(--an-surface-ink)',
        minHeight: '92vh',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          cursor: showCanvas ? 'crosshair' : 'default',
          opacity: showCanvas ? 1 : 0,
          pointerEvents: showCanvas ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Vertical gradient over canvas */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(15,14,13,0.4) 0%, rgba(15,14,13,0) 30%, rgba(15,14,13,0) 70%, rgba(15,14,13,0.7) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 32px) 60px',
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            fontFamily: AN_TOKENS.fontMono,
            fontSize: 11,
            color: 'var(--an-surface-ink-soft)',
            letterSpacing: 2,
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ width: 32, height: 1, background: AN_TOKENS.red }} />
          {lang === 'ko'
            ? 'AN Lab · AI for Nature · 고려대학교'
            : 'AN Lab · AI for Nature · Korea University'}
        </div>

        {/* Headline block */}
        <div>
          {lang === 'ko' ? (
            <h1
              style={{
                fontFamily: AN_TOKENS.fontSerif,
                fontSize: 'clamp(44px, 9vw, 132px)',
                fontWeight: 300,
                letterSpacing: 'clamp(-2px, -0.4vw, -5px)',
                lineHeight: 0.92,
                margin: '0 0 32px',
                color: 'var(--an-surface-ink)',
                maxWidth: 1200,
                textWrap: 'balance',
              }}
            >
              기계와 함께,
              <br />
              <em
                style={{
                  color: AN_TOKENS.red,
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                생명의
              </em>{' '}
              언어를
              <br />
              <em
                style={{
                  color: AN_TOKENS.gold,
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                읽는 일.
              </em>
            </h1>
          ) : (
            <h1
              style={{
                fontFamily: AN_TOKENS.fontSerif,
                fontSize: 'clamp(56px, 11vw, 156px)',
                fontWeight: 300,
                letterSpacing: 'clamp(-2px, -0.4vw, -6px)',
                lineHeight: 0.85,
                margin: '0 0 32px',
                color: 'var(--an-surface-ink)',
                maxWidth: 1200,
                textWrap: 'balance',
              }}
            >
              Reading the
              <br />
              language of
              <br />
              <em style={{ color: AN_TOKENS.red, fontStyle: 'italic', fontWeight: 400 }}>life,</em>{' '}
              with
              <br />
              <em style={{ color: AN_TOKENS.gold, fontStyle: 'italic', fontWeight: 400 }}>
                machines.
              </em>
            </h1>
          )}

          <div style={{ marginBottom: 40 }} />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', pointerEvents: 'auto' }}>
            <a
              href="/research"
              style={{
                padding: '14px 28px',
                background: AN_TOKENS.red,
                color: 'white',
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {lang === 'ko' ? '연구실 둘러보기 →' : 'Explore the lab →'}
            </a>
            <a
              href="/publications"
              style={{
                padding: '14px 28px',
                background: 'transparent',
                color: 'var(--an-surface-ink)',
                border: `1px solid ${'var(--an-surface-line)'}`,
                fontFamily: AN_TOKENS.fontSans,
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {lang === 'ko' ? '최신 논문' : 'Latest paper'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
