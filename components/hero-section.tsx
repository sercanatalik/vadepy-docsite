"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, Copy, Check, GitBranch, MessageSquare, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import PixelBlast from "@/components/pixel-blast";
import { TrueFocus } from "@/components/true-focus";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCommand = "pip install vade";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center dark:bg-[#0a0f0d]">
      {/* PixelBlast background */}
      <div className="pointer-events-none absolute inset-0">
        <PixelBlast
          color="#2d7a5f"
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,var(--background)_90%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#0a0f0d_90%)]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        {/* Announcement badge */}
        <Badge variant="outline" className="border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary-foreground">
          <Sparkles className="mr-2 size-3.5" />
          AI-Ready &middot; Open Source &middot; Rust-Powered
        </Badge>

        {/* Main headline */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          <TrueFocus
            sentence="Vade Py"
            manualMode={false}
            blurAmount={2.5}
            borderColor="oklch(0.696 0.17 162.48)"
            glowColor="oklch(0.696 0.17 162.48 / 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={5}
            wordClassName={(word) => (word === "Py" ? "text-primary" : undefined)}
          />
          <br />
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            The AI-ready
          </span>
          <br />
          <span className="text-foreground">quantitative library</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
          Production-grade fixed income analytics for rates, credit, and FX — built in Rust, exposed to Python, and
          designed for LLM agent workflows via MCP.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/docs/getting-started/installation"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/30"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>

          {/* Install command */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 font-mono text-sm">
            <Terminal className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground">{installCommand}</span>
            <button
              onClick={copyToClipboard}
              className="ml-2 rounded p-1 transition-colors hover:bg-muted"
            >
              {copied ? (
                <Check className="size-4 text-primary" />
              ) : (
                <Copy className="size-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Secondary links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/docs/guides/quick-start"
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="size-4" />
            Quick Start
          </Link>
          <Link
            href="/docs/roadmap"
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitBranch className="size-4" />
            Roadmap
          </Link>
          <Link
            href="https://github.com/sercanatalik/vadepy/discussions"
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageSquare className="size-4" />
            Contribute
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-border/50 pt-10 md:gap-16">
          {[
            { value: "<1ms", label: "curve calibration" },
            { value: "30+", label: "instruments shipped" },
            { value: "4", label: "asset classes" },
            { value: "AD", label: "automatic differentiation" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1 text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to page background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
