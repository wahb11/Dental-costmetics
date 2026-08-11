"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageMotion from "@/components/motion/PageMotion";
import { ArrowLeft, Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "10 Tips for Maintaining Healthy Teeth",
    excerpt:
      "Discover essential daily habits that will keep your smile bright and healthy for years to come.",
    content:
      "Brushing twice a day, flossing daily, limiting sugar, staying hydrated, and visiting your dentist every six months are the foundation of lifelong oral health. Pair these habits with a balanced diet rich in calcium and vitamin D, and replace your toothbrush every 3 months for best results.",
    author: "Dr. Sarah Johnson",
    date: "2026-07-20",
    category: "Dental Health",
    image: "🦷",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "The Complete Guide to Dental Implants",
    excerpt:
      "Everything you need to know about dental implants, from procedure to recovery and maintenance.",
    content:
      "Dental implants replace missing teeth with titanium posts that fuse to the jawbone. The process typically includes consultation, placement, healing, and crown attachment over 3–6 months. With proper care, implants can last decades and preserve facial structure.",
    author: "Dr. James Wilson",
    date: "2026-07-18",
    category: "Treatments",
    image: "🔧",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Teeth Whitening: What Really Works?",
    excerpt:
      "An honest review of different whitening methods and what you can expect from each.",
    content:
      "Professional in-office whitening offers the fastest, most dramatic results. At-home trays prescribed by your dentist are a strong alternative. Over-the-counter strips help mildly, while charcoal and DIY acid methods can damage enamel and should be avoided.",
    author: "Dr. Emily Rodriguez",
    date: "2026-07-15",
    category: "Cosmetic Dentistry",
    image: "✨",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Braces vs. Clear Aligners: Making the Right Choice",
    excerpt:
      "Compare traditional braces and modern clear aligners to find the best option for your smile.",
    content:
      "Traditional braces excel at complex movements. Clear aligners are discreet and removable for eating and cleaning, ideal for mild-to-moderate cases. Your orthodontist can recommend the best path after evaluating bite, crowding, and lifestyle.",
    author: "Dr. Michael Chen",
    date: "2026-07-12",
    category: "Orthodontics",
    image: "🎯",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "Dental Care for Children: A Parent's Guide",
    excerpt:
      "Essential tips for establishing good oral hygiene habits in children from infancy to adolescence.",
    content:
      "Start cleaning gums before teeth erupt, schedule the first dental visit by age one, use fluoride toothpaste in age-appropriate amounts, and make brushing fun. Sealants and early orthodontic checks can prevent bigger issues later.",
    author: "Dr. Lisa Anderson",
    date: "2026-07-10",
    category: "Pediatric Dentistry",
    image: "👶",
    readTime: "6 min read",
  },
  {
    id: "6",
    title: "Understanding Root Canal Treatment",
    excerpt:
      "Demystifying root canal procedures and why they're essential for saving infected teeth.",
    content:
      "A root canal removes infected pulp, cleans the canals, and seals the tooth—often finishing with a crown. Modern techniques and anesthesia make the procedure comfortable, and saving your natural tooth is almost always better than extraction.",
    author: "Dr. Robert Kim",
    date: "2026-07-08",
    category: "Treatments",
    image: "🏥",
    readTime: "5 min read",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const post = useMemo(
    () => blogPosts.find((p) => p.id === params.id),
    [params.id]
  );

  if (!post) {
    return (
      <>
        <Navbar />
        <PageMotion>
          <div className="page-hero mx-auto max-w-3xl px-4 pb-20 pt-32 text-center">
            <h1 className="hero-anim mb-4 text-3xl font-bold">Article not found</h1>
            <Link href="/blog" className="hero-anim inline-block">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </PageMotion>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageMotion>
        <article className="page-hero pb-20 pt-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="hero-anim inline-block">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="hero-anim mb-6 text-6xl">{post.image}</div>
            <span className="hero-anim mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
              {post.category}
            </span>
            <h1 className="hero-anim mb-4 text-4xl font-bold md:text-5xl">
              {post.title}
            </h1>
            <div className="hero-anim mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span>{post.readTime}</span>
            </div>

            <Card className="reveal reveal-scale">
              <CardContent className="space-y-4 p-8 text-lg leading-relaxed text-muted-foreground">
                <p className="text-foreground">{post.excerpt}</p>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          </div>
        </article>
      </PageMotion>
      <Footer />
    </>
  );
}
