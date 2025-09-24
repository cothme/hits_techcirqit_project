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
      <legend className="fieldset-legend text-xl">Hot Issue ba to?</legend>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input focus:outline-none focus:ring-0"
          placeholder="Enter Case ID e.g, TM-1234567"
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn btn-neutral join-item"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </fieldset>
  );
};

export default SearchForm;