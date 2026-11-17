# 尋聖之旅測試環境

正式網站：https://winstonfang05.github.io/geys4010-sacred-journey/

測試網站：https://winstonfang05.github.io/geys4010-sacred-journey/test/

## 發布方式及邊界

兩者均由現有 GitHub Pages `main:/` 發布。`test/` 是完整、自包含的靜態副本，含自己的 HTML、CSS、JavaScript、故事資料、Leaflet 與 assets；沒有以 `../` 讀取正式版本的程式或資料。唯一返回正式頁面的 `../` 是使用者可點擊的連結。

測試頁永久顯示 TEST 提示，頁面 title 亦標明測試環境。起始副本基於 `9078824d8e9918b136341b2caf80a1c6716284f4`，記於 `test/environment.json`。初始故事資料與正式版相同，但後續分別維護，不自動同步。

這是**檔案及 URL 分離**，不是不同伺服器、不同網域或完整後端隔離：兩者共用 GitHub Pages 主機、同源瀏覽器儲存範圍及 OSM 公共圖磚服務，目前都沒有收件／評分後端。未來如加入 localStorage、cookie、API、分析或表單，測試必須使用明確的獨立 key、測試資料與測試 endpoint，不能接正式寫入服務。不得放入個人資料、秘密、未公開內容；`test/` 是公開網址，不是私密沙盒。

## 後續測試 → 正式流程

1. 開始前 `git fetch` 並核對最新 main 與工作區，勿覆蓋他人更改。新功能先只修改 `test/`；禁止自動從測試目錄覆蓋根目錄。
2. 更新測試版 HTML 的 CSS/JS 版本參數，以及 app.js 各 module import 的版本參數。保持所有 runtime 資源相對於 `test/`，不共用根目錄檔案。
3. 執行靜態與資料測試，再以手機／桌面瀏覽器驗證載入、地圖、故事、搜尋、分類、語言及返回操作；HTTP 回讀不等於視覺驗收。
4. 提交測試目錄，等 Pages build 完成並核對實際部署 commit。回讀測試 URL 和相關資源，確認匹配發布內容。
5. 使用者同意正式發布後，按 diff 選擇測試成功的功能變更移植至根目錄。保留正式資料與最新組員更改，不複製測試 banner、environment.json 或測試資料。正式版本單獨更新資源版本參數。
6. 保留原正式 commit；用普通 revert 對應發布提交回滾，勿 force push。再次檢查 Pages build、正式資源與適用的真實互動。

建立本測試目錄的提交不修改根目錄的正式網站檔案。日後修改 test 不會直接改動正式檔案，但 main 提交仍會觸發整個 Pages 專案重建，需留意共用發布管線。
