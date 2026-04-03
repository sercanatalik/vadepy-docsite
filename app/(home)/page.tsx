import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Code2,
  Cpu,
  FlaskConical,
  GitBranch,
  LineChart,
  Sigma,
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
      "All computation — curve interpolation, AD propagation, solver calibration — runs in compiled Rust via PyO3. No Python interpreter overhead in the inner loops.",
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
    title: "Wide Instrument Coverage",
    description:
      "IRS, FRA, ZCS, OIS, bonds, callable bonds, CDS, XCS, deposits, caps, floors, NDFs — modelled in pure Rust, exposed to Python with full type stubs.",
  },
  {
    icon: GitBranch,
    title: "Curve Flexibility",
    description:
      "DiscountCurve, LineCurve, composite and spread curves. Interpolation methods: log-linear, linear on rates, flat-forward, Nelson-Siegel, NSS, Smith-Wilson.",
  },
  {
    icon: Zap,
    title: "Production Performance",
    description:
      "9-instrument SOFR curve calibration in under 1ms. Cache-friendly Rust Vec<f64> layouts, compiled AD arithmetic, and zero GIL contention for numerical work.",
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
    href: "/docs/api/curves",
    label: "API Reference",
    description: "Complete signatures and working examples",
    icon: BookOpen,
  },
];

const CODE_SNIPPET = `import datetime
from vade import DiscountCurve, IRS, Solver

# Build a SOFR discount curve
nodes = {
    datetime.date(2025, 6, 16): 1.0,
    datetime.date(2026, 6, 16): 1.0,   # 1Y
    datetime.date(2027, 6, 16): 1.0,   # 2Y
    datetime.date(2030, 6, 16): 1.0,   # 5Y
    datetime.date(2035, 6, 16): 1.0,   # 10Y
}

curve = DiscountCurve(nodes, interpolation="log_linear")

# Calibrate to market instruments
irs_2y = IRS(effective=datetime.date(2025, 6, 16),
             termination="2Y", fixed_rate=3.85)

solver = Solver(curves=[curve], instruments=[
    (irs_2y, 3.85, 0, "2Y_IRS", "USD"),
])
result = solver.iterate()
assert result.converged  # True ✓

# Compute delta risk via automatic differentiation
delta = solver.delta(irs_2y, result)`;

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
            <h2 className="text-3xl font-bold tracking-tight">Everything you need for rates analytics</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-base">
              From curve construction to exotic instrument pricing and risk — vade handles it in native Rust speed.
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
            <span>vade — interest rate analytics for Python</span>
          </div>
          <div className="text-muted-foreground flex gap-5">
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="https://github.com/sercanatalik/vadepy" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link href="/docs/api/curves" className="hover:text-foreground transition-colors">
              API
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
