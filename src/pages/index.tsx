import React, { useState } from "react"
import { Layer, Stage } from "react-konva"
import styled from "styled-components"
import { RayType } from "../@types"
import Board from "../components/Board"
import Boundary from "../components/Boundary"
import Particle from "../components/Particle"
import Ray from "../components/Ray"
import { degreesToNormalizedVector, findLineIntersection } from "../math"

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2f3640;
`

const getRays = (x, y): RayType[] => {
  const rays = []
  for (let a = 0; a < 360; a += 1) {
    rays.push({ x, y, degrees: a })
  }
  return rays
}

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

  const onMouseMove = (e: any) => {
    // const mouseX = e.evt.layerX
    // const mouseY = e.evt.layerY
    // const normalized = positionToNormalizedVector(mouseX - ray.x1, mouseY - ray.y1)
    // setDirection({
    //   x: normalized[0],
    //   y: normalized[1],
    // })
  }

  // const intersection = findLineIntersection(wall, rays[0], direction)

  const computeRays = () => {
    const rays = getRays(particle.x, particle.y)

    for (const i in rays) {
      const intersectionPoint = findLineIntersection(
        wall,
        rays[i],
        degreesToNormalizedVector(rays[i].degrees)
      )
      if (intersectionPoint) {
        const [pointX, pointY] = intersectionPoint
        rays[i].x2 = pointX
        rays[i].y2 = pointY
      }
    }
    return rays
  }

  const computedRays = computeRays()

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
          {/* Show rays that eminate around particle */}
          <Particle position={{ x: particle.x, y: particle.y }} />
          {!!computedRays.length &&
            computedRays.map((ray) => {
              return <Ray key={ray.degrees} ray={ray} />
            })}
        </Layer>
      </Stage>
    </Wrapper>
  )
}
