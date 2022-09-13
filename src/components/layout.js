import React from "react"
import Header from "./header"

const Layout = props => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <div class=" flex flex-col sm:flex-row max-w-sm mx-auto">
        <main class="py-24">{props.children}</main>
      </div>
    </div>
  )
}

export default Layout