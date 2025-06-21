import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

export default function CustomerSearchInput({ placeholder = "ค้นหาชื่อ / เบอร์ / อีเมล" }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      axios
        .get(route("customers.autocomplete"), { params: { q: query } })
        .then((res) => setSuggestions(res.data))
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (value) => {
    setQuery(value);
    setShowSuggestions(false);
    router.visit(route("customers.index"), {
      method: "get",
      data: { search: value },
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <div className="position-relative mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 zindex-tooltip shadow-sm">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onMouseDown={() => handleSelect(item.name)}
            >
              {item.name} ({item.phone}) - {item.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
