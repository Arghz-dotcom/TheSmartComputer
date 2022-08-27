import React from "react"
import { Link } from "gatsby"
import * as headerStyles from "./header.module.scss"

const Header = () => {
    return (
        <header className={headerStyles.header}>
          <div className={headerStyles.overlay}></div>
          <div className={headerStyles.heroContent}>
            <p className={headerStyles.brand}>
              <Link to="/">Ibas Majid</Link>
            </p>
            <p className={headerStyles.description}>
              I teach JavaScript, React, GraphQL and Gatsby
            </p>
          </div>
          <nav className={headerStyles.navContainer}>
            <ul className={headerStyles.navList}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
            </ul>
          </nav>
        </header>
      )
}

export default Header