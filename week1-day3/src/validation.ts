export function validateEmailSyntax(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

export function detectCatchAllDomain(domain: string): boolean {
  const catchAllDomains = new Set([
    "catchall.example.com"
  ]);

  return catchAllDomains.has(domain.toLowerCase());
}