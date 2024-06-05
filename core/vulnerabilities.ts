export type TSeverity = "critical" | "high" | "medium" | "low";

export type TAdvisory = {
  id: number;
  url: string;
  title: string;
  severity: TSeverity;
  vulnerable_versions: string;
  cwe: unknown; // not using
  cvss: unknown; // not using
};

export async function getVulnerabilities(
  name: string,
  source?: string,
  target?: string
) {
  if (!source || !target) return;

  const resp = await fetch(
    "https://registry.npmjs.org/-/npm/v1/security/advisories/bulk",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [name]: [source, target],
      }),
    }
  );

  const data = (await resp.json()) as Record<string, TAdvisory[]>;

  return data[name];
}
