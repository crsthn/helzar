import type { Metadata } from "next";

export function constructMetadata({
  title = "Helzar – Project Management Made Simple",
  description = "Streamline your project management with Helzar. Efficient, intuitive, and powerful project management solution.",
  image = "/opengraph-image.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@crsthn77",
    },
    icons,
    metadataBase: new URL("https://helzar.vercel.app/"),
  };
}
