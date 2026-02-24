"use client";

import { CheckCircle } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@novo/ui";
import { useMessages } from "@/shared/hooks/use-messages";

interface AccidentHistoryData {
  driverName: string;
  reportDate: string;
  licenseNumber: string;
  licenseState: string;
  status: string;
  summary: {
    violations: string;
    accidents: string;
    licenseStatus: string;
    licenseClass: string;
  };
  impact: string;
}

interface AccidentHistoryModalProps {
  open: boolean;
  data: AccidentHistoryData | null;
  onClose: () => void;
  onDownloadReport: () => void;
  onVerify: () => void;
}

export function AccidentHistoryModal({
  open,
  data,
  onClose,
  onDownloadReport,
  onVerify,
}: AccidentHistoryModalProps) {
  const t = useMessages();

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            {t("import-summary.mvr-title", { driverName: data.driverName })}
          </DialogTitle>
          <DialogDescription>
            {t("import-summary.mvr-description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">
              {t("import-summary.driver-information")}
            </h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">
                  {t("import-summary.status-label")}
                </span>{" "}
                {data.status}
              </p>
              <p>
                <span className="font-medium">
                  {t("import-summary.report-date-label")}
                </span>{" "}
                {new Date(data.reportDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-medium">
                  {t("import-summary.license-number-label")}
                </span>{" "}
                {data.licenseNumber} ({data.licenseState})
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground">
                {t("import-summary.summary")}
              </h3>
              <div className="mt-2 h-px bg-border" />
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>{data.summary.violations}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>{data.summary.accidents}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>{data.summary.licenseStatus}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>{data.summary.licenseClass}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <p className="text-sm text-foreground">{data.impact}</p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <Button variant="ghost" onClick={onClose}>
              {t("import-summary.close")}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onDownloadReport}>
                {t("import-summary.download-report")}
              </Button>
              <Button onClick={onVerify}>
                {t("import-summary.verify-close")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
