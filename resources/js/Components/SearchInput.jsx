import React, { useState, useEffect, useRef } from 'react';

export default function SearchInput({ value = '', onSearch }) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState([])
  const refDebounce = useRef()

  // เมื่อ query เปลี่ยน ให้รอ 300ms แล้วเรียก API
  useEffect(() => {
    if (refDebounce.current) clearTimeout(refDebounce.current)
    if (!query) {
      setSuggestions([])
      return
    }
    refDebounce.current = setTimeout(() => {
      fetch(`/customers/autocomplete?q=${encodeURIComponent(query)}`)
        .then(r => r.json())
        .then(setSuggestions)
    }, 300)
  }, [query])

  function pick(name) {
    setQuery(name)
    setSuggestions([])
    onSearch(name)
  }

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="ค้นหา..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onSearch(query)
            setSuggestions([])
          }
        }}
      />
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
          {suggestions.map(s => (
            <li
              key={s.id}
              className="list-group-item list-group-item-action"
              onClick={() => pick(s.name)}
            >
              {s.name} — {s.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
