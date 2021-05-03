import React from "react"
import { Circle } from "react-konva"

const Particle = ({
  position,
}: {
  position: {
    x: number
    y: number
  }
}) => {
  return <Circle fill="#00C2CB" radius={5} x={position.x} y={position.y} />
}

export default Particle
