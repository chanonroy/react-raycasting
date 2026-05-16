import React from "react"
import { Layer, Rect, Stage } from "react-konva"
import { Theme } from "../theme"

const WALL_HEIGHT = 64 // board units; tuned for the 400-unit map
const SHADING_FALLOFF = 0.012 // higher = darker faster

const Scene = ({
  scene,
  width,
  height,
  fov,
  theme,
}: {
  scene: number[]
  width: number
  height: number
  fov: number
  theme: Theme
}) => {
  const barWidth = width / scene.length
  const horizonY = height / 2
  const focalLength = width / 2 / Math.tan(((fov / 2) * Math.PI) / 180)

  return (
    <Stage width={width} height={height} listening={false}>
      <Layer listening={false}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={horizonY}
          fill={theme.ceiling}
        />
        <Rect
          x={0}
          y={horizonY}
          width={width}
          height={height - horizonY}
          fill={theme.floor}
        />
      </Layer>
      <Layer listening={false}>
        {scene.map((s, i) => {
          if (s === Infinity || s <= 0) return null
          // Perspective: projected height ∝ 1 / distance (DOOM-style).
          const barHeight = Math.min(
            height * 4,
            (WALL_HEIGHT * focalLength) / s
          )
          // Inverse-distance shading: smooth falloff, darker farther away.
          const brightness = 1 / (1 + s * SHADING_FALLOFF)
          const x = i * barWidth
          const y = horizonY - barHeight / 2
          const w = barWidth + 1
          return (
            <React.Fragment key={i}>
              <Rect
                fill={theme.bar}
                x={x}
                y={y}
                width={w}
                height={barHeight}
                strokeEnabled={false}
              />
              <Rect
                fill="black"
                opacity={Math.max(0, Math.min(1, 1 - brightness))}
                x={x}
                y={y}
                width={w}
                height={barHeight}
                strokeEnabled={false}
              />
            </React.Fragment>
          )
        })}
      </Layer>
    </Stage>
  )
}

export default Scene
