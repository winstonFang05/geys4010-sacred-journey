import { originalStories } from '../original-stories.js?v=20261119-original-stories';
export const stories = originalStories;

export const copy = {
  zh: {
    skip: '跳至內容', navMap: '故事地圖', navStories: '故事檔案', navContribute: '分享線索', navAbout: '關於計劃',
    eyebrow: '香港社區文化地圖', headline: '在香港，\n尋一段地方故事。',
    intro: '從村校、老街到街坊熟悉的日常空間，沿着地圖閱讀香港的地方歷史與社區記憶。',
    explore: '探索故事地圖', edition: '香港中文大學 · GEYS4010', mapCaption: '香港 · 故事地圖',
    nt: '新界', kowloon: '九龍', hk: '香港島', harbour: '維多利亞港',
    mapNote: '點選故事名稱閱讀；虛線標記為大致區域，並非精確舊址。', mapLimit: '列表亦可閱讀所有故事',
    archiveLabel: '地方誌 / 01', storiesTitle: '沿着地方，讀故事', storiesIntro: '從照片、地方研究與街坊回憶出發。',
    search: '搜尋故事', placeholder: '地名、題材或關鍵字', filters: '故事分類', navLabel: '主要導覽',
    aboutLabel: '關於尋聖', aboutTitle: '地方由記憶留下來',
    aboutBody: '尋聖之旅由香港中文大學 GEYS4010 學生策劃，透過照片、地方研究和社區記憶，帶你認識香港少有人留意的地方。',
    visit: '到訪時請留意場地的開放時間，並尊重當地居民的私隱。',
    contributeLabel: '社區參與', contributeTitle: '留下一條故事線索',
    contributeBody: '一段回憶、一張有權分享的舊相片，或一份可以查閱的資料，都可以成為故事的起點。請先略去個人資料及不宜公開的位置。',
    contributeStatus: '你可以下載一份線索記錄表，把故事留在自己的裝置。',
    download: '下載線索記錄表', close: '關閉', all: '全部故事', school: '村校記憶', village: '村落與重建', waterfront: '水岸生活',
    faith: '民間信仰', craft: '手藝與老店', infrastructure: '交通與設施',
    read: '閱讀故事', source: '資料來源',
    count: count => count ? `顯示 ${count} 則故事` : '找不到相符的故事，試試其他關鍵字或分類。'
  },
  en: {
    skip: 'Skip to content', navMap: 'Story map', navStories: 'Archive', navContribute: 'Share a lead', navAbout: 'About the project',
    eyebrow: 'A COMMUNITY ATLAS OF HONG KONG', headline: 'Every place\nholds a story.',
    intro: 'Explore Hong Kong’s local history and community memories through village schools, old streets and familiar everyday places.',
    explore: 'Explore the story map', edition: 'CUHK · GEYS4010', mapCaption: 'HONG KONG · STORY MAP',
    nt: 'New Territories', kowloon: 'Kowloon', hk: 'Hong Kong Island', harbour: 'Victoria Harbour',
    mapNote: 'Select a story to read. Dashed markers show approximate areas, not exact historic sites.', mapLimit: 'ALL STORIES IN THE LIST',
    archiveLabel: 'LOCAL RECORDS / 01', storiesTitle: 'Stories rooted in place', storiesIntro: 'Explore public records, local research and community memories.',
    search: 'Search stories', placeholder: 'Place, theme or keyword', filters: 'Story categories', navLabel: 'Main navigation',
    aboutLabel: 'ABOUT SACRED JOURNEY', aboutTitle: 'Places live on in memory',
    aboutBody: 'Sacred Journey is a student project at The Chinese University of Hong Kong. Photographs, local research and community memories offer a closer look at lesser-known places in Hong Kong.',
    visit: 'Check opening hours before visiting and respect the privacy of local residents.',
    contributeLabel: 'COMMUNITY CONTRIBUTIONS', contributeTitle: 'Leave a trail to a story',
    contributeBody: 'A recollection, a photo you have permission to share, or a public record can start a story. Leave out personal details and sensitive locations.',
    contributeStatus: 'Download a record sheet to save your story on your device.',
    download: 'Download record sheet', close: 'Close', all: 'All stories', school: 'Village schools', village: 'Villages & renewal', waterfront: 'Waterfront life',
    faith: 'Local beliefs', craft: 'Crafts & shops', infrastructure: 'Transport & infrastructure',
    read: 'Read story', source: 'Source',
    count: count => count ? `Showing ${count} ${count === 1 ? 'story' : 'stories'}` : 'No matching stories. Try another keyword or category.'
  }
};
