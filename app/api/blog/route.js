import { NextResponse } from "next/server";
import BlogModel from "../../../lib/models/blog.model.js";
import connectDB from "../../../lib/config/db.js";
import { auth } from "@clerk/nextjs/server";
import { getUserRole, ROLES } from "../../../lib/roles.js";
import { uploadToCloudinary } from "../../../lib/config/cloudinary.js";

// GET /api/blog - Get all blog posts (optionally filter by author)
export async function GET(request) {
  console.log("Fetching blog posts");

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get("authorId");
    const status = searchParams.get("status");

    let query = {};

    // Filter by author if provided
    if (authorId) {
      query.authorId = authorId;
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    } else {
      // Default: only show published posts to public
      const { userId } = await auth();
      if (!userId) {
        query.status = "published";
      }
    }

    const blogPosts = await BlogModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json(blogPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const timestamp = Date.now();

    // Lấy thông tin bài viết từ formData
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const status = formData.get("status") || "published";

    // Upload blog image to Cloudinary
    const imageFile = formData.get("image");
    if (!imageFile) {
      return NextResponse.json(
        { message: "Blog image is required" },
        { status: 400 }
      );
    }

    console.log("Uploading image to Cloudinary:", imageFile.name);
    const imageByteData = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(imageByteData);

    const imageName = `blog_${imageFile.name.split(".")[0]}_${timestamp}`;
    const imageUrl = await uploadToCloudinary(
      imageBuffer,
      "blog-images",
      imageName
    );

    // Upload author image to Cloudinary or use Clerk URL
    let authorImageUrl = "";
    const authorImageFile = formData.get("author_img");
    const authorImageClerkUrl = formData.get("author_img_url");

    if (authorImageFile && authorImageFile.size > 0) {
      // Upload author image to Cloudinary
      console.log("Uploading author image to Cloudinary");
      const authorImageByteData = await authorImageFile.arrayBuffer();
      const authorImageBuffer = Buffer.from(authorImageByteData);

      const authorImageName = `author_${author.replace(
        /\s+/g,
        "_"
      )}_${timestamp}`;
      authorImageUrl = await uploadToCloudinary(
        authorImageBuffer,
        "author-avatars",
        authorImageName
      );
    } else if (authorImageClerkUrl) {
      // Use Clerk avatar URL directly
      authorImageUrl = authorImageClerkUrl;
    } else {
      // Default avatar - will need to upload default to Cloudinary too
      authorImageUrl = "/profile_icon.png";
    }

    // Save to database
    await connectDB();

    const newBlogPost = new BlogModel({
      title,
      description,
      category,
      author,
      authorId: userId,
      status,
      image: imageUrl, // Cloudinary URL
      author_img: authorImageUrl, // Cloudinary URL or Clerk URL
    });

    await newBlogPost.save();

    console.log("Blog post created successfully with Cloudinary images");

    return NextResponse.json(
      { message: "Blog post created successfully", blog: newBlogPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
