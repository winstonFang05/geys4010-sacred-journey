# 尋聖之旅 · 四版設計比較

比較入口：https://winstonfang05.github.io/geys4010-sacred-journey/test/designs/

四版分別在 trevonelle/、accession/、relic/、synthesis/，使用共用 app.js 和 style.css。圖片、字型與生成插圖說明見 assets/manifest.json 及網站圖片說明。

已適配 GitHub Pages 子路徑，須使用 HTTP 伺服器預覽。修改共用 index.html 後同步複製至四版 index.html。分享卡生成：node scripts/share-data.mjs，python scripts/make-shares.py（需要 Pillow 及 Noto CJK 字型）。config.js 的 siteOrigin 包含部署子路徑。

評分與投稿仍為本機設計測試，未接入共用後台；地圖僅標示公開來源的概略區域。
