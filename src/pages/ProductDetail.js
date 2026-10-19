import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  return (
    <section className="detail">
      {product ? (
        <>
          <h2>Product Details</h2>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price.toLocaleString("en-US")}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </>
      ) : (
        <p className="empty">Sản phẩm không tồn tại.</p>
      )}
      <Link className="btn" to="/products">Back to Products</Link>
    </section>
  );
}

export default ProductDetail;
