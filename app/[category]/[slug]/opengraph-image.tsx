import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  const cat = getCategoryBySlug(category);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f2044",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: "#93c5fd",
            marginBottom: 16,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {cat?.label ?? category} · LawsuitsClaim.com
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {article?.title ?? "Legal Claims Explained Clearly"}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#94a3b8",
            marginTop: 20,
          }}
        >
          Plain-English legal information · Not legal advice
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
