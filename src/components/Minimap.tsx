import React from "react"
import { Layer, Stage } from "react-konva"
import { RayType } from "../@types"
import Board from "./Board"
import Boundary from "./Boundary"
import Particle from "./Particle"
import Ray from "./Ray"
import { Theme } from "../theme"

const BOARD_SIZE = 400

type Wall = { x1: number; y1: number; x2: number; y2: number }

const Minimap = ({
  size,
  walls,
  rays,
  particle,
  theme,
}: {
  size: number
  walls: Wall[]
  rays: RayType[]
  particle: { x: number; y: number }
  theme: Theme
}) => {
  const scale = size / BOARD_SIZE

  return (
    <Stage width={size} height={size} scale={{ x: scale, y: scale }}>
      <Layer listening={false}>
        <Board
          width={BOARD_SIZE}
          height={BOARD_SIZE}
          color={theme.background}
        />
      </Layer>
      <Layer listening={false}>
        {walls.map((w, i) => (
          <Boundary
            key={i}
            start={{ x: w.x1, y: w.y1 }}
            end={{ x: w.x2, y: w.y2 }}
            color={theme.wall}
          />
        ))}
      </Layer>
      <Layer listening={false}>
        <Particle position={particle} color={theme.particle} />
        {rays.map((ray) => (
          <Ray key={ray.degrees} ray={ray} color={theme.ray} />
        ))}
      </Layer>
    </Stage>
  )
}

export default Minimap
