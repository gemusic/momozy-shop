import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Eye, ShoppingBag } from "lucide-react";
import { Product, ROUTE_PATHS, formatPrice } from "@/lib/index";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const isSoldOut = product.stockStatus === "sold-out";
  const isLowStock = product.stockStatus === "low-stock";

  const handleQuickAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If single size (like accessories), add directly, otherwise go to detail for selection
    if (product.sizes.length === 1 && product.sizes[0] === "Unique") {
      addItem(product, "Unique");
    } else {
      navigate(ROUTE_PATHS.PRODUCT_DETAIL.replace(":id", product.id));
    }
  };

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col border border-border bg-background rounded-none transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ 
        opacity: 0, 
        x: Math.random() > 0.5 ? -200 : 200, // Scratch depuis gauche ou droite
        rotate: Math.random() > 0.5 ? -8 : 8, // Rotation oblique aléatoire
        scale: 0.8
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        rotate: Math.random() > 0.5 ? -2 : 2, // Légère inclinaison finale
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8,
        delay: Math.random() * 0.3 // Délai aléatoire pour effet décalé
      }}
      whileHover={{
        rotate: 0, // Se redresse au hover
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Status Badges */}
      <div className="absolute top-0 left-0 z-20 flex flex-col">
        {product.isElite && (
          <div className="bg-foreground text-background px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest">
            Elite Member Only
          </div>
        )}
        {product.isNew && (
          <div className="bg-white text-black px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest border-b border-r border-black">
            Nouveau Drop
          </div>
        )}
        {isSoldOut && (
          <div className="bg-destructive text-white px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest">
            Sold Out
          </div>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link 
          to={ROUTE_PATHS.PRODUCT_DETAIL.replace(":id", product.id)}
          className="block w-full h-full cursor-none"
        >
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-200",
              isHovered && product.secondaryImage ? "opacity-0" : "opacity-100"
            )}
          />
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} alt`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </Link>

        {/* Aggressive Hover CTA */}
        {!isSoldOut && (
          <button
            onClick={handleQuickAction}
            className={cn(
              "absolute inset-x-0 bottom-0 py-5 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-[0.2em]",
              "flex items-center justify-center gap-3 transition-transform duration-150 transform translate-y-full group-hover:translate-y-0",
              "hover:bg-white hover:text-black"
            )}
          >
            {product.sizes.length > 1 ? (
              <>
                <Eye className="w-4 h-4" />
                Voir Options
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Ajouter
              </>
            )}
          </button>
        )}

        {/* Custom Cursor Indicator on Hover */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/20 rounded-none flex items-center justify-center">
             <span className="text-[10px] font-mono text-white tracking-widest">VIEW</span>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-grow border-t border-border">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {product.brand}
          </span>
          {isLowStock && (
            <span className="text-[9px] font-mono text-destructive font-bold uppercase animate-pulse">
              Stock Limité
            </span>
          )}
        </div>

        <Link
          to={ROUTE_PATHS.PRODUCT_DETAIL.replace(":id", product.id)}
          className="text-base font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-end justify-between">
          <div className="font-mono text-lg font-medium">
            {formatPrice(product.price)}
          </div>
          <div className="flex gap-1">
            {product.sizes.slice(0, 3).map((size) => (
              <span key={size} className="text-[9px] font-mono border border-border px-1 py-0.5 opacity-50">
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && <span className="text-[9px] font-mono opacity-50">+</span>}
          </div>
        </div>
      </div>

      {/* Brutalist Geometric Decor */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-foreground opacity-0 group-hover:opacity-100 transition-all" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-foreground opacity-0 group-hover:opacity-100 transition-all" />
    </motion.div>
  );
}
