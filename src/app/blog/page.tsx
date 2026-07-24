"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";

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
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Dental <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Expert insights, tips, and news from our dental professionals
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-premium transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="text-6xl mb-4">{post.image}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest dental health tips and news delivered to your inbox
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
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

      <Footer />
    </>
  );
}
