"use client";

import { CollapsibleImportedInfo } from "./collapsible-imported-info";
import { CollapsibleTimeline } from "./collapsible-timeline";
import { DisclosuresNotices } from "./disclosures-notices";
import { useMessages } from "@/shared/hooks/use-messages";
import type { ImportSummaryData } from "./mock-ezlynx-data";

interface ClientsInformationSectionProps {
  importedInfo: ImportSummaryData["importedInfo"];
  timelineEvents: {
    id: string;
    label: string;
    status: "completed" | "pending" | "failed";
    timestamp?: Date;
  }[];
}

export function ClientsInformationSection({
  importedInfo,
  timelineEvents,
}: ClientsInformationSectionProps) {
  const t = useMessages();
  const clientsInfoId = "import-summary-clients-info";

  return (
    <section className="space-y-6" aria-labelledby={clientsInfoId}>
      <h2 id={clientsInfoId} className="text-lg font-bold text-foreground">
        {t("import-summary.clients-information")}
      </h2>

      <CollapsibleImportedInfo
        drivers={importedInfo.drivers}
        vehicles={importedInfo.vehicles}
        defaultOpen={true}
      />

      <DisclosuresNotices />

      <CollapsibleTimeline events={timelineEvents} defaultOpen={false} />
    </section>
  );
}
