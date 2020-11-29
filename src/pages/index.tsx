import React, { useState } from "react"
import { Layer, Stage } from "react-konva"
import styled from "styled-components"
import { RayType } from "../@types"
import Board from "../components/Board"
import Boundary from "../components/Boundary"
import Particle from "../components/Particle"
import Ray from "../components/Ray"
import {
  degreesToNormalizedVector,
  findLineIntersection,
  vectorDistance,
} from "../math"

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

  const walls = [
    {
      x1: 250,
      y1: 100,
      x2: 200,
      y2: 300,
    },
    {
      x1: 100,
      y1: 200,
      x2: 400,
      y2: 125,
    },
  ]

  const [particle, setParticle] = useState({
    // x: board.width / 2,
    x: 400,
    y: board.height / 2,
  })

  const onMouseMove = (e: any) => {
    setParticle({
      x: e.evt.layerX,
      y: e.evt.layerY,
    })
  }

  const computeRays = () => {
    const rays = getRays(particle.x, particle.y)

    // Go through each Ray
    for (const i in rays) {
      let closest = null
      let globalDist = Infinity

      // Find closest intercept from all the walls
      for (const wall of walls) {
        const intersectionPoint = findLineIntersection(
          wall,
          rays[i],
          degreesToNormalizedVector(rays[i].degrees)
        )
        if (intersectionPoint) {
          const [intX, intY] = intersectionPoint
          const localDist = vectorDistance(
            [particle.x, particle.y],
            [intX, intY]
          )
          if (localDist < globalDist) {
            globalDist = localDist
            closest = intersectionPoint
          }
        }
      }
      rays[i].x2 = closest ? closest[0] : undefined
      rays[i].y2 = closest ? closest[1] : undefined
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
          {walls.map((wall, i) => (
            <Boundary
              key={i}
              start={{ x: wall.x1, y: wall.y1 }}
              end={{ x: wall.x2, y: wall.y2 }}
            />
          ))}
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
