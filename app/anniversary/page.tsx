import AnniversaryNavbar from "@/components/anniversary/AnniversaryNavbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import AnniversaryShipping from "@/components/anniversary/AnniversaryShipping";
import AnniversaryBookPreview from "@/components/anniversary/AnniversaryBookPreview";
import AnniversaryFooter from "@/components/anniversary/AnniversaryFooter";

export const metadata = {
  title: "WonderTales | Anniversary Love Story Books",
  description: "Turn years of memories into a beautifully illustrated book — the perfect gift to celebrate your journey together.",
};

export default function AnniversaryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-yellow-50">
      <AnniversaryNavbar />
      <MagicMirror theme="anniversary" />
      <section id="create">
        <MagicPreviewCTA theme="anniversary" />
      </section>
      <section id="how-it-works">
        <HowItWorks theme="anniversary" />
      </section>
      <section id="shipping">
        <AnniversaryShipping />
      </section>
      <section id="preview">
        <AnniversaryBookPreview />
      </section>
      <AnniversaryFooter />
    </main>
  );
}

