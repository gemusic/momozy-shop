import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Truck, ShieldCheck, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { SocialProofMarquee } from "@/components/SocialProofMarquee";
import { ProductCard } from "@/components/ProductCard";
import { BrandGrid } from "@/components/BrandGrid";
import { IMAGES } from "@/assets/images";
import { PRODUCTS, ROUTE_PATHS, CATEGORIES } from "@/lib/index";

const Home: React.FC = () => {
  // Filter featured products (Elite or New)
  const featuredProducts = PRODUCTS.filter(p => p.isElite || p.isNew).slice(0, 8);

  return (
    <div className="flex flex-col w-full bg-background overflow-hidden">
      {/* Section 1: Hero (Aggressive & Cinematic) */}
      <HeroSection />

      {/* Section 2: Social Proof Marquee (The Momozy Gang) */}
      <SocialProofMarquee />

      {/* Section 3: Categories Vedettes (Brutalist Grid) */}
      <section className="py-24 px-4 md:px-8 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-border">
          <motion.div
            initial={{ opacity: 0, x: -300, rotate: -12 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.1 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <Link 
              to={ROUTE_PATHS.SHOP} 
              className="block group relative aspect-[4/5] overflow-hidden border-r border-b border-border"
            >
            <img 
              src={IMAGES.STREETWEAR_CLOTHING_4} 
              alt="Les Ensembles" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Les Ensembles</h3>
              <div className="mt-4 flex items-center gap-2 text-white font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                VOIR LA COLLECTION <ArrowRight size={16} />
              </div>
            </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -250, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.3 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <Link 
              to={ROUTE_PATHS.SHOP} 
              className="block group relative aspect-[4/5] overflow-hidden border-r border-b border-border"
            >
            <img 
              src={IMAGES.STREETWEAR_CLOTHING_2} 
              alt="Les Hauts" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Les Hauts</h3>
              <div className="mt-4 flex items-center gap-2 text-white font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                VOIR LA COLLECTION <ArrowRight size={16} />
              </div>
            </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 300, rotate: -10 }}
            whileInView={{ opacity: 1, x: 0, rotate: -4 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.5 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <Link 
              to={ROUTE_PATHS.SHOP} 
              className="block group relative aspect-[4/5] overflow-hidden border-r border-b border-border"
            >
            <img 
              src={IMAGES.URBAN_STYLE_4} 
              alt="Sneakers" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Sneakers</h3>
              <div className="mt-4 flex items-center gap-2 text-white font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                VOIR LA COLLECTION <ArrowRight size={16} />
              </div>
            </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Best Sellers (Conversion Grid) */}
      <section className="py-24 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-mono text-sm uppercase tracking-[0.2em] mb-4 block">[ ÉDITIONS LIMITÉES ]</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Les Pièces <br /> Iconiques
            </h2>
          </div>
          <Link 
            to={ROUTE_PATHS.SHOP} 
            className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors flex items-center gap-3"
          >
            Tout Explorer <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -150 : 150, // Alternance gauche/droite
                rotate: index % 2 === 0 ? -6 : 6, // Alternance rotation
                scale: 0.9
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                rotate: index % 2 === 0 ? -1 : 1, // Légère inclinaison finale
                scale: 1
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                damping: 22,
                stiffness: 110,
                delay: index * 0.1 // Délai progressif
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 5: Brand Showcase */}
      <section className="bg-foreground py-24">
        <div className="px-4 md:px-8 mb-12">
          <h2 className="text-background text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Curated Brands
          </h2>
        </div>
        <BrandGrid />
      </section>

      {/* Section 6: Lifestyle Bento Grid (The Vibe) */}
      <section className="py-24 px-4 md:px-8 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[800px]">
          <motion.div 
            initial={{ opacity: 0, x: -200, rotate: -5, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 25, stiffness: 100, delay: 0.2 }}
            whileHover={{ scale: 0.98, rotate: 0 }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden group border border-border"
          >
            <img src={IMAGES.URBAN_STYLE_1} className="w-full h-full object-cover grayscale" alt="Street life" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
              <p className="text-white text-center font-mono text-lg">
                "Plus qu'une boutique, un standard. Retrouvez-nous au Carrefour Togoudo pour une expérience unique."
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -150, rotate: 8, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 25, stiffness: 100, delay: 0.4 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="md:col-span-1 md:row-span-1 relative overflow-hidden border border-border"
          >
            <img src={IMAGES.URBAN_STYLE_2} className="w-full h-full object-cover" alt="Urban detail" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 200, rotate: -12, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 20, stiffness: 120, delay: 0.6 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="md:col-span-1 md:row-span-1 bg-primary flex flex-col items-center justify-center p-8 text-primary-foreground border border-border"
          >
            <MapPin size={48} className="mb-4" />
            <h4 className="text-2xl font-black uppercase text-center">Boutique Physique</h4>
            <p className="text-center font-mono text-sm mt-2">Carrefour Togoudo, Calavi</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="mt-6 border-b border-current pb-1 font-bold text-xs tracking-widest hover:opacity-70 transition-opacity"
            >
              NOUS TROUVER SUR MAPS
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 200, rotate: 6, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 25, stiffness: 100, delay: 0.8 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="md:col-span-2 md:row-span-1 relative overflow-hidden border border-border"
          >
            <img src={IMAGES.URBAN_STYLE_5} className="w-full h-full object-cover" alt="Style focus" />
          </motion.div>
        </div>
      </section>

      {/* Section 7: Reassurance (The Service) */}
      <section className="py-12 border-y border-border">
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center">
                <Truck size={24} />
              </div>
              <h5 className="text-xl font-black uppercase">Livraison Éclair</h5>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Sur Cotonou et Calavi en moins de 24h. Expédition rapide vers Porto-Novo et Parakou.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h5 className="text-xl font-black uppercase">Qualité Certifiée</h5>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Tissus sélectionnés pour leur durabilité. Matières lourdes, broderies haute définition.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <h5 className="text-xl font-black uppercase">Support Direct</h5>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                Discutez avec notre équipe sur WhatsApp 7j/7 pour des conseils taille ou style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Newsletter (Join the Gang) */}
      <section className="py-24 px-4 md:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8">Rejoignez <br /> le Gang.</h2>
          <p className="text-xl font-mono mb-12 opacity-70">
            Soyez informé des prochains drops avant tout le monde.
          </p>
          <form className="flex flex-col md:flex-row gap-0 border border-white/20">
            <input 
              type="email" 
              placeholder="VOTRE EMAIL@ELITE.COM" 
              className="flex-1 bg-transparent border-none p-6 font-mono focus:ring-1 focus:ring-white outline-none uppercase"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-black font-black px-12 py-6 uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
