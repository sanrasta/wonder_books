import ValentinesNavbar from "@/components/valentines/ValentinesNavbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import ValentinesShipping from "@/components/valentines/ValentinesShipping";
import ValentinesBookPreview from "@/components/valentines/ValentinesBookPreview";
import ValentinesFooter from "@/components/valentines/ValentinesFooter";

export const metadata = {
  title: "WonderTales | Valentine's Day Love Books",
  description: "Turn your love story into a personalized keepsake book. The perfect Valentine's gift.",
};

export default function ValentinesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <ValentinesNavbar />
      <MagicMirror theme="valentines" />
      <section id="create">
        <MagicPreviewCTA theme="valentines" />
      </section>
      <section id="how-it-works">
        <HowItWorks theme="valentines" />
      </section>
      <section id="shipping">
        <ValentinesShipping />
      </section>
      <section id="preview">
        <ValentinesBookPreview />
      </section>
      <ValentinesFooter />
    </main>
  );
}

