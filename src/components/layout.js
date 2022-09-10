import React from "react"
import Header2 from "./header2"

const Layout = props => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header2 />
      <div class="flex-1 flex flex-col sm:flex-row">
        <main class="flex-1">{props.children}</main>
      </div>
    </div>
  )
}

export default Layout