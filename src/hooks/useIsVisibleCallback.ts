import { useEffect, useRef, type RefObject } from "react";

export function useIsVisibleCallback<T extends HTMLElement>(
  callback: () => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const callbackRef = useRef(callback);
  const hasBeenVisible = useRef(false);

  callbackRef.current = callback;

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (hasBeenVisible.current) {
            return;
          }

          if (entry.isIntersecting) {
            callbackRef.current();
            hasBeenVisible.current = true;

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return ref;
}
