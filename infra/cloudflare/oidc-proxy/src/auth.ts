export interface OIDCClaims {
  iss?: string;
  aud?: string | string[];
  sub?: string;
  exp?: number;
  iat?: number;
}

export async function validateOidcJwt(
  jwt: string,
  expectedAudience: string,
  expectedIssuer: string,
): Promise<OIDCClaims> {
  const parts = jwt.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  const payload = parts[1];
  const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

  if (decoded.iss !== expectedIssuer) {
    throw new Error('Invalid issuer');
  }

  const audience = decoded.aud;
  const validAudience = Array.isArray(audience)
    ? audience.includes(expectedAudience)
    : audience === expectedAudience;

  if (!validAudience) {
    throw new Error('Invalid audience');
  }

  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < now) {
    throw new Error('Token expired');
  }

  return decoded as OIDCClaims;
}
