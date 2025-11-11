import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderContentProps {
  children: React.ReactNode;
}

export default function PlaceholderContent({children}: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none mt-6 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}
