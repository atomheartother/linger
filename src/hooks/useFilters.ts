import {useMemo, useState} from 'react';
import {debounce} from '../utils';

export enum SortOrder {
  ASCENDING = 1,
  DESCENDING = -1,
}

export default function useFilters<T>(
  data: T[],
  getQueryField: (x: T) => string,
) {
  const [query, setQuery] = useState('');
  const [sortOrder, setOrder] = useState<SortOrder>(SortOrder.ASCENDING);
  // We filter down via the query
  const filteredData = useMemo(() => {
    if (!query) {
      return data;
    }
    return data.filter(d =>
      getQueryField(d)
        .trim()
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );
  }, [data, query, getQueryField]);

  const sortedData = useMemo(() => {
    /*
     *      a < b   a==b    a > b
     * ASC   -1      0        1
     * DESC   1      0        -1
     */
    return filteredData.sort((a, b) => {
      const stringA = getQueryField(a).toLowerCase();
      const stringB = getQueryField(b).toLowerCase();
      const isNeg = Number(stringA < stringB);
      const isPos = Number(stringA > stringB);
      return sortOrder * (isNeg * -1 + isPos * 1);
    });
  }, [filteredData, getQueryField, sortOrder]);

  return useMemo(
    () => ({
      data: sortedData,
      query,
      setQuery: debounce(setQuery, 300),
      sortOrder,
      setOrder,
    }),
    [sortedData, query, setQuery, sortOrder, setOrder],
  );
}
