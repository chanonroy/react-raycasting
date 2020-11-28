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
  return (
    <Circle fill="rgb(255,255,255)" radius={5} x={position.x} y={position.y} />
  )
}

export default Particle
