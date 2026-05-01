const CATEGORY_QUERY_WORDS = {
  cpu: "desktop processor CPU boxed",
  gpu: "desktop graphics card GPU",
  motherboard: "desktop gaming motherboard",
  ram: "desktop DDR4 DDR5 memory kit",
  storage: "internal NVMe SSD hard drive",
  psu: "desktop PC power supply PSU",
  case: "desktop PC case ATX chassis",
  cooler: "CPU cooler AIO air cooler"
};

const CATEGORY_LABELS = {
  cpu: "CPU",
  gpu: "GPU",
  motherboard: "Motherboard",
  ram: "RAM",
  storage: "Storage",
  psu: "PSU",
  case: "Case",
  cooler: "Cooler"
};

const BRAND_CATALOG = {
  cpu: [
    ["AMD", ["amd", "ryzen"]],
    ["Intel", ["intel", "core ultra", "core i3", "core i5", "core i7", "core i9"]]
  ],
  gpu: [
    ["ASUS", ["asus", "rog", "tuf"]],
    ["MSI", ["msi"]],
    ["Gigabyte", ["gigabyte", "aorus"]],
    ["PNY", ["pny"]],
    ["Zotac", ["zotac"]],
    ["Sapphire", ["sapphire"]],
    ["PowerColor", ["powercolor", "power color"]],
    ["XFX", ["xfx"]],
    ["ASRock", ["asrock"]],
    ["Acer", ["acer"]],
    ["Galax", ["galax"]],
    ["Palit", ["palit"]],
    ["NVIDIA", ["nvidia", "geforce", "rtx", "gtx"]],
    ["AMD", ["amd", "radeon", "rx 6", "rx 7", "rx 9"]]
  ],
  motherboard: [
    ["ASUS", ["asus", "rog", "tuf"]],
    ["MSI", ["msi"]],
    ["Gigabyte", ["gigabyte", "aorus"]],
    ["ASRock", ["asrock"]],
    ["EVGA", ["evga"]],
    ["NZXT", ["nzxt"]],
    ["Biostar", ["biostar"]]
  ],
  ram: [
    ["Corsair", ["corsair", "vengeance", "dominator"]],
    ["G.Skill", ["g.skill", "g skill", "trident", "ripjaws"]],
    ["Kingston", ["kingston", "fury"]],
    ["Crucial", ["crucial", "ballistix"]],
    ["Teamgroup", ["teamgroup", "team group", "t-force"]],
    ["Patriot", ["patriot", "viper"]],
    ["PNY", ["pny"]],
    ["ADATA", ["adata", "xpg"]],
    ["Lexar", ["lexar"]],
    ["Mushkin", ["mushkin"]],
    ["Silicon Power", ["silicon power"]]
  ],
  storage: [
    ["Samsung", ["samsung"]],
    ["Western Digital", ["western digital", "wd ", "wd_", "wd-"]],
    ["Crucial", ["crucial"]],
    ["Kingston", ["kingston"]],
    ["Seagate", ["seagate", "firecuda", "barracuda"]],
    ["Solidigm", ["solidigm"]],
    ["Sabrent", ["sabrent", "rocket"]],
    ["SK hynix", ["sk hynix", "hynix", "platinum p41"]],
    ["Lexar", ["lexar"]],
    ["Corsair", ["corsair", "mp600", "mp700"]],
    ["Teamgroup", ["teamgroup", "team group"]],
    ["ADATA", ["adata", "xpg"]],
    ["PNY", ["pny"]],
    ["SanDisk", ["sandisk"]],
    ["Inland", ["inland"]]
  ],
  psu: [
    ["Corsair", ["corsair", "rm", "hx", "ax"]],
    ["Seasonic", ["seasonic", "focus", "prime"]],
    ["EVGA", ["evga"]],
    ["be quiet!", ["be quiet"]],
    ["Thermaltake", ["thermaltake", "toughpower"]],
    ["Cooler Master", ["cooler master", "mwe"]],
    ["MSI", ["msi", "mag a", "mpg a"]],
    ["ASUS", ["asus", "rog", "tuf"]],
    ["SilverStone", ["silverstone"]],
    ["Super Flower", ["super flower", "leadex"]],
    ["FSP", ["fsp"]],
    ["NZXT", ["nzxt"]],
    ["Lian Li", ["lian li"]],
    ["Antec", ["antec"]]
  ],
  case: [
    ["Corsair", ["corsair"]],
    ["NZXT", ["nzxt"]],
    ["Lian Li", ["lian li", "o11", "lancool"]],
    ["Fractal Design", ["fractal", "fractal design"]],
    ["Phanteks", ["phanteks"]],
    ["Cooler Master", ["cooler master"]],
    ["Thermaltake", ["thermaltake"]],
    ["be quiet!", ["be quiet"]],
    ["Hyte", ["hyte"]],
    ["Montech", ["montech"]],
    ["DeepCool", ["deepcool", "deep cool"]],
    ["Antec", ["antec"]],
    ["SilverStone", ["silverstone"]],
    ["ASUS", ["asus", "rog", "tuf"]],
    ["MSI", ["msi"]]
  ],
  cooler: [
    ["Noctua", ["noctua", "nh-d"]],
    ["Cooler Master", ["cooler master", "hyper", "masterliquid"]],
    ["Corsair", ["corsair", "icue", "h100", "h150"]],
    ["NZXT", ["nzxt", "kraken"]],
    ["Arctic", ["arctic", "liquid freezer", "freezer"]],
    ["be quiet!", ["be quiet", "dark rock", "pure rock"]],
    ["Thermaltake", ["thermaltake"]],
    ["Lian Li", ["lian li", "galahad"]],
    ["DeepCool", ["deepcool", "deep cool", "ak620", "ls720"]],
    ["EK", ["ek ", "ek-", "ekwb"]],
    ["MSI", ["msi", "mag coreliquid"]],
    ["ASUS", ["asus", "rog", "tuf", "ryujin", "ryuo"]],
    ["ID-COOLING", ["id-cooling", "id cooling"]],
    ["Scythe", ["scythe"]],
    ["Thermalright", ["thermalright", "peerless assassin", "phantom spirit"]]
  ]
};

const TRUSTED_RETAILERS = [
  ["Amazon", ["amazon.com", "amazon"]],
  ["Newegg", ["newegg.com", "newegg"]],
  ["Best Buy", ["bestbuy.com", "best buy"]],
  ["B&H", ["bhphotovideo.com", "b&h", "b and h"]],
  ["Micro Center", ["microcenter.com", "micro center"]],
  ["Walmart", ["walmart.com", "walmart"]],
  ["Adorama", ["adorama.com", "adorama"]],
  ["Antonline", ["antonline.com", "antonline"]],
  ["Dell", ["dell.com", "dell"]],
  ["HP", ["hp.com", "hp"]],
  ["Lenovo", ["lenovo.com", "lenovo"]],
  ["Corsair", ["corsair.com", "corsair"]],
  ["ASUS", ["asus.com", "asus"]],
  ["MSI", ["msi.com", "msi"]],
  ["NVIDIA", ["nvidia.com", "nvidia"]],
  ["AMD", ["amd.com", "amd"]],
  ["Intel", ["intel.com", "intel"]],
  ["Samsung", ["samsung.com", "samsung"]],
  ["Western Digital", ["westerndigital.com", "western digital"]],
  ["Crucial", ["crucial.com", "crucial"]]
];

const BLOCKED_SOURCE_WORDS = [
  "ebay",
  "mercari",
  "offerup",
  "facebook marketplace",
  "craigslist",
  "aliexpress",
  "temu",
  "wish",
  "dhgate",
  "poshmark",
  "etsy",
  "stockx"
];

const BAD_TITLE_PHRASES = [
  "box only",
  "empty box",
  "read description",
  "for parts",
  "parts only",
  "not working",
  "broken",
  "damaged",
  "repair",
  "replacement",
  "fan only",
  "heatsink only",
  "bracket",
  "mounting kit only",
  "backplate only",
  "water block",
  "waterblock",
  "shroud",
  "screws",
  "cable only",
  "adapter only",
  "manual only",
  "sticker",
  "skin decal",
  "mining rig",
  "mined",
  "bulk lot",
  "lot of"
];

const CONDITION_BAD_WORDS = ["used", "pre owned", "pre-owned", "renewed", "refurbished", "remanufactured"];
const cache = new Map();
const CACHE_TIME_MS = 1000 * 60 * 60 * 6;

function cleanString(value) {
  return String(value || "").trim();
}

function getNumber(value) {
  if (typeof value === "number") return value;
  const parsed = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeQuery(value) {
  return cleanString(value)
    .toLowerCase()
    .replace(/[$,]/g, "")
    .replace(/[^a-z0-9.\s/+!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textHasWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return new RegExp("(^|[^a-z0-9])" + escaped + "([^a-z0-9]|$)", "i").test(text);
}

function getBrandsForCategory(category) {
  return BRAND_CATALOG[category] || [];
}

function getBrandNames(category) {
  return getBrandsForCategory(category).map(([name]) => name).sort((a, b) => a.localeCompare(b));
}

function getBrandFromTitle(title, category) {
  const t = " " + normalizeQuery(title) + " ";
  const candidates = [
    ...getBrandsForCategory(category),
    ...Object.values(BRAND_CATALOG).flat()
  ];

  const found = candidates.find(([, aliases]) => {
    return aliases.some((alias) => textHasWord(t, normalizeQuery(alias)));
  });

  return found ? found[0] : "Unknown";
}

function productMatchesBrandFilter(product, category, brand) {
  const wanted = cleanString(brand);
  if (!wanted || wanted === "all") return true;

  const text = normalizeQuery([
    product.name,
    product.title,
    product.brand,
    product.snippet,
    product.generation,
    product.tier
  ].filter(Boolean).join(" "));

  if (normalizeQuery(product.brand) === normalizeQuery(wanted)) return true;

  const knownBrand = getBrandsForCategory(category).find(([name]) => {
    return name.toLowerCase() === wanted.toLowerCase();
  });

  const aliases = knownBrand ? knownBrand[1] : [wanted];
  if (aliases.some((alias) => textHasWord(text, normalizeQuery(alias)))) return true;

  if (category === "gpu" && wanted.toLowerCase() === "nvidia") {
    return /\b(rtx|gtx|geforce)\b/.test(text);
  }

  if (category === "gpu" && wanted.toLowerCase() === "amd") {
    return /\b(radeon|rx\s?[679]\d{3})\b/.test(text);
  }

  if (category === "cpu" && wanted.toLowerCase() === "amd") {
    return /\b(ryzen|x3d)\b/.test(text);
  }

  if (category === "cpu" && wanted.toLowerCase() === "intel") {
    return /\b(intel|core\s?(ultra|i[3579])|i[3579][-\s]?\d{4,5})\b/.test(text);
  }

  return false;
}

function getSmartMinimumPrice(category, query) {
  const q = normalizeQuery(query);

  if (category === "gpu") {
    if (q.includes("5090")) return 1400;
    if (q.includes("5080") || q.includes("4090")) return 850;
    if (q.includes("5070") || q.includes("4080")) return 450;
    if (q.includes("4070") || q.includes("7900")) return 300;
    if (q.includes("4060") || q.includes("7800") || q.includes("7700")) return 180;
    if (q.includes("7600") || q.includes("6600")) return 120;
    return 100;
  }

  if (category === "cpu") {
    if (q.includes("9950") || q.includes("9900") || q.includes("14900") || q.includes("285k")) return 300;
    if (q.includes("9800x3d") || q.includes("7800x3d")) return 250;
    if (q.includes("9700") || q.includes("7900") || q.includes("14700")) return 190;
    if (q.includes("9600") || q.includes("7600") || q.includes("14600") || q.includes("13600")) return 120;
    return 55;
  }

  const defaults = { motherboard: 55, ram: 25, storage: 25, psu: 35, case: 35, cooler: 20 };
  return defaults[category] || 10;
}

function getSmartMaximumPrice(category, query) {
  const q = normalizeQuery(query);

  if (category === "gpu") {
    if (q.includes("5090")) return 5000;
    if (q.includes("5080") || q.includes("4090")) return 3500;
    if (q.includes("5070") || q.includes("4080")) return 2500;
    if (q.includes("4060")) return 900;
    return 5000;
  }

  const defaults = { cpu: 1600, motherboard: 1400, ram: 900, storage: 1400, psu: 900, case: 900, cooler: 800 };
  return defaults[category] || 5000;
}

function getSourceText(product) {
  const explicitSource = [
    product.source,
    product.seller,
    product.merchant
  ].filter(Boolean).join(" ");

  if (explicitSource) {
    return normalizeQuery(explicitSource);
  }

  return normalizeQuery([
    product.link,
    product.product_link
  ].filter(Boolean).join(" "));
}

function getTrustedRetailer(product) {
  const sourceText = getSourceText(product);

  return TRUSTED_RETAILERS.find(([, aliases]) => {
    return aliases.some((alias) => sourceText.includes(normalizeQuery(alias)));
  });
}

function retailerMatchesFilter(product, retailer) {
  const wanted = cleanString(retailer);
  if (!wanted || wanted === "all" || wanted === "trusted") return true;

  const sourceText = getSourceText(product);
  const knownRetailer = TRUSTED_RETAILERS.find(([name]) => {
    return name.toLowerCase() === wanted.toLowerCase();
  });

  const aliases = knownRetailer ? knownRetailer[1] : [wanted];
  return aliases.some((alias) => sourceText.includes(normalizeQuery(alias)));
}

function getSourceName(product) {
  const trusted = getTrustedRetailer(product);
  return trusted ? trusted[0] : cleanString(product.source || product.seller || "Online Store");
}

function hasBlockedSource(product) {
  const sourceText = getSourceText(product);
  return BLOCKED_SOURCE_WORDS.some((word) => sourceText.includes(word));
}

function titleHasBadWords(title) {
  const t = normalizeQuery(title);
  return BAD_TITLE_PHRASES.some((phrase) => t.includes(phrase));
}

function getCondition(product, title) {
  const conditionText = normalizeQuery([
    product.condition,
    product.second_hand_condition,
    product.snippet,
    title
  ].filter(Boolean).join(" "));

  if (conditionText.includes("open box") || conditionText.includes("open-box")) return "Open Box";
  if (CONDITION_BAD_WORDS.some((word) => conditionText.includes(word))) return "Used/Refurbished";
  return "New";
}

function isConditionAllowed(product, title, mode) {
  const condition = getCondition(product, title);
  if (condition === "Used/Refurbished") return false;
  if (condition === "Open Box" && mode !== "all") return false;
  return true;
}

function titleMatchesCategory(title, category) {
  const t = normalizeQuery(title);

  if (t.includes("laptop") || t.includes("notebook") || t.includes("chromebook")) {
    return false;
  }

  if (category === "gpu") {
    const isGpu =
      t.includes("graphics card") ||
      t.includes("video card") ||
      t.includes("geforce") ||
      t.includes("radeon") ||
      t.includes("intel arc") ||
      /\brtx\s?\d{4}\b/.test(t) ||
      /\brx\s?\d{4}\b/.test(t) ||
      /\barc\s?[ab]\d{3}\b/.test(t);

    const badGpu =
      t.includes("quadro") ||
      t.includes("tesla") ||
      t.includes("radeon hd") ||
      t.includes("gt 1030") ||
      t.includes("gtx 1050") ||
      t.includes("gtx 1060") ||
      t.includes("gtx 970") ||
      t.includes("gtx 980") ||
      t.includes("rx 560") ||
      t.includes("rx 570") ||
      t.includes("rx 580");

    return isGpu && !badGpu;
  }

  if (category === "cpu") {
    if (t.includes("cooler") || t.includes("fan") || t.includes("heatsink")) return false;

    const isCpu =
      t.includes("processor") ||
      t.includes("cpu") ||
      t.includes("ryzen") ||
      t.includes("intel core") ||
      t.includes("core ultra") ||
      /\bi[3579][-\s]?\d{4,5}[a-z]*\b/.test(t);

    const oldCpu = t.includes("fx-") || t.includes("xeon") || /\bi[3579][-\s]?[234567]\d{3}\b/.test(t);
    return isCpu && !oldCpu;
  }

  if (category === "motherboard") {
    return (
      t.includes("motherboard") ||
      t.includes("mainboard") ||
      /\b(a620|b550|b650|b760|b850|b860|x570|x670|x870|z690|z790|z890)\b/.test(t)
    );
  }

  if (category === "ram") {
    if (t.includes("sodimm") || t.includes("so-dimm") || t.includes("laptop memory")) return false;
    return t.includes("ram") || t.includes("memory") || t.includes("ddr4") || t.includes("ddr5");
  }

  if (category === "storage") {
    if (t.includes("external") || t.includes("enclosure") || t.includes("usb drive") || t.includes("sd card")) return false;
    return t.includes("ssd") || t.includes("nvme") || t.includes("m.2") || t.includes("hard drive") || t.includes("hdd");
  }

  if (category === "psu") {
    if (t.includes("laptop charger") || t.includes("adapter")) return false;
    return t.includes("power supply") || t.includes("psu") || /\b\d{3,4}w\b/.test(t);
  }

  if (category === "case") {
    if (t.includes("phone case") || t.includes("carry case") || t.includes("drive case") || t.includes("enclosure")) return false;
    return t.includes("pc case") || t.includes("computer case") || t.includes("tower") || t.includes("chassis");
  }

  if (category === "cooler") {
    const isCooler =
      t.includes("cpu cooler") ||
      t.includes("aio") ||
      t.includes("liquid cooling") ||
      t.includes("liquid cooler") ||
      t.includes("air cooler") ||
      t.includes("tower cooler") ||
      t.includes("360mm") ||
      t.includes("280mm") ||
      t.includes("240mm");

    const badCooler =
      t.includes("gpu cooler") ||
      t.includes("laptop cooler") ||
      t.includes("cooling pad") ||
      t.includes("case fan") ||
      t.includes("fan pack");

    return isCooler && !badCooler;
  }

  return true;
}

function productMatchesPlatform(product, platform) {
  const wanted = normalizeQuery(platform);
  if (!wanted || wanted === "all") return true;

  const text = normalizeQuery([
    product.title,
    product.name,
    product.snippet,
    product.extensions && product.extensions.join(" ")
  ].filter(Boolean).join(" "));

  if (wanted === "16gb+") return /\b(16|20|24|32|48)gb\b/.test(text);
  if (wanted === "12gb+") return /\b(12|16|20|24|32|48)gb\b/.test(text);
  if (wanted === "850w+") return /\b(850|900|1000|1200|1300|1500)w\b/.test(text);
  if (wanted === "750w+") return /\b(750|850|900|1000|1200|1300|1500)w\b/.test(text);
  if (wanted === "rtx 50") return /\brtx\s?50\d{2}\b/.test(text);
  if (wanted === "rtx 40") return /\brtx\s?40\d{2}\b/.test(text);
  if (wanted === "rx 9000") return /\brx\s?9\d{3}\b/.test(text);
  if (wanted === "rx 7000") return /\brx\s?7\d{3}\b/.test(text);
  if (wanted === "rx 6000") return /\brx\s?6\d{3}\b/.test(text);

  return text.includes(wanted);
}

function getShoppingQualityScore(product) {
  const rating = getNumber(product.rating);
  const reviews = getNumber(product.reviews);
  let score = 50;

  if (rating >= 4.8) score += 20;
  else if (rating >= 4.5) score += 16;
  else if (rating >= 4.2) score += 11;
  else if (rating >= 4.0) score += 7;

  if (reviews >= 2000) score += 12;
  else if (reviews >= 500) score += 9;
  else if (reviews >= 100) score += 6;
  else if (reviews >= 20) score += 3;

  return Math.max(35, Math.min(100, Math.round(score)));
}

function getHardwarePerformanceProfile(title, category) {
  const t = normalizeQuery(title);
  const profile = { score: 60, wattage: 0, tier: "Mainstream", vram: "", generation: "", notes: "" };

  if (category === "gpu") {
    const rules = [
      [["rtx 5090"], 100, 575, "Extreme 4K", "32GB", "RTX 50"],
      [["rtx 5080"], 98, 360, "Elite 4K", "16GB", "RTX 50"],
      [["rtx 5070 ti"], 94, 300, "Elite 1440p", "16GB", "RTX 50"],
      [["rtx 5070"], 91, 250, "High 1440p", "12GB+", "RTX 50"],
      [["rtx 4090"], 100, 450, "Extreme 4K", "24GB", "RTX 40"],
      [["rtx 4080 super", "rtx 4080"], 96, 320, "Elite 4K", "16GB", "RTX 40"],
      [["rtx 4070 ti super"], 94, 285, "Elite 1440p", "16GB", "RTX 40"],
      [["rtx 4070 ti"], 92, 285, "Elite 1440p", "12GB", "RTX 40"],
      [["rtx 4070 super"], 90, 220, "High 1440p", "12GB", "RTX 40"],
      [["rtx 4070"], 87, 200, "High 1440p", "12GB", "RTX 40"],
      [["rtx 4060 ti"], 78, 160, "1080p High", "8GB / 16GB", "RTX 40"],
      [["rtx 4060"], 72, 115, "1080p", "8GB", "RTX 40"],
      [["rx 9070 xt"], 94, 304, "Elite 1440p", "16GB", "RX 9000"],
      [["rx 9070"], 91, 220, "High 1440p", "16GB", "RX 9000"],
      [["rx 7900 xtx"], 96, 355, "Elite 4K", "24GB", "RX 7000"],
      [["rx 7900 xt"], 93, 315, "Elite 1440p", "20GB", "RX 7000"],
      [["rx 7800 xt"], 88, 263, "High 1440p", "16GB", "RX 7000"],
      [["rx 7700 xt"], 83, 245, "1440p", "12GB", "RX 7000"],
      [["rx 7600 xt"], 73, 165, "1080p", "16GB", "RX 7000"],
      [["rx 7600"], 69, 165, "1080p Budget", "8GB", "RX 7000"],
      [["arc b580"], 75, 190, "1080p High", "12GB", "Intel Arc"],
      [["arc a770"], 73, 225, "1080p High", "16GB", "Intel Arc"]
    ];

    const found = rules.find(([matches]) => matches.some((word) => t.includes(word)));
    if (!found) return { ...profile, score: 58, wattage: 175, tier: "Unknown GPU", notes: "Estimated GPU tier" };
    return { ...profile, score: found[1], wattage: found[2], tier: found[3], vram: found[4], generation: found[5], notes: "Estimated GPU gaming tier" };
  }

  if (category === "cpu") {
    const rules = [
      [["9950x3d"], 100, 170, "Elite X3D", "Ryzen 9000"],
      [["9800x3d"], 100, 120, "Elite Gaming X3D", "Ryzen 9000"],
      [["9950x"], 96, 170, "Elite Ryzen", "Ryzen 9000"],
      [["9900x"], 93, 120, "High Ryzen", "Ryzen 9000"],
      [["9700x"], 89, 65, "Gaming Ryzen", "Ryzen 9000"],
      [["9600x"], 83, 65, "Modern Ryzen", "Ryzen 9000"],
      [["7950x3d"], 99, 120, "Elite X3D", "Ryzen 7000"],
      [["7800x3d"], 98, 120, "Elite Gaming X3D", "Ryzen 7000"],
      [["7950x"], 94, 170, "Elite Ryzen", "Ryzen 7000"],
      [["7900x"], 91, 170, "High Ryzen", "Ryzen 7000"],
      [["7700x", "7700"], 85, 105, "Gaming Ryzen", "Ryzen 7000"],
      [["7600x", "7600"], 80, 105, "Modern Ryzen", "Ryzen 7000"],
      [["285k"], 98, 250, "Elite Intel", "Core Ultra"],
      [["265k"], 94, 250, "High Intel", "Core Ultra"],
      [["245k"], 88, 159, "Gaming Intel", "Core Ultra"],
      [["14900k", "14900kf"], 98, 253, "Elite Intel", "Intel 14th Gen"],
      [["14700k", "14700kf"], 94, 253, "High Intel", "Intel 14th Gen"],
      [["14600k", "14600kf"], 88, 181, "Gaming Intel", "Intel 14th Gen"],
      [["13900k", "13900kf"], 96, 253, "Elite Intel", "Intel 13th Gen"],
      [["13700k", "13700kf"], 92, 253, "High Intel", "Intel 13th Gen"],
      [["13600k", "13600kf"], 87, 181, "Gaming Intel", "Intel 13th Gen"]
    ];

    const found = rules.find(([matches]) => matches.some((word) => t.includes(word)));
    if (!found) return { ...profile, score: 68, wattage: 95, tier: "Unknown CPU", notes: "Estimated CPU tier" };
    return { ...profile, score: found[1], wattage: found[2], tier: found[3], generation: found[4], notes: "Estimated CPU gaming tier" };
  }

  if (category === "motherboard") {
    let score = 72;
    if (/\b(z890|x870|x670|z790)\b/.test(t)) score = 91;
    else if (/\b(b850|b860|b650|b760)\b/.test(t)) score = 84;
    return { ...profile, score, wattage: 35, tier: score >= 88 ? "High" : "Compatible", notes: "Estimated motherboard tier" };
  }

  if (category === "ram") {
    let score = 66;
    if (t.includes("64gb")) score += 10;
    if (t.includes("32gb")) score += 8;
    if (t.includes("ddr5")) score += 14;
    if (t.includes("6000") || t.includes("6400")) score += 8;
    return { ...profile, score: Math.min(96, score), wattage: 10, tier: t.includes("ddr5") ? "DDR5" : "Memory", notes: "Estimated memory tier" };
  }

  if (category === "storage") {
    let score = 66;
    if (t.includes("nvme") || t.includes("m.2")) score += 15;
    if (t.includes("pcie 5") || t.includes("gen5")) score += 10;
    if (t.includes("2tb")) score += 8;
    if (t.includes("4tb")) score += 10;
    return { ...profile, score: Math.min(96, score), wattage: 8, tier: "Storage", notes: "Estimated storage tier" };
  }

  if (category === "psu") {
    const wattMatch = t.match(/\b(\d{3,4})w\b/);
    const capacity = wattMatch ? Number(wattMatch[1]) : 650;
    let score = capacity >= 850 ? 82 : 72;
    if (t.includes("gold")) score += 8;
    if (t.includes("platinum")) score += 12;
    if (t.includes("modular")) score += 5;
    return { ...profile, score: Math.min(96, score), wattage: 0, tier: capacity + "W PSU", notes: "Estimated PSU tier" };
  }

  if (category === "case") {
    let score = 68;
    if (t.includes("airflow")) score += 10;
    if (t.includes("mesh")) score += 8;
    if (t.includes("atx")) score += 5;
    return { ...profile, score: Math.min(92, score), wattage: 0, tier: "Case", notes: "Estimated case tier" };
  }

  if (category === "cooler") {
    let score = 68;
    let wattage = 0;
    if (t.includes("360mm")) { score = 92; wattage = 8; }
    else if (t.includes("280mm")) { score = 88; wattage = 7; }
    else if (t.includes("240mm")) { score = 82; wattage = 6; }
    else if (t.includes("aio") || t.includes("liquid")) { score = 80; wattage = 6; }
    else if (t.includes("tower") || t.includes("air cooler")) { score = 73; wattage = 3; }
    return { ...profile, score, wattage, tier: "Cooling", notes: "Estimated cooling tier" };
  }

  return profile;
}

function getTrustScore(product, category, query) {
  const title = cleanString(product.title || product.name || "");
  const price = getNumber(product.extracted_price || product.price);
  const brand = getBrandFromTitle(title, category);
  const trustedRetailer = getTrustedRetailer(product);
  const rating = getNumber(product.rating);
  const reviews = getNumber(product.reviews);
  const smartMin = getSmartMinimumPrice(category, query);
  const smartMax = getSmartMaximumPrice(category, query);

  let score = 35;
  if (trustedRetailer) score += 28;
  if (brand !== "Unknown") score += 18;
  if (rating >= 4.5) score += 8;
  else if (rating >= 4.0) score += 5;
  if (reviews >= 100) score += 6;
  if (price >= smartMin && price <= smartMax) score += 8;
  if (getCondition(product, title) === "New") score += 5;
  if (hasBlockedSource(product)) score -= 100;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function isLikelyBadProduct(product, category, query, filters) {
  const title = cleanString(product.title || product.name || "");
  const price = getNumber(product.extracted_price || product.price);

  if (!title || titleHasBadWords(title)) return true;
  if (hasBlockedSource(product)) return true;
  if (!isConditionAllowed(product, title, filters.condition)) return true;
  if (!titleMatchesCategory(title, category)) return true;
  if (!productMatchesPlatform(product, filters.platform)) return true;

  const smartMin = getSmartMinimumPrice(category, query);
  const smartMax = getSmartMaximumPrice(category, query);

  if (price > 0 && price < smartMin) return true;
  if (price > smartMax) return true;

  const trustScore = getTrustScore(product, category, query);
  if (filters.retailer === "trusted" && trustScore < 62) return true;
  if (filters.retailer !== "all" && filters.retailer !== "trusted") {
    if (!retailerMatchesFilter(product, filters.retailer)) return true;
  }

  return trustScore < 40;
}

function normalizeProduct(product, index, category, query) {
  const title = cleanString(product.title || "Live Product");
  const price = getNumber(product.extracted_price || product.price);
  const brand = getBrandFromTitle(title, category);
  const hardwareProfile = getHardwarePerformanceProfile(title, category);
  const shoppingQualityScore = getShoppingQualityScore(product);
  const source = getSourceName(product);
  const condition = getCondition(product, title);
  const trustScore = getTrustScore(product, category, query);

  const image =
    cleanString(product.thumbnail) ||
    cleanString(product.serpapi_thumbnail) ||
    cleanString(product.thumbnails && product.thumbnails[0]) ||
    "";

  return {
    id: "live-" + category + "-" + index + "-" + Math.random().toString(36).slice(2),
    live: true,
    provider: "serpapi_google_shopping",
    category,
    categoryLabel: CATEGORY_LABELS[category] || category,
    name: title,
    brand,
    price,
    oldPrice: getNumber(product.extracted_old_price || product.old_price),
    priceText: cleanString(product.price || (price ? "$" + price.toLocaleString() : "Price unavailable")),
    source,
    seller: source,
    retailerTrusted: Boolean(getTrustedRetailer(product)),
    trustScore,
    link: cleanString(product.product_link || product.link || product.serpapi_product_api || ""),
    image,
    rating: getNumber(product.rating),
    reviews: getNumber(product.reviews),
    delivery: cleanString(product.delivery || ""),
    snippet: cleanString(product.snippet || ""),
    condition,
    score: hardwareProfile.score,
    shoppingScore: shoppingQualityScore,
    wattage: hardwareProfile.wattage,
    length: 0,
    vram: hardwareProfile.vram,
    generation: hardwareProfile.generation,
    tier: hardwareProfile.tier,
    use: hardwareProfile.tier + " - " + source + " - " + condition,
    specs: {
      Store: source,
      Brand: brand,
      Condition: condition,
      Trust: String(trustScore) + " / 100",
      Tier: hardwareProfile.tier,
      Performance: String(hardwareProfile.score) + " / 100",
      Rating: product.rating ? String(product.rating) + " / 5" : "Not listed",
      Reviews: product.reviews ? String(product.reviews) : "Not listed"
    }
  };
}

function dedupeProducts(products) {
  const seen = new Set();
  return products.filter((product) => {
    const key = normalizeQuery(product.name.replace(/\b(new|desktop|gaming)\b/gi, "") + "|" + Math.round(Number(product.price || 0)));
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function applyFilters(products, filters) {
  let filtered = [...products];

  if (filters.brand && filters.brand !== "all") {
    filtered = filtered.filter((product) => productMatchesBrandFilter(product, product.category, filters.brand));
  }

  if (filters.minPrice > 0) filtered = filtered.filter((product) => Number(product.price || 0) >= filters.minPrice);
  if (filters.maxPrice > 0) filtered = filtered.filter((product) => Number(product.price || 0) <= filters.maxPrice);
  if (filters.minScore > 0) filtered = filtered.filter((product) => Number(product.score || 0) >= filters.minScore);
  if (filters.minRating > 0) filtered = filtered.filter((product) => Number(product.rating || 0) >= filters.minRating);
  if (filters.maxWattage > 0) filtered = filtered.filter((product) => Number(product.wattage || 0) <= filters.maxWattage);

  if (filters.sort === "priceLow") filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  if (filters.sort === "priceHigh") filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  if (filters.sort === "performance") filtered.sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  if (filters.sort === "rating") filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  if (filters.sort === "trusted") filtered.sort((a, b) => Number(b.trustScore || 0) - Number(a.trustScore || 0));

  if (filters.sort === "recommended") {
    filtered.sort((a, b) => {
      const aScore = Number(a.score || 0) + Number(a.shoppingScore || 0) * 0.25 + Number(a.trustScore || 0) * 0.4;
      const bScore = Number(b.score || 0) + Number(b.shoppingScore || 0) * 0.25 + Number(b.trustScore || 0) * 0.4;
      return bScore - aScore;
    });
  }

  return filtered;
}

function getCacheKey(params) {
  return JSON.stringify(params);
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.SERPAPI_KEY || process.env.serpapi_key;

  if (!apiKey) {
    res.status(500).json({
      ok: false,
      error: "SERPAPI_KEY / serpapi_key is missing in Vercel Environment Variables."
    });
    return;
  }

  const category = normalizeQuery(req.query.category || "gpu");
  const q = cleanString(req.query.q || "");
  const brand = cleanString(req.query.brand || "all");
  const retailer = cleanString(req.query.retailer || "trusted");
  const condition = cleanString(req.query.condition || "new");
  const platform = cleanString(req.query.platform || "all");
  const sort = cleanString(req.query.sort || "recommended");
  const minPrice = getNumber(req.query.minPrice);
  const maxPrice = getNumber(req.query.maxPrice);
  const minScore = getNumber(req.query.minScore);
  const minRating = getNumber(req.query.minRating);
  const maxWattage = getNumber(req.query.maxWattage);

  if (!q) {
    res.status(400).json({ ok: false, error: "Missing search query. Example: ?category=gpu&q=rtx 4070" });
    return;
  }

  if (!CATEGORY_QUERY_WORDS[category]) {
    res.status(400).json({ ok: false, error: "Unsupported category." });
    return;
  }

  const filters = { brand, retailer, condition, platform, sort, minPrice, maxPrice, minScore, minRating, maxWattage };
  const queryParts = [
    q,
    brand !== "all" ? brand : "",
    retailer !== "all" && retailer !== "trusted" ? retailer : "",
    platform !== "all" ? platform : "",
    CATEGORY_QUERY_WORDS[category],
    condition === "new" ? "new" : ""
  ].filter(Boolean);
  const fullQuery = queryParts.join(" ");

  const cacheKey = getCacheKey({
    category,
    q: normalizeQuery(q),
    brand: normalizeQuery(brand),
    retailer: normalizeQuery(retailer),
    condition: normalizeQuery(condition),
    platform: normalizeQuery(platform),
    sort,
    minPrice,
    maxPrice,
    minScore,
    minRating,
    maxWattage
  });

  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < CACHE_TIME_MS) {
    res.status(200).json({ ...cached.data, cached: true });
    return;
  }

  try {
    const params = new URLSearchParams({
      engine: "google_shopping",
      q: fullQuery,
      gl: "us",
      hl: "en",
      api_key: apiKey
    });

    const response = await fetch("https://serpapi.com/search.json?" + params.toString());

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ ok: false, error: "SerpAPI request failed.", details: text });
      return;
    }

    const data = await response.json();
    const shoppingResults = Array.isArray(data.shopping_results) ? data.shopping_results : [];
    const rawProductCount = shoppingResults.length;

    let products = shoppingResults
      .filter((product) => !isLikelyBadProduct(product, category, q, filters))
      .map((product, index) => normalizeProduct(product, index, category, q))
      .filter((product) => product.name && product.price > 0 && product.link);

    products = dedupeProducts(products);
    products = applyFilters(products, filters);

    const payload = {
      ok: true,
      mode: "live",
      provider: "serpapi_google_shopping",
      category,
      query: q,
      fullQuery,
      count: products.length,
      rawCount: rawProductCount,
      filteredOut: Math.max(0, rawProductCount - products.length),
      smartMinPrice: getSmartMinimumPrice(category, q),
      trustedRetailers: TRUSTED_RETAILERS.map(([name]) => name),
      allowedBrands: getBrandNames(category),
      safetyMode: retailer === "trusted" ? "trusted-stores-first" : "safe-results",
      products: products.slice(0, 24),
      checkedAt: new Date().toISOString(),
      cached: false
    };

    cache.set(cacheKey, { createdAt: Date.now(), data: payload });
    res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Live product search failed." });
  }
};
