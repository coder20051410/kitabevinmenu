import { Suspense } from "react";
import MenuPage from "@/components/MenuPage";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <MenuPage />
    </Suspense>
  );
}
