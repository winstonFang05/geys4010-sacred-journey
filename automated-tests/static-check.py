from html.parser import HTMLParser
from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
class Check(HTMLParser):
    def __init__(self): super().__init__(); self.ids=[]; self.local=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        for k in ('src','href'):
            if a.get(k,'').startswith('./'): self.local.append(a[k][2:].split("?")[0])
c=Check();c.feed((root/'index.html').read_text())
assert len(c.ids)==len(set(c.ids)), 'duplicate IDs'
assert all((root/p).is_file() for p in c.local), 'missing HTML resources'
for f in ('app.js','map-data.js','map-config.js'):
    for path in re.findall(r"from ['\"]\./([^'\"]+)",(root/f).read_text()): assert (root/path.split("?")[0]).is_file()
assert '<dialog' not in (root/'index.html').read_text()
assert 'position: [' not in (root/'stories.js').read_text()
assert 'OpenStreetMap</a> contributors' in (root/'map-config.js').read_text()
assert 'preserve' in (root/'vendor/leaflet/leaflet.js').read_text()[:100]
print('PASS: IDs, HTML assets, module imports, detail-view migration, no SVG positions, OSM attribution, Leaflet vendor header')

entry = (root/'index.html').read_text()
production = (root/'production/app.js').read_text()
assert './production/app.js?v=20261119-trevonelle-production' in entry
assert "const theme = 'trevonelle';" in production
assert "'sacred-journey-production-v1'" in production
assert "'#explore'||route==='#map'" in production
for source in ('index.html','production/app.js','production/style.css','production/config.js'):
    assert '/test/' not in (root/source).read_text(), f'sandbox dependency: {source}'
assert len(list((root/'production/assets/share').glob('trevonelle-*.png'))) == 46
print('PASS: production Trevonelle entry, separate sandbox and story shares')
