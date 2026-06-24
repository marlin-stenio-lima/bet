const https = require('https');
https.get('https://brasilodd20.lovable.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // console.log("HTML URLs:", data.match(/https?:\/\/[^\s"'`]+/g));
    const jsFiles = data.match(/\/assets\/[^\s"'`]+\.js/g) || [];
    jsFiles.forEach(file => {
      https.get('https://brasilodd20.lovable.app' + file, (res2) => {
        let jsData = '';
        res2.on('data', chunk => jsData += chunk);
        res2.on('end', () => {
          const imgUrls = jsData.match(/https?:\/\/[^\s"'`\\]*\.(jpg|png|webp|jpeg)|https:\/\/images\.unsplash\.com[^\s"'`\\]*/gi);
          if (imgUrls) {
            console.log("Found in", file, ":");
            console.log([...new Set(imgUrls)]);
          }
        });
      });
    });
  });
});
