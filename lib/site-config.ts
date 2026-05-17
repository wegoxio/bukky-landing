const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim();
const siteCreator = process.env.NEXT_PUBLIC_SITE_CREATOR?.trim();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE?.trim();
const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim();

export const siteConfig = {
  name: siteName && siteName.length > 0 ? siteName : "SaaS Brand",
  creator:
    siteCreator && siteCreator.length > 0
      ? siteCreator
      : siteName && siteName.length > 0
        ? siteName
        : "Product Team",
  url: siteUrl && siteUrl.length > 0 ? siteUrl : "https://example.com",
  ogImage: ogImage && ogImage.length > 0 ? ogImage : "/opengraph-image.png",
  twitterHandle:
    twitterHandle && twitterHandle.length > 0 ? twitterHandle : undefined,
} as const;

export function getSiteUrl(): string {
  return siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
}
