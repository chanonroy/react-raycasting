import React from "react"
import { Line } from "react-konva"

const Boundary = ({
  start,
  end,
}: {
  start: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
}) => {
  return (
    <Line stroke="rgb(255,255,255)" points={[start.x, start.y, end.x, end.y]} />
  )
}

export default Boundary
