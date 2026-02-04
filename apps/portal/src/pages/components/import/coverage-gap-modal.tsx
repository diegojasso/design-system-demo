"use client";

import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@novo/ui";
import { CoverageGapWizard } from "./coverage-gap-wizard";
import { useMessages } from "@/shared/hooks/use-messages";

interface CoverageGapModalProps {
  open: boolean;
  clientName: string;
  data: {
    gapPeriod: {
      start: string;
      end: string;
      days: number;
    };
    previousCarrier: string;
    currentCarrier: string;
    currentCarrierStart: string;
    applicationStates: string;
    reportShows: string;
    rateImpact: {
      current: number;
      potential: number;
      savings: number;
    };
  } | null;
  onResolve: (option: string) => void;
  onClose: () => void;
}

export function CoverageGapModal({
  open,
  clientName,
  data,
  onResolve,
  onClose,
}: CoverageGapModalProps) {
  const t = useMessages();

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            {t("import-summary.coverage-gap-title")}
          </DialogTitle>
          <DialogDescription>
            {t("import-summary.coverage-gap-description", { clientName })}
          </DialogDescription>
        </DialogHeader>
        <CoverageGapWizard
          data={data}
          clientName={clientName}
          onResolve={onResolve}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
