import { Envelope } from "./Envelope";
import { Linkedin } from "./Linkedin";
import { Github } from "./Github";
import { MapMarker } from "./MapMarker";
import { TypeScript } from "./TypeScript";
import { NextJs } from "./NextJs";
import { TailwindCss } from "./TailwindCss";
import { Angular } from "./Angular";
import { React } from "./React";
import { Rust } from "./Rust";
import { Python } from "./Python";
import { ArrowAngularTopRight } from "./ArrowAngularTopRight";
import { Azure } from "./Azure";
import { C } from "./C";
import { Cargo } from "./Cargo";
import { CSharp } from "./CSharp";
import { Docker } from "./Docker";
import { DotNet } from "./DotNet";
import { FastApi } from "./FastApi";
import { Firebase } from "./Firebase";
import { GCP } from "./GCP";
import { GoogleMaps } from "./GoogleMaps";
import { Htmx } from "./Htmx";
import { JavaScript } from "./JavaScript";
import { Numpy } from "./Numpy";
import { Pandas } from "./Pandas";
import { PowerShell } from "./PowerShell";
import { CSS } from "./CSS";
import { Bash } from "./Bash";
import { Java } from "./Java";
import { Up } from "./Up";
import { Raspberrypi } from "./Raspberrypi";
import { Go } from "./Go";
import { Zustand } from "./Zustand";
import { Tanstack } from "./Tanstack";
import { Nginx } from "./Nginx";

export const Icon = {
  Email: Envelope,
  Linkedin,
  Github,
  Location: MapMarker,
  TypeScript,
  NextJs,
  TailwindCss,
  Angular,
  React,
  Rust,
  Python,
  WebsiteLink: ArrowAngularTopRight,
  Docker,
  Firebase,
  "C#": CSharp,
  Azure,
  ".NET": DotNet,
  FastApi,
  Numpy,
  Pandas,
  Htmx,
  JavaScript,
  CSS,
  Maps: GoogleMaps,
  Cargo,
  C,
  GCP,
  PowerShell,
  Bash,
  Java,
  Up,
  Raspberrypi,
  Go,
  Zustand,
  Tanstack,
  Nginx,
} as const;
