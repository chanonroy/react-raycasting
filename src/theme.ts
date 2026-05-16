export type Theme = {
  name: string
  background: string
  wall: string
  ray: string
  particle: string
  bar: string
  accent: string
  floor: string
  ceiling: string
}

export const themes: Record<string, Theme> = {
  classic: {
    name: "Classic",
    background: "#1d1d1e",
    wall: "rgb(255,255,255)",
    ray: "rgba(255,255,255,0.35)",
    particle: "#00C2CB",
    bar: "#ffffff",
    accent: "#00C2CB",
    floor: "#0e0e0f",
    ceiling: "#262628",
  },
  neon: {
    name: "Neon",
    background: "#0a0420",
    wall: "#ff2bd6",
    ray: "rgba(0,229,255,0.35)",
    particle: "#00e5ff",
    bar: "#ff2bd6",
    accent: "#00e5ff",
    floor: "#06021a",
    ceiling: "#140a32",
  },
}

export type ThemeKey = keyof typeof themes
