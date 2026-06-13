import React, { useEffect } from "react";

const GoogleAds = ({ adId }: any) => {
  useEffect(() => {
    ((window as any)[`adsbygoogle${adId}`] =
      (window as any)[`adsbygoogle${adId}`] || []).push({});
  }, [adId]);
  return (
    <div style={{ width: "300px" }}>
      <ins
        className={`adsbygoogle${adId}`}
        style={{ display: "block" }}
        data-ad-client="ca-pub-9672457203954390"
        data-ad-slot="2905065945"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest="on"
      ></ins>
    </div>
  );
};

export default GoogleAds;
