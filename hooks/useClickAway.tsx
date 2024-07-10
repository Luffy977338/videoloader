'use client'

import { useEffect } from "react";

export function useClickAway(
  func: () => void,
  refs: React.RefObject<HTMLElement>[],
  container: any = document,
) {
  const handleClickAway = (event: MouseEvent) => {
    const isClickedAway = refs.every(
      (ref) => ref.current && !ref.current.contains(event.target as Node),
    );
    if (isClickedAway) {
      func();
    }
  };

  useEffect(() => {
    if (container.current) {
      container.current.addEventListener("mousedown", handleClickAway);
      return () => {
        container.current.removeEventListener("mousedown", handleClickAway);
      };
    }

    container.addEventListener("mousedown", handleClickAway);
    return () => {
      container.removeEventListener("mousedown", handleClickAway);
    };
  }, [refs, func]);
}
