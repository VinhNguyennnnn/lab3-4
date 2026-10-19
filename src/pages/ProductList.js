import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 6;

function ProductList() {
  // URL ví dụ: /products?keyword=iPhone&category=Phone&page=1
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "All";
  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);

  const [input, setInput] = useState(keyword);  // nội dung ô nhập
  const [results, setResults] = useState([]);   // kết quả sau khi lọc

  // Đồng bộ ô nhập khi URL đổi (ví dụ bấm Back)
  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  // Cập nhật kết quả khi keyword / category thay đổi
  useEffect(() => {
    const kw = keyword.trim().toLowerCase();
    setResults(
      products.filter((p) => {
        const matchName = p.name.toLowerCase().includes(kw);
        const matchCategory = category === "All" || p.category === category;
        return matchName && matchCategory;
      })
    );
  }, [keyword, category]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (input.trim()) params.set("keyword", input.trim());
    else params.delete("keyword");
    params.delete("page");
    setSearchParams(params);
  };

  const handleCategoryChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "All") params.delete("category");
    else params.set("category", value);
    params.delete("page");
    setSearchParams(params);
  };

  const handlePageChange = (p) => {
    const params = new URLSearchParams(searchParams);
    if (p === 1) params.delete("page");
    else params.set("page", p);
    setSearchParams(params);
  };

  return (
    <section>
      <h2>Product List</h2>
      <div className="toolbar">
        <SearchBar value={input} onChange={setInput} onSubmit={handleSearch} />
        <CategoryFilter value={category} onChange={handleCategoryChange} />
      </div>

      <p className="total">
        Total products: <strong>{results.length}</strong>
        {results.length > 0 && <> (showing {pageItems.length} on this page)</>}
      </p>

      {results.length === 0 ? (
        <p className="empty">Không có sản phẩm nào phù hợp.</p>
      ) : (
        <div className="product-list">
          {pageItems.map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default ProductList;
