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
      //@ts-ignore
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
      fetchEntries();
    } catch (e) {
      setMessage("Error submitting entry");
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
  return (
    <div className="my-12 lg:mx-48 flex flex-col justify-center gap-8">
      <h1 className="text-3xl text-center mb-8">Journal</h1>
      <form
        onSubmit={submitEntry}
        className="flex justify-center items-center mx-auto gap-4 w-[60vw]"
      >
        <input
          type="text"
          className="border border-1 border-black p-2"
          required
          placeholder="Title"
          name="title"
          value={entry.title}
          onChange={handleChange}
        />
        <input
          type="text"
          className="border border-1 border-black p-2"
          placeholder="Body"
          required
          name="body"
          value={entry.body}
          onChange={handleChange}
        />
        <input
          type="date"
          required
          placeholder="Date"
          className="border border-1 border-black p-2"
          name="date"
          //@ts-ignore
          value={entry.date}
          onChange={handleChange}
        />
        <input
          type="submit"
          value={"Submit"}
          className="bg-blue-500 text-white p-2"
        />
      </form>
      <div
        className={
          "text-sm mx-auto " +
          (message.toLowerCase().includes("error")
            ? "text-red-500"
            : "text-green-500")
        }
      >
        {message}
      </div>
      {!entries?.length && (
        <div className="text-center text-3xl ">No entires found :(</div>
      )}
      <div className="entries mx-auto flex flex-col gap-4">
        {entries.map((entry) => (
          <Entry entry={entry} key={entry.id} />
        ))}
        {!!entries.length && (
          <ReactPaginate
            pageCount={totalPages}
            onPageChange={(e) => fetchEntries(e.selected + 1)}
            containerClassName="flex justify-center items-center mt-2"
            pageClassName="w-10 h-10 flex justify-center items-center border rounded-full mx-1"
            activeClassName="bg-blue-500 text-white"
            previousLabel="Prev"
            previousClassName="mx-2 border py-1 px-2  hover:shadow"
            nextClassName="mx-2 border py-1 px-2 hover:shadow"
          />
        )}
      </div>
    </div>
  );
}

export default App;
