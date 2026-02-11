import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowRight } from "lucide-react";
import { BLOG_POSTS, ROUTE_PATHS } from "@/lib/index";
import { ScratchBrutal } from "@/components/ScratchBrutal";
import { GrayscaleImage } from "@/components/GrayscaleImage";

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32">
        <h1 className="text-4xl font-black uppercase">Article introuvable</h1>
        <Link to={ROUTE_PATHS.BLOG} className="mt-8 text-primary underline font-mono">
          RETOUR AU JOURNAL
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== id).slice(0, 2);

  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24">
      {/* Back Button */}
      <div className="px-4 md:px-8 mb-12">
        <Link
          to={ROUTE_PATHS.BLOG}
          className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:text-primary transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-2" />
          RETOUR AU JOURNAL
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-5xl mx-auto px-4 md:px-8">
        <header className="mb-16 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-4 text-[10px] font-mono text-primary uppercase font-black tracking-[0.2em]">
            <span className="bg-foreground text-background px-3 py-1">{post.category}</span>
            <span>{post.date}</span>
            <span>{post.readTime} LECTURE</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 py-8 border-y border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-background">
                {post.author[0]}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Auteur</span>
                <span className="text-sm font-bold uppercase">{post.author}</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
              <Share2 size={16} /> PARTAGER
            </button>
          </div>
        </header>

        {/* Hero Image */}
        <div className="aspect-video w-full border-4 border-foreground overflow-hidden mb-16">
          <GrayscaleImage
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-24">
          <div className="font-mono text-muted-foreground whitespace-pre-wrap leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
            {post.content}
          </div>
        </div>

        {/* Article Footer / Tags */}
        <footer className="py-12 border-t border-border mb-24">
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-muted font-mono text-xs uppercase tracking-widest">#STREETWEAR</span>
            <span className="px-4 py-2 bg-muted font-mono text-xs uppercase tracking-widest">#BRUTALISM</span>
            <span className="px-4 py-2 bg-muted font-mono text-xs uppercase tracking-widest">#ELITE</span>
            <span className="px-4 py-2 bg-muted font-mono text-xs uppercase tracking-widest">#COTONOU</span>
          </div>
        </footer>

        {/* Related Articles */}
        <section className="space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter border-l-8 border-primary pl-6">
            AUTRES RÉCIT DU GANG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((rPost, index) => (
              <ScratchBrutal key={rPost.id} index={index} intensity="medium">
                <Link to={ROUTE_PATHS.BLOG_POST.replace(":id", rPost.id)} className="group block">
                  <div className="aspect-video overflow-hidden border-2 border-border group-hover:border-foreground transition-colors mb-4">
                    <img src={rPost.image} alt={rPost.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                    {rPost.title}
                  </h3>
                </Link>
              </ScratchBrutal>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPost;
