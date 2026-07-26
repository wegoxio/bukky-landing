const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim();
const siteCreator = process.env.NEXT_PUBLIC_SITE_CREATOR?.trim();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE?.trim();
const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim();
const canonicalSiteUrl = "https://bukky.wegox.io";

function getCanonicalSiteUrl(value: string | undefined): string {
  if (!value || value.length === 0) {
    return canonicalSiteUrl;
  }

  try {
    const url = new URL(value);

    if (url.hostname === "bukky-landing.vercel.app") {
      return canonicalSiteUrl;
    }

    return url.origin;
  } catch {
    return canonicalSiteUrl;
  }
}

export const siteConfig = {
  name: siteName && siteName.length > 0 ? siteName : "Bukky",
  creator:
    siteCreator && siteCreator.length > 0
      ? siteCreator
      : siteName && siteName.length > 0
        ? siteName
        : "Wegox",
  url: getCanonicalSiteUrl(siteUrl),
  ogImage: ogImage && ogImage.length > 0 ? ogImage : "/opengraph-image",
  twitterHandle:
    twitterHandle && twitterHandle.length > 0 ? twitterHandle : undefined,
} as const;

export function getSiteUrl(): string {
  return siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
}

export function getSiteAssetUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${getSiteUrl()}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}
