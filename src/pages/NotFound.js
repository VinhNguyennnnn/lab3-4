import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="home">
      <h1>404 - Not Found</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link className="btn" to="/">Về trang chủ</Link>
    </section>
  );
}

export default NotFound;
