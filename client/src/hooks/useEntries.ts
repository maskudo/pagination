import { useEffect, useState } from "react";
import { IEntry } from "../types";
import { API_ROUTE } from "../constants/constants";

export default function useEntries() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const fetchEntries = async (page = 1) => {
    let response = await fetch(
      `${API_ROUTE}/entries?` +
        new URLSearchParams({
          page,
        }),
    );
    response = await response.json();
    setTotalPages(response?.data?.totalPages ?? 1);
    setEntries(response?.data?.docs ?? []);
  };

  useEffect(() => {
    fetchEntries();
  }, []);
  return {
    totalPages: totalPages ?? 1,
    fetchEntries,
    entries,
  };
}
