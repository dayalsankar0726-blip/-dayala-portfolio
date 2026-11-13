// Run with: node scripts/check-card-patterns.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/card-patterns.js'), 'utf8');
const start = source.indexOf('  const A =');
const end = source.indexOf('  const page =');
if (start < 0 || end < 0) throw new Error('Pattern registry not found.');
const { LAWS, NOTES, PLANS } = vm.runInNewContext(`(() => {${source.slice(start, end)};return {LAWS,NOTES,PLANS};})()`);
const keys = new Map(), names = new Map(), visuals = new Map();
function unique(map, value, location, kind) {
  if (map.has(value)) throw new Error(`Repeated ${kind}: ${location}; already used at ${map.get(value)}`);
  map.set(value, location);
}
for (const [page, plan] of Object.entries(PLANS)) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  if ((html.match(/assets\/card-patterns\.js/g) || []).length !== 1) throw new Error(`${page} must load the shared library exactly once.`);
  plan.forEach((key, index) => {
    if (!key) return;
    const location = `${page}, pattern ${index + 1}`;
    if (!LAWS[key] || !NOTES[key]) throw new Error(`Missing pattern or description: ${key}`);
    unique(keys, key, location, 'pattern key');
    unique(names, NOTES[key][0].toLowerCase(), location, 'principle name');
    unique(visuals, `${LAWS[key][0]}:${LAWS[key][1]('#23301F', false)}`, location, 'visual');
  });
}
console.log(`PASS: ${Object.keys(PLANS).length} pages, ${keys.size} unique patterns, ${names.size} unique principle names, no duplicates.`);
