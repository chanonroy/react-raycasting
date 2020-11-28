import React, { useState } from "react"
import { Circle, Layer, Stage } from "react-konva"
import styled from "styled-components"
import Board from "../components/Board"
import Boundary from "../components/Boundary"
import Ray from "../components/Ray"

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2f3640;
`

const cast = (wall, ray, direction) => {
  const x1 = wall.x1
  const y1 = wall.y1
  const x2 = wall.x2
  const y2 = wall.y2

  const x3 = ray.x1
  const y3 = ray.y1
  const x4 = ray.x1 + direction.x
  const y4 = ray.y1 + direction.y

  // Line Intersection Formula
  // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

  // Line is parralel to wall
  if (denominator == 0) return

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator
  const u = -((x2 - x2) * (y1 - y1) - (y1 - y2) * (x1 - x3)) / denominator

  if (t > 0 && t < 1 && u > 0) {
    const point = {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1),
    }
    return point
  } else {
    return
  }
}

const normalizeVector = (x, y) => {
  const length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  return [x / length, y / length]
}

export default function Home() {
  const [wall, setWall] = useState({
    x1: 300,
    y1: 100,
    x2: 300,
    y2: 300,
  })

  const [ray, setRay] = useState({
    x1: 100,
    y1: 200,
  })

  const [direction, setDirection] = useState({
    x: 1,
    y: 0.5,
  })

  const [board, setBoard] = useState({
    width: 400,
    height: 400,
  })

  const onMouseMove = (e: any) => {
    const mouseX = e.evt.layerX
    const mouseY = e.evt.layerY

    const newX = mouseX - ray.x1
    const newY = mouseY - ray.y1

    const normalized = normalizeVector(newX, newY)

    setDirection({
      x: normalized[0],
      y: normalized[1],
    })
  }

  const intersection = cast(wall, ray, direction)

  return (
    <Wrapper>
      <Stage
        onMouseMove={onMouseMove}
        width={board.width}
        height={board.height}
      >
        <Layer>
          <Board width={board.width} height={board.height} color="black" />
        </Layer>
        <Layer>
          <Boundary
            start={{ x: wall.x1, y: wall.y1 }}
            end={{ x: wall.x2, y: wall.y2 }}
          />
        </Layer>
        <Layer>
          <Ray
            position={{ x: ray.x1, y: ray.y1 }}
            direction={{ x: direction.x * 10, y: direction.y * 10 }}
          />
        </Layer>
        {intersection && (
          <Layer>
            <Circle
              radius={10}
              fill="yellow"
              x={intersection.x}
              y={intersection.y}
            />
          </Layer>
        )}
      </Stage>
    </Wrapper>
  )
}
