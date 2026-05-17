import { useEffect, useRef, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');
  const idsRef = useRef(sectionIds);

  useEffect(() => {
    const ids = idsRef.current;
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.15,
          // Detection zone: ignores content hidden under navbar (65px),
          // and only triggers when section occupies the top ~55% of viewport
          rootMargin: '-65px 0px -45% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, []);

  return activeSection;
}
