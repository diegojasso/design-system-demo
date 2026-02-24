export const environmentIds = ["dev", "stage", "uat", "preprod", "prod"] as const;

export type EnvironmentId = (typeof environmentIds)[number];

export type ApplicationServiceConfiguration = {
  environmentId: EnvironmentId;
  endpoint: URL;
  apiKey: string;
};
