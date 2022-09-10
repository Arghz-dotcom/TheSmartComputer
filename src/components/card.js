import React from "react"
import { navigate } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from "gatsby"

const Card = ({text, to}) => {
    return (
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
            <Link to={to}>
              <StaticImage class="rounded-t-lg mb-4" src="../images/features-icon-1.png" alt="" />
            </Link>
            <p class="text-gray-700 text-base mb-4">{text}</p>
            <Link to={to} className="btn-primary">READ MORE</Link>
        </div>
    )
  }

export default Card