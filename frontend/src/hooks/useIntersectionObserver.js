import { useEffect, useRef } from 'react';

/**
 * Custom hook for intersection observer - triggers callback when element is visible
 * @param {Function} callback - Function to call when element enters viewport
 * @param {Object} options - Options for IntersectionObserver (threshold, rootMargin, etc.)
 * @returns {Object} - Ref object to attach to the target element
 */
export const useIntersectionObserver = (callback, options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '100px',
      ...options
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [callback]);

  return elementRef;
};
