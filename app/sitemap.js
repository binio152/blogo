import connectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/blog.model";

export default async function sitemap() {
  // Base URL
  const baseUrl = "https://binida2k1.vercel.app";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Fetch all blog posts
  let blogPages = [];
  try {
    const connection = await connectDB();

    if (connection?.readyState === 1) {
      const blogs = await BlogModel.find({}).select("_id updatedAt").lean();

      blogPages = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog._id}`,
        lastModified: blog.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return [...staticPages, ...blogPages];
}
