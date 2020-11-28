import React from "react"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
