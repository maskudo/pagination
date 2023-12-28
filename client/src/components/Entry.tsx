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
    <details className="entry min-w-[60vw] border border-gray-500 py-2 px-8">
      <summary className="text-2xl">{entry.title}</summary>
      <p className="text-sm">{date}</p>
      <p className="text-xl w-[60ch] h-auto">{entry.body}</p>
    </details>
  );
}

export default Entry;
