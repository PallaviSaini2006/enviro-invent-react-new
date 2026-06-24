const fs = require('fs');
let h = fs.readFileSync('public/ship-hero-light.html', 'utf8');

// Fix label backdrop to light/green themed
h = h.replace(
  '.lbg{fill:rgba(4,12,20,0.82);stroke:rgba(255,255,255,0.08);stroke-width:1;opacity:0;}',
  '.lbg{fill:rgba(245,249,246,0.96);stroke:rgba(26,122,64,0.3);stroke-width:1;opacity:0;}'
);

// Make sky rect transparent
h = h.replace(
  '<rect x="0" y="0" width="1600" height="900" fill="url(#skyGrad)"/>',
  '<rect x="0" y="0" width="1600" height="900" fill="transparent"/>'
);

// Make sea rect very subtle
h = h.replace(
  '<rect id="sea-rect" x="0" y="530" width="1600" height="370" fill="url(#seaGrad)"/>',
  '<rect id="sea-rect" x="0" y="530" width="1600" height="370" fill="rgba(200,220,230,0.05)"/>'
);

// Fix smoke puff
h = h.replace(
  '.smoke-puff{fill:rgba(140,150,155,.15);opacity:0;}',
  '.smoke-puff{fill:rgba(120,130,135,0.1);opacity:0;}'
);

// Fix waterline to green
h = h.replace(
  '.waterline{stroke:rgba(80,160,200,.5);stroke-width:1;fill:none;stroke-dasharray:8 5;}',
  '.waterline{stroke:rgba(26,122,64,0.3);stroke-width:1;fill:none;stroke-dasharray:8 5;}'
);

fs.writeFileSync('public/ship-hero-light.html', h);
console.log('Patched successfully. File size:', h.length, 'bytes');
