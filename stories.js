export const stories = [
  {
    id: 'tin-chun', number: '01', category: 'school', position: [57, 24],
    source: 'https://www.cie.hkbu.edu.hk/the-punctum/blog/2026/06/24/in-search-of-tin-chun-kindergarten-a-trilogy-by-dr-miriam-lau-division-of-arts-and-languages/',
    zh: {
      area: '新界 · 坪輋一帶', title: '尋找天真幼稚園',
      summary: '一張學校登記卡留下了地段編號，校友則記得老師和校車。兩種線索能拼出怎樣的村校日常？',
      body: '研究者 Miriam Lau 以學校登記卡追查天真幼稚園。登記卡上的舊地段編號在她查閱的地圖上已找不到，她再以校友和昔日教師的回憶比對位置。校友記得老師說話的方式和每天接送學生的校車，補足了登記資料之外的生活細節。',
      note: '舊址仍是研究線索。地圖只顯示坪輋一帶。登記卡內容引自文章，本組尚未查閱原件。',
      sourceLabel: '地方研究（轉引登記卡及校友回憶）', citation: 'Miriam Lau · The Punctum，2026'
    },
    en: {
      area: 'New Territories · Ping Che area', title: 'Searching for Tin Chun Kindergarten',
      summary: 'A registration card records a lot number. Former pupils remember a teacher and a school bus. Together, they offer a glimpse of village school life.',
      body: 'Researcher Miriam Lau used a registration card to trace Tin Chun Kindergarten. The old lot number did not appear on the map she consulted, so she compared recollections from former pupils and a former teacher. Memories of a teacher’s manner and the school bus add everyday details to the administrative record.',
      note: 'The old site remains a research lead. The map marks only the wider Ping Che area. The team has yet to consult the original registration card.',
      sourceLabel: 'Local research citing a registration card and former pupils’ memories', citation: 'Miriam Lau · The Punctum, 2026'
    }
  },
  {
    id: 'ngau-chi-wan', number: '02', category: 'village', position: [62, 57],
    source: 'https://www.aab.gov.hk/filemanager/aab/common/202meeting/aab_14_2023-24-a-en.pdf',
    zh: {
      area: '九龍 · 牛池灣', title: '牛池灣村的記錄',
      summary: '重建前的文物影響評估留下了一份記錄清單。從這份清單出發，還可以追問村民怎樣使用這些地方。',
      body: '2023 年的文物影響評估在牛池灣村識別出未獲評級的文物元素，並建議在拆卸前作記錄。這份文件提供了理解重建背景及記錄措施的起點。村民怎樣稱呼、使用和記得這些空間，仍要從其他材料或口述追索。',
      note: '評估反映文件發表時的規劃與建議。現況、工程進度及通行條件須另行查核。',
      sourceLabel: '政府文物影響評估', citation: '土木工程拓展署 · 古物諮詢委員會文件附件 A，2023'
    },
    en: {
      area: 'Kowloon · Ngau Chi Wan', title: 'Recording Ngau Chi Wan Village',
      summary: 'A heritage assessment prepared before redevelopment tells us what could be documented. It also opens a question about how villagers used those spaces.',
      body: 'A 2023 heritage impact assessment identified ungraded heritage features in Ngau Chi Wan Village and recommended recording them before demolition. The report provides a starting point for understanding redevelopment and the proposed recording measures. Other records and oral accounts could help explain what villagers called these places and how they used them.',
      note: 'The assessment reflects proposals at the time. Present conditions, works and access require a separate check.',
      sourceLabel: 'Government heritage impact assessment', citation: 'CEDD · Antiquities Advisory Board paper, Annex A, 2023'
    }
  },
  {
    id: 'ap-lei-chau', number: '03', category: 'waterfront', position: [60, 87],
    source: 'https://www.urbandiarist.com/tc/story/Ap-Lei-Chau--Island-of-Plenty',
    zh: {
      area: '港島南區 · 鴨脷洲', title: '從大街走到舊碼頭',
      summary: '一條短巷曾經通向海旁。從街坊的記憶，可以讀到鴨脷洲的交通和岸線變遷。',
      body: '《城市日記》整理的鴨脷洲街坊回憶提到，倫敦里曾通往倫敦碼頭，島上居民由此乘船往來香港仔一帶。文章把這條小徑和海旁變化並置，讓一條後巷也能成為追索昔日水路的線索。',
      note: '本文引用已刊載的社區回憶，舊碼頭位置與歷史步行路線仍須比對歷史地圖。',
      sourceLabel: '社區口述整理', citation: '《城市日記》· 鴨脷洲：豐饒之島'
    },
    en: {
      area: 'Southern District · Ap Lei Chau', title: 'From Main Street to the old pier',
      summary: 'A short lane once led to the waterfront. Neighbourhood memories trace how Ap Lei Chau’s transport and shoreline changed.',
      body: 'Urban Diary’s account of Ap Lei Chau draws on neighbourhood recollections. It describes London Lane as a former path to London Pier, used by passengers travelling across the harbour to the Aberdeen side. A small back lane offers a clue to an earlier network of water crossings.',
      note: 'This example draws on published community recollections. Historical maps are needed to check the pier location and walking route.',
      sourceLabel: 'Published community recollections', citation: 'Urban Diary · Ap Lei Chau: Island of Plenty'
    }
  }
];

export const copy = {
  zh: {
    skip: '跳至內容', navMap: '故事地圖', navStories: '故事檔案', navContribute: '分享線索', navAbout: '關於計劃',
    eyebrow: '香港社區文化地圖', headline: '在香港，\n尋一段地方故事。',
    intro: '從村校、老街到街坊熟悉的日常空間，沿着地圖閱讀香港的地方歷史與社區記憶。',
    explore: '探索故事地圖', edition: 'GEYS4010 · 小組原型', mapCaption: '香港 · 地區示意',
    nt: '新界', kowloon: '九龍', hk: '香港島', harbour: '維多利亞港',
    mapNote: '點選編號閱讀故事。標記只代表大致地區。', mapLimit: '僅供閱讀',
    archiveLabel: '地方誌 / 01', storiesTitle: '沿着地方，讀故事', storiesIntro: '三則公開資料示例，從檔案、地方研究和街坊口述出發。',
    search: '搜尋故事', placeholder: '地名、題材或關鍵字', filters: '故事分類', navLabel: '主要導覽',
    aboutLabel: '關於尋聖', aboutTitle: '地方由記憶留下來',
    aboutBody: '尋聖之旅是香港中文大學 GEYS4010 的小組計劃，關注香港較少被看見的地方文化。這項非宗教計劃以檔案和社區記憶互相參照，記下資料的出處與仍待核實的細節。',
    visit: '示例只供閱讀。實地導賞、拍攝及公開位置須先與相關社區和場地管理者商議。',
    contributeLabel: '社區參與', contributeTitle: '留下一條故事線索',
    contributeBody: '一段回憶、一張有權分享的舊相片，或一份可以查閱的資料，都可以成為故事的起點。請先略去個人資料及不宜公開的位置。',
    contributeStatus: '原型暫未開放收件。你可以下載空白模板，在自己的裝置上整理草稿。',
    download: '下載草稿模板', close: '關閉', all: '全部故事', school: '村校記憶', village: '村落與重建', waterfront: '水岸生活',
    read: '閱讀故事', source: '資料來源', note: '仍待核實', sample: '公開資料示例',
    count: count => count ? `顯示 ${count} 則故事` : '找不到相符的故事，試試其他關鍵字或分類。'
  },
  en: {
    skip: 'Skip to content', navMap: 'Story map', navStories: 'Archive', navContribute: 'Share a lead', navAbout: 'About the project',
    eyebrow: 'A COMMUNITY ATLAS OF HONG KONG', headline: 'Every place\nholds a story.',
    intro: 'Explore Hong Kong’s local history and community memories through village schools, old streets and familiar everyday places.',
    explore: 'Explore the story map', edition: 'GEYS4010 · GROUP PROTOTYPE', mapCaption: 'HONG KONG · SCHEMATIC',
    nt: 'New Territories', kowloon: 'Kowloon', hk: 'Hong Kong Island', harbour: 'Victoria Harbour',
    mapNote: 'Select a number to read its story. Markers show general areas.', mapLimit: 'NOT FOR NAVIGATION',
    archiveLabel: 'LOCAL RECORDS / 01', storiesTitle: 'Stories rooted in place', storiesIntro: 'Three examples from public records, local research and community accounts.',
    search: 'Search stories', placeholder: 'Place, theme or keyword', filters: 'Story categories', navLabel: 'Main navigation',
    aboutLabel: 'ABOUT SACRED JOURNEY', aboutTitle: 'Places live on in memory',
    aboutBody: 'Sacred Journey is a GEYS4010 group project at The Chinese University of Hong Kong. This nonreligious project explores overlooked local heritage by reading records alongside community memories and showing where each account comes from.',
    visit: 'These examples are for reading. Field visits, photography and publication of locations require discussion with the communities and site managers involved.',
    contributeLabel: 'COMMUNITY CONTRIBUTIONS', contributeTitle: 'Leave a trail to a story',
    contributeBody: 'A recollection, a photo you have permission to share, or a public record can start a story. Leave out personal details and sensitive locations.',
    contributeStatus: 'Submissions are currently closed. Download the blank template to prepare a draft on your device.',
    download: 'Download draft template', close: 'Close', all: 'All stories', school: 'Village schools', village: 'Villages & renewal', waterfront: 'Waterfront life',
    read: 'Read story', source: 'Source', note: 'What still needs checking', sample: 'Example from public sources',
    count: count => count ? `Showing ${count} ${count === 1 ? 'story' : 'stories'}` : 'No matching stories. Try another keyword or category.'
  }
};
