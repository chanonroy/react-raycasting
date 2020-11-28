import React, { useState } from "react"

const Boundary = (x1: number, y1: number, x2: number, y2: number) => {
  const [a, setA] = useState([x1, y1])
  const [b, setB] = useState([x2, y2])

  return <div>Boundary</div>
}

export default Boundary
