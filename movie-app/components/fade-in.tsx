'use client';

import { motion } from "framer-motion";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
    return (
        // first opacity 0 while in view full opacity and give ease
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}
