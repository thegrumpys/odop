// src/utils/analytics.js
export function initAnalytics() {
  console.log('process.env.REACT_APP_ENABLE_ANALYTICS=', process.env.REACT_APP_ENABLE_ANALYTICS);
  const enabled = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';
  if (!enabled) {
    console.log('[GA] Google Analytics & Ads disabled by environment config.');
    delete window.gtag;
    window.dataLayer = [];
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
  console.log('calling gtag(\'js\', new Date());');
  gtag('js', new Date());

  // --- Configure both GA and Ads IDs ---
  console.log('calling gtag(\'config\', GA_MEASUREMENT_ID, {...}})');
  gtag('config', GA_MEASUREMENT_ID, {
    linker: {
      accept_incoming: true,
      domains: ['springdesignsoftware.org', 'odop.springdesignsoftware.org'],
    },
  });
  console.log('calling gtag(\'config\', GA_ADS_ID);');
  gtag('config', GA_ADS_ID);

  // --- Conversion trigger ---
  const sendConversion = () => {
    const el = document.querySelector('#odop-form-title');
    if (el && el.offsetParent !== null) {
      console.log('calling gtag(\'event\', \'conversion\', { send_to: GA_CONVERSION_EVENT });');
      gtag('event', 'conversion', { send_to: GA_CONVERSION_EVENT });
//      console.log('[GA] Conversion event sent:', GA_CONVERSION_EVENT);
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
