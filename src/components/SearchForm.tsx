import { useState } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-xl">Hot Issue ba 'to?</legend>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input focus:outline-none focus:ring-0"
          placeholder="Enter keywords e.g, Installation, App Crash"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn btn-error join-item text-content"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </fieldset>
  );
};

export default SearchForm;
