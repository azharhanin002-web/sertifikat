"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollAnimationWrapper({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className: string 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika elemen masuk ke layar (20% terlihat)
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop mengamati setelah animasi jalan sekali
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      // Jika terlihat: Pakai class animasi yang dikirim. Jika belum: Sembunyikan (opacity-0).
      className={`${isVisible ? className : "opacity-0 translate-y-10"} transition-all duration-700`}
    >
      {children}
    </div>
  );
}