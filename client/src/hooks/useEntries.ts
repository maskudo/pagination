import { useEffect, useState } from "react";
import { IEntry } from "../types";
import { API_ROUTE } from "../constants/constants";

export default function useEntries() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const fetchEntries = async (page = 1) => {
    let response = await fetch(
      `${API_ROUTE}/entries?` +
      //@ts-ignore
      new URLSearchParams({
        page,
      }),
    );
    response = await response.json();
    //@ts-ignore
    setTotalPages(response?.data?.totalPages ?? 1);
    //@ts-ignore
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
