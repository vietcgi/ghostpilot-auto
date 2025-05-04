
// Placeholder fingerprint spoofing injection
module.exports.injectFingerprint = async (page) => {
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'language', { get: () => 'en-US' });
  });
};
