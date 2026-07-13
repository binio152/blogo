import Image from "next/image";
import Link from "next/link";
import ScrollToHash from "@/components/ScrollToHash";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  Heart,
  Code,
  Palette,
  Zap,
  BookText,
  User,
} from "lucide-react";

/**
 * About Page
 * Landing page introducing the blog, team, and mission
 * Features hero section, team profiles, stats, and CTA
 */
export const metadata = {
  title: "About Us - Binida Blog",
  description:
    "Learn more about our blog, our mission, and the team behind it.",
};

export default function AboutPage() {
  // Team members data
  const team = [
    {
      name: "Binh Tran",
      role: "Writer",
      bio: "Passionate about anime, tech, and sharing knowledge with the community.",
      image: null, // Will use placeholder icon
      socials: {
        email: "mailto:binida2k1@gmail.com",
        github: "https://github.com/binida1210",
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/in/binida2k1",
      },
    },
    {
      name: "John Doe",
      role: "Content Creator",
      bio: "Loves writing about web development and pop culture.",
      image: null, // Will use placeholder icon
      socials: {
        email: "mailto:johndoe@gmail.com",
        github: "https://github.com/",
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/",
      },
    },
    // Add more team members here
  ];

  // Blog statistics
  const stats = [
    { icon: Code, label: "Blog Posts", value: "50+", color: "text-blue-600" },
    {
      icon: Heart,
      label: "Monthly Readers",
      value: "1.2K+",
      color: "text-red-600",
    },
    {
      icon: Palette,
      label: "Categories",
      value: "20+",
      color: "text-purple-600",
    },
    { icon: Zap, label: "Years Active", value: "1+", color: "text-yellow-600" },
  ];

  // Core values
  const values = [
    {
      title: "Quality Content",
      description:
        "We focus on creating in-depth, well-researched articles that provide real value to our readers.",
      icon: "📚",
    },
    {
      title: "Community First",
      description:
        "Building a vibrant community where readers can learn, share, and grow together.",
      icon: "🤝",
    },
    {
      title: "Continuous Learning",
      description:
        "Staying updated with the latest trends in technology, anime, and lifestyle topics.",
      icon: "🚀",
    },
    {
      title: "Creative Expression",
      description:
        "Encouraging unique perspectives and creative storytelling in every post we publish.",
      icon: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <ScrollToHash />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3">
                <BookText className="w-16 h-16 text-[#65BBDF]" />
                <h2 className="text-5xl font-black text-gray-900">Blogo</h2>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Welcome to <span className="text-[#65bbdf]">Blogo</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              A creative space where technology meets passion. We share stories,
              insights, and knowledge about web development, anime culture,
              gaming, and everything in between.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="px-8 py-4 bg-black text-white font-bold border-4 border-black shadow-[-6px_6px_0_#DBF3FF] hover:shadow-[-8px_8px_0_#65BBDF] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                Read Our Blog
              </Link>
              <Link
                href="/about#mission"
                scroll
                className="px-8 py-4 bg-white text-black font-bold border-4 border-black shadow-[-6px_6px_0_#FFE5E5] hover:shadow-[-8px_8px_0_#FF9999] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300 rounded-full opacity-50 blur-xl"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 border-4 border-black bg-white shadow-[-4px_4px_0_#DBF3FF] hover:shadow-[-6px_6px_0_#65BBDF] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                >
                  <Icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                  <p className="text-3xl font-black text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
        id="mission"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Our Mission
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white border-4 border-black shadow-[-8px_8px_0_#DBF3FF] p-8 sm:p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At <strong>Blogo</strong>, we believe that knowledge should be
                accessible, engaging, and fun. Our mission is to create a
                platform where technology enthusiasts, anime lovers, and curious
                minds can come together to learn and share.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are committed to delivering high-quality content that
                educates, entertains, and inspires. Whether you're a beginner
                learning React or a veteran exploring the latest anime series,
                there's something here for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black shadow-[-6px_6px_0_#DBF3FF] hover:shadow-[-8px_8px_0_#65BBDF] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 p-8"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 border-t-4 border-black"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Meet the Team
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Blogo, working hard to bring you
              quality content every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black shadow-[-6px_6px_0_#DBF3FF] hover:shadow-[-8px_8px_0_#65BBDF] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden"
              >
                {/* Profile Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 border-b-4 border-black flex items-center justify-center">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-32 h-32 text-gray-400" />
                  )}
                </div>

                {/* Profile Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-3 border-3 border-black bg-white hover:bg-[#DBF3FF] transition-all duration-200 shadow-[-2px_2px_0_rgba(0,0,0,0.2)] hover:shadow-[-3px_3px_0_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                      aria-label="Email"
                    >
                      <Mail className="w-6 h-6 stroke-[2]" />
                    </a>
                    <a
                      href={member.socials.github}
                      className="p-3 border-3 border-black bg-white hover:bg-[#DBF3FF] transition-all duration-200 shadow-[-2px_2px_0_rgba(0,0,0,0.2)] hover:shadow-[-3px_3px_0_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                      aria-label="GitHub"
                    >
                      <Github className="w-6 h-6 stroke-[2]" />
                    </a>
                    <a
                      href={member.socials.twitter}
                      className="p-3 border-3 border-black bg-white hover:bg-[#DBF3FF] transition-all duration-200 shadow-[-2px_2px_0_rgba(0,0,0,0.2)] hover:shadow-[-3px_3px_0_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-6 h-6 stroke-[2]" />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      className="p-3 border-3 border-black bg-white hover:bg-[#DBF3FF] transition-all duration-200 shadow-[-2px_2px_0_rgba(0,0,0,0.2)] hover:shadow-[-3px_3px_0_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6 stroke-[2]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 border-t-4 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Join Our Community Today!
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Subscribe to our newsletter and never miss out on the latest
            articles, tutorials, and exclusive content.
          </p>
        </div>
      </section>
    </div>
  );
}
