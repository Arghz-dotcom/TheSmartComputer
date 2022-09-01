import React from "react"
import Header2 from "./header2"
import Sidebar2 from "./Sidebar2"
import RightSidebar from "./rightsidebar"
import Footer from "./footer"

const Layout = props => {
  return (
    <div class="min-h-screen flex flex-col">
      <Header2 />
      <div class="flex-1 flex flex-col sm:flex-row">
        <main class="flex-1">{props.children}</main>
        <Sidebar2 />
        <RightSidebar />
      </div>
      <Footer />
    </div>
  )
}

export default Layout