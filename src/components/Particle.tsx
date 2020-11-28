import React, { useState } from "react"
import { Circle, Layer } from "react-konva"
import Ray from "./Ray"

const getRays = (x, y) => {
  const rays = []
  for (let a = 0; a < 360; a += 10) {
    rays.push({ x, y, degrees: a })
  }
  return rays
}

interface RayType {
  x: number
  y: number
  degrees: number
}

const Particle = ({
  position,
}: {
  position: {
    x: number
    y: number
  }
}) => {
  const [rays, setRays] = useState<RayType[]>(getRays(position.x, position.y))

  return (
    <Layer>
      {/* Render circular particle */}
      <Circle
        fill="rgb(255,255,255)"
        radius={5}
        x={position.x}
        y={position.y}
      />

      {/* Show rays that eminate around particle */}
      {!!rays.length &&
        rays.map((ray) => {
          return (
            <Ray
              key={ray.degrees}
              position={{ x: ray.x, y: ray.y }}
              degrees={ray.degrees}
            />
          )
        })}
    </Layer>
  )
}

export default Particle
