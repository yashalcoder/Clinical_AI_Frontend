export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/patient/", "/api/"]
    },
    sitemap: "https://www.clinicflow.ai/sitemap.xml"
  };
}
