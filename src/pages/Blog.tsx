import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { BLOG_POSTS, ROUTE_PATHS } from "@/lib/index";
import { ScratchBrutal } from "@/components/ScratchBrutal";
import { GrayscaleImage } from "@/components/GrayscaleImage";

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24">
      {/* Blog Header */}
      <section className="px-4 md:px-8 mb-20">
        <div className="max-w-4xl">
          <span className="text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4 block">
            [ LE JOURNAL DU GANG ]
          </span>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
            MODES & <br /> SIGNALS.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono max-w-2xl">
            Analyses brutales, guides de style et culture streetwear premium.
            L'esthétique du bitume décryptée pour l'élite.
          </p>
        </div>
      </section>

      {/* Featured Post (First one) */}
      <section className="px-4 md:px-8 mb-24">
        <ScratchBrutal intensity="brutal" index={0}>
          <Link
            to={ROUTE_PATHS.BLOG_POST.replace(":id", BLOG_POSTS[0].id)}
            className="group relative grid grid-cols-1 lg:grid-cols-2 border-4 border-foreground overflow-hidden"
          >
            <div className="aspect-video lg:aspect-auto overflow-hidden border-b lg:border-b-0 lg:border-r-4 border-foreground">
              <GrayscaleImage
                src={BLOG_POSTS[0].image}
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center gap-6 bg-card">
              <div className="flex items-center gap-4 text-xs font-mono text-primary uppercase font-black">
                <span className="bg-foreground text-background px-2 py-1">{BLOG_POSTS[0].category}</span>
                <span>{BLOG_POSTS[0].readTime} READ</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                {BLOG_POSTS[0].title}
              </h2>
              <p className="text-muted-foreground font-mono leading-relaxed">
                {BLOG_POSTS[0].excerpt}
              </p>
              <div className="flex items-center gap-2 font-black uppercase tracking-widest text-sm mt-4">
                LIRE L'ARTICLE <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        </ScratchBrutal>
      </section>

      {/* Blog Feed Grid */}
      <section className="px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BLOG_POSTS.slice(1).map((post, index) => (
            <ScratchBrutal key={post.id} intensity="medium" index={index + 1}>
              <Link
                to={ROUTE_PATHS.BLOG_POST.replace(":id", post.id)}
                className="group flex flex-col h-full border-2 border-border hover:border-foreground transition-colors"
              >
                <div className="aspect-video overflow-hidden border-b-2 border-border group-hover:border-foreground transition-colors">
                  <GrayscaleImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow gap-4">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span className="text-primary font-bold">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-border group-hover:border-foreground transition-colors">
                    <span className="text-xs font-black uppercase tracking-widest">LIRE LA SUITE</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </ScratchBrutal>
          ))}
        </div>
      </section>

      {/* Newsletter Section (Integrated) */}
      <section className="mt-32 px-4 md:px-8">
        <div className="bg-foreground text-background p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            NE MANQUE PAS LE PROCHAIN DROP.
          </h2>
          <p className="max-w-2xl mx-auto font-mono mb-12 opacity-70">
            Rejoins les 5000+ membres de l'élite qui reçoivent nos signaux hebdomadaires.
          </p>
          <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="TON_EMAIL@GANG.COM"
              className="flex-1 bg-white/10 border-2 border-white/20 p-6 font-mono focus:border-white outline-none uppercase"
            />
            <button className="bg-white text-black font-black px-12 py-6 uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              S'INSCRIRE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;
