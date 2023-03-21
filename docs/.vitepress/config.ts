import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/jsutils/",
  title: "@shihongxins/jsutils",
  description: "Personal Javascript Utils Liberty",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/start" },
      { text: "API", link: "/api/color-utils" },
    ],

    sidebar: [
      {
        text: "Docs",
        items: [
          { text: "Start", link: "/start" },
          {
            text: "API",
            items: [
              { text: "ColorUtils", link: "/api/color-utils" },
              { text: "DateUtils", link: "/api/date-utils" },
              { text: "ElementUtils", link: "/api/element-utils" },
              { text: "EventUtils", link: "/api/event-utils" },
              { text: "FileSystemUtils", link: "/api/filesystem-utils" },
              { text: "ListLoop", link: "/api/listloop" },
              { text: "MathUtils", link: "/api/math-utils" },
              { text: "NetworkUtils", link: "/api/network-utils" },
              { text: "ObjectUtils", link: "/api/object-utils" },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/shihongxins/jsutils" }],
  },
});
