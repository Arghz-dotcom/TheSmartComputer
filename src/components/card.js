import React from "react"
import { navigate } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'

const Card = ({text}) => {
    return (
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
            <a href="#!">
              <StaticImage class="rounded-t-lg mb-4" src="../images/features-icon-1.png" alt="" />
            </a>
            <p class="text-gray-700 text-base mb-4">{text}</p>
            <button onClick={()=>{navigate("/connect4/")}} type="button" class="btn-primary">READ MORE</button>
        </div>
    )
  }

export default Card