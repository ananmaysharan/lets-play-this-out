/* Inflammatory ad mocks shown after the 2032 Erosion news headline. */

import Image from 'next/image';

export function InflammatoryAds() {
  return (
    <div className="ads-grid">
      <Image
        src="/ads/gillette-viral-feed.png"
        alt="Viral Feed: Gillette knows every hair on your body. Should they?"
        width={760}
        height={580}
        className="ad-img"
        priority
      />
      <Image
        src="/ads/gillette-going-grey.png"
        alt="Gillette ad: We know you're going grey. Shave it away."
        width={580}
        height={760}
        className="ad-img"
        priority
      />
    </div>
  );
}
