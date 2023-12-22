const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { execSync } = require('child_process')

module.exports = eleventyConfig => {
  // Output directory: _site

  // Copy `assets/` to `_site/assets`
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    // any valid BCP 47-compatible language tag is supported
    defaultLanguage: "en", // Required, this site uses "en"
  });

  eleventyConfig.addCollection("pagesAscending", (collection) =>
    collection.getFilteredByGlob("*.md").sort((a, b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title < b.data.title) return 1;
      else return 0;
    })
  );
  
  eleventyConfig.on('eleventy.after', () => {
     execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  })
};



