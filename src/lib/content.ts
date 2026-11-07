/**
 * Content layer: the single place pages fetch data from.
 *
 * With Sanity configured (PUBLIC_SANITY_PROJECT_ID set), content comes from
 * the Content Lake at build time. Without it, or if a fetch fails, the typed
 * sample data in src/data/sample.ts keeps the site building.
 */
import type { Project, Post, Offer } from "./types";
import { sanity, sanityEnabled, queries, blocksToParagraphs } from "./sanity";
import {
  projects as sampleProjects,
  posts as samplePosts,
  offers as sampleOffers,
} from "../data/sample";

async function fetchOr<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  if (!sanityEnabled || !sanity) return fallback;
  try {
    return await run();
  } catch (error) {
    console.warn("[content] Sanity fetch failed, using sample data:", error);
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  return fetchOr(sampleProjects, async () => {
    const rows = await sanity!.fetch(queries.projects);
    return rows.length ? rows : sampleProjects;
  });
}

export async function getPosts(): Promise<Post[]> {
  return fetchOr(samplePosts, async () => {
    const rows = await sanity!.fetch(queries.posts);
    if (!rows.length) return samplePosts;
    return rows.map((row: Record<string, unknown>) => ({
      ...row,
      date: row.date ?? "2026-01-01",
      readingTime:
        typeof row.readingTime === "number"
          ? `${row.readingTime} min read`
          : row.readingTime ?? "",
      body: blocksToParagraphs(row.body),
    })) as Post[];
  });
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getOffers(): Promise<Offer[]> {
  return fetchOr(sampleOffers, async () => {
    const rows = await sanity!.fetch(queries.offers);
    return rows.length ? rows : sampleOffers;
  });
}

export async function getOffer(slug: string): Promise<Offer | undefined> {
  return (await getOffers()).find((o) => o.slug === slug);
}
