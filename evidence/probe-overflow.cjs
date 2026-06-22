// Probe: find what's causing horizontal overflow on desktop
const { chromium } = require('/root/.npm/_npx/7f4967a1621aa3dc/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5179/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.click('button[data-lang-button="pt"]');
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const wide = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1) {
        const cs = getComputedStyle(el);
        wide.push({
          tag: el.tagName,
          cls: el.className?.toString().slice(0, 80),
          right: Math.round(r.right),
          width: Math.round(r.width),
          left: Math.round(r.left),
          position: cs.position,
          overflow: cs.overflow
        });
      }
    });
    return { vw, wideCount: wide.length, wide: wide.slice(0, 30) };
  });
  console.log(JSON.stringify(overflow, null, 2));
  await browser.close();
})();
