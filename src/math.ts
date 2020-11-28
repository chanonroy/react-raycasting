export const findLineIntersection = (
  wall,
  ray,
  direction
): [number, number] | undefined => {
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
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]
  } else {
    return
  }
}

export const positionToNormalizeVector = (x, y) => {
  const length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  return [x / length, y / length]
}

export const degreesToNormalizedVector = (degrees: number) => {
  // Convert degrees to radians
  const radians = degrees * (Math.PI / 180)

  // Convert radians to vector
  const [newX, newY] = [1 * Math.cos(radians), 1 * Math.sin(radians)]

  // Create new normalized vectors [0, 1]
  const length = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2))
  return [newX / length, newY / length]
}
