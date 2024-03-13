import {useCallback, useMemo, useState} from 'react';

export type UseSelectData = {
  selected: Set<string>;
  toggleSelected: (key: string, value: boolean) => void;
  all: () => void;
  invert: () => void;
  none: () => void;
};

export default function useSelect<T>(
  data: T[],
  getKey: (item: T) => string,
): UseSelectData {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelected = useCallback((key: string, value: boolean) => {
    setSelected(previous => {
      const newSet = new Set(previous);
      if (!value) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  const all = useCallback(() => {
    setSelected(new Set(data.map(getKey)));
  }, [data, getKey]);

  const invert = useCallback(() => {
    setSelected(
      previous =>
        new Set(data.filter(d => !previous.has(getKey(d))).map(getKey)),
    );
  }, [data, getKey]);

  const none = useCallback(() => {
    setSelected(new Set());
  }, []);

  return useMemo(
    () => ({selected, toggleSelected, all, invert, none}),
    [selected, toggleSelected, all, invert, none],
  );
}
