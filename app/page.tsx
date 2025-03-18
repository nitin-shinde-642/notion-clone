import { ArrowLeftCircleIcon } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="flex space-x-2 items-center animate-pulse pb-20">
        <ArrowLeftCircleIcon size="32" />
        <h1 className="font-bold">Get started with creating a new Document!</h1>
      </div>

    </main>
  );
}
