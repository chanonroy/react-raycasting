import React from "react"
import { Line } from "react-konva"

const Ray = ({
  position,
  direction,
}: {
  position: {
    x: number
    y: number
  }
  direction: {
    x: number
    y: number
  }
}) => {
  return (
    <Line
      stroke="rgb(255,255,255)"
      points={[
        position.x,
        position.y,
        position.x + direction.x * 10,
        position.y + direction.y * 10,
      ]}
    />
  )
}

export default Ray
