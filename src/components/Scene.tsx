import React from "react"
import { Layer, Rect, Stage } from "react-konva"
import { rangeMap } from "../math"
import { Theme } from "../theme"

const BOARD_SIZE = 400

const Scene = ({
  scene,
  width,
  height,
  theme,
}: {
  scene: number[]
  width: number
  height: number
  theme: Theme
}) => {
  const barWidth = width / scene.length
  const horizonY = height / 2

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
          if (s === Infinity) return null
          const brightness = rangeMap(s, 0, BOARD_SIZE, 1, 0)
          const barHeight = rangeMap(s, 0, BOARD_SIZE, height, 0)
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
                opacity={Math.max(0, 1 - brightness)}
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
