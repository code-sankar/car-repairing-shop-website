import { ArrowRight, Phone } from "lucide-react";
import useSeo from "../hooks/useSeo";
import { site } from "../lib/siteConfig";
import Button from "../components/ui/Button";
import HeroCar from "../components/art/HeroCar";
import { Glow, GridBackdrop } from "../components/art/Texture";

export default function NotFound() {
  useSeo({ title: "Page not found" });

  return (
    <section className="noise relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 py-20">
      <GridBackdrop />
      <Glow className="left-1/2 top-1/3 -translate-x-1/2" size={700} opacity={0.18} />

      <div className="shell relative z-10 text-center">
        <p className="font-display text-[7rem] font-bold leading-none text-white/8 sm:text-[11rem]">
          404
        </p>
        <h1 className="-mt-8 text-4xl font-bold uppercase sm:-mt-14 sm:text-6xl">
          This one's off the <span className="brand-text">ramp</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-300">
          The page you were after has been moved or never existed. The workshop, however, is exactly
          where it has always been.
        </p>

        <div className="mx-auto mt-10 max-w-2xl opacity-60">
          <HeroCar reflection={false} />
        </div>

        <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" size="lg">
            Back to home <ArrowRight size={18} />
          </Button>
          <Button href={site.phoneHref} variant="secondary" size="lg">
            <Phone size={18} /> {site.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
