"use client";
import React, { useState } from "react";
import { Twitter, Facebook, Mail, Copy, Check } from "lucide-react";

const ShareButtons = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const handleShareTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleShareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${title}\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const buttonClass =
    "inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white font-medium text-sm border border-gray-700 shadow-[-4px_4px_0_#65BBDF] hover:shadow-[-3px_3px_0_#65BBDF] hover:bg-gray-700 active:shadow-none active:translate-x-[-1px] active:translate-y-[1px] transition-all duration-200";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleShareTwitter}
        className={buttonClass}
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
        <span>Twitter</span>
      </button>

      <button
        onClick={handleShareFacebook}
        className={buttonClass}
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
        <span>Facebook</span>
      </button>

      <button
        onClick={handleShareEmail}
        className={buttonClass}
        aria-label="Share by Email"
      >
        <Mail className="w-5 h-5" />
        <span>Email</span>
      </button>

      <button
        onClick={handleCopy}
        className={buttonClass}
        aria-label="Copy Link"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
};

export default ShareButtons;
