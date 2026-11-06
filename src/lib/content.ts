/**
 * Content layer — the single place pages fetch data from.
 *
 * Today: serves typed content from src/data/sample.ts (projects and offers are
 * real; blog posts are placeholder). Once Sanity is connected
 * (PUBLIC_SANITY_PROJECT_ID set), switch each getter to query Sanity via
 * `sanity` + `queries` from ./sanity.
 */
import type { Project, Post, Offer } from "./types";
import { projects, posts, offers } from "../data/sample";

export async function getProjects(): Promise<Project[]> {
  // TODO Sanity: return sanity.fetch(queries.projects)
  return projects;
}

export async function getPosts(): Promise<Post[]> {
  // TODO Sanity: return sanity.fetch(queries.posts)
  return posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export function getOffers(): Offer[] {
  return offers;
}

export function getOffer(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug);
}
