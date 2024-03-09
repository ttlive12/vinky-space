import Experiences from "@/components/Experience";
import Introduction from "@/components/Home";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Introduction />
      <Skills />
      <Experiences />
    </main>
  );
}
