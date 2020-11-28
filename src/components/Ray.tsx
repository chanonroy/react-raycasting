import React from "react"
import { Line } from "react-konva"
import { degreesToNormalizedVector } from "../math"

const Ray = ({
  position,
  degrees,
}: {
  position: {
    x: number
    y: number
  }
  degrees: number
}) => {
  const [vectorX, vectorY] = degreesToNormalizedVector(degrees)
  const directionX = position.x + vectorX * 100
  const directionY = position.y + vectorY * 100
  return (
    <Line
      stroke="rgb(255,255,255)"
      strokeWidth={1}
      points={[position.x, position.y, directionX, directionY]}
    />
  )
}

export default Ray
