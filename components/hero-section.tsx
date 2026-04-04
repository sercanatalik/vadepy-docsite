"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import PixelBlast from "@/components/pixel-blast";
import { TrueFocus } from "@/components/true-focus";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-[#0a0f0d] px-6 py-24 text-center">
      {/* PixelBlast background */}
      <div className="pointer-events-none absolute inset-0">
        <PixelBlast
          color="#4ade80"
          pixelSize={4}
          variant="circle"
          patternScale={1.5}
          patternDensity={0.8}
          speed={0.3}
          edgeFade={0.15}
          enableRipples={true}
          transparent
        />
      </div>

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#0a0f0d_90%,#0a0f0d_100%)]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <Badge className="border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-300 hover:bg-emerald-950/60">
          AI-Ready &middot; Open Source &middot; Rust-Powered
        </Badge>

        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          <TrueFocus
            sentence="Vade Py"
            manualMode={false}
            blurAmount={2.5}
            borderColor="oklch(0.696 0.17 162.48)"
            glowColor="oklch(0.696 0.17 162.48 / 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={5}
            wordClassName={(word) => (word === "Py" ? "text-emerald-400" : undefined)}
          />
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            The AI-ready quantitative library
          </span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-slate-400">
          Production-grade fixed income analytics for rates, credit, and FX — built in Rust, exposed to Python, and
          designed for LLM agent workflows via MCP.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/docs/getting-started/installation"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-emerald-500 px-4 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-400/30"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/guides/quick-start"
            className="inline-flex h-9 items-center gap-1 rounded-md border border-white/15 px-4 text-sm font-medium text-slate-300 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            View Quick Start
          </Link>
          <Link
            href="/docs/roadmap"
            className="inline-flex h-9 items-center gap-1 rounded-md border border-white/15 px-4 text-sm font-medium text-slate-300 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            Roadmap
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap justify-center gap-10">
          {[
            { value: "<1ms", label: "curve calibration" },
            { value: "30+", label: "instruments shipped" },
            { value: "3", label: "asset classes" },
            { value: "AD", label: "automatic differentiation" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to page background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
