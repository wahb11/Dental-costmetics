"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "10 Tips for Maintaining Healthy Teeth",
    excerpt: "Discover essential daily habits that will keep your smile bright and healthy for years to come.",
    author: "Dr. Sarah Johnson",
    date: "2026-07-20",
    category: "Dental Health",
    image: "🦷",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "The Complete Guide to Dental Implants",
    excerpt: "Everything you need to know about dental implants, from procedure to recovery and maintenance.",
    author: "Dr. James Wilson",
    date: "2026-07-18",
    category: "Treatments",
    image: "🔧",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Teeth Whitening: What Really Works?",
    excerpt: "An honest review of different whitening methods and what you can expect from each.",
    author: "Dr. Emily Rodriguez",
    date: "2026-07-15",
    category: "Cosmetic Dentistry",
    image: "✨",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Braces vs. Clear Aligners: Making the Right Choice",
    excerpt: "Compare traditional braces and modern clear aligners to find the best option for your smile.",
    author: "Dr. Michael Chen",
    date: "2026-07-12",
    category: "Orthodontics",
    image: "🎯",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "Dental Care for Children: A Parent's Guide",
    excerpt: "Essential tips for establishing good oral hygiene habits in children from infancy to adolescence.",
    author: "Dr. Lisa Anderson",
    date: "2026-07-10",
    category: "Pediatric Dentistry",
    image: "👶",
    readTime: "6 min read",
  },
  {
    id: "6",
    title: "Understanding Root Canal Treatment",
    excerpt: "Demystifying root canal procedures and why they're essential for saving infected teeth.",
    author: "Dr. Robert Kim",
    date: "2026-07-08",
    category: "Treatments",
    image: "🏥",
    readTime: "5 min read",
  },
];

const categories = ["All", "Dental Health", "Treatments", "Cosmetic Dentistry", "Orthodontics", "Pediatric Dentistry"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <PageMotion deps={[filteredPosts]}>
        {/* Hero Section */}
        <section className="page-hero bg-gradient-to-br from-primary/10 to-accent/10 pb-16 pt-32">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="hero-anim mb-6 text-5xl font-bold md:text-6xl">
              Dental <span className="gradient-text">Blog</span>
            </h1>
            <p className="hero-anim mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
              Expert insights, tips, and news from our dental professionals
            </p>

            {/* Search */}
            <div className="hero-anim mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 pl-12 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="anim-section reveal border-b py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl text-muted-foreground">
                  No articles found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="reveal-item group transition-all duration-300 hover:-translate-y-2 hover:shadow-premium"
                  >
                    <CardHeader>
                      <div className="mb-4 text-6xl">{post.image}</div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="mb-2 text-xl transition-colors group-hover:text-primary">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">
                        {post.excerpt}
                      </p>

                      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>

                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          className="w-full transition-all group-hover:bg-primary group-hover:text-white"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="anim-section reveal-scale bg-secondary/30 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-4xl font-bold">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Get the latest dental health tips and news delivered to your inbox
            </p>
            <div className="mx-auto flex max-w-md gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </PageMotion>

      <Footer />
    </>
  );
}
