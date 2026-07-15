import { Link } from "@tanstack/react-router";
import { LocaleSwitcher } from "#/components/LocaleSwitcher";
import { Cart } from "#/components/Cart";
import "./PageHeader.css";

export function PageHeader() {
  return (
    <header className="page-header">
      <Link to="/" className="site-title">
        <h3> papidameunbreak</h3>
      </Link>
      <nav className="page-nav" aria-label="Main navigation">
        <Link to="/shop">shop</Link>
        <Link to="/about">about</Link>
        <LocaleSwitcher />
        <Cart />
      </nav>
    </header>
  );
}
