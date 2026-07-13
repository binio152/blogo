import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const normalizeMongoUri = (uri) => {
  if (!uri) {
    return uri;
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  const protocolEnd = uri.indexOf("://") + 3;
  const atIndex = uri.lastIndexOf("@");

  if (protocolEnd < 3 || atIndex <= protocolEnd) {
    return uri;
  }

  const credentials = uri.slice(protocolEnd, atIndex);
  const hostAndPath = uri.slice(atIndex + 1);
  const colonIndex = credentials.indexOf(":");

  if (colonIndex === -1) {
    return uri;
  }

  const username = credentials.slice(0, colonIndex);
  let password = credentials.slice(colonIndex + 1);

  if (password.startsWith("<") && password.endsWith(">")) {
    password = password.slice(1, -1);
  }

  return `${uri.slice(0, protocolEnd)}${encodeURIComponent(username)}:${encodeURIComponent(password)}@${hostAndPath}`;
};

const connectDB = async () => {
  try {
    const mongoUri = normalizeMongoUri(process.env.DB_URI);

    if (!mongoUri) {
      throw new Error("DB_URI is not configured");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to the database");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return null;
  }
};

export default connectDB;
