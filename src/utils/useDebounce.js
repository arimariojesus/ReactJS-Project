import { useRef } from "react";

export default function useDebounce(func, wait) {
  const timeoutRef = useRef(null);

  return function(...args) {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, wait);
  }
}