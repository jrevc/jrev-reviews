import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"
import htmlminifier from "html-minifier-terser"

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("images")

  // Optimize images
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    outputDir: "./_site/img/",
    urlPath: "/img/",
    widths: [
      430,
      170
    ],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async"
      }
    }
  })

  // Minify HTML
  eleventyConfig.addTransform("htmlminifier", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlminifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })

      return minified
    }

    return content
  })

  // Randomize filter
  eleventyConfig.addFilter("shuffle", (array) => {
    if (!Array.isArray(array)) return []
    let shuffled = array.slice()
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  })

  // Add reviews collection
  eleventyConfig.addCollection("reviews", collection => {
    return [...collection.getFilteredByGlob("reviews/*.md")]
      .reverse()
  })

  // Reviews by title
  eleventyConfig.addCollection("reviewsByTitle", (collectionApi) =>
    collectionApi.getFilteredByGlob("reviews/*.md").sort((a, b) => {
      return a.data.title.localeCompare(b.data.title)
    })
  )

  // Reviews by author
  eleventyConfig.addCollection("reviewsByAuthor", (collectionApi) =>
    collectionApi.getFilteredByGlob("reviews/*.md")
      .sort((a, b) => {
        return a.data.authorLast.localeCompare(b.data.authorLast)
      })
  )

  // Filter collections and alphabetize
  eleventyConfig.addFilter("filteredCollections", (collections, exclude = []) => {
    return Object.keys(collections)
      .filter(name => !exclude.includes(name))
      .sort((a, b) => {
        if (a && b) {
          return a.localeCompare(b);
        }
        return 0
      })
  })

  // Determine latest review
  eleventyConfig.addCollection("latestReview", (collectionApi) => {
    return collectionApi.getFilteredByGlob("reviews/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  })

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",  // or "liquid"
    htmlTemplateEngine: "njk",      // or "liquid"
    dataTemplateEngine: "njk"       // or "liquid"
  }
}