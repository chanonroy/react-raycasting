import React from "react"
import { Line } from "react-konva"
import { RayType } from "../@types"
import { degreesToNormalizedVector } from "../math"

const Ray = ({ ray }: { ray: RayType }) => {
  const { degrees, x, y, x2, y2 } = ray
  const [vectorX, vectorY] = degreesToNormalizedVector(degrees)
  const endX = x2 ?? x + vectorX * 400
  const endY = y2 ?? y + vectorY * 400
  return (
    <Line
      stroke="rgb(255,255,255, 0.5)"
      strokeWidth={1}
      points={[x, y, endX, endY]}
    />
  )
}

export default Ray
