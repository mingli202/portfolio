import { useEffect, useRef, type RefObject } from "react";

export function useIsVisibleCallback<T extends HTMLElement>(
  callback: () => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (hasBeenVisible.current) {
            return;
          }

          if (entry.isIntersecting) {
            callback();
            hasBeenVisible.current = true;
          }
        });
      },
      { threshold: 0 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}
