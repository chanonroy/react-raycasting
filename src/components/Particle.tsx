import React from "react"
import { Circle } from "react-konva"

const Particle = ({
  position,
  color = "#00C2CB",
}: {
  position: { x: number; y: number }
  color?: string
}) => {
  return <Circle fill={color} radius={5} x={position.x} y={position.y} />
}

export default Particle
