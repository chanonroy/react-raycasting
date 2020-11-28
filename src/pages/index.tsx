import React from "react"
import { Layer, Stage } from "react-konva"
import styled from "styled-components"
import Board from "../components/Board"

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2f3640;
`

export default function Home() {
  const width = 800
  const height = 800

  return (
    <Wrapper>
      <Stage width={width} height={height}>
        <Layer>
          <Board width={width} height={height} color="black" />
        </Layer>
      </Stage>
    </Wrapper>
  )
}
