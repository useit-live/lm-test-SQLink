import Fuse, { IFuseOptions } from 'fuse.js';
import { useState, useMemo } from 'react';

// Assuming you have a type for your item and define the type for match details
type FuseOptions<T> = IFuseOptions<T>;
type Match = { indices: [number, number][]; value: string; key: string };

interface ResultWithMatches<T> {
  item: T;
  matches?: Match[];
}

export function useFuseSearch<T>(
  items: T[],
  options: FuseOptions<T>,
  defaultSearchTerm: string = ''
) {
  const [term, setTerm] = useState(defaultSearchTerm);

  // Ensure includeMatches is enabled in the options
  const extendedOptions = useMemo(() => ({ ...options, includeMatches: true }), [options]);

  const fuse = useMemo(() => new Fuse(items, extendedOptions), [items, extendedOptions]);

  const resultsWithMatches: ResultWithMatches<T>[] = useMemo(() => {
    if (!term.trim()) return items.map((item) => ({ item }));
    return fuse.search(term).map(({ item, matches }) => ({
      item,
      matches: matches?.map(({ indices, value, key }) => ({ indices, value, key })),
    }));
  }, [term, items, fuse]);

  // Return results with matches, the search function to set the term, and the current term.
  return {
    results: resultsWithMatches, // Results now contain match details
    search: setTerm,
    term,
  };
}