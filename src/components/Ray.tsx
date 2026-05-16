import React from "react"
import { Line } from "react-konva"
import { RayType } from "../@types"
import { degreesToNormalizedVector } from "../math"

const Ray = ({
  ray,
  color = "rgba(255,255,255,0.5)",
}: {
  ray: RayType
  color?: string
}) => {
  const { degrees, x, y, x2, y2 } = ray
  const [vectorX, vectorY] = degreesToNormalizedVector(degrees)
  const endX = x2 ?? x + vectorX * 1000
  const endY = y2 ?? y + vectorY * 1000

  return <Line stroke={color} strokeWidth={1} points={[x, y, endX, endY]} />
}

export default Ray
