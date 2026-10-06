from pathlib import Path
import json,re,subprocess,xml.etree.ElementTree as ET

root=Path(__file__).resolve().parents[1]
errors=[]
tracked=subprocess.check_output(['git','ls-files'],cwd=root,text=True).splitlines()
for rel in tracked:
    p=root/rel
    if not p.is_file():continue
    if p.suffix.lower()=='.zip':errors.append('Tracked ZIP archive: '+rel)
    try:s=p.read_text()
    except UnicodeDecodeError:continue
    if re.search(r'app-[A-Za-z0-9_-]{12,}',s):errors.append('Dify app credential literal: '+rel)
for path in [root/'index.html',root/'contact/index.html',*sorted((root/'CI-blog').glob('*/index.html')),root/'CI-blog/index.html',*sorted((root/'industries').glob('*/index.html'))]:
    s=path.read_text()
    for marker in ['property="og:title"','property="og:description"','property="og:url"','property="og:image"','name="twitter:card"','rel="canonical"']:
        if marker not in s:errors.append('Missing '+marker+': '+str(path.relative_to(root)))
    for schema in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S):json.loads(schema)
    if 'GEODRIV' in s:errors.append('Old brand casing: '+str(path.relative_to(root)))
home=(root/'index.html').read_text()
if 'application/ld+json' not in home:errors.append('Homepage structured data missing')
namespace={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls={e.text for e in ET.parse(root/'sitemap.xml').findall('.//s:loc',namespace)}
required={'https://geodriv.com/contact/',*[f'https://geodriv.com/industries/{p.parent.name}/' for p in (root/'industries').glob('*/index.html')]}
if not required.issubset(urls):errors.append('Missing sitemap destinations')
if any('/aerospace/' in u and '/industries/' not in u or '/feiye/' in u for u in urls):errors.append('Internal tools in sitemap')
if 'Sitemap: https://geodriv.com/sitemap.xml' not in (root/'robots.txt').read_text():errors.append('Wrong sitemap URL in robots')
for rel in ['aerospace/index.html','feiye/index.html']:
    if (root/rel).exists():errors.append('Unrelated application page present: '+rel)
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: public-site metadata, brand, credential scan, unrelated page exclusion and {len(urls)} sitemap URLs')
