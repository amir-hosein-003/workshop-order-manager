import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PlaceholderContent({ children, className }: Props) {
  return (
    <Card
      className={`rounded-lg border-none mt-6 min-h-[calc(100vh-56px-64px-20px-24px)] ${className}`}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
