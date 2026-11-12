import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/profile";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = profile.siteUrl;
  return [
    { url: `${b}/`, priority: 1 },
    { url: `${b}/projects/`, priority: 0.9 },
    { url: `${b}/about/`, priority: 0.8 },
    { url: `${b}/contact/`, priority: 0.8 },
    { url: `${b}/resume/`, priority: 0.7 },
    ...projects.map((p) => ({ url: `${b}/projects/${p.slug}/`, priority: 0.7 })),
  ];
}
