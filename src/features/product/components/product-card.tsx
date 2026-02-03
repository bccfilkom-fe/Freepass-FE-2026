"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Tag } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Product } from "../schema";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ className, product }: ProductCardProps) {
  const mouseX = useMotionValue(175);
  const mouseY = useMotionValue(175);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const rotateX = useTransform(mouseY, [0, 350], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 350], [-10, 10]);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  const glowX = useTransform(mouseX, [0, 350], [0, 100]);
  const glowY = useTransform(mouseY, [0, 350], [0, 100]);
  const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.5]);

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(175);
          mouseY.set(175);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-87.5 w-87.5 rounded-2xl bg-card shadow-lg transition-shadow duration-300 hover:shadow-2xl cursor-pointer",
          className
        )}
      >
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="absolute inset-4 rounded-xl bg-card-foreground/5 shadow-inner">
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(80px at ${glowX}% ${glowY}%, hsl(var(--primary)), transparent 40%)`,
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            <div className="flex items-center space-x-2 text-card-foreground">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium capitalize">{product.category}</span>
            </div>
            
            <div className="text-card-foreground">
              <h2 className="text-4xl font-bold tracking-tight">${product.price.toFixed(2)}</h2>
              <p className="mt-2 max-w-[60%] text-xs text-muted-foreground line-clamp-2">
                {product.title}
              </p>
            </div>
          </div>
          
          <motion.img
            src={product.image}
            alt={product.title}
            style={{ transform: "translateZ(50px)" }}
            whileHover={{ scale: 1.1, y: -20, x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -right-12 -bottom-12 h-56 w-56 object-contain"
          />
        </div>
      </motion.div>
    </Link>
  );
}
