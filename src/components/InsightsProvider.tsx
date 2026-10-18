import React from "react"
import Script from "next/script"

export default function InsightsProvider() {
  return (
    <React.Fragment>
      <Script
        defer
        src="https://analytics.fapethedev.com/script.js"
        data-website-id="f9c52307-ea29-435a-b7de-f633fd0d9f5f"
        strategy="afterInteractive"
      />
      <Script
        defer
        src="https://analytics.fapethedev.com/recorder.js"
        data-website-id="f9c52307-ea29-435a-b7de-f633fd0d9f5f"
        strategy="afterInteractive"
      />

      <Script
        async
        src="https://electerious.fapethedev.com/tracker.js"
        data-ackee-server="https://electerious.fapethedev.com"
        data-ackee-domain-id="f43c6fe3-20bf-43ca-855b-8ba16e3cd586"
        strategy="afterInteractive"
      />

    </React.Fragment>
  );
}