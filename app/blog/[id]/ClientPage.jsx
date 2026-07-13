"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BlogLoading from "@/components/BlogLoading";
import BlogNotFound from "@/components/BlogNotFound";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";

const ClientPage = ({ initialData, id: serverId }) => {
  const [data, setData] = useState(initialData || null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [status, setStatus] = useState(data ? "ready" : "loading");
  // prefer params from useParams when available (client navigation)
  const params = useParams();
  const id = params?.id || serverId;

  // Calculate reading time
  const calculateReadingTime = (text) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  useEffect(() => {
    if (data) {
      // Update title
      document.title = `${data.title} | Blogo`;

      // Update meta description
      const plainDescription =
        data.description?.replace(/<[^>]*>/g, "").substring(0, 160) || "";

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = plainDescription;

      // Update Open Graph tags
      const updateMetaTag = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };

      updateMetaTag("og:title", data.title);
      updateMetaTag("og:description", plainDescription);
      updateMetaTag("og:image", data.image);
      updateMetaTag("og:type", "article");
      updateMetaTag("og:url", `https://binida2k1.vercel.app/blog/${id}`);

      // Update Twitter Card tags
      const updateTwitterTag = (name, content) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("name", name);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };

      updateTwitterTag("twitter:card", "summary_large_image");
      updateTwitterTag("twitter:title", data.title);
      updateTwitterTag("twitter:description", plainDescription);
      updateTwitterTag("twitter:image", data.image);
    }

    return () => {
      // Reset title on unmount
      document.title = "Blogo - Share Your Stories";
    };
  }, [data, id]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setStatus("loading");
        const response = await fetch(`/api/blog/${id}`);

        if (!response.ok) {
          setStatus("not-found");
          return;
        }

        const blog = await response.json();
        setData(blog);
        setStatus("ready");

        // Fetch related posts
        if (blog.category) {
          const relatedResponse = await fetch(`/api/blog?status=published`);
          if (relatedResponse.ok) {
            const allBlogs = await relatedResponse.json();
            const related = allBlogs
              .filter(
                (post) =>
                  post._id !== blog._id && post.category === blog.category
              )
              .slice(0, 3);
            setRelatedPosts(related);
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setStatus("not-found");
      }
    };

    // Only fetch if we don't already have initial data
    if (!data && id) {
      fetchBlog();
    } else if (data && status !== "ready") {
      setStatus("ready");
    }
  }, [id, data]);

  if (status === "loading") {
    return <BlogLoading />;
  }

  if (status === "not-found") {
    return <BlogNotFound />;
  }

  return (
    <>
      <ReadingProgressBar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 order-2 lg:order-1">
                {data.category && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#DBF3FF] text-[#65BBDF] border border-black shadow-[-3px_3px_0_#65BBDF]">
                      {data.category}
                    </span>
                  </div>
                )}

                <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {data.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.author_img}
                      alt={data.author}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{data.author}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {new Date(data.createdAt || data.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                  {data.views && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span>{data.views} views</span>
                    </>
                  )}
                  {data.content && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span>{calculateReadingTime(data.content)} min read</span>
                    </>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative aspect-[16/10] overflow-hidden border border-black shadow-[-7px_7px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#65BBDF] transition-all">
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main two-column layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Content */}
            <main className="lg:col-span-8">
              <article
                className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
              prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5
              prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-[#4aa3d1] prose-a:no-underline hover:prose-a:text-[#65BBDF] hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#65BBDF] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
              prose-hr:my-8 prose-hr:border-gray-300"
              >
                {data.description && (
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                )}

                {data.content && (
                  <div
                    className="article-content mt-6"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  />
                )}
              </article>

              {/* Share Section */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Share this article
                </h3>
                <ShareButtons
                  title={data.title}
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                />

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mt-6 text-[#4aa3d1] hover:text-[#65BBDF] font-medium transition-colors"
                >
                  <span>←</span>
                  <span>Back to Blog</span>
                </Link>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-4 space-y-6">
                {/* Table of Contents */}
                {data.content && <TableOfContents content={data.content} />}

                {/* Related Articles */}
                <div className="border border-black p-6 shadow-[-7px_7px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#65BBDF] transition-all">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((post) => (
                        <Link
                          key={post._id}
                          href={`/blog/${post._id}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-16 overflow-hidden bg-gray-100 flex-shrink-0 border border-black">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="64px"
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#65BBDF] transition-colors">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(
                                post.createdAt || post.date
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No related articles yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientPage;
