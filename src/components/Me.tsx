import {
  Angular,
  Envelope,
  Github,
  Linkedin,
  MapMarker,
  NextJs,
  TailwindCss,
  TypeScript,
  React,
  Python,
  Rust,
} from "../lib/icons";

export default function Me() {
  return (
    <section className="flex justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold tracking-tight">Ming Li Liu</h1>
        <p className="text-text-secondary">
          Average Rust enthusiast and Neovim enjoyer.
        </p>
        <div className="flex items-center gap-2">
          <Rust className="fill-text-secondary" />
          <Python className="fill-text-secondary" />
          <TypeScript className="fill-text-secondary" />
          <TailwindCss className="fill-text-secondary" />
          <Angular className="fill-text-secondary" />
          <NextJs className="fill-text-secondary" />
          <React className="fill-text-secondary" />
        </div>
      </div>
      <div className="text-text-secondary flex flex-col items-end gap-1">
        <div className="flex items-center gap-1">
          <MapMarker className="fill-text-secondary" />
          Montreal, Canada
        </div>
        <p>(514) 581-1268</p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/mingli202"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="fill-text-secondary" />
          </a>
          <a
            href="https://www.linkedin.com/in/ming-li-liu"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="fill-text-secondary" />
          </a>
          <a
            href="mailto:vincentmingli@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <Envelope
              className="fill-text-secondary"
              title="vincentmingli@gmail.com"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
