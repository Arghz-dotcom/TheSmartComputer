import React from "react"
import Header from "../components/header"
import { StaticImage } from "gatsby-plugin-image"

const NotFound = () => {
  return (
    <div class="flex flex-col">
      <Header />
      <div>
        <StaticImage class="w-full" src="../images/404.jpg" alt="404" />
      </div>
      
    </div>
  )
}

export default NotFound