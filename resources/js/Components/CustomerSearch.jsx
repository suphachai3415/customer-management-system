import React, { useState } from "react";
import axios from "axios";

export default function CustomerSearch({ onSelect }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (text) => {
        setQuery(text);
        if (text.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await axios.get(`/customers/autocomplete?q=${text}`);
            setSuggestions(res.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleSelect = (customer) => {
        setQuery(customer.name);
        setSuggestions([]);
        onSelect(customer);
    };

    return (
        <div className="position-relative">
            <input
                className="form-control"
                type="text"
                placeholder="ค้นหาชื่อลูกค้า..."
                value={query}
                onChange={(e) => fetchSuggestions(e.target.value)}
            />
            {suggestions.length > 0 && (
                <ul
                    className="list-group position-absolute w-100 shadow"
                    style={{ zIndex: 1000 }}
                >
                    {suggestions.map((c) => (
                        <li
                            key={c.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSelect(c)}
                            style={{ cursor: "pointer" }}
                        >
                            <strong>{c.name}</strong> ({c.phone})<br />
                            <small className="text-muted">{c.email}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
