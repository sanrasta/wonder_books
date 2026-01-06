import BirthdayNavbar from "@/components/birthday/BirthdayNavbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import BirthdayShipping from "@/components/birthday/BirthdayShipping";
import BirthdayBookPreview from "@/components/birthday/BirthdayBookPreview";
import BirthdayFooter from "@/components/birthday/BirthdayFooter";

export const metadata = {
  title: "WonderTales | Personalized Birthday Books",
  description: "Turn their special day into a personalized adventure book where they're the star of the celebration.",
};

export default function BirthdayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <BirthdayNavbar />
      <MagicMirror theme="birthday" />
      <section id="create">
        <MagicPreviewCTA theme="birthday" />
      </section>
      <section id="how-it-works">
        <HowItWorks theme="birthday" />
      </section>
      <section id="shipping">
        <BirthdayShipping />
      </section>
      <section id="preview">
        <BirthdayBookPreview />
      </section>
      <BirthdayFooter />
    </main>
  );
}

