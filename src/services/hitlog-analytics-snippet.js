(function () {
  function sendAnalyticsData() {
    fetch("http://localhost:8080/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer,
        device: navigator.userAgent,
        timestamp: new Date().toISOString(),
        duration: 0, // Calculate duration if needed
        isBot: /bot|crawl|spider/i.test(navigator.userAgent),
      }),
    });
  }

  window.addEventListener("load", sendAnalyticsData);
})();
