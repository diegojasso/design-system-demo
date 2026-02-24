"use client";

import { useMessages } from "@/shared/hooks/use-messages";

export function ImportSummaryEmptyState() {
  const t = useMessages();
  return (
    <div className="mb-8 w-full py-12 text-center text-muted-foreground">
      {t("import-summary.empty")}
    </div>
  );
}
