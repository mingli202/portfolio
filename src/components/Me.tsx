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
    <section className="flex w-full flex-col items-center gap-12 py-24">
      <div className="flex gap-4">
        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full">
          <img
            src="me.jpg"
            alt="Ming Li Liu"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex basis-full flex-col justify-center gap-1">
          <div className="flex items-center gap-2">
            <h1 className="mr-1 text-4xl font-bold tracking-tight">
              Ming Li Liu
            </h1>
            <a
              href="https://github.com/mingli202"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="fill-text-secondary h-9 w-9" />
            </a>
            <a
              href="https://www.linkedin.com/in/ming-li-liu"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="fill-text-secondary h-9 w-9" />
            </a>
          </div>
          <div className="text-text-secondary flex items-center gap-2">
            <MapMarker className="fill-text-secondary" />
            <p>Montreal, Canada | (514) 586-1268</p>
          </div>
          <div className="text-text-secondary flex items-center gap-2">
            <Envelope className="fill-text-secondary" />
            <p>vincentmingli@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p>Average Rust enthiusiast and Neovim enjoyer.</p>
        <div className="flex justify-center gap-4">
          <Rust className="fill-text-secondary" />
          <Python className="fill-text-secondary" />
          <TypeScript className="fill-text-secondary" />
          <TailwindCss className="fill-text-secondary" />
          <Angular className="fill-text-secondary" />
          <NextJs className="fill-text-secondary" />
          <React className="fill-text-secondary" />
        </div>
      </div>
    </section>
  );
}
