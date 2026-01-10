import Navbar from "@/components/Navbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import WorldwideWonder from "@/components/WorldwideWonder";
import BookPreview from "@/components/BookPreview";
import { BookPortal } from "@/components/BookPortal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Hero deck - scrolls normally so user can see full content */}
      <div className="hero-deck relative z-10">
        <Navbar />
        <MagicMirror theme="kids" />
      </div>
      
      {/* BookPortal slides up after hero - no overlap so hero is fully visible */}
      <section id="book-portal" className="relative z-20">
        <BookPortal />
      </section>
      <section id="library">
        <BookPreview />
      </section>
      
     
   
    
      <Footer />
    </main>
  );
}
