window.addEventListener("load", function e() {
  fetch("http://localhost:8080/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page: window.location.pathname,
      referrer: document.referrer,
      device: navigator.userAgent,
      timestamp: new Date().toISOString(),
      duration: 0,
      isBot: /bot|crawl|spider/i.test(navigator.userAgent),
    }),
  });
});

/*
window.addEventListener("load",function e(){fetch("https://your-analytics-service.com/track",
{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({page:window.location.pathname,referrer:document.referrer,device:navigator.userAgent,
timestamp:new Date().toISOString(),duration:0,isBot:/bot|crawl|spider/i.test(navigator.userAgent)})})}); 
*/
