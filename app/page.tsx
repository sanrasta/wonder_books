import Navbar from "@/components/Navbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import WorldwideWonder from "@/components/WorldwideWonder";
import BookPreview from "@/components/BookPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <MagicMirror theme="kids" />
      <section id="create">
        <MagicPreviewCTA theme="kids" />
      </section>
      <section id="how-it-works">
        <HowItWorks theme="kids" />
      </section>
      <section id="gifts">
        <WorldwideWonder />
      </section>
      <section id="library">
        <BookPreview />
      </section>
      <Footer />
    </main>
  );
}
