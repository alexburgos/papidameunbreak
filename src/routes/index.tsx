import { Link, createFileRoute } from "@tanstack/react-router";
import homeCss from "./index.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "papidameunbreak" }],
    links: [{ rel: "stylesheet", href: homeCss }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <div className="hero-bg" aria-hidden="true" />

      <div className="dvd-outer" aria-hidden="true">
        <span className="dvd-inner">
          <span className="dvd-text">papidameunbreak</span>
        </span>
      </div>

      <nav className="hero-nav">
        <Link to="/shop">shop</Link>
        <Link to="/about">about</Link>
      </nav>
    </>
  );
}
