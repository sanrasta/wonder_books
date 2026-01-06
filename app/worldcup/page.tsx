import WorldCupNavbar from "@/components/worldcup/WorldCupNavbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import WorldCupShipping from "@/components/worldcup/WorldCupShipping";
import WorldCupBookPreview from "@/components/worldcup/WorldCupBookPreview";
import WorldCupFooter from "@/components/worldcup/WorldCupFooter";

export const metadata = {
  title: "WonderTales | World Cup Champion Books",
  description: "Become a World Cup champion in your own personalized storybook. The perfect gift for football fans of all ages.",
};

export default function WorldCupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50">
      <WorldCupNavbar />
      <MagicMirror theme="worldcup" />
      <section id="create">
        <MagicPreviewCTA theme="worldcup" />
      </section>
      <section id="how-it-works">
        <HowItWorks theme="worldcup" />
      </section>
      <section id="shipping">
        <WorldCupShipping />
      </section>
      <section id="preview">
        <WorldCupBookPreview />
      </section>
      <WorldCupFooter />
    </main>
  );
}

