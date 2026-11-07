/** Cloudflare Web Analytics beacon. Token: CF_WEB_ANALYTICS_TOKEN. */
export function CloudflareAnalytics() {
  const token = process.env.CF_WEB_ANALYTICS_TOKEN?.trim() ?? "";
  if (!token) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
