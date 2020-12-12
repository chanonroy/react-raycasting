import React, { useEffect, useState } from "react"
import { Layer, Rect, Stage } from "react-konva"
import styled from "styled-components"
import { RayType } from "../@types"
import Board from "../components/Board"
import Boundary from "../components/Boundary"
import Particle from "../components/Particle"
import Ray from "../components/Ray"
import {
  degreesToNormalizedVector,
  findLineIntersection,
  rangeMap,
  vectorDistance,
} from "../math"

const Background = styled.div`
  height: 100vh;
  align-items: center;
  background: #1e272e;
`

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
  width: 100%;
`

const getRays = (x, y, heading): RayType[] => {
  const rays = []
  for (let a = -30; a < 30; a += 1) {
    rays.push({ x, y, degrees: a + heading })
  }
  return rays
}

const generateWalls = (number) => {
  const randomWalls = []
  for (let i = 0; i < number; i++) {
    randomWalls.push({
      x1: Math.floor(Math.random() * 401),
      y1: Math.floor(Math.random() * 401),
      x2: Math.floor(Math.random() * 401),
      y2: Math.floor(Math.random() * 401),
    })
  }
  return randomWalls
}

export default function Home() {
  const board = {
    width: 400,
    height: 400,
  }

  const sceneWidth = 400
  const sceneHeight = 400

  const [walls, setWalls] = useState(generateWalls(3))

  const [particle, setParticle] = useState({
    x: 20,
    y: board.height / 2,
  })

  const [heading, setHeading] = useState(0)

  const handleUserKeyPress = (event) => {
    const { key } = event
    if (key === "a") {
      // Rotate Left
      setHeading(heading - 4)
    }
    if (key === "d") {
      // Rotate right
      setHeading(heading + 4)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  const onMouseMove = (e: any) => {
    setParticle({
      x: e.evt.layerX,
      y: e.evt.layerY,
    })
  }

  const computeRays = () => {
    const rays = getRays(particle.x, particle.y, heading)

    const scene = []

    // Go through each Ray
    for (const i in rays) {
      let closestIntersection = null
      let longestDistanceSeen = Infinity

      // Find closest intercept from all the walls
      for (const wall of walls) {
        const intersectionPoint = findLineIntersection(
          wall,
          rays[i],
          degreesToNormalizedVector(rays[i].degrees)
        )
        if (intersectionPoint) {
          const [intX, intY] = intersectionPoint
          const localDistance = vectorDistance(
            [particle.x, particle.y],
            [intX, intY]
          )
          if (localDistance < longestDistanceSeen) {
            longestDistanceSeen = localDistance
            closestIntersection = intersectionPoint
          }
        }
      }
      if (closestIntersection) {
        scene[i] = longestDistanceSeen
        rays[i].x2 = closestIntersection[0]
        rays[i].y2 = closestIntersection[1]
      } else {
        scene[i] = Infinity
        rays[i].x2 = undefined
        rays[i].y2 = undefined
      }
    }
    return { rays, scene }
  }

  const { rays: computedRays, scene } = computeRays()

  return (
    <Background>
      <GameContainer>
        <div style={{ marginLeft: 40 }}>
          {/* 2D Maze */}
          <h2 style={{ textAlign: "center", color: "white" }}>2D Render</h2>
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
        </div>

        {/* 3D Maze */}
        <div style={{ marginLeft: 40 }}>
          <h2 style={{ textAlign: "center", color: "white" }}>3D Render</h2>
          <Stage width={sceneWidth} height={sceneHeight}>
            <Layer>
              <Board width={sceneWidth} height={sceneHeight} color="black" />
            </Layer>
            <Layer>
              {scene.map((s, i) => {
                const renderItemWidth = sceneWidth / scene.length
                const distanceOpacity = rangeMap(scene[i], 0, sceneWidth, 1, 0)
                const h = rangeMap(scene[i], 0, sceneWidth, sceneHeight, 0)
                if (s === Infinity) return
                return (
                  <Rect
                    key={i}
                    fill={"white"}
                    opacity={distanceOpacity}
                    x={i * renderItemWidth + renderItemWidth / 2}
                    y={sceneHeight / 10}
                    strokeEnabled={false}
                    width={renderItemWidth}
                    height={h}
                  />
                )
              })}
            </Layer>
          </Stage>
        </div>
      </GameContainer>
      <strong> </strong>
      <div
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ marginTop: 40, marginBottom: 20 }}>
          Use A to look LEFT | Move mouse to MOVE | Use D to look RIGHT
        </div>
        <div>
          <button onClick={() => setWalls(generateWalls(3))}>
            Random Walls
          </button>
        </div>
      </div>
    </Background>
  )
}
