import { NextResponse } from "next/server";
import BlogModel from "../../../../lib/models/blog.model.js";
import connectDB from "../../../../lib/config/db.js";
import { auth } from "@clerk/nextjs/server";
import { canEditBlog, canDeleteBlog } from "../../../../lib/roles.js";
import { uploadToCloudinary } from "../../../../lib/config/cloudinary.js";

// GET /api/blog/[id] - Get a blog post by ID
export async function GET(request, { params }) {
  const { id } = params;
  console.log("Fetching blog post with ID:", id);

  try {
    await connectDB();
    const blogPost = await BlogModel.findById(id);

    if (!blogPost) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    // Increment view count
    blogPost.views = (blogPost.views || 0) + 1;
    await blogPost.save();

    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update a blog post
export async function PUT(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const { id } = params;
    await connectDB();

    // Get existing blog post
    const existingBlog = await BlogModel.findById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    // Check if user has permission to edit
    const user = { id: userId };
    if (!canEditBlog(user, existingBlog.authorId)) {
      return NextResponse.json(
        { message: "Forbidden - You can only edit your own posts" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const timestamp = Date.now();

    const updateData = {
      title: formData.get("title") || existingBlog.title,
      description: formData.get("description") || existingBlog.description,
      category: formData.get("category") || existingBlog.category,
      status: formData.get("status") || existingBlog.status,
    };

    // Handle image update if provided - Upload to Cloudinary
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      console.log("Uploading new blog image to Cloudinary");
      const imageByteData = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(imageByteData);

      const imageName = `blog_${imageFile.name.split(".")[0]}_${timestamp}`;
      const imageUrl = await uploadToCloudinary(
        imageBuffer,
        "blog-images",
        imageName
      );
      updateData.image = imageUrl;
    }

    // Handle author image update if provided - Upload to Cloudinary
    const authorImageFile = formData.get("author_img");
    if (authorImageFile && authorImageFile.size > 0) {
      console.log("Uploading new author image to Cloudinary");
      const authorImageByteData = await authorImageFile.arrayBuffer();
      const authorImageBuffer = Buffer.from(authorImageByteData);

      const authorImageName = `author_${existingBlog.author.replace(
        /\s+/g,
        "_"
      )}_${timestamp}`;
      const authorImageUrl = await uploadToCloudinary(
        authorImageBuffer,
        "author-avatars",
        authorImageName
      );
      updateData.author_img = authorImageUrl;
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(
      { message: "Blog post updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Delete a blog post
export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    const { id } = params;
    await connectDB();

    // Get existing blog post
    const existingBlog = await BlogModel.findById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    // Check if user has permission to delete
    const user = { id: userId };
    if (!canDeleteBlog(user, existingBlog.authorId)) {
      return NextResponse.json(
        { message: "Forbidden - You can only delete your own posts" },
        { status: 403 }
      );
    }

    // Note: Images stored on Cloudinary will remain for now
    // You can optionally implement Cloudinary deletion here using deleteFromCloudinary()
    // For now, we just delete the database record

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
