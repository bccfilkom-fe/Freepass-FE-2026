'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading check or just a fixed timer for the animation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 Seconds intro

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    // parent for making everything in the middle
                    <motion.div
                        className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0d0c1d] text-primary"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                        {/* div for the content */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="flex flex-col items-center gap-4"
                            >
                            <Image src="/logoloop.png" width={200} height={200} alt=""/>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-widest uppercase text-white drop-shadow-2xl">
                                LOOP<span className="text-primary">FLIX</span>
                            </h1>
                            <motion.div
                                className="h-1 w-24 bg-primary rounded-full mt-2"
                                initial={{ width: 0 }}
                                animate={{ width: 100 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* entering the real content */}
            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            )}
        </>
    );
}
