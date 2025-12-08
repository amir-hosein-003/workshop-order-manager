import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
}

export default function PlaceholderContent({children}: Props) {
  return (
    <Card className="rounded-lg border-none mt-6 min-h-[calc(100vh-56px-64px-20px-24px)]">
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
