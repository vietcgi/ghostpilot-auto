
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const proxyListPath = path.join(__dirname, '../profiles/proxies.json');
const healthLogPath = path.join(__dirname, '../logs/proxy-health.json');

async function testProxy(proxy) {
  const [ip, port] = proxy.host.split(':');
  const start = Date.now();

  try {
    const response = await axios.get('https://httpbin.org/ip', {
      timeout: 5000,
      proxy: {
        host: ip,
        port: parseInt(port),
        protocol: proxy.protocol || 'http'
      }
    });

    const latency = Date.now() - start;
    return {
      host: proxy.host,
      status: 'ok',
      ip: response.data.origin,
      latency
    };

  } catch (err) {
    return {
      host: proxy.host,
      status: 'fail',
      reason: err.message
    };
  }
}

async function checkAllProxies() {
  if (!fs.existsSync(proxyListPath)) {
    console.log('❌ No proxy list found');
    return;
  }

  const proxies = JSON.parse(fs.readFileSync(proxyListPath));
  const results = [];

  for (let proxy of proxies) {
    const result = await testProxy(proxy);
    results.push(result);
  }

  fs.writeFileSync(healthLogPath, JSON.stringify(results, null, 2));
  console.log(`✅ Proxy health checked: ${results.length} proxies`);
}

checkAllProxies();
