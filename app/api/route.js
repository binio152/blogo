import connectDB from "@/lib/config/db";

export async function GET(request) {
  await connectDB();
  return new Response("Hello, this is the API route!");
}
