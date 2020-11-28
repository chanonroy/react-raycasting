import React, { useState } from "react"
import { Layer, Stage } from "react-konva"
import styled from "styled-components"
import Board from "../components/Board"
import Boundary from "../components/Boundary"
import Particle from "../components/Particle"

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2f3640;
`

export default function Home() {
  const [board, setBoard] = useState({
    width: 400,
    height: 400,
  })

  const [wall, setWall] = useState({
    x1: 300,
    y1: 100,
    x2: 300,
    y2: 300,
  })

  const [particle, setParticle] = useState({
    x: board.width / 2,
    y: board.height / 2,
  })

  const [direction, setDirection] = useState({
    x: 1,
    y: 0.5,
  })

  const onMouseMove = (e: any) => {
    // const mouseX = e.evt.layerX
    // const mouseY = e.evt.layerY
    // const normalized = positionToNormalizeVector(mouseX - ray.x1, mouseY - ray.y1)
    // setDirection({
    //   x: normalized[0],
    //   y: normalized[1],
    // })
  }

  // const intersection = findLineIntersection(wall, rays[0], direction)

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
        <Particle position={{ x: particle.x, y: particle.y }} />
      </Stage>
    </Wrapper>
  )
}
