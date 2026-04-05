import {
  ArrowRight,
  Activity,
  Check,
  Clock,
  Code2,
  Cpu,
  FileJson,
  GitBranch,
  Layers,
  LineChart,
  Map,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";

function ColoredCode() {
  const kw = "text-primary";
  const cm = "text-muted-foreground";
  const str = "text-emerald-300";
  const num = "text-amber-300";
  return (
    <code className="text-foreground">
      <span className={kw}>import</span> datetime <span className={kw}>as</span> dt{"\n"}
      <span className={kw}>from</span> vade <span className={kw}>import</span> DiscountCurve, IRS, Solver{"\n"}
      {"\n"}
      <span className={cm}># Build a SOFR discount curve</span>{"\n"}
      nodes = {"{"}{"\n"}
      {"    "}dt.date(<span className={num}>2025</span>, <span className={num}>6</span>, <span className={num}>16</span>): <span className={num}>1.0</span>,{"\n"}
      {"    "}dt.date(<span className={num}>2026</span>, <span className={num}>6</span>, <span className={num}>16</span>): <span className={num}>1.0</span>,   <span className={cm}># 1Y</span>{"\n"}
      {"    "}dt.date(<span className={num}>2027</span>, <span className={num}>6</span>, <span className={num}>16</span>): <span className={num}>1.0</span>,   <span className={cm}># 2Y</span>{"\n"}
      {"    "}dt.date(<span className={num}>2030</span>, <span className={num}>6</span>, <span className={num}>16</span>): <span className={num}>1.0</span>,   <span className={cm}># 5Y</span>{"\n"}
      {"    "}dt.date(<span className={num}>2035</span>, <span className={num}>6</span>, <span className={num}>16</span>): <span className={num}>1.0</span>,   <span className={cm}># 10Y</span>{"\n"}
      {"}"}{"\n"}
      {"\n"}
      curve = DiscountCurve(nodes, interpolation=<span className={str}>"log_linear"</span>){"\n"}
      {"\n"}
      <span className={cm}># Calibrate to market instruments</span>{"\n"}
      irs_2y = IRS(effective=dt.date(<span className={num}>2025</span>, <span className={num}>6</span>, <span className={num}>16</span>),{"\n"}
      {"             "}termination=<span className={str}>"2Y"</span>, fixed_rate=<span className={num}>3.85</span>){"\n"}
      {"\n"}
      solver = Solver(curves=[curve], instruments=[{"\n"}
      {"    "}(irs_2y, <span className={num}>3.85</span>, <span className={num}>0</span>, <span className={str}>"2Y_IRS"</span>, <span className={str}>"USD"</span>),{"\n"}
      ]){"\n"}
      result = solver.iterate(){"\n"}
      <span className={kw}>assert</span> result.converged  <span className={cm}># True</span>{"\n"}
      {"\n"}
      <span className={cm}># Compute delta risk via automatic differentiation</span>{"\n"}
      delta = solver.delta(irs_2y, result)
    </code>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:border-primary/30">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* Code Showcase */}
        <section className="py-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
                Developer Experience
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Intuitive API, blazing fast execution
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
                Write Python code that feels natural while Rust handles the heavy lifting under the hood.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Code example */}
              <Card className="overflow-hidden border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/60" />
                    <div className="size-3 rounded-full bg-yellow-500/60" />
                    <div className="size-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">quick_start.py</span>
                </div>
                <CardContent className="p-0">
                  <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
                    <ColoredCode />
                  </pre>
                </CardContent>
              </Card>

              {/* Features list */}
              <div className="space-y-6">
                <FeatureItem
                  icon={<Zap className="size-5" />}
                  title="Sub-millisecond pricing"
                  description="Rust-powered core delivers institutional-grade performance for real-time applications. Zero Python overhead in the inner loops."
                />
                <FeatureItem
                  icon={<Code2 className="size-5" />}
                  title="Pythonic API"
                  description="Clean, intuitive interface that feels natural to quants and data scientists. Full IDE support via PyO3 type stubs."
                />
                <FeatureItem
                  icon={<Cpu className="size-5" />}
                  title="Automatic differentiation"
                  description="Dual and Dual2 types propagate first- and second-order derivatives through every operation. Greeks computed in one forward pass."
                />
                <FeatureItem
                  icon={<Activity className="size-5" />}
                  title="MCP-ready"
                  description="JSON-serializable objects and structured outputs — designed for LLM agent workflows with Model Context Protocol support."
                />
                <FeatureItem
                  icon={<Map className="size-5" />}
                  title="Multi-curve framework"
                  description="Discount, forward, composite, and spread curves calibrated simultaneously. Single solver handles cross-dependencies across the entire curve set."
                />
                <FeatureItem
                  icon={<FileJson className="size-5" />}
                  title="Full serialization"
                  description="Every curve, instrument, and Solver state round-trips through JSON via to_json() and from_json(). Persist, transmit, and debug any object."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-secondary/20 py-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
                Capabilities
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Everything you need for quantitative finance
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
                Built by AI agents. Engineered for the performance demands of modern trading systems
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <LineChart className="size-6" />,
                  title: "Curves & Calibration",
                  description:
                    "10+ interpolation schemes, parametric models (Nelson-Siegel, Svensson, Smith-Wilson), and a Jacobian-based Solver with Levenberg-Marquardt for single and multi-curve calibration.",
                },
                {
                  icon: <Layers className="size-6" />,
                  title: "30+ Instruments Across 4 Asset Classes",
                  description:
                    "Rates, credit, FX, and financing with consistent API patterns. IRS, bonds, callable bonds, CDS, caps, floors, FX forwards, NDFs, and cross-currency swaps out of the box.",
                },
                {
                  icon: <Shield className="size-6" />,
                  title: "Production Ready Risk & Valuation Engine",
                  description:
                    "Delta, gamma, and bucket-level risk via automatic differentiation — no finite differences. Full JSON serialization for every object, ready for agent pipelines and institutional workflows.",
                },
              ].map((feature) => (
                <Card
                  key={feature.title}
                  className="border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/30"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Progress */}
        <section className="py-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
                Roadmap
              </Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Broad coverage, actively growing
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
                30+ instruments and analytics shipped across four asset classes. Swaptions, FX options, financing,
                portfolio risk, and AI integration are next.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Rates",
                  pct: 86,
                  done: [
                    "Interest Rate Swaps (IRS, FRA, ZCS, OIS, SBS)",
                    "Deposits & Futures",
                    "Caps & Floors (Black-76 / Bachelier)",
                    "Discount, Forward & Parametric Curves",
                    "Composite & Spread Curves",
                    "Multi-Curve Bootstrap & Calibration",
                    "Bucket-Level Risk Analytics",
                  ],
                  next: ["Swaptions", "Bond Futures","Bond Options"],
                },
                {
                  name: "Credit",
                  pct: 80,
                  done: [
                    "Fixed Rate Bonds & Bills",
                    "Floating Rate Notes (FRN, Sub-Period, Capped)",
                    "Structured Bonds (Zero, Step-Up, Amortizing, PIK)",
                    "Callable Bonds (Hull-White lattice, OAS)",
                    "Credit Default Swaps & Hazard Curves",
                    "Asset Swap Spreads",
                    "Fitted Bond Curves (NS/NSS/Smith-Wilson)",
                  ],
                  next: ["Credit Linked Notes", "CLOs/ABS"],
                },
                {
                  name: "FX",
                  pct: 71,
                  done: [
                    "FX Rates with BFS Triangulation",
                    "FX Forwards & Forward Points",
                    "Cross-Currency Swaps (MTM/non-MTM)",
                    "Non-Deliverable Instruments (NDF, NDIRS, NDXCS)",
                    "FX Implied Discount Curves",
                  ],
                  next: ["FX Options & Vol Surface", "Exotic Barriers & Digitals"],
                },
                {
                  name: "Financing",
                  pct: 0,
                  done: [],
                  next: [
                    "Repo & Reverse Repo",
                    "Securities Lending",
                    "Total Return Swaps",
                    "Syndicated & Bilateral Loans",
                    "Bond Forwards",
                  ],
                },
              ].map((cat) => (
                <Card key={cat.name} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
                      <span className="text-2xl font-bold text-primary">{cat.pct}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mb-5 h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                    <ul className="space-y-2 text-sm">
                      {cat.done.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-muted-foreground">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {cat.next.length > 0 && (
                        <li className="mt-3 border-t border-border pt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                          Coming next
                        </li>
                      )}
                      {cat.next.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-muted-foreground/60">
                          <Clock className="mt-0.5 size-3.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/docs/roadmap"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                View Full Roadmap
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-12 md:p-16">
              {/* Background glow */}
              <div className="absolute right-0 top-0 size-96 rounded-full bg-primary/20 blur-[100px]" />

              <div className="relative z-10 max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to get started?</h2>
                <p className="mb-8 text-muted-foreground text-pretty">
                  Install vade and have a calibrated SOFR curve running in under 5 minutes. Open source, forever free.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/docs/getting-started/installation"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Read the Docs
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="https://github.com/sercanatalik/vadepy"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border px-6 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    <GitBranch className="size-4" />
                    Star on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
                <span className="flex items-baseline gap-0 text-lg font-extrabold tracking-tight">
          <span>Vade</span>
          <span className="text-primary text-xl">Py</span>
        </span>
              <span className="ml-4 text-sm text-muted-foreground">
                AI-ready quantitative analytics for Python
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/docs" className="transition-colors hover:text-foreground">
                Docs
              </Link>
              <Link href="https://github.com/sercanatalik/vadepy" className="transition-colors hover:text-foreground">
                GitHub
              </Link>
              <Link href="/docs/api" className="transition-colors hover:text-foreground">
                API
              </Link>
              <Link href="/docs/roadmap" className="transition-colors hover:text-foreground">
                Roadmap
              </Link>
              <Link href="mailto:info@vadepy.dev" className="transition-colors hover:text-foreground">
                info@vadepy.dev
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
