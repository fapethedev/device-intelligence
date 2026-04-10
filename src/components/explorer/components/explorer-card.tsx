import React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/explorer/types";

interface ExplorerCardProps {
  section: Section;
}

export function ExplorerCard({ section }: ExplorerCardProps) {
  return (
    <Card className="h-full border-primary/10 bg-card/50 backdrop-blur-md hover:border-primary/30 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {React.cloneElement(section.icon as React.ReactElement<{ size: number }>, { size: 64 })}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2 text-lg font-bold group-hover:text-primary transition-colors">
            <span className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              {section.icon}
            </span>
            {section.title}
          </CardTitle>
          {section.actions}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 relative z-10">
        {section.items.map((item) => (
          <div key={item.label} className="flex flex-col border-l-2 border-primary/5 group-hover:border-primary/20 pl-3 py-0.5 transition-colors">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
              {item.label}
            </span>
            {item.badge ? (
              <div className="mt-0.5">
                <code className="bg-primary/10 text-primary font-mono text-xs px-2 py-0.5 rounded border border-primary/20 block w-fit truncate max-w-full">
                  {item.value || "Calculating..."}
                </code>
              </div>
            ) : (
              <span className={cn(
                "text-sm font-semibold text-foreground/90",
                item.truncate && "truncate block max-w-full"
              )}>
                {String(item.value ?? "N/A")}
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
