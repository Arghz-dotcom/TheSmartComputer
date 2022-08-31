import React from "react"
import Header from "./header"
import "../styles/style.scss"

const Layout = props => {
  return (
    <div>
      <Header />
      <div className="flex justify-center">
          {props.children}
      </div>
    </div>
  )
}

export default Layout