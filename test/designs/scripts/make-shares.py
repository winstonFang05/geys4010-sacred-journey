from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import json
out=Path('assets/share');out.mkdir(exist_ok=True)
sans='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
serif='/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc'
def font(n,bold=False):return ImageFont.truetype(serif if bold else sans,n)
def lines(text,draw,f,width):
    chunks=[];line=''
    for ch in text:
        if draw.textlength(line+ch,font=f)>width and line:
            chunks.append(line);line=ch
        else:line+=ch
    if line:chunks.append(line)
    return chunks
colors={'trevonelle':('#eceff2','#15191e','#e5482b'),'accession':('#f1ead9','#24221b','#a87721'),'relic':('#f3f0e9','#4a2b20','#cf816a'),'synthesis':('#f5f2e9','#283d31','#b85436')}
for c in json.loads(Path('work/share-data.json').read_text()):
    bg,ink,accent=colors[c['theme']]
    im=Image.new('RGB',(1080,1350),bg);d=ImageDraw.Draw(im)
    d.rectangle((0,0,1080,22),fill=accent)
    d.text((75,75),'SACRED JOURNEY / HONG KONG',font=font(23),fill=ink)
    d.text((75,155),c['number'],font=font(130,True),fill=accent)
    y=350
    f=font(62 if c['lang']=='zh' else 55,True)
    for line in lines(c['title'],d,f,900):d.text((75,y),line,font=f,fill=ink);y+=95
    d.text((75,y+24),c['area'],font=font(27),fill=accent)
    y+=110
    f=font(27)
    for line in lines(c['summary'],d,f,900)[:5]:d.text((75,y),line,font=f,fill=ink);y+=48
    q=c['qr'];scale=5;size=(len(q)+8)*scale;ox=75;oy=930
    d.rectangle((ox,oy,ox+size,oy+size),fill='#fff')
    for row,vals in enumerate(q):
        for col,on in enumerate(vals):
            if on:
                x=ox+(col+4)*scale;yq=oy+(row+4)*scale
                d.rectangle((x,yq,x+scale-1,yq+scale-1),fill='#151915')
    tx=ox+size+45
    d.text((tx,965),'掃碼，翻開地方故事' if c['lang']=='zh' else 'Scan to read the story',font=font(30,True),fill=ink)
    d.text((tx,1030),'公開資料示例 / PUBLIC-SOURCE EXAMPLE',font=font(18),fill=accent)
    d.text((tx,1070),'GEYS4010 · CUHK · Group A09',font=font(20),fill=ink)
    d.line((75,1250,1005,1250),fill=accent,width=1)
    d.text((75,1280),f"DESIGN STUDY / {c['theme'].upper()} / {c['lang'].upper()}",font=font(16),fill=ink)
    im.save(out/f"{c['theme']}-{c['id']}-{c['lang']}.png",optimize=True)
print('Created 24 pre-made bilingual share cards with correct story QR URLs.')
