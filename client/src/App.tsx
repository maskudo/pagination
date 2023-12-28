import { useState } from "react";
import { API_ROUTE } from "./constants/constants";
import Entry from "./components/Entry";
import ReactPaginate from "react-paginate";
import useEntries from "./hooks/useEntries";

type EntryInput = {
  title: string;
  body: string;
  date: Date;
};

const initialEntry: EntryInput = {
  title: "",
  body: "",
  date: new Date(),
};

function App() {
  const { entries, fetchEntries, totalPages } = useEntries();
  const [entry, setEntry] = useState<EntryInput>(initialEntry);
  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const submitEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
      response = await response.json();
      setMessage("Entry submitted successfully");
      setEntry(initialEntry);
    } catch (e) {
      setMessage("Error submitting entry");
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
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
        <div>{message}</div>
      </div>
      <div className="entries">
        {entries.map((entry) => (
          <Entry entry={entry} key={entry.id} />
        ))}
        <ReactPaginate
          pageCount={totalPages}
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
