import {
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  ChevronRight,
  Code2,
  Cpu,
  FlaskConical,
  GitBranch,
  LineChart,
  Shield,
  Sigma,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HeroSection from "@/components/hero-section";

const FEATURES = [
  {
    icon: Cpu,
    title: "Rust-Powered Core",
    description:
      "All computation — curve interpolation, AD propagation, solver calibration — runs in compiled Rust via PyO3. Zero Python overhead in the inner loops.",
  },
  {
    icon: Sigma,
    title: "Automatic Differentiation",
    description:
      "Dual and Dual2 types propagate first- and second-order derivatives through every operation. Delta and gamma risk fall out naturally — no finite differences.",
  },
  {
    icon: LineChart,
    title: "Multi-Curve Calibration",
    description:
      "Jacobian-based Solver calibrates discount, forward, and spread curves simultaneously to FRAs, IRS, OIS, bonds, CDS, and more.",
  },
  {
    icon: FlaskConical,
    title: "Rates, Credit & FX",
    description:
      "IRS, bonds, callable bonds, CDS, XCS, caps, floors, NDFs, FX forwards — full fixed income coverage modelled in Rust, exposed to Python.",
  },
  {
    icon: GitBranch,
    title: "Curve Flexibility",
    description:
      "Discount, forward, composite, and spread curves. 10+ interpolation schemes. Nelson-Siegel, Svensson, Smith-Wilson parametric models.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Ready Architecture",
    description:
      "JSON-serializable objects, structured outputs, and an MCP server on the roadmap — designed for LLM agents to build, price, and analyze.",
  },
];

const ASSET_CLASSES = [
  {
    title: "Rates",
    href: "/docs/guides/rates",
    shipped: 12,
    items: [
      "Interest Rate Swaps (IRS, FRA, ZCS, OIS, SBS)",
      "Deposits & Futures",
      "Caps & Floors (Black-76 / Bachelier)",
      "Discount, Forward & Parametric Curves",
      "Composite & Spread Curves",
      "Multi-Curve Bootstrap & Calibration",
      "Bucket-Level Risk Analytics",
    ],
    planned: ["Swaptions", "Bond Futures"],
  },
  {
    title: "Credit",
    href: "/docs/guides/credit",
    shipped: 8,
    items: [
      "Fixed Rate Bonds & Bills",
      "Floating Rate Notes (FRN, Sub-Period, Capped)",
      "Structured Bonds (Zero, Step-Up, Amortizing, PIK)",
      "Callable Bonds (Hull-White lattice, OAS)",
      "Credit Default Swaps & Hazard Curves",
      "Asset Swap Spreads",
      "Fitted Bond Curves (NS/NSS/Smith-Wilson)",
    ],
    planned: ["Credit Linked Notes", "CLOs/ABS"],
  },
  {
    title: "FX",
    href: "/docs/guides/fx",
    shipped: 5,
    items: [
      "FX Rates with BFS Triangulation",
      "FX Forwards & Forward Points",
      "Cross-Currency Swaps (MTM/non-MTM)",
      "Non-Deliverable Instruments (NDF, NDIRS, NDXCS)",
      "FX Implied Discount Curves",
    ],
    planned: ["FX Options & Vol Surface", "Exotic Barriers & Digitals"],
  },
  {
    title: "Financing",
    href: "/docs/roadmap",
    shipped: 0,
    items: [],
    planned: [
      "Repo & Reverse Repo",
      "Securities Lending",
      "Total Return Swaps",
      "Syndicated & Bilateral Loans",
      "Bond Forwards",
    ],
  },
];

const AI_FEATURES = [
  {
    icon: Bot,
    title: "MCP Server",
    status: "Planned",
    description:
      "Model Context Protocol server exposing curve construction, pricing, risk analytics, and market data as tool endpoints for LLM agents.",
  },
  {
    icon: BrainCircuit,
    title: "Agentic Workflows",
    status: "Planned",
    description:
      "Natural language-driven curve building, trade pricing, scenario analysis, and risk reporting through multi-step tool-use chains.",
  },
  {
    icon: Shield,
    title: "Structured Outputs",
    status: "Available",
    description:
      "Full JSON serialization across curves, instruments, and MarketContext. Every object round-trips cleanly — ready for agent consumption.",
  },
];

const DOC_SECTIONS = [
  {
    href: "/docs/getting-started/installation",
    label: "Installation",
    description: "Install vade and verify your setup",
    icon: Code2,
  },
  {
    href: "/docs/getting-started/architecture",
    label: "Architecture",
    description: "Rust core, PyO3 bindings, max-Rust philosophy",
    icon: Cpu,
  },
  {
    href: "/docs/guides/quick-start",
    label: "Quick Start",
    description: "Build a curve, calibrate, price, and compute risk",
    icon: ArrowRight,
  },
  {
    href: "/docs/api",
    label: "API Reference",
    description: "Complete signatures and working examples",
    icon: BookOpen,
  },
];

const CODE_SNIPPET = `import datetime as dt
from vade import DiscountCurve, IRS, Solver

# Build a SOFR discount curve
nodes = {
    dt.date(2025, 6, 16): 1.0,
    dt.date(2026, 6, 16): 1.0,   # 1Y
    dt.date(2027, 6, 16): 1.0,   # 2Y
    dt.date(2030, 6, 16): 1.0,   # 5Y
    dt.date(2035, 6, 16): 1.0,   # 10Y
}

curve = DiscountCurve(nodes, interpolation="log_linear")

# Calibrate to market instruments
irs_2y = IRS(effective=dt.date(2025, 6, 16),
             termination="2Y", fixed_rate=3.85)

solver = Solver(curves=[curve], instruments=[
    (irs_2y, 3.85, 0, "2Y_IRS", "USD"),
])
result = solver.iterate()
assert result.converged  # True

# Compute delta risk via automatic differentiation
delta = solver.delta(irs_2y, result)`;

function ProgressBar({ shipped, total }: { shipped: number; total: number }) {
  const pct = Math.round((shipped / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-muted-foreground text-xs font-medium tabular-nums">{pct}%</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              Built for production quant workflows
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Institutional-grade fixed income analytics
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base">
              From curve construction to exotic instrument pricing and risk — across rates, credit, FX, and financing — vade
              handles it at native Rust speed with first-class AI agent support.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} className="group border-border/60 hover:border-border transition-colors">
                <CardHeader className="pb-3">
                  <div className="bg-primary/10 text-primary mb-3 flex size-9 items-center justify-center rounded-md">
                    <f.icon className="size-4" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{f.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* AI-Ready Section */}
        <section className="bg-muted/30 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Designed for AI agents
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">The quant library that AI agents can use</h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base">
                Vade is built from day one with structured, serializable outputs and a clean tool interface — so LLM
                agents can build curves, price trades, and run risk just like a human quant.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {AI_FEATURES.map((f) => (
                <Card key={f.title} className="border-border/60 relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-md">
                        <f.icon className="size-4" />
                      </div>
                      <Badge
                        variant={f.status === "Available" ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {f.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-base">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">{f.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                With MCP integration, an AI assistant can: <em>&quot;Build a SOFR curve from today&apos;s swaps, price a 5Y IRS, and show me the delta ladder&quot;</em> — and Vade executes each step as a native tool call.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Roadmap / Asset Class Progress */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              Roadmap progress
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">Broad coverage, actively growing</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base">
              30+ instruments and analytics shipped across four asset classes. Swaptions, FX options, financing, portfolio risk,
              and AI integration are next.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ASSET_CLASSES.map((ac) => (
              <Link
                key={ac.title}
                href={ac.href}
                className="group border-border/60 hover:border-primary/50 flex flex-col rounded-xl border p-6 transition-all"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold">{ac.title}</h3>
                  <TrendingUp className="text-primary size-4" />
                </div>
                <ProgressBar shipped={ac.shipped} total={ac.shipped + ac.planned.length} />
                <ul className="mt-4 space-y-1.5">
                  {ac.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                {ac.planned.length > 0 && (
                  <div className="border-border/60 mt-4 border-t pt-3">
                    <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">
                      Coming next
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {ac.planned.map((p) => (
                        <Badge key={p} variant="secondary" className="text-[10px]">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/docs/roadmap"
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-medium transition-all hover:bg-input/50"
            >
              View Full Roadmap
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <Separator />

        {/* Code Example */}
        <section className="bg-muted/30 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="outline" className="mb-4">
                  Quick start
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight">From zero to calibrated curve in minutes</h2>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                  Build a multi-node SOFR discount curve, calibrate it to live market instruments, price swaps, and
                  compute delta risk — all with idiomatic Python backed by compiled Rust.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    "Automatic differentiation — no finite differences",
                    "Sub-millisecond calibration on modern hardware",
                    "Full IDE support via PyO3 type stubs",
                    "JSON-serializable for agent tool pipelines",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="text-primary mt-0.5 size-4 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href="/docs/guides/quick-start"
                    className="inline-flex h-8 items-center gap-1 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/80"
                  >
                    View Full Guide
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border bg-[#0d1117] shadow-xl">
                <div className="border-b border-white/10 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-green-500/80" />
                    <span className="text-muted-foreground ml-3 font-mono text-xs">quick_start.py</span>
                  </div>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-300">
                  <code>{CODE_SNIPPET}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Docs Grid */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight">Explore the documentation</h2>
            <p className="text-muted-foreground mt-2 text-sm">Jump straight to what you need.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOC_SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group border-border/60 hover:border-primary/50 hover:bg-accent/50 flex flex-col gap-3 rounded-xl border p-5 transition-all"
              >
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-md">
                  <s.icon className="size-4" />
                </div>
                <div>
                  <div className="group-hover:text-primary text-sm font-medium transition-colors">{s.label}</div>
                  <div className="text-muted-foreground mt-1 text-xs leading-snug">{s.description}</div>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary mt-auto size-4 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 border-y py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Ready to build?</h2>
            <p className="text-muted-foreground mt-3 text-base">
              Install vade and have a calibrated SOFR curve running in under 5 minutes.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 font-mono text-sm">
              <span className="text-muted-foreground">$</span>
              <span>pip install vade</span>
            </div>
            <div className="mt-6 flex justify-center gap-3">
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
                Quick Start Guide
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
          <div className="text-muted-foreground flex items-center gap-2">
            <div className="bg-primary size-4 rounded-sm" />
            <span>vade — AI-ready quantitative analytics for Python</span>
          </div>
          <div className="text-muted-foreground flex gap-5">
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="https://github.com/sercanatalik/vadepy" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link href="/docs/api" className="hover:text-foreground transition-colors">
              API
            </Link>
            <Link href="/docs/roadmap" className="hover:text-foreground transition-colors">
              Roadmap
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
