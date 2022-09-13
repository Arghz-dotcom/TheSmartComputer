/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  pathPrefix: "/TheSmartComputer",
  siteMetadata: {
    title: "Dominique Gilleman",
    description: "I teach JavaScript, React, GraphQL and Gatsby",
    author: "DomDom",
  },
  plugins: [
    "gatsby-plugin-sass",
    'gatsby-plugin-postcss',
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
  ],
}
