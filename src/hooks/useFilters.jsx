import { useCallback, useEffect, useState } from "react";

export const useFilters = ({ key, defaultValues = {} }) => {
  const user = JSON.parse(localStorage.getItem("usuario"))?._id || "default";
  const STORAGE_KEY = `${user}@${key}_TANSTACK_REACT_TABLE_FILTERS`;

  const getFiltersFromStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  };

  const [filters, setFilters] = useState({
    ...defaultValues,
    ...getFiltersFromStorage(),
    pageIndex: getFiltersFromStorage()?.pageIndex || 0,
    pageSize: getFiltersFromStorage()?.pageSize || 10,
    searchTerm: getFiltersFromStorage()?.searchTerm || "",
  });

  const resetFilters = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFilters({
      ...defaultValues,
      pageIndex: 0,
      pageSize: 10,
      searchTerm: "",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  return { filters, setFilters, resetFilters };
};
