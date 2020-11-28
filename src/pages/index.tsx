import React from "react"
import { Layer, Stage } from "react-konva"
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
}

export default function Home() {
  const wall = {
    x1: 300,
    y1: 100,
    x2: 300,
    y2: 300,
  }

  const ray = {
    x1: 100,
    y1: 200,
    x2: 1,
    y2: 0,
  }

  const board = {
    width: 400,
    height: 400,
  }

  return (
    <Wrapper>
      <Stage width={board.width} height={board.height}>
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
            direction={{ x: ray.x2, y: ray.y2 }}
          />
        </Layer>
      </Stage>
    </Wrapper>
  )
}
