import { IEntry } from "../types";

function extractDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  return `${day}/${month}/${year}`;
}

function Entry({ entry }: { entry: IEntry }) {
  const date = extractDate(new Date(entry.date));
  return (
    <div>
      <h2>{entry.title}</h2>
      <p>{date}</p>
      <p>{entry.body}</p>
    </div>
  );
}

export default Entry;
