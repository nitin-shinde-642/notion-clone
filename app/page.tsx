import { ArrowLeftCircleIcon } from "lucide-react";

export default function Home() {
  const loginCredentials = [
      'yewed65417@bankrau.com',
  ]
  return (
    <main>
      <div className="flex space-x-2 items-center animate-pulse pb-20">
        <ArrowLeftCircleIcon size="32" />
        <h1 className="font-bold">Get started with creating a new Document!</h1>
      </div>

    </main>
  );
}
