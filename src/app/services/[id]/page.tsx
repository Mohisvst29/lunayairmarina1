import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail } from "@/lib/service-detail";
import ServiceDetailClient from "@/components/services/detail/ServiceDetailClient";

type PageParams = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const absoluteUrl = (path?: string | null) => {
  if (!path) {
    return undefined;
  }
  if (path.startsWith("http")) {
    return path;
  }
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  if (!base) {
    return path;
  }
  try {
    return new URL(path, base).toString();
  } catch {
    return path;
  }
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const detail = await getServiceDetail(id);

  if (!detail) {
    return {
      title: "Service Not Found | Lunier Marina",
    };
  }

  const { meta, slug } = detail.service;
  const canonicalPath = `/services/${slug || id}`;
  const imageUrl = absoluteUrl(meta.image);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalPath,
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: meta.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageParams) {
  const { id } = await params;
  console.log(`[ServiceDetail] Fetching service with id/slug: ${id}`);
  const detail = await getServiceDetail(id);
  console.log(
    `[ServiceDetail] Result for ${id}:`,
    detail ? "Found" : "Not Found",
  );

  if (!detail) {
    notFound();
  }

  return <ServiceDetailClient initialData={detail} serviceId={id} />;
}
