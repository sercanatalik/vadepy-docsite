"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import PixelBlast from "@/components/pixel-blast";
import { TrueFocus } from "@/components/true-focus";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* PixelBlast background */}
      <div className="pointer-events-none absolute inset-0">
        <PixelBlast
          color="#4ade80"
          pixelSize={4}
          variant="circle"
          patternScale={1.8}
          patternDensity={0.4}
          speed={0.3}
          edgeFade={0.15}
          enableRipples={true}
          transparent
        />
      </div>

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,hsl(var(--background)/0.9)_70%,hsl(var(--background))_100%)]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
          AI-Ready &middot; Rust-Powered &middot; PyO3
        </Badge>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <TrueFocus
            sentence="Vade Py"
            manualMode={false}
            blurAmount={2.5}
            borderColor="oklch(0.432 0.095 166.913)"
            glowColor="oklch(0.432 0.095 166.913 / 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={5}
            wordClassName={(word) => (word === "Py" ? "text-primary" : undefined)}
          />
          <br />
          <span className="text-primary">The AI-ready quantitative library</span>
        </h1>

        <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
          Production-grade fixed income analytics for rates, credit, and FX — built in Rust, exposed to Python, and
          designed for LLM agent workflows via MCP.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/docs/getting-started/installation"
            className="inline-flex h-8 items-center gap-1 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/80"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/guides/quick-start"
            className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-medium transition-all hover:bg-input/50"
          >
            View Quick Start
          </Link>
          <Link
            href="/docs/roadmap"
            className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-medium transition-all hover:bg-input/50"
          >
            Roadmap
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          {[
            { value: "<1ms", label: "curve calibration" },
            { value: "30+", label: "instruments shipped" },
            { value: "3", label: "asset classes" },
            { value: "AD", label: "automatic differentiation" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-foreground text-xl font-bold">{stat.value}</span>
              <span className="text-muted-foreground text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
