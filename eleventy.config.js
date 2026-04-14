import { HtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";

const md = markdownIt({ html: true, linkify: true });

export default function (eleventyConfig) {
  eleventyConfig.addFilter("md", (content) => md.render(content ?? ""));
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/pdf");

  eleventyConfig.addPlugin(HtmlBasePlugin);

  // {% img "/assets/img/foo.jpg", "alt text" %}
  // {% img "/assets/img/foo.jpg", "alt text", "right" %}
  // {% img "/assets/img/foo.jpg", "alt text", "left", "Optional caption" %}
  // positions: right | left | full | center (default: full)
  // {% img "path", "alt" %}
  // {% img "path", "alt", "right" %}
  // {% img "path", "alt", "right", "Caption text" %}
  // {% img "path", "alt", "right", "", "https://link.url" %}
  // positions: right | left | full | center (default: full)
  eleventyConfig.addShortcode(
    "img",
    (src, alt, position = "full", caption = "", link = "") => {
      const positions = {
        right: "not-prose float-right ml-6 mb-4 w-full sm:w-96",
        left: "not-prose float-left mr-6 mb-4 w-full sm:w-96",
        full: "not-prose mx-auto mb-6 w-full clear-both",
        center: "not-prose mx-auto mb-6 w-full sm:w-1/2 clear-both",
      };
      const cls = positions[position] ?? positions.full;
      const imgTag = `<img src="${src}" alt="${alt}" class="w-full rounded-lg shadow-md" loading="lazy" draggable="false">`;
      const inner = link
        ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="select-none cursor-pointer">${imgTag}</a>`
        : imgTag;
      if (!caption) return `<figure class="${cls}">${inner}</figure>`;
      return `<figure class="${cls}">${inner}<figcaption class="text-center text-sm text-gray-500 mt-1">${caption}</figcaption></figure>`;
    },
  );

  // {% panel "/img.jpg", "alt", "right", "/url/", "Link label" %}...{% endpanel %}
  // imageAlign: "left" puts image on the left (text right), "right" puts image on the right
  eleventyConfig.addPairedShortcode("panel", (content, image, imageAlt, imageAlign, url, urlLabel) => {
    const flexDir = imageAlign === "left" ? "md:flex-row-reverse" : "md:flex-row";
    const imgHtml = image
      ? `<div class="w-full md:w-2/5 shrink-0"><img src="${image}" alt="${imageAlt}" class="w-full h-auto rounded-lg"></div>`
      : "";
    return `<section class="px-8 py-16">
  <div class="max-w-6xl mx-auto flex flex-col ${flexDir} items-center gap-12">
    ${imgHtml}
    <div class="flex-1 text-left">
      <div class="prose dark:prose-invert text-lg leading-relaxed max-w-none">${md.render(content)}</div>
      <a href="${url}" class="inline-block mt-2 px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded no-underline hover:bg-[#2d5a9e] transition-colors">${urlLabel} &rarr;</a>
    </div>
  </div>
</section>`;
  });

  // {% accent "#hex", "#textHex", "/url/", "Link label" %}...{% endaccent %}
  eleventyConfig.addPairedShortcode("accent", (content, bg, textColor, url, urlLabel) => {
    return `<section class="px-8 py-16 text-center" style="background-color: ${bg}; color: ${textColor};">
  <div class="max-w-3xl mx-auto">
    <div class="prose dark:prose-invert text-2xl leading-relaxed max-w-none" style="color: ${textColor};">${md.render(content)}</div>
    <a href="${url}" class="inline-block mt-2 px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded no-underline hover:bg-[#2d5a9e] transition-colors">${urlLabel} &rarr;</a>
  </div>
</section>`;
  });

  eleventyConfig.addPairedShortcode("widetable", (content) => {
    const headers = [];
    content.replace(/<th[^>]*>([\s\S]*?)<\/th>/gi, (_, text) => {
      headers.push(text.trim());
    });
    const labeled = content.replace(
      /<tr>([\s\S]*?)<\/tr>/gi,
      (rowMatch, rowContent) => {
        let col = 0;
        const newRow = rowContent.replace(
          /<td/gi,
          () => `<td data-label="${headers[col++] ?? ""}"`,
        );
        return `<tr>${newRow}</tr>`;
      },
    );
    return `<div class="oya-widetable [&_table]:table-fixed [&_table]:w-full [&_th:nth-child(1)]:w-[45%] [&_th:nth-child(2)]:w-[20%] [&_th:nth-child(3)]:w-[35%]">${labeled}</div>`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
      includes: "_includes",
    },
  };
}
