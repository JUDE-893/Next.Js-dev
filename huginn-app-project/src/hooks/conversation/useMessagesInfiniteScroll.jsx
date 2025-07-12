import { useRef, useState, useEffect, useCallback } from 'react';

export function useMessagesInfiniteScroll(callback, deps=[]) {

  let observer = useRef(null);
  let lastUpdate = useRef(null);

  const ref = useCallback((node) => {

    if (deps.every(Boolean)) {
      observer.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        let allow = lastUpdate.current ? Date.now() > lastUpdate.current + 3000 : true;
        if (entries?.[0]?.isIntersecting && allow) {
          lastUpdate.current = Date.now();
          callback()
        };
      }, {
      threshold: 1, // Minimum visibility to trigger
      rootMargin: '0px', // Trigger 100px before element enters viewport
      });
      if (node) observer.current.observe(node)
    }
  }, [deps, callback])

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return ref
}
