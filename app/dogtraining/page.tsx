import DogTrainingNavbar from "@/components/dogtraining/DogTrainingNavbar";
import MagicMirror from "@/components/MagicMirror";
import MagicPreviewCTA from "@/components/MagicPreviewCTA";
import { HowItWorks } from "@/components/process";
import DogTrainingShipping from "@/components/dogtraining/DogTrainingShipping";
import DogTrainingBookPreview from "@/components/dogtraining/DogTrainingBookPreview";
import DogTrainingFooter from "@/components/dogtraining/DogTrainingFooter";

export default function DogTrainingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <DogTrainingNavbar />
      <MagicMirror theme="dogtraining" />
      <MagicPreviewCTA theme="dogtraining" />
      <HowItWorks theme="dogtraining" />
      <DogTrainingShipping />
      <DogTrainingBookPreview />
      <DogTrainingFooter />
    </main>
  );
}

