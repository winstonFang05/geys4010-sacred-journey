// Public destinations keyed by story ID. Map markers are maintained separately.
// A reference is a public arrival point near a story location. An organised visit
// uses the venue or meeting point specified by the operator for its participants.
export const accessPointsByStoryId = {
  'tin-chun': {
    kind: 'reference',
    name: { zh: '打鼓嶺社區會堂', en: 'Ta Kwu Ling Community Hall' },
    address: { zh: '打鼓嶺坪輋路136號', en: '136 Ping Che Road, Ta Kwu Ling' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://tel.directory.gov.hk/0253000185_CHI.html',
      'https://www.cie.hkbu.edu.hk/the-punctum/blog/2026/06/24/in-search-of-tin-chun-kindergarten-a-trilogy-by-dr-miriam-lau-division-of-arts-and-languages/',
    ],
  },
  'ngau-chi-wan': {
    kind: 'reference',
    name: { zh: '牛池灣街市', en: 'Ngau Chi Wan Market' },
    address: { zh: '牛池灣清水灣道11號', en: '11 Clear Water Bay Road, Ngau Chi Wan' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.fehd.gov.hk/tc_chi/pleasant_environment/tidy_market/Markets_CFS_cp_list/WTS.html',
      'https://neihou.app/zh-Hant/place/ngau-chi-wan-market/',
    ],
  },
  'ap-lei-chau': {
    kind: 'reference',
    name: { zh: '鴨脷洲海濱長廊', en: 'Ap Lei Chau Waterfront Promenade' },
    address: { zh: '鴨脷洲大街海旁', en: 'Main Street, Ap Lei Chau' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.map.gov.hk/mapviewer/map.do?catabbr=PARKS&cluster=true&lg=tc&num=true&results=true',
      'https://www.urbandiarist.com/tc/story/Ap-Lei-Chau--Island-of-Plenty',
    ],
  },
  'koon-chun': {
    kind: 'organised-visit',
    name: { zh: '冠珍醬園元朗廠房', en: 'Koon Chun Soy and Sauce Factory' },
    address: { zh: '元朗凹頭青山公路潭尾段，107約1910地段', en: 'Lot 1910, D.D. 107, Castle Peak Road – Tam Mi, Au Tau, Yuen Long' },
    visitNote: { zh: '請先向醬園確認是否有參觀活動及集合安排。', en: 'Confirm tour availability and arrival arrangements with the factory first.' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.koonchun.com.hk/contact-us',
      'https://www.hyd.gov.hk/tc/our_projects/railway_projects/nol/land_departure_plans/main_line/plans/NOL-L02_20250929-AUT.pdf',
    ],
  },
  'yi-o': {
    kind: 'organised-visit',
    name: { zh: '二澳農作社', en: 'Yi O Agricultural Cooperation' },
    address: { zh: '大嶼山二澳', en: 'Yi O, Lantau Island' },
    coordinates: { lat: 22.225833, lng: 113.847222 },
    visitNote: { zh: '從大澳可接鳳凰徑第七段步行。參加農事活動請先向農作社預約，並以主辦方通知的集合點為準。', en: 'From Tai O, the operator lists a walking route via Lantau Trail Section 7. Book farm activities in advance and follow the operator’s meeting instructions.' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.afcd.gov.hk/english/agriculture/LF/files/List_Agri_enJoy_Scheme_23032026.pdf',
      'https://yio.com.hk/Contact/',
      'https://www.yio.com.hk/Activities4/',
    ],
  },
  'seven-sisters': {
    kind: 'entrance',
    name: { zh: '坪洲仙姊廟', en: 'Seven Sisters Temple' },
    address: { zh: '坪洲北灣坪利路', en: 'Peng Lei Road, Pak Wan, Peng Chau' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.discoverhongkong.com/eng/place-to-go/travel.guide-seven-sisters-temple.html',
    ],
  },
  'cham-shan': {
    kind: 'entrance',
    name: { zh: '清水灣湛山寺', en: 'Cham Shan Monastery, Clear Water Bay' },
    address: { zh: '西貢清水灣龍蝦灣路18號', en: '18 Lung Ha Wan Road, Clear Water Bay, Sai Kung' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.buddhisthk.org/zh-hant/directory/dir_xNiuneSvfIPE0ioTbgWUKR9wSJFZrGEe',
      'https://www.lcsd.gov.hk/tc/healthy/hiking/map/map_b9.html',
    ],
  },
  'yuen-yuen': {
    kind: 'entrance',
    name: { zh: '圓玄學院', en: 'Yuen Yuen Institute' },
    address: { zh: '荃灣老圍路', en: 'Lo Wai Road, Tsuen Wan' },
    verifiedAt: '2026-11-19',
    sources: ['https://fpf.ccidahk.gov.hk/tc/location/detail.php?id=154'],
  },
  'fung-ying': {
    kind: 'entrance',
    name: { zh: '蓬瀛仙館', en: 'Fung Ying Seen Koon' },
    address: { zh: '粉嶺百和路66號', en: '66 Pak Wo Road, Fanling' },
    verifiedAt: '2026-11-19',
    sources: ['https://www.fysk.org/location/'],
  },
  'shrimp-sauce': {
    kind: 'storefront',
    name: { zh: '鄭祥興蝦醬廠', en: 'Cheng Cheung Hing Shrimp Sauce Factory' },
    address: { zh: '大澳石仔埗街17號A', en: '17A Shek Tsai Po Street, Tai O' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://hkhistoricalshops.com/2020/08/03/%E9%84%AD%E7%A5%A5%E8%88%88%E8%9D%A6%E9%86%AC%E5%BB%A0-cheng-cheung-hing-shrimp-sauce-factory/',
    ],
  },
  'kwok-kam-kee': {
    kind: 'storefront',
    name: { zh: '郭錦記餅店', en: 'Kwok Kam Kee Bakery' },
    address: { zh: '長洲北社街46號地舖', en: 'G/F, 46 Pak She Street, Cheung Chau' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://cake852.com/shop/view.php?sid=1409',
      'https://www.edining.hk/search3.php?aim=&cat=&district=%E9%95%B7%E6%B4%B2',
    ],
  },
  'sing-hing': {
    kind: 'storefront',
    name: { zh: '勝興茶室', en: 'Sing Hing Tea House' },
    address: { zh: '坪洲永安街26號地舖', en: 'G/F, 26 Wing On Street, Peng Chau' },
    verifiedAt: '2026-11-19',
    sources: ['https://hk.ulifestyle.com.hk/activity/detail/20092091'],
  },
  'sam-shing': {
    kind: 'site',
    name: { zh: '麒麟崗公眾公園', en: 'Kei Lun Kong Public Park' },
    address: { zh: '屯門青山公路青山灣段，三聖邨對面', en: 'Castle Peak Road – Castle Peak Bay, opposite Sam Shing Estate, Tuen Mun' },
    visitNote: { zh: '界石位於公園內、三聖廟旁。', en: 'The shoreline marker is inside the park beside Sam Shing Temple.' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.lcsd.gov.hk/clpss/tc/webApp/Facility/Details.do?did=14&fcid=&ftid=165',
      'https://www.gohk.gov.hk/tc/spots/spot_detail.php?spot=Sam+Shing+Hui',
    ],
  },
  'dragon-boat': {
    kind: 'organised-visit',
    name: { zh: '中國香港龍舟總會石門訓練中心', en: 'Hong Kong China Dragon Boat Association Shek Mun Training Centre' },
    address: { zh: '沙田石門安景街51E地段，近碧濤花園三期', en: 'Lot 51E, On King Street, Shek Mun, Sha Tin, near Pictorial Garden Phase 3' },
    visitNote: { zh: '參加訓練或活動前，請向龍舟總會確認安排。', en: 'Confirm arrangements with the association before attending training or an event.' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://hkcdba.org/%E5%A0%B4%E5%9C%B0%E8%B3%87%E6%96%99',
      'https://www.lcsd.gov.hk/tc/ssp/form/2026_app_guide/pamphlets/dragon.pdf',
    ],
  },
  'beacon-hill': {
    kind: 'reference',
    name: { zh: '港鐵顯徑站', en: 'Hin Keng MTR Station' },
    address: { zh: '沙田大圍車公廟路', en: 'Che Kung Miu Road, Tai Wai, Sha Tin' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.mtr.com.hk/alert/AltTrans/leaflet/HIK.pdf',
      'https://www.emsd.gov.hk/filemanager/tc/content_286/CoP_gas_pipes_2nd_%28Chi%29.pdf',
    ],
  },
  'hau-wong': {
    kind: 'reference',
    name: { zh: '大圍村積存圍圍門', en: 'Chik Chuen Wai Entrance Gate' },
    address: { zh: '沙田大圍積福街', en: 'Chik Fuk Street, Tai Wai, Sha Tin' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://had18.huluhk.org/article-detail.php?id=192',
      'https://cache.org.hk/blog/heritage100_058/',
    ],
  },
  'shun-fung': {
    kind: 'reference',
    name: { zh: '輕鐵藍地站', en: 'Lam Tei Light Rail Stop' },
    address: { zh: '屯門青山公路藍地段', en: 'Castle Peak Road – Lam Tei, Tuen Mun' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.mtr.com.hk/archive/ch/services/LR_routemap.pdf',
      'https://www.aab.gov.hk/filemanager/aab/common/historicbuilding/en/1262_Appraisal_En.pdf',
    ],
  },
  'ng-kwai': {
    kind: 'reference',
    name: { zh: '屏山鄧族文物館暨文物徑訪客中心', en: 'Ping Shan Tang Clan Gallery cum Heritage Trail Visitors Centre' },
    address: { zh: '元朗屏山坑頭村', en: 'Hang Tau Tsuen, Ping Shan, Yuen Long' },
    verifiedAt: '2026-11-19',
    sources: ['https://www.amo.gov.hk/tc/visitor-centre/pingshan/index.html'],
  },
  'hang-tau-55': {
    kind: 'reference',
    name: { zh: '屏山鄧族文物館暨文物徑訪客中心', en: 'Ping Shan Tang Clan Gallery cum Heritage Trail Visitors Centre' },
    address: { zh: '元朗屏山坑頭村', en: 'Hang Tau Tsuen, Ping Shan, Yuen Long' },
    verifiedAt: '2026-11-19',
    sources: ['https://www.amo.gov.hk/tc/visitor-centre/pingshan/index.html'],
  },
  'sin-hing': {
    kind: 'reference',
    name: { zh: '泰亨鄉公所小巴站', en: 'Tai Hang Rural Committee minibus stop' },
    address: { zh: '大埔泰亨通路', en: 'Tai Hang Access Road, Tai Po' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://h2-app-rr.hkemobility.gov.hk/ris_page/get_gmb_detail.php?lang=TC&route_id=2004070',
      'https://gmb.hk/route/NT/25A/1',
    ],
  },
  'mak-hall': {
    kind: 'reference',
    name: { zh: '泮涌公廁', en: 'Pan Chung Public Toilet' },
    address: { zh: '大埔泮涌村', en: 'Pan Chung Village, Tai Po' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.fehd.gov.hk/tc_chi/map/toilet/toilet_pt.html?mapID=837&type=toilet',
      'https://www.fehd.gov.hk/tc_chi/pleasant_environment/cleansing/list_of_public_toilets.html',
    ],
  },
  'lau-hall': {
    kind: 'reference',
    name: { zh: '蓮麻坑村小巴總站', en: 'Lin Ma Hang Village minibus terminus' },
    address: { zh: '打鼓嶺蓮麻坑村', en: 'Lin Ma Hang Village, Ta Kwu Ling' },
    travelMode: 'transit',
    visitNote: { zh: '無禁區通行證的訪客可由上水站乘 59K 專線小巴進村。指定禁區路段的豁免適用於這條小巴路線的乘客。', en: 'Visitors without a closed-area permit can take green minibus 59K from Sheung Shui Station. The exemption on the designated restricted road applies to passengers on that route.' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.info.gov.hk/gia/general/202501/24/P2025012300479.htm',
      'https://www.hiking.gov.hk/trail/info/id/UFNRbC8yekNibFVpdWN5eW5XZ2c0Zz09',
    ],
  },
  'tse-hall': {
    kind: 'reference',
    name: { zh: '甲邊朗新村小巴站', en: 'Kap Pin Long San Tsuen minibus stop' },
    address: { zh: '西貢菠蘿輋路', en: 'Po Lo Che Road, Sai Kung' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://h2-app-rr.hkemobility.gov.hk/ris_page/get_gmb_detail.php?lang=TC&route_id=2009015',
      'https://16seats.net/chi/gmb/gn_3a.html',
    ],
  },
};
