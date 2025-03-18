"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <>
      <SignedOut>
        <Button variant={'outline'} asChild>
          <SignInButton mode={"modal"} >New Document</SignInButton>
        </Button>
      </SignedOut>
      <SignedIn>
        <Button
          variant={"outline"}
          onClick={handleCreateNewDocument}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "New Document"}
        </Button>
      </SignedIn>
    </>
  );
}
export default NewDocumentButton;
