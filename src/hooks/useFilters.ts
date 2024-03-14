import {useEffect, useMemo, useRef, useState} from 'react';
import {debounce} from '../utils';
import {BackHandler, NativeEventSubscription} from 'react-native';

export default function useFilters<T>(
  data: T[],
  getQueryField: (x: T) => string,
) {
  const [query, setQuery] = useState('');
  const [queryString, setQueryString] = useState(query);
  const debouncedSetQuery = useMemo(() => debounce(setQuery, 300), []);
  const [editingFilter, setEditingFilter] = useState(false);
  const backHandler = useRef<NativeEventSubscription | null>(null);
  useEffect(() => {
    debouncedSetQuery(queryString);
  }, [queryString, debouncedSetQuery]);
  useEffect(() => {
    if (!editingFilter) {
      setQuery('');
    }
  }, [editingFilter]);
  useEffect(() => {
    const {current} = backHandler;
    if (current) {
      current.remove();
    }
    backHandler.current = null;
    if (editingFilter) {
      backHandler.current = BackHandler.addEventListener(
        'hardwareBackPress',
        function () {
          setEditingFilter(false);
          return true;
        },
      );
    }
    return () => {
      const {current: currentHandler} = backHandler;
      if (currentHandler) {
        currentHandler.remove();
      }
    };
  }, [editingFilter]);
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

  return useMemo(
    () => ({
      data: filteredData,
      query: queryString,
      setQuery: setQueryString,
      editingFilter,
      setEditingFilter,
    }),
    [editingFilter, setEditingFilter, filteredData, queryString],
  );
}
