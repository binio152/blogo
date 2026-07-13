import ClientPage from "./ClientPage";

// Server component: fetch blog data and provide metadata for crawlers
export async function generateMetadata({ params }) {
  const id = params.id;
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://binida2k1.vercel.app"
      }/api/blog/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {};
    }

    const blog = await res.json();
    const description = (blog.description || "")
      .replace(/<[^>]*>/g, "")
      .slice(0, 160);
    const image = blog.image || "/opengraph-image";
    const url = `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://binida2k1.vercel.app"
    }/blog/${id}`;

    return {
      title: `${blog.title} | Blogo`,
      description,
      openGraph: {
        title: blog.title,
        description,
        url,
        type: "article",
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [image],
      },
    };
  } catch (err) {
    return {};
  }
}

export default async function Page({ params }) {
  const id = params.id;
  // Fetch initial blog data server-side and pass to client component to avoid double-loading
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://binida2k1.vercel.app"
      }/api/blog/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Not Found
        </div>
      );
    }

    const blog = await res.json();
    return <ClientPage initialData={blog} id={id} />;
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">Error</div>
    );
  }
}
