import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import aboutCss from "./about.css?url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — papidameunbreak" },
      { name: "description", content: "about papidameunbreak" },
    ],
    links: [{ rel: "stylesheet", href: aboutCss }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="page">
      <PageHeader />
      <div className="about-content">
        <div className="about-body">
          <p>
            Hola, I'm Alex. I'm the creator of papidameunbreak, I started this
            project in 2026 after experiencing some of the most challenging
            months of my life. I kept joking that I couldn't catch a break, and
            we have this saying in Puerto Rico.
          </p>
          <p>papidameunbreak is a brand for those who need a break.</p>
          <p>
            {" "}
            PS. I coded this website too and you can reach me{" "}
            <a href="https://www.alexburgos.dev">here</a> if you ever need a web
            developer.
          </p>
        </div>
        <img
          src="/images/me.webp"
          alt="papidameunbreak"
          className="about-img"
        />
      </div>
    </main>
  );
}
