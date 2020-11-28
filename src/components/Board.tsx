import React from "react"
import { Rect } from "react-konva"

const Board = ({
  width,
  height,
  color,
}: {
  width: number
  height: number
  color: string
}) => {
  return <Rect x={0} y={0} width={width} height={height} fill={color} />
}

export default Board
