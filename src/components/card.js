import React from "react"
import { navigate } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'

// <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt=""/>
const Card = () => {
    return (
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
              <StaticImage class="rounded-t-lg" src="../images/puissance-4.jpg" alt="" />
            </a>
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Connect4</h5>
            <p class="text-gray-700 text-base mb-4">
            Connect 4 with artificial intelligence
            </p>
            <button  onClick={()=>{navigate("/connect4/")}} type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
        </div>
    )
  }

export default Card