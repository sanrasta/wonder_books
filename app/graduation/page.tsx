import GraduationNavbar from "@/components/graduation/GraduationNavbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import GraduationShipping from "@/components/graduation/GraduationShipping";
import GraduationBookPreview from "@/components/graduation/GraduationBookPreview";
import GraduationFooter from "@/components/graduation/GraduationFooter";

export const metadata = {
  title: "WonderTales | Graduation Keepsake Books",
  description: "Transform their educational journey into an illustrated keepsake they'll treasure forever.",
};

export default function GraduationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <GraduationNavbar />
      <MagicMirror theme="graduation" />
      <section id="create">
        <MagicPreviewCTA theme="graduation" />
      </section>
      <section id="how-it-works">
        <HowItWorks theme="graduation" />
      </section>
      <section id="shipping">
        <GraduationShipping />
      </section>
      <section id="preview">
        <GraduationBookPreview />
      </section>
      <GraduationFooter />
    </main>
  );
}

