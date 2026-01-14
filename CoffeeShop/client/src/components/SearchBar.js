import React, { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react'; // Import icons
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Kỹ thuật Debounce: Chỉ gọi API sau khi người dùng dừng gõ 400ms
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true);
        try {
          const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          if (data.success || response.ok) {
            onSearch(data.data, query);
          }
        } catch (err) {
          console.error('Search error:', err);
        } finally {
          setIsSearching(false);
        }
      } else {
        onSearch([], ''); // Reset nếu ô tìm kiếm trống
      }
    }, 400); // 400ms delay

    // Cleanup function: Hủy timer cũ nếu người dùng gõ tiếp
    return () => clearTimeout(delayDebounceFn);
  }, [query]); // Chạy lại mỗi khi query thay đổi

  const handleClear = () => {
    setQuery('');
    onSearch([], '');
    // Focus lại vào input (optional, cần dùng useRef nếu muốn làm kỹ)
  };

  return (
    <div className="search-bar-wrapper">
      <Search className="search-icon-left" size={18} />
      
      <input
        type="text"
        placeholder="Search for coffee, drinks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* Khu vực bên phải: Hiển thị Loading hoặc nút Clear */}
      <div className="search-actions-right">
        {isSearching ? (
          <Loader2 className="spinner-icon" size={18} />
        ) : query ? (
          <button className="clear-btn" onClick={handleClear} title="Clear search">
            <X size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default SearchBar;