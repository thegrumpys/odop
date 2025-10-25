// src/utils/analytics.js
export function initAnalytics() {
  if (process.env.REACT_APP_ENABLE_ANALYTICS !== 'true') {
    console.log('[GA] Google Analytics & Ads disabled by environment config.');
    return;
  }

  const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_ID || 'G-PJ64GHQX6P';
  const GA_ADS_ID = process.env.REACT_APP_GA_ADS_ID || 'AW-659158420';
  const GA_CONVERSION_EVENT =
    process.env.REACT_APP_GA_CONVERSION_EVENT || 'AW-659158420/fPTOCOiopNQBEJTrp7oC';

  console.log(`[GA] Initializing Google tags for ${GA_MEASUREMENT_ID} and ${GA_ADS_ID}`);

  // --- Load both GA & Ads scripts dynamically ---
  [GA_MEASUREMENT_ID, GA_ADS_ID].forEach(id => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.async = true;
    document.head.appendChild(script);
  });

  // --- Initialize gtag ---
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag; // make globally available
  gtag('js', new Date());

  // --- Configure both GA and Ads IDs ---
  gtag('config', GA_MEASUREMENT_ID, {
    linker: {
      accept_incoming: true,
      domains: ['springdesignsoftware.org', 'odop.springdesignsoftware.org'],
    },
  });
  gtag('config', GA_ADS_ID);

  // --- Conversion trigger ---
  const sendConversion = () => {
    const el = document.querySelector('#odop-form-title');
    if (el && el.offsetParent !== null) {
      gtag('event', 'conversion', { send_to: GA_CONVERSION_EVENT });
      console.log('[GA] Conversion event sent:', GA_CONVERSION_EVENT);
      return true;
    }
    return false;
  };

  // Check immediately after load
  window.addEventListener('load', sendConversion);

  // --- Monitor DOM for future visibility changes ---
  const observer = new MutationObserver(() => {
    if (sendConversion()) {
      observer.disconnect(); // stop once event fired successfully
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });
}
