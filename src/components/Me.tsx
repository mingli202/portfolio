import { Envelope, Github, Linkedin } from "../lib/icons";

export default function Me() {
  return (
    <section className="flex justify-between">
      <div className="flex flex-col justify-center gap-2">
        <h1 className="text-5xl font-bold tracking-tight">Ming Li</h1>
        <p className="text-text-secondary">
          Average Rust enthusiast and Neovim enjoyer.
        </p>
      </div>
      <div className="flex flex-col items-end justify-center gap-1">
        <div className="flex items-center gap-2">Montreal, Canada</div>
        <div className="flex items-center gap-2">(514) 581-1268</div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/mingli202"
            target="_blank"
            rel="noreferrer"
          >
            <Github />
          </a>
          <a
            href="www.linkedin.com/in/ming-li-liu"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin />
          </a>
          <a
            href="mailto:vincentmingli@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <Envelope />
          </a>
        </div>
      </div>
    </section>
  );
}
