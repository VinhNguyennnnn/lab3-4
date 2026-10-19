import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <h1>Welcome to ProductStore</h1>
      <p>Manage and explore products for your needs</p>
      <Link className="btn" to="/products">View Products</Link>
    </section>
  );
}

export default Home;
