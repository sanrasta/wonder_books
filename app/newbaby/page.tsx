import NewBabyNavbar from "@/components/newbaby/NewBabyNavbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import NewBabyShipping from "@/components/newbaby/NewBabyShipping";
import NewBabyBookPreview from "@/components/newbaby/NewBabyBookPreview";
import NewBabyFooter from "@/components/newbaby/NewBabyFooter";

export const metadata = {
  title: "WonderTales | New Baby Welcome Books",
  description: "Create a beautiful keepsake book celebrating the arrival of your newest family member.",
};

export default function NewBabyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">
      <NewBabyNavbar />
      <MagicMirror theme="newbaby" />
      <section id="create">
        <MagicPreviewCTA theme="newbaby" />
      </section>
      <section id="how-it-works">
        <HowItWorks theme="newbaby" />
      </section>
      <section id="shipping">
        <NewBabyShipping />
      </section>
      <section id="preview">
        <NewBabyBookPreview />
      </section>
      <NewBabyFooter />
    </main>
  );
}

