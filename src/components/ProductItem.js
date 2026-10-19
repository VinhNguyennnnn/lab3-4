import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="price">${product.price.toLocaleString("en-US")}</p>
      <Link className="btn" to={`/product/${product.id}`}>
        View Details
      </Link>
    </div>
  );
}

export default ProductItem;
