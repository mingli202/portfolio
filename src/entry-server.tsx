import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </StrictMode>,
  );
  return { html };
}
