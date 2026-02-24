import { importSummaryMessages } from "@/shared/messages/import-summary-messages";

export function useMessages() {
  return (key: string, params?: Record<string, string | number>) => {
    const template = importSummaryMessages[key as keyof typeof importSummaryMessages];
    if (!template) {
      return key;
    }
    if (!params) return template;
    return template.replace(/\{(\w+)\}/g, (_: string, token: string) => {
      const value = params[token];
      return value === undefined ? "" : String(value);
    });
  };
}
