import dynamic from "next/dynamic"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { RayType } from "../@types"
import HoverBar from "../components/HoverBar"
import useWindowSize from "../hooks/useWindowSize"

const Scene = dynamic(() => import("../components/Scene"), { ssr: false })
const Minimap = dynamic(() => import("../components/Minimap"), { ssr: false })
import {
  degreesToNormalizedVector,
  findLineIntersection,
  vectorDistance,
} from "../math"
import { themes, ThemeKey } from "../theme"

const BOARD_SIZE = 400
const MINIMAP_SIZE = 220

const Stage = styled.div<{ background: string }>`
  position: fixed;
  inset: 0;
  background: ${(p) => p.background};
  overflow: hidden;
  font-family: Roboto, sans-serif;
`

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.65) 100%
  );
  z-index: 2;
`

const MinimapWrap = styled.div<{ visible: boolean; accent: string }>`
  position: fixed;
  left: 24px;
  top: 24px;
  width: ${MINIMAP_SIZE}px;
  height: ${MINIMAP_SIZE}px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45),
    0 0 0 1px ${(p) => p.accent}22;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  transform: translateY(${(p) => (p.visible ? "0" : "12px")});
  pointer-events: ${(p) => (p.visible ? "auto" : "none")};
  transition: opacity 220ms ease, transform 220ms ease;
  z-index: 3;
  cursor: crosshair;
`

const MinimapLabel = styled.div`
  position: absolute;
  top: 8px;
  left: 10px;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  pointer-events: none;
  z-index: 1;
`

const generateWalls = (count: number) => {
  const walls = []
  for (let i = 0; i < count; i++) {
    walls.push({
      x1: Math.floor(Math.random() * (BOARD_SIZE + 1)),
      y1: Math.floor(Math.random() * (BOARD_SIZE + 1)),
      x2: Math.floor(Math.random() * (BOARD_SIZE + 1)),
      y2: Math.floor(Math.random() * (BOARD_SIZE + 1)),
    })
  }
  return walls
}

const buildRays = (
  x: number,
  y: number,
  heading: number,
  fov: number,
  rayCount: number
): RayType[] => {
  const rays: RayType[] = []
  const half = fov / 2
  const step = fov / rayCount
  for (let i = 0; i < rayCount; i++) {
    rays.push({ x, y, degrees: heading - half + i * step })
  }
  return rays
}

export default function Home() {
  const { width: viewportW, height: viewportH } = useWindowSize()

  const [fov, setFov] = useState(60)
  const [rayCount, setRayCount] = useState(120)
  const [wallCount, setWallCount] = useState(5)
  const [themeKey, setThemeKey] = useState<ThemeKey>("classic")
  const [showMinimap, setShowMinimap] = useState(true)

  const theme = themes[themeKey]

  const [walls, setWalls] = useState(() => generateWalls(5))
  const [particle, setParticle] = useState({ x: 20, y: BOARD_SIZE / 2 })
  const [heading, setHeading] = useState(0)

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "a") setHeading((h) => h - 4)
      if (event.key === "d") setHeading((h) => h + 4)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const { rays, scene } = useMemo(() => {
    const baseRays = buildRays(particle.x, particle.y, heading, fov, rayCount)
    const distances: number[] = []
    for (let i = 0; i < baseRays.length; i++) {
      const ray = baseRays[i]
      const dir = degreesToNormalizedVector(ray.degrees)
      let closest: [number, number] | null = null
      let minDist = Infinity
      for (const wall of walls) {
        const hit = findLineIntersection(wall, ray, dir)
        if (hit) {
          const d = vectorDistance([particle.x, particle.y], hit)
          if (d < minDist) {
            minDist = d
            closest = hit
          }
        }
      }
      if (closest) {
        // Correct fisheye: project distance onto heading direction
        const correctedAngle = (ray.degrees - heading) * (Math.PI / 180)
        distances.push(minDist * Math.cos(correctedAngle))
        ray.x2 = closest[0]
        ray.y2 = closest[1]
      } else {
        distances.push(Infinity)
      }
    }
    return { rays: baseRays, scene: distances }
  }, [particle, heading, walls, fov, rayCount])

  const handleRandomize = () => setWalls(generateWalls(wallCount))

  // Regenerate walls when wallCount changes so the slider feels live.
  useEffect(() => {
    setWalls((prev) => {
      if (prev.length === wallCount) return prev
      return generateWalls(wallCount)
    })
  }, [wallCount])

  return (
    <Stage background={theme.background}>
      <Scene
        scene={scene}
        width={viewportW}
        height={viewportH}
        theme={theme}
      />
      <Vignette />

      <MinimapWrap visible={showMinimap} accent={theme.accent}>
        <MinimapLabel>Map</MinimapLabel>
        <Minimap
          size={MINIMAP_SIZE}
          walls={walls}
          rays={rays}
          particle={particle}
          theme={theme}
          onMove={setParticle}
        />
      </MinimapWrap>

      <HoverBar
        fov={fov}
        rayCount={rayCount}
        wallCount={wallCount}
        themeKey={themeKey}
        showMinimap={showMinimap}
        onFov={setFov}
        onRayCount={setRayCount}
        onWallCount={setWallCount}
        onTheme={setThemeKey}
        onToggleMinimap={() => setShowMinimap((v) => !v)}
        onRandomize={handleRandomize}
      />
    </Stage>
  )
}
