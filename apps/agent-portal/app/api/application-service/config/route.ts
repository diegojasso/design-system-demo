import { NextResponse } from "next/server";

import { getApplicationServiceConfig } from "@/server/config";
import {
  buildDiagnosticsFromConfig,
  buildDiagnosticsFromError,
} from "@/server/config/config-diagnostics.server";

export function GET() {
  const result = getApplicationServiceConfig();
  if (!result.ok) {
    // Diagnostics endpoint should still respond with a useful, portal-safe payload.
    return NextResponse.json(buildDiagnosticsFromError(result.error), { status: 200 });
  }

  return NextResponse.json(buildDiagnosticsFromConfig(result.value), { status: 200 });
}

