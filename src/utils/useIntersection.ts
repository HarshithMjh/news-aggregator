import { useEffect, type RefObject } from "react";

const listenerCallbacks = new WeakMap();
let observer: IntersectionObserver;

function handleIntersections(entries: Array<IntersectionObserverEntry>) {
  entries.forEach((entry) => {
    if (listenerCallbacks.has(entry.target)) {
      const { callback, shouldRemoveAfterIntersection } = listenerCallbacks.get(
        entry.target,
      );
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        if (shouldRemoveAfterIntersection) {
          observer.unobserve(entry.target);
          listenerCallbacks.delete(entry.target);
        }
        callback();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: "100px",
      threshold: 0.15,
    });
  }
  return observer;
}

function useIntersection(
  elem: RefObject<HTMLDivElement | null>,
  callback: () => void,
  shouldRemoveAfterIntersection: boolean,
) {
  useEffect(() => {
    const target = elem.current;
    if (!target) {
      return;
    }
    const observer = getIntersectionObserver();
    listenerCallbacks.set(target, {
      callback,
      shouldRemoveAfterIntersection,
    });
    observer.observe(target);
    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useIntersection;
