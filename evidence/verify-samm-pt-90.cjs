#!/usr/bin/env node
// Verification artifact for t_83f33252: 90/90 SAMM PT-BR coverage
const fs = require('fs');
const code = fs.readFileSync('src/site.js', 'utf8');

// Simulate getLang pt
const lang = 'pt';
const isPt = true;

// Extract ptQuestionMap
const mapMatch = code.match(/const ptQuestionMap = \{([\s\S]*?)\};/);
const ptMap = {};
if (mapMatch) {
  const entries = mapMatch[1].match(/"([^"]+)":\s*"([^"]+)"/g) || [];
  entries.forEach(e => {
    const m = e.match(/"([^"]+)":\s*"([^"]+)"/);
    if (m) ptMap[m[1]] = m[2];
  });
}

// Extract questions
const qMatch = code.match(/questions: \[([\s\S]*?)\]\s*\}\s*;/);
const questions = [];
if (qMatch) {
  const items = qMatch[1].match(/\{[^}]*code: "[^"]+"[^}]*\}/g) || [];
  items.forEach(item => {
    const codeM = item.match(/code: "([^"]+)"/);
    const textM = item.match(/text: "([^"]+)"/);
    const textPtM = item.match(/text_pt: "([^"]+)"/);
    const fullM = item.match(/full: (true|false)/);
    if (codeM && textM) {
      questions.push({
        code: codeM[1],
        text: textM[1],
        text_pt: textPtM ? textPtM[1] : null,
        full: fullM ? fullM[1] === 'true' : false
      });
    }
  });
}

let ptCount = 0;
const samples = [];
questions.forEach(q => {
  const qText = (isPt && ptMap[q.text]) || (isPt && q.text_pt) || q.text;
  const isPtText = qText !== q.text;
  if (isPtText) ptCount++;
  if (samples.length < 5 || q.full) samples.push({code: q.code, text: qText.substring(0,80), isPt: isPtText});
});

console.log("=== SAMM PT-BR Verification ===");
console.log("Total questions:", questions.length);
console.log("PT-BR covered (via map or data):", ptCount);
console.log("Coverage %:", Math.round(ptCount / questions.length * 100) + "%");
console.log("\nSamples (first 5 + full ones):");
samples.forEach(s => console.log(s.code, s.isPt ? "[PT]" : "[EN]", s.text));

// Check full details for a full one
const fullSample = questions.find(q => q.full);
if (fullSample) {
  console.log("\nFull question sample with details (G-EG series should have PT):");
  console.log("Code:", fullSample.code);
  console.log("Title PT:", (isPt && ptMap[fullSample.text]) || fullSample.text_pt || fullSample.text);
}

console.log("\n=== PASS if 90/90 ===");
process.exit(ptCount === questions.length ? 0 : 1);
