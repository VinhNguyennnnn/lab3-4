const CATEGORIES = ["All", "Phone", "Laptop", "Ipad"];

function CategoryFilter({ value, onChange }) {
  return (
    <select
      className="category-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c === "All" ? "All Categories" : c}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
