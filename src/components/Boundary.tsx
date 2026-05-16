import React from "react"
import { Line } from "react-konva"

const Boundary = ({
  start,
  end,
  color = "rgb(255,255,255)",
}: {
  start: { x: number; y: number }
  end: { x: number; y: number }
  color?: string
}) => {
  return <Line stroke={color} points={[start.x, start.y, end.x, end.y]} />
}

export default Boundary
