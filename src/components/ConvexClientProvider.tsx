"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Create a Convex client
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convexClient = new ConvexReactClient(convexUrl!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}