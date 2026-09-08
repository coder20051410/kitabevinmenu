"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function TableNumberHandler() {
  const searchParams = useSearchParams();
  const { setTableNumber } = useCart();

  useEffect(() => {
    const tableFromUrl = searchParams.get("masa") ?? searchParams.get("table") ?? "";
    if (tableFromUrl) {
      setTableNumber(tableFromUrl, true);
    }
  }, [searchParams, setTableNumber]);

  return null;
}
