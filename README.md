# 尋聖之旅 · Sacred Journey

香港中文大學 GEYS4010 Group A09 的故事地圖與社區文化檔案。首版是供小組審閱的可操作原型。

## 本機預覽

在倉庫目錄執行 `python3 -m http.server 8080 --bind 127.0.0.1`，然後開啟 [本機預覽](http://127.0.0.1:8080)。網站是靜態 HTML、CSS 和 JavaScript，沒有套件安裝或建置步驟。開啟時需要 HTTP 伺服器來載入 JavaScript 模組。

## 原型範圍

- 繁體中文和英文，地區示意圖、故事搜尋和分類。
- 三篇公開資料示例。每篇區分資料來源與待核事項，並提供固定故事連結，例如 `#story/tin-chun`。
- 離線故事線索模板。原型不收件、不儲存訪客資料，也不提供導航或導賞報名。

故事內容與文案放在 `stories.js`。地圖及羅盤為本原型繪製的 SVG。新故事可沿用現有的 ID、地區、雙語內容及來源欄位。選址、位置公開和資料審核的依據見 [產品方向](docs/product-brief.md)。

更新了一版產品方向在 [產品方向更新](docs/product-brief-updated.md)。


## 地圖升級候選（未部署）

本候選維持無建置步驟的靜態網站，使用本機 vendored Leaflet 1.9.4
（BSD-2-Clause，見 `vendor/leaflet/LICENSE`）及 OpenStreetMap 圖磚。
`map-config.js` 設定圖磚服務與香港概覽，概覽中心不是任何故事的坐標。
不要批次下載或預取圖磚；保留畫面上的署名、正常瀏覽器 Referer 與 HTTP 快取。
OSM 公共圖磚屬 best-effort，不保證可用；大量流量上線前須評估其他供應商。

`stories.js` 的 `location` 預設為未核實。只有同時具備數值 `lat`/`lng`、
`status: 'verified'`、`publish: true`、`precision: 'exact'`、
`verifiedAt: 'YYYY-MM-DD'` 及 `source` 的資料才生成標記和路線連結。
這些欄位須由實際資料核驗及公開許可支持，不能只為顯示標記而填寫。
現有三則故事未補坐標，故預覽只有香港底圖及列表，沒有故事標記。

搜尋及分類更新列表，也同步突出地圖匹配標記；不隱藏其他已核實地點，
以遵循新版產品規格「地圖仍可找到全部公開地點」。
本批不實作評分後台、管理統計、投稿表單或分享圖；原有離線模板仍保留。

檢查：`node --test tests/map.test.mjs`、`python3 tests/static-check.py`。
瀏覽器檢查腳本 `tests/browser.cjs` 需要 Playwright 與 Chromium；先啟動
`python3 -m http.server 8765 --bind 127.0.0.1`。測試用坐標僅存在於攔截的測試回應，
不寫入正式故事。當前環境未能啟動瀏覽器，視覺與真實互動驗收尚未完成。
