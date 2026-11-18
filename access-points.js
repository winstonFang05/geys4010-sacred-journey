// Public destinations keyed by story ID. Map markers are maintained separately.
export const accessPointsByStoryId = {
  'seven-sisters': {
    kind: 'entrance',
    name: { zh: '坪洲仙姊廟', en: 'Seven Sisters Temple' },
    address: { zh: '坪洲北灣坪利路', en: 'Peng Lei Road, Pak Wan, Peng Chau' },
    verifiedAt: '2026-11-19',
    sources: [
      'https://www.discoverhongkong.com/eng/place-to-go/travel.guide-seven-sisters-temple.html',
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
};
