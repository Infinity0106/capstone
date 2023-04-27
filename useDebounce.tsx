import { useEffect, useRef } from "react";

interface DebounceEffectArgs {
  effect: () => void;
  deps: React.DependencyList;
  delay: number;
}

export const useDebounce = ({
  effect,
  deps,
  delay,
}: DebounceEffectArgs): void => {
  const depsArray = deps || [];
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...depsArray, delay]);
};

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
