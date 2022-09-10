import React from "react"
import Header from "./header"

const Layout = props => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <div class="flex-1 flex flex-col sm:flex-row lg:px-64">
        <main class="flex-1 py-24">{props.children}</main>
      </div>
    </div>
  )
}

export default Layout