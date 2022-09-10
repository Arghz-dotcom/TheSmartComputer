import React from "react"
import { navigate } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'

const Card = () => {
    return (
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
            <a href="#!">
              <StaticImage class="rounded-t-lg mb-4" src="../images/features-icon-1.png" alt="" />
            </a>
            <p class="text-gray-700 text-base mb-4">
            Connect 4 with artificial intelligence
            </p>
            <button onClick={()=>{navigate("/connect4/")}} type="button" class=" inline-block px-6 py-2.5 bg-[#f4813f] text-white font-medium text-xs leading-tight uppercase rounded-3xl shadow-md hover:bg-[#f1556a] hover:shadow-lg focus:bg-[#f1556a] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out tracking-wide">Button</button>
        </div>
    )
  }

export default Card