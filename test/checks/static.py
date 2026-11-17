from pathlib import Path
from html.parser import HTMLParser
import re
r=Path(__file__).resolve().parents[1]
class P(HTMLParser):
 def handle_starttag(self,t,attrs):
  for k,v in attrs:
   if k in ['src','href'] and v and v.startswith('./'): assert (r/v[2:].split('?')[0]).is_file(),v
P().feed((r/'index.html').read_text())
for p in r.glob('*.js'):
 for path in re.findall(r"from ['\"]\./([^'\"]+)",p.read_text()):assert (r/path.split('?')[0]).is_file(),path
assert 'filter:none; opacity:1' in (r/'styles.css').read_text()
assert 'contributionFormUrl: null' in (r/'site-config.js').read_text()
assert "localStorage" not in (r/'app.js').read_text()
print('PASS local asset imports, full-color map, unconfigured form and no local fake votes')
