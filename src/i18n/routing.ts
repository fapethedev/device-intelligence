import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "es"],
  defaultLocale: "en",

  pathnames: {
    "/": "/",
    "/about": {
      fr: "/a-propos",
      es: "/acerca-de"
    },
    "/scanner": "/scanner",
    "/fingerprint": "/fingerprint",
  }
});