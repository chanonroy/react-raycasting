import React from "react"
import styled from "styled-components"
import { themes, ThemeKey } from "../theme"

const Bar = styled.div`
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 12px 18px;
  background: rgba(20, 20, 22, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  color: rgba(255, 255, 255, 0.92);
  font-family: Roboto, sans-serif;
  font-size: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  user-select: none;
  z-index: 10;
`

const Group = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 110px;
`

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 10px;
`

const Value = styled.span`
  color: rgba(255, 255, 255, 0.9);
`

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    border: none;
  }
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    border: none;
  }
`

const Divider = styled.div`
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
`

const Button = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  outline: none;
  transition: background 120ms ease;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`

const Segmented = styled.div`
  display: flex;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
`

const Seg = styled.button<{ active: boolean }>`
  background: ${(p) => (p.active ? "rgba(255,255,255,0.16)" : "transparent")};
  color: ${(p) =>
    p.active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)"};
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 11px;
  font-family: inherit;
  letter-spacing: 0.04em;
  white-space: nowrap;
  outline: none;
  transition: background 120ms ease, color 120ms ease;
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
`

const Hint = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  letter-spacing: 0.04em;
  margin-right: 4px;
  white-space: nowrap;
`

type Props = {
  fov: number
  rayCount: number
  wallCount: number
  themeKey: ThemeKey
  showMinimap: boolean
  onFov: (n: number) => void
  onRayCount: (n: number) => void
  onWallCount: (n: number) => void
  onTheme: (k: ThemeKey) => void
  onToggleMinimap: () => void
  onRandomize: () => void
}

const HoverBar = ({
  fov,
  rayCount,
  wallCount,
  themeKey,
  showMinimap,
  onFov,
  onRayCount,
  onWallCount,
  onTheme,
  onToggleMinimap,
  onRandomize,
}: Props) => (
  <Bar>
    <Hint>A · D to look</Hint>
    <Divider />
    <Group>
      <Label>
        <span>FOV</span>
        <Value>{fov}°</Value>
      </Label>
      <Slider
        type="range"
        min={30}
        max={120}
        value={fov}
        onChange={(e) => onFov(parseInt(e.target.value, 10))}
      />
    </Group>
    <Group>
      <Label>
        <span>Rays</span>
        <Value>{rayCount}</Value>
      </Label>
      <Slider
        type="range"
        min={30}
        max={240}
        value={rayCount}
        onChange={(e) => onRayCount(parseInt(e.target.value, 10))}
      />
    </Group>
    <Group>
      <Label>
        <span>Walls</span>
        <Value>{wallCount}</Value>
      </Label>
      <Slider
        type="range"
        min={1}
        max={15}
        value={wallCount}
        onChange={(e) => onWallCount(parseInt(e.target.value, 10))}
      />
    </Group>
    <Divider />
    <Segmented>
      {Object.keys(themes).map((k) => (
        <Seg
          key={k}
          active={k === themeKey}
          onClick={() => onTheme(k as ThemeKey)}
        >
          {themes[k].name}
        </Seg>
      ))}
    </Segmented>
    <Divider />
    <Button onClick={onRandomize}>↻ Randomize</Button>
    <Button onClick={onToggleMinimap}>
      {showMinimap ? "⛶ Hide map" : "⛶ Show map"}
    </Button>
  </Bar>
)

export default HoverBar
