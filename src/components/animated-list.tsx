"use client";

import { AnimatedList } from "@/components/magicui/animated-list";
import { useEffect, useRef, useState } from "react";

export function CustomAnimatedList({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (listRef.current) {
            observer.observe(listRef.current);
        }

        return () => {
            if (listRef.current) {
                observer.unobserve(listRef.current);
            }
        };
    }, []);

    return (
        <div ref={listRef}>
            {isVisible ? (
                <div className='relative flex h-[500px] w-full flex-col overflow-hidden p-2'>
                    <AnimatedList>{children}</AnimatedList>
                </div>
            ) : (
                <div className='opacity-0 h-4 w-full' />
            )}
        </div>
    );
}
