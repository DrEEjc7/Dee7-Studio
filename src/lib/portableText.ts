/**
 * Minimal Portable Text -> HTML renderer for the blocks this site stores:
 * styles (normal, h2-h4, blockquote), bullet/number lists, decorators
 * (strong, em, underline, code, strike-through), link annotations, and
 * image blocks whose asset URL was resolved in GROQ as `url`.
 */

interface PTSpan {
  _type: "span";
  text: string;
  marks?: string[];
}

interface PTMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface PTBlock {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PTSpan[];
  markDefs?: PTMarkDef[];
  // image blocks (asset url resolved in GROQ)
  url?: string;
  alt?: string;
  caption?: string;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const DECORATOR_TAGS: Record<string, string> = {
  strong: "strong",
  em: "em",
  underline: "u",
  code: "code",
  "strike-through": "s",
};

function renderSpan(span: PTSpan, markDefs: PTMarkDef[]): string {
  let html = escapeHtml(span.text).replaceAll("\n", "<br />");
  for (const mark of span.marks ?? []) {
    const tag = DECORATOR_TAGS[mark];
    if (tag) {
      html = `<${tag}>${html}</${tag}>`;
      continue;
    }
    const def = markDefs.find((d) => d._key === mark);
    if (def?._type === "link" && def.href) {
      const external = /^https?:\/\//.test(def.href) && !def.href.includes("dee7studio.com");
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      html = `<a href="${escapeHtml(def.href)}"${attrs}>${html}</a>`;
    }
  }
  return html;
}

function renderTextBlock(block: PTBlock): string {
  const inner = (block.children ?? [])
    .map((c) => renderSpan(c, block.markDefs ?? []))
    .join("");
  switch (block.style) {
    case "h1":
    case "h2":
      return `<h2>${inner}</h2>`;
    case "h3":
      return `<h3>${inner}</h3>`;
    case "h4":
      return `<h4>${inner}</h4>`;
    case "blockquote":
      return `<blockquote>${inner}</blockquote>`;
    default:
      return `<p>${inner}</p>`;
  }
}

function renderImage(block: PTBlock): string {
  if (!block.url) return "";
  const alt = escapeHtml(block.alt ?? block.caption ?? "");
  const caption = block.caption
    ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
    : "";
  return `<figure><img src="${escapeHtml(block.url)}" alt="${alt}" loading="lazy" />${caption}</figure>`;
}

export function renderPortableText(blocks: PTBlock[] | undefined): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];
  let listType: "bullet" | "number" | null = null;

  const closeList = () => {
    if (listType) {
      out.push(listType === "bullet" ? "</ul>" : "</ol>");
      listType = null;
    }
  };

  for (const block of blocks) {
    if (block._type === "image") {
      closeList();
      out.push(renderImage(block));
      continue;
    }
    if (block._type !== "block") continue;

    if (block.listItem) {
      if (listType !== block.listItem) {
        closeList();
        out.push(block.listItem === "bullet" ? "<ul>" : "<ol>");
        listType = block.listItem;
      }
      const inner = (block.children ?? [])
        .map((c) => renderSpan(c, block.markDefs ?? []))
        .join("");
      out.push(`<li>${inner}</li>`);
      continue;
    }

    closeList();
    out.push(renderTextBlock(block));
  }
  closeList();
  return out.join("\n");
}
