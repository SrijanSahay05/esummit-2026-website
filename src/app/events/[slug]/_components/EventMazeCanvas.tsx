'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import type { MazeGhost } from '@/types/event'

// Logical canvas resolution — all drawing happens in this coordinate space
const LW = 680
const LH = 200
const S = 8  // px per cell at logical resolution
const COLS = Math.floor(LW / S)  // 85
const ROWS = Math.floor(LH / S)  // 25

type Cell = 1 | 0 | 'd' | 'p'

function buildMaze(): Cell[][] {
  const maze: Cell[][] = Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c): Cell => {
      if (r === 0 || r === ROWS - 1) return 1
      if (c === 0 || c === COLS - 1) return 1
      if (
        (r === 4 || r === 8 || r === 12 || r === 16 || r === 20) &&
        c % 10 < 7 &&
        c > 2 &&
        c < COLS - 3
      )
        return 1
      if (
        (c === 10 || c === 22 || c === 34 || c === 46 || c === 58 || c === 70) &&
        r > 1 &&
        r < ROWS - 2 &&
        !(r === 4 || r === 8 || r === 12 || r === 16 || r === 20)
      )
        return 1
      if (r >= 9 && r <= 15 && c >= 26 && c <= 32) return 1
      if (r >= 9 && r <= 15 && c >= 52 && c <= 58) return 1
      return 'd'
    })
  )

  // Power pellets
  ;([
    [2, 2],
    [2, 82],
    [22, 2],
    [22, 82],
    [12, 42],
  ] as [number, number][]).forEach(([r, c]) => {
    if (maze[r]?.[c]) maze[r][c] = 'p'
  })

  // Thin out dots randomly (seeded pattern — use modulo for consistency)
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (maze[r][c] === 'd' && (r * COLS + c) % 3 === 0) maze[r][c] = 0

  return maze
}

function isWall(maze: Cell[][], tx: number, ty: number): boolean {
  const r = Math.round(ty)
  const c = Math.round(tx)
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return true
  return maze[r]?.[c] === 1
}

interface GhostState {
  x: number
  y: number
  dx: number
  dy: number
  color: string
  label: string
}

export default function EventMazeCanvas({ ghosts }: { ghosts: MazeGhost[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    // Scale canvas to fill container while drawing at logical LW×LH
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      const displayW = container.clientWidth
      const displayH = container.clientHeight
      canvas.width = displayW * dpr
      canvas.height = displayH * dpr
      canvas.style.width = `${displayW}px`
      canvas.style.height = `${displayH}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale((displayW * dpr) / LW, (displayH * dpr) / LH)
    }

    const ro = new ResizeObserver(resizeCanvas)
    ro.observe(container)
    resizeCanvas()

    const maze = buildMaze()

    let pacX = 3.5
    const pacY = 10.5
    let pacDir = 1
    let pacMouth = 0
    const pacSpeed = 0.07

    const ghostStates: GhostState[] = [
      { x: 36, y: 6, dx: 1, dy: 0, color: '#FF2222', label: '' },
      { x: 44, y: 18, dx: -1, dy: 0, color: '#FFB840', label: '' },
      { x: 60, y: 10, dx: 0, dy: 1, color: '#00CCFF', label: '' },
      { x: 20, y: 14, dx: 1, dy: 0, color: '#FF66BB', label: '' },
    ]

    // Override with prop data
    ghosts.forEach((g, i) => {
      if (ghostStates[i]) {
        ghostStates[i].color = g.color
        ghostStates[i].label = g.name
      }
    })

    const eatTrail: { x: number; y: number; life: number }[] = []
    let frame = 0
    let animId: number

    function drawWall(x: number, y: number) {
      const px = x * S
      const py = y * S
      ctx.fillStyle = '#1A3A8A'
      ctx.fillRect(px, py, S, S)
      ctx.fillStyle = '#2255CC'
      ctx.fillRect(px, py, S, 2)
      ctx.fillRect(px, py, 2, S)
    }

    function drawDot(x: number, y: number) {
      ctx.fillStyle = '#FFD700'
      ctx.globalAlpha = 0.75
      ctx.fillRect(Math.floor(x * S + S / 2 - 1), Math.floor(y * S + S / 2 - 1), 2, 2)
      ctx.globalAlpha = 1
    }

    function drawPower(x: number, y: number) {
      const pulse = 0.6 + 0.4 * Math.sin(frame * 0.1)
      ctx.fillStyle = '#FFD700'
      ctx.globalAlpha = pulse
      ctx.fillRect(x * S + 2, y * S + 2, 4, 4)
      ctx.globalAlpha = 0.3 * pulse
      ctx.fillRect(x * S, y * S, 8, 8)
      ctx.globalAlpha = 1
    }

    function drawPacman(cx: number, cy: number, mouth: number, facingRight: boolean) {
      const px = Math.floor(cx * S)
      const py = Math.floor(cy * S)
      const sz = S * 2
      const half = sz / 2

      ctx.save()
      ctx.translate(px + half, py + half)
      if (!facingRight) ctx.scale(-1, 1)

      const openAng = (mouth / 90) * (Math.PI / 2)

      ctx.shadowColor = '#FFD700'
      ctx.shadowBlur = 10
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, half - 1, openAng, Math.PI * 2 - openAng)
      ctx.closePath()
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.arc(2, -half * 0.45, 1.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    function drawGhost(g: GhostState, index: number) {
      const px = Math.floor(g.x * S)
      const py = Math.floor(g.y * S)
      const w = S * 2
      const bob = Math.sin(frame * 0.08 + index * 1.4) * 1.5

      ctx.save()
      ctx.translate(0, bob)
      ctx.shadowColor = g.color
      ctx.shadowBlur = 8
      ctx.fillStyle = g.color

      ctx.beginPath()
      ctx.arc(px + w / 2, py + w / 2 - 2, w / 2 - 1, Math.PI, 0)
      ctx.lineTo(px + w - 1, py + w - 1)
      const steps = 4
      const sw = w / steps
      for (let i = steps; i >= 0; i--) {
        const bx = px + i * sw
        const by = py + w - 1 + (i % 2 === 0 ? 4 : 0)
        ctx.lineTo(bx, by)
      }
      ctx.closePath()
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.fillStyle = '#FFFFFF'
      ;[px + w * 0.3, px + w * 0.65].forEach(ex => {
        ctx.beginPath()
        ctx.arc(ex, py + w * 0.38, 3, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.fillStyle = '#0033FF'
      ;[px + w * 0.3 + 1, px + w * 0.65 + 1].forEach(ex => {
        ctx.beginPath()
        ctx.arc(ex, py + w * 0.38 + 1, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()

      // Label
      if (g.label) {
        ctx.font = '5px "Press Start 2P", monospace'
        ctx.fillStyle = g.color
        ctx.textAlign = 'center'
        ctx.fillText(g.label, (g.x + 1) * S, (g.y - 0.2) * S)
      }
    }

    function tick() {
      frame++

      // Pac-Man movement
      const nextX = pacX + pacDir * pacSpeed
      if (!isWall(maze, nextX + pacDir * 0.9, pacY) && nextX > 1 && nextX < COLS - 3) {
        pacX = nextX
      } else {
        pacDir = -pacDir
      }
      if (pacX >= COLS - 3) pacDir = -1
      if (pacX <= 1.5) pacDir = 1

      pacMouth = Math.abs(Math.sin(frame * 0.18)) * 35

      // Eat dots
      const tc = Math.round(pacX + 0.5)
      const tr = Math.round(pacY)
      if (maze[tr]?.[tc] === 'd' || maze[tr]?.[tc] === 'p') {
        maze[tr][tc] = 0
        eatTrail.push({ x: tc, y: tr, life: 12 })
      }
      for (let i = eatTrail.length - 1; i >= 0; i--) {
        eatTrail[i].life--
        if (eatTrail[i].life <= 0) eatTrail.splice(i, 1)
      }

      // Ghost movement
      ghostStates.forEach((g, i) => {
        const speed = 0.03 + i * 0.005
        const nx = g.x + g.dx * speed
        const ny = g.y + g.dy * speed

        const bounceX = isWall(maze, nx + g.dx * 1.2, g.y) || nx < 1 || nx > COLS - 3
        const bounceY = isWall(maze, g.x, ny + g.dy * 1.2) || ny < 1 || ny > ROWS - 3

        if (bounceX) { g.dx = -g.dx; g.x += g.dx * speed * 2 }
        else g.x = nx

        if (bounceY) { g.dy = -g.dy; g.y += g.dy * speed * 2 }
        else g.y = ny

        if (frame % (80 + i * 30) === 0) {
          if (Math.random() < 0.5) { g.dx = Math.random() < 0.5 ? 1 : -1; g.dy = 0 }
          else { g.dy = Math.random() < 0.5 ? 1 : -1; g.dx = 0 }
        }
      })
    }

    function render() {
      ctx.fillStyle = '#06060A'
      ctx.fillRect(0, 0, LW, LH)

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = maze[r][c]
          if (cell === 1) drawWall(c, r)
          else if (cell === 'd') drawDot(c, r)
          else if (cell === 'p') drawPower(c, r)
        }
      }

      eatTrail.forEach(e => {
        ctx.fillStyle = '#FFFFFF'
        ctx.globalAlpha = (e.life / 12) * 0.5
        ctx.fillRect(e.x * S - 2, e.y * S - 2, S + 4, S + 4)
        ctx.globalAlpha = 1
      })

      drawPacman(pacX - 1, pacY - 1, pacMouth, pacDir === 1)
      ghostStates.forEach((g, i) => drawGhost(g, i))

      // Canvas scanline tint
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      for (let y = 0; y < LH; y += 4) {
        ctx.fillRect(0, y, LW, 1)
      }
    }

    function loop() {
      tick()
      render()
      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [prefersReducedMotion, ghosts])

  const zoneStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    background: '#06060A',
    borderBottom: '3px solid #FFD700',
    height: 'clamp(90px, 22vw, 180px)',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  if (prefersReducedMotion) {
    return (
      <div style={zoneStyle} role="img" aria-label="Pac-Man maze (animation paused)">
        <span
          className="font-pixel"
          style={{ fontSize: 'clamp(8px, 1.8vw, 11px)', color: '#1A3A8A' }}
        >
          ◦ ◦ ◦ MAZE PAUSED ◦ ◦ ◦
        </span>
      </div>
    )
  }

  return (
    <div ref={containerRef} style={zoneStyle}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', imageRendering: 'pixelated', width: '100%', height: '100%' }}
        role="img"
        aria-label="Animated Pac-Man maze"
      />
    </div>
  )
}
