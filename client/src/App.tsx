import { useEffect, useState } from "react";
import { API_ROUTE } from "./constants/constants";
import { IEntry } from "./types";
import Entry from "./components/Entry";
import ReactPaginate from "react-paginate";

type EntryInput = {
  title: string;
  body: string;
  date: Date;
};

function App() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [pageInformation, setPageInformation] = useState({ page: 1 });
  const [entry, setEntry] = useState<EntryInput>({
    title: "",
    body: "",
    date: new Date(),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };
  const fetchEntries = async (page = 1) => {
    let response = await fetch(
      `${API_ROUTE}/entries?` +
        new URLSearchParams({
          page,
        }),
    );
    response = await response.json();
    console.log(response.data);
    setPageInformation(response?.data);
    setEntries(response?.data?.docs ?? []);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const submitEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = JSON.stringify(entry);
    const headers = new Headers({
      "Content-Type": "application/json",
      "Content-Length": content.length,
    });
    let response = await fetch(`${API_ROUTE}/entries`, {
      method: "POST",
      body: content,
      headers,
    });
    console.log(response);
    response = await response.json();
    console.log(response.data);
  };
  return (
    <div>
      <div>
        <form onSubmit={submitEntry}>
          <input
            type="text"
            required
            name="title"
            value={entry.title}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            name="body"
            value={entry.body}
            onChange={handleChange}
          />
          <input
            type="date"
            required
            name="date"
            value={entry.date}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
      </div>
      <div className="entries">
        {entries.map((entry) => (
          <Entry entry={entry} key={entry.id} />
        ))}
        <ReactPaginate
          pageCount={pageInformation?.totalPages}
          onPageChange={(e) => fetchEntries(e.selected + 1)}
          containerClassName="pagination"
          pageClassName="page-item"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default App;
