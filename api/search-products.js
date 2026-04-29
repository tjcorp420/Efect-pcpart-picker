const CATEGORY_QUERY_WORDS = {
  cpu: "desktop processor CPU",
  gpu: "graphics card GPU",
  motherboard: "gaming motherboard",
  ram: "desktop RAM memory kit",
  storage: "NVMe SSD storage",
  psu: "PC power supply PSU",
  case: "PC gaming case ATX",
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

const cache = new Map();
const CACHE_TIME_MS = 1000 * 60 * 60 * 6;

function cleanString(value) {
  return String(value || "").trim();
}

function getNumber(value) {
  if (typeof value === "number") {
    return value;
  }

  const parsed = Number(String(value || "").replace(/[^0-9.]/g, ""));

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

function normalizeQuery(value) {
  return cleanString(value)
    .toLowerCase()
    .replace(/[$,]/g, "")
    .replace(/[^a-z0-9.\s/+.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getBrandFromTitle(title) {
  const cleanTitle = String(title || "").toLowerCase();

  const brands = [
    "AMD",
    "NVIDIA",
    "Intel",
    "ASUS",
    "MSI",
    "Gigabyte",
    "Corsair",
    "Kingston",
    "Samsung",
    "Crucial",
    "Western Digital",
    "WD",
    "Seagate",
    "EVGA",
    "NZXT",
    "Cooler Master",
    "Thermaltake",
    "Lian Li",
    "Fractal",
    "G.Skill",
    "Teamgroup",
    "PNY",
    "Zotac",
    "Sapphire",
    "PowerColor",
    "ASRock",
    "Acer",
    "Dell",
    "HP",
    "Lenovo",
    "Alienware",
    "Razer"
  ];

  const found = brands.find((brand) => cleanTitle.includes(brand.toLowerCase()));

  return found || "Unknown";
}

function getSmartMinimumPrice(category, query) {
  const q = normalizeQuery(query);

  if (category === "gpu") {
    if (q.includes("4090")) return 900;
    if (q.includes("4080")) return 600;
    if (q.includes("4070")) return 300;
    if (q.includes("4060")) return 180;
    if (q.includes("3090")) return 450;
    if (q.includes("3080")) return 300;
    if (q.includes("3070")) return 220;
    if (q.includes("3060")) return 140;
    if (q.includes("7900")) return 500;
    if (q.includes("7800")) return 350;
    if (q.includes("7700")) return 250;
    if (q.includes("7600")) return 180;
    if (q.includes("6600")) return 100;
    return 80;
  }

  if (category === "cpu") {
    if (q.includes("7800x3d")) return 260;
    if (q.includes("5800x3d")) return 180;
    if (q.includes("7950") || q.includes("14900") || q.includes("13900")) return 300;
    if (q.includes("7900") || q.includes("13700") || q.includes("14700")) return 200;
    if (q.includes("7600") || q.includes("13600") || q.includes("14600")) return 120;
    return 40;
  }

  if (category === "motherboard") return 45;
  if (category === "ram") return 20;
  if (category === "storage") return 20;
  if (category === "psu") return 25;
  if (category === "case") return 25;
  if (category === "cooler") return 15;

  return 10;
}

function getSmartMaximumPrice(category, query) {
  const q = normalizeQuery(query);

  if (category === "gpu") {
    if (q.includes("4090")) return 4000;
    if (q.includes("4080")) return 2500;
    if (q.includes("4070")) return 1600;
    if (q.includes("4060")) return 900;
    return 5000;
  }

  if (category === "cpu") return 1500;
  if (category === "motherboard") return 1200;
  if (category === "ram") return 800;
  if (category === "storage") return 1200;
  if (category === "psu") return 800;
  if (category === "case") return 900;
  if (category === "cooler") return 700;

  return 5000;
}

function titleHasBadWords(title) {
  const t = normalizeQuery(title);

  const badPhrases = [
    "box only",
    "empty box",
    "read description",
    "for parts",
    "parts only",
    "not working",
    "broken",
    "damaged",
    "repair",
    "replacement fan",
    "cooling fan",
    "gpu fan",
    "fan only",
    "heatsink only",
    "bracket",
    "mounting bracket",
    "backplate only",
    "water block",
    "waterblock",
    "shroud",
    "screws",
    "cable only",
    "adapter only",
    "manual only",
    "sticker",
    "skin decal"
  ];

  return badPhrases.some((phrase) => t.includes(phrase));
}

function titleMatchesCategory(title, category) {
  const t = normalizeQuery(title);

  if (category === "gpu") {
    const isGpu =
      t.includes("graphics card") ||
      t.includes("video card") ||
      t.includes("geforce") ||
      t.includes("radeon") ||
      t.includes("rtx") ||
      t.includes("gtx") ||
      /\brx\s?\d{3,4}\b/.test(t);

    if (!isGpu) {
      return false;
    }

    const outdatedGpu =
      t.includes("gtx 980") ||
      t.includes("gtx 970") ||
      t.includes("gtx 960") ||
      t.includes("gtx 1070") ||
      t.includes("gtx 1080") ||
      t.includes("titan x") ||
      t.includes("quadro") ||
      t.includes("tesla") ||
      t.includes("radeon hd") ||
      t.includes("rx 580") ||
      t.includes("rx 570") ||
      t.includes("rx 560");

    if (outdatedGpu) {
      return false;
    }

    const weakGpu =
      t.includes("gt 1030") ||
      t.includes("gtx 1050") ||
      t.includes("gtx 1060") ||
      t.includes("gtx 1650") ||
      t.includes("gtx 1660") ||
      t.includes("rtx 3050");

    if (weakGpu) {
      return false;
    }

    return true;
  }

  if (category === "cpu") {
    if (t.includes("cooler") || t.includes("fan") || t.includes("heatsink")) {
      return false;
    }

    const isCpu =
      t.includes("processor") ||
      t.includes("cpu") ||
      t.includes("ryzen") ||
      t.includes("intel core") ||
      /\bi[3579][-\s]?\d{4,5}/.test(t);

    if (!isCpu) {
      return false;
    }

    const oldCpu =
      t.includes("i5-2400") ||
      t.includes("i5-3470") ||
      t.includes("i7-3770") ||
      t.includes("i7-4770") ||
      t.includes("i7-6700") ||
      t.includes("i7-7700") ||
      t.includes("ryzen 3 1200") ||
      t.includes("ryzen 5 1600") ||
      t.includes("fx-") ||
      t.includes("xeon");

    if (oldCpu) {
      return false;
    }

    return true;
  }

  if (category === "motherboard") {
    return (
      t.includes("motherboard") ||
      t.includes("mainboard") ||
      t.includes("b550") ||
      t.includes("b650") ||
      t.includes("x570") ||
      t.includes("x670") ||
      t.includes("b760") ||
      t.includes("z790")
    );
  }

  if (category === "ram") {
    return (
      t.includes("ram") ||
      t.includes("memory") ||
      t.includes("ddr4") ||
      t.includes("ddr5")
    );
  }

  if (category === "storage") {
    return (
      t.includes("ssd") ||
      t.includes("nvme") ||
      t.includes("m.2") ||
      t.includes("hard drive") ||
      t.includes("hdd")
    );
  }

  if (category === "psu") {
    return (
      t.includes("power supply") ||
      t.includes("psu") ||
      /\b\d{3,4}w\b/.test(t)
    );
  }

  if (category === "case") {
    return (
      t.includes("case") ||
      t.includes("tower") ||
      t.includes("chassis")
    );
  }

  if (category === "cooler") {
    const isCooler =
      t.includes("cooler") ||
      t.includes("aio") ||
      t.includes("liquid cooling") ||
      t.includes("liquid cooler") ||
      t.includes("air cooler") ||
      t.includes("cpu fan") ||
      t.includes("360mm") ||
      t.includes("280mm") ||
      t.includes("240mm");

    const badCooler =
      t.includes("gpu cooler") ||
      t.includes("laptop cooler") ||
      t.includes("cooling pad") ||
      t.includes("replacement fan") ||
      t.includes("case fan only");

    return isCooler && !badCooler;
  }

  return true;
}

function isLikelyBadProduct(product, category, query) {
  const title = cleanString(product.title || product.name || "");
  const price = getNumber(product.extracted_price || product.price);

  if (!title) {
    return true;
  }

  if (titleHasBadWords(title)) {
    return true;
  }

  if (!titleMatchesCategory(title, category)) {
    return true;
  }

  const smartMin = getSmartMinimumPrice(category, query);
  const smartMax = getSmartMaximumPrice(category, query);

  if (price > 0 && price < smartMin) {
    return true;
  }

  if (price > smartMax) {
    return true;
  }

  return false;
}

function getShoppingQualityScore(product) {
  const rating = getNumber(product.rating);
  const reviews = getNumber(product.reviews);

  let score = 55;

  if (rating >= 4.8) {
    score += 22;
  } else if (rating >= 4.5) {
    score += 18;
  } else if (rating >= 4.2) {
    score += 12;
  } else if (rating >= 4.0) {
    score += 8;
  }

  if (reviews >= 2000) {
    score += 12;
  } else if (reviews >= 500) {
    score += 9;
  } else if (reviews >= 100) {
    score += 6;
  } else if (reviews >= 20) {
    score += 3;
  }

  return Math.max(45, Math.min(100, Math.round(score)));
}

function getHardwarePerformanceProfile(title, category) {
  const t = normalizeQuery(title);

  const profile = {
    score: 60,
    wattage: 0,
    tier: "Mainstream",
    vram: "",
    generation: "",
    notes: ""
  };

  if (category === "gpu") {
    const gpuRules = [
      { match: ["rtx 4090"], score: 100, wattage: 450, tier: "Extreme 4K", vram: "24GB", generation: "RTX 40" },
      { match: ["rtx 4080 super", "rtx 4080"], score: 96, wattage: 320, tier: "Elite 4K", vram: "16GB", generation: "RTX 40" },
      { match: ["rtx 4070 ti super"], score: 94, wattage: 285, tier: "Elite 1440p", vram: "16GB", generation: "RTX 40" },
      { match: ["rtx 4070 ti"], score: 92, wattage: 285, tier: "Elite 1440p", vram: "12GB", generation: "RTX 40" },
      { match: ["rtx 4070 super"], score: 90, wattage: 220, tier: "High 1440p", vram: "12GB", generation: "RTX 40" },
      { match: ["rtx 4070"], score: 87, wattage: 200, tier: "High 1440p", vram: "12GB", generation: "RTX 40" },
      { match: ["rtx 4060 ti"], score: 78, wattage: 160, tier: "1080p High", vram: "8GB / 16GB", generation: "RTX 40" },
      { match: ["rtx 4060"], score: 72, wattage: 115, tier: "1080p", vram: "8GB", generation: "RTX 40" },

      { match: ["rtx 5060 ti"], score: 82, wattage: 180, tier: "1080p High+", vram: "8GB / 16GB", generation: "RTX 50" },
      { match: ["rtx 5060"], score: 76, wattage: 150, tier: "1080p High", vram: "8GB", generation: "RTX 50" },
      { match: ["rtx 5070"], score: 91, wattage: 250, tier: "High 1440p", vram: "12GB+", generation: "RTX 50" },
      { match: ["rtx 5080"], score: 97, wattage: 360, tier: "Elite 4K", vram: "16GB+", generation: "RTX 50" },
      { match: ["rtx 5090"], score: 100, wattage: 500, tier: "Extreme 4K", vram: "24GB+", generation: "RTX 50" },

      { match: ["rx 7900 xtx"], score: 96, wattage: 355, tier: "Elite 4K", vram: "24GB", generation: "RX 7000" },
      { match: ["rx 7900 xt"], score: 93, wattage: 315, tier: "Elite 1440p", vram: "20GB", generation: "RX 7000" },
      { match: ["rx 7800 xt"], score: 88, wattage: 263, tier: "High 1440p", vram: "16GB", generation: "RX 7000" },
      { match: ["rx 7700 xt"], score: 83, wattage: 245, tier: "1440p", vram: "12GB", generation: "RX 7000" },
      { match: ["rx 7600 xt"], score: 73, wattage: 165, tier: "1080p", vram: "16GB", generation: "RX 7000" },
      { match: ["rx 7600"], score: 69, wattage: 165, tier: "1080p Budget", vram: "8GB", generation: "RX 7000" },

      { match: ["rx 6800 xt"], score: 86, wattage: 300, tier: "High 1440p", vram: "16GB", generation: "RX 6000" },
      { match: ["rx 6700 xt"], score: 78, wattage: 230, tier: "1080p High", vram: "12GB", generation: "RX 6000" },
      { match: ["rx 6600"], score: 64, wattage: 132, tier: "1080p Budget", vram: "8GB", generation: "RX 6000" }
    ];

    const found = gpuRules.find((rule) => {
      return rule.match.some((word) => t.includes(word));
    });

    if (found) {
      return {
        ...profile,
        score: found.score,
        wattage: found.wattage,
        tier: found.tier,
        vram: found.vram,
        generation: found.generation,
        notes: "Estimated GPU gaming tier"
      };
    }

    return {
      ...profile,
      score: 55,
      wattage: 150,
      tier: "Unknown GPU",
      notes: "Unknown GPU performance estimate"
    };
  }

  if (category === "cpu") {
    const cpuRules = [
      { match: ["14900k", "14900kf"], score: 98, wattage: 253, tier: "Elite Intel", generation: "Intel 14th Gen" },
      { match: ["14700k", "14700kf"], score: 94, wattage: 253, tier: "High Intel", generation: "Intel 14th Gen" },
      { match: ["14600k", "14600kf"], score: 88, wattage: 181, tier: "Gaming Intel", generation: "Intel 14th Gen" },
      { match: ["14400f", "14400"], score: 79, wattage: 148, tier: "Modern Intel", generation: "Intel 14th Gen" },

      { match: ["13900k", "13900kf"], score: 96, wattage: 253, tier: "Elite Intel", generation: "Intel 13th Gen" },
      { match: ["13700k", "13700kf"], score: 92, wattage: 253, tier: "High Intel", generation: "Intel 13th Gen" },
      { match: ["13600k", "13600kf"], score: 87, wattage: 181, tier: "Gaming Intel", generation: "Intel 13th Gen" },
      { match: ["13400f", "13400"], score: 76, wattage: 148, tier: "Modern Intel", generation: "Intel 13th Gen" },

      { match: ["12900k", "12900kf"], score: 88, wattage: 241, tier: "High Intel", generation: "Intel 12th Gen" },
      { match: ["12700k", "12700kf"], score: 84, wattage: 190, tier: "Gaming Intel", generation: "Intel 12th Gen" },
      { match: ["12600k", "12600kf"], score: 78, wattage: 150, tier: "Modern Intel", generation: "Intel 12th Gen" },

      { match: ["7950x3d"], score: 99, wattage: 120, tier: "Elite X3D", generation: "Ryzen 7000" },
      { match: ["7800x3d"], score: 98, wattage: 120, tier: "Elite Gaming X3D", generation: "Ryzen 7000" },
      { match: ["7950x"], score: 94, wattage: 170, tier: "Elite Ryzen", generation: "Ryzen 7000" },
      { match: ["7900x"], score: 91, wattage: 170, tier: "High Ryzen", generation: "Ryzen 7000" },
      { match: ["7700x", "7700"], score: 85, wattage: 105, tier: "Gaming Ryzen", generation: "Ryzen 7000" },
      { match: ["7600x", "7600"], score: 80, wattage: 105, tier: "Modern Ryzen", generation: "Ryzen 7000" },

      { match: ["5800x3d"], score: 89, wattage: 105, tier: "AM4 X3D", generation: "Ryzen 5000" },
      { match: ["5900x"], score: 86, wattage: 105, tier: "High AM4", generation: "Ryzen 5000" },
      { match: ["5800x"], score: 81, wattage: 105, tier: "AM4 Gaming", generation: "Ryzen 5000" },
      { match: ["5600x", "5600"], score: 72, wattage: 65, tier: "Budget AM4", generation: "Ryzen 5000" }
    ];

    const found = cpuRules.find((rule) => {
      return rule.match.some((word) => t.includes(word));
    });

    if (found) {
      return {
        ...profile,
        score: found.score,
        wattage: found.wattage,
        tier: found.tier,
        generation: found.generation,
        notes: "Estimated CPU gaming tier"
      };
    }

    return {
      ...profile,
      score: 65,
      wattage: 95,
      tier: "Unknown CPU",
      notes: "Unknown CPU performance estimate"
    };
  }

  if (category === "motherboard") {
    let score = 70;
    if (t.includes("z790") || t.includes("x670")) score = 90;
    else if (t.includes("b650") || t.includes("b760")) score = 82;
    else if (t.includes("b550")) score = 75;

    return {
      ...profile,
      score,
      wattage: 35,
      tier: score >= 85 ? "High" : "Compatible",
      notes: "Estimated motherboard tier"
    };
  }

  if (category === "ram") {
    let score = 65;
    if (t.includes("64gb")) score += 10;
    if (t.includes("32gb")) score += 8;
    if (t.includes("ddr5")) score += 14;
    if (t.includes("6000") || t.includes("6400")) score += 8;
    if (t.includes("3600")) score += 4;

    return {
      ...profile,
      score: Math.min(95, score),
      wattage: 10,
      tier: t.includes("ddr5") ? "DDR5" : "Memory",
      notes: "Estimated memory tier"
    };
  }

  if (category === "storage") {
    let score = 65;
    if (t.includes("nvme") || t.includes("m.2")) score += 15;
    if (t.includes("990") || t.includes("980 pro") || t.includes("sn850")) score += 8;
    if (t.includes("2tb")) score += 8;
    if (t.includes("4tb")) score += 10;

    return {
      ...profile,
      score: Math.min(95, score),
      wattage: 8,
      tier: "Storage",
      notes: "Estimated storage tier"
    };
  }

  if (category === "psu") {
    let wattage = 650;
    const wattMatch = t.match(/\b(\d{3,4})w\b/);
    if (wattMatch) wattage = Number(wattMatch[1]);

    let score = 65;
    if (wattage >= 850) score += 15;
    else if (wattage >= 750) score += 10;
    if (t.includes("gold")) score += 8;
    if (t.includes("platinum")) score += 12;
    if (t.includes("modular")) score += 5;

    return {
      ...profile,
      score: Math.min(95, score),
      wattage: 0,
      tier: wattage + "W PSU",
      notes: "Estimated PSU tier"
    };
  }

  if (category === "case") {
    let score = 65;
    if (t.includes("airflow")) score += 10;
    if (t.includes("mesh")) score += 8;
    if (t.includes("atx")) score += 5;

    return {
      ...profile,
      score: Math.min(90, score),
      wattage: 0,
      tier: "Case",
      notes: "Estimated case tier"
    };
  }

  if (category === "cooler") {
    let score = 65;
    let wattage = 0;

    if (t.includes("360mm")) {
      score = 92;
      wattage = 8;
    } else if (t.includes("280mm")) {
      score = 88;
      wattage = 7;
    } else if (t.includes("240mm")) {
      score = 82;
      wattage = 6;
    } else if (t.includes("aio") || t.includes("liquid")) {
      score = 80;
      wattage = 6;
    } else if (t.includes("tower") || t.includes("air cooler")) {
      score = 72;
      wattage = 3;
    }

    return {
      ...profile,
      score,
      wattage,
      tier: "Cooling",
      notes: "Estimated cooling tier"
    };
  }

  return profile;
}

function normalizeProduct(product, index, category) {
  const title = cleanString(product.title || "Live Product");
  const price = getNumber(product.extracted_price || product.price);
  const brand = getBrandFromTitle(title);
  const hardwareProfile = getHardwarePerformanceProfile(title, category);
  const shoppingQualityScore = getShoppingQualityScore(product);

  const image =
    cleanString(product.thumbnail) ||
    cleanString(product.serpapi_thumbnail) ||
    cleanString(product.thumbnails && product.thumbnails[0]) ||
    "";

  const source = cleanString(product.source || "Online Store");

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

    link: cleanString(product.product_link || product.link || product.serpapi_product_api || ""),
    image,

    rating: getNumber(product.rating),
    reviews: getNumber(product.reviews),
    delivery: cleanString(product.delivery || ""),
    snippet: cleanString(product.snippet || ""),
    condition: cleanString(product.second_hand_condition || "New / check listing"),

    score: hardwareProfile.score,
    shoppingScore: shoppingQualityScore,
    wattage: hardwareProfile.wattage,
    length: 0,
    vram: hardwareProfile.vram,
    generation: hardwareProfile.generation,
    tier: hardwareProfile.tier,

    use:
      hardwareProfile.tier +
      " • " +
      source +
      (product.delivery ? " • " + cleanString(product.delivery) : ""),

    specs: {
      Store: source,
      Brand: brand,
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
    const key = normalizeQuery(
      product.name + "|" + product.source + "|" + Math.round(Number(product.price || 0))
    );

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function applyFilters(products, filters) {
  let filtered = [...products];

  if (filters.brand && filters.brand !== "all") {
    filtered = filtered.filter((product) => {
      return String(product.brand || "").toLowerCase().includes(filters.brand.toLowerCase());
    });
  }

  if (filters.minPrice > 0) {
    filtered = filtered.filter((product) => Number(product.price || 0) >= filters.minPrice);
  }

  if (filters.maxPrice > 0) {
    filtered = filtered.filter((product) => Number(product.price || 0) <= filters.maxPrice);
  }

  if (filters.minScore > 0) {
    filtered = filtered.filter((product) => Number(product.score || 0) >= filters.minScore);
  }

  if (filters.sort === "priceLow") {
    filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  }

  if (filters.sort === "priceHigh") {
    filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  }

  if (filters.sort === "performance" || filters.sort === "recommended") {
    filtered.sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
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
    res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
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
  const sort = cleanString(req.query.sort || "recommended");

  const minPrice = getNumber(req.query.minPrice);
  const maxPrice = getNumber(req.query.maxPrice);
  const minScore = getNumber(req.query.minScore);

  if (!q) {
    res.status(400).json({
      ok: false,
      error: "Missing search query. Example: ?category=gpu&q=rtx 4070"
    });
    return;
  }

  const fullQuery = [q, CATEGORY_QUERY_WORDS[category] || "PC part"]
    .filter(Boolean)
    .join(" ");

  const cacheKey = getCacheKey({
    category,
    q: normalizeQuery(q),
    brand: normalizeQuery(brand),
    sort,
    minPrice,
    maxPrice,
    minScore
  });

  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.createdAt < CACHE_TIME_MS) {
    res.status(200).json({
      ...cached.data,
      cached: true
    });
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

      res.status(response.status).json({
        ok: false,
        error: "SerpAPI request failed.",
        details: text
      });
      return;
    }

    const data = await response.json();
    const shoppingResults = Array.isArray(data.shopping_results) ? data.shopping_results : [];

    const rawProductCount = shoppingResults.length;

    let products = shoppingResults
      .filter((product) => !isLikelyBadProduct(product, category, q))
      .map((product, index) => normalizeProduct(product, index, category))
      .filter((product) => product.name && product.price > 0 && product.link);

    products = dedupeProducts(products);

    products = applyFilters(products, {
      brand,
      minPrice,
      maxPrice,
      minScore,
      sort
    });

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
      products: products.slice(0, 24),
      checkedAt: new Date().toISOString(),
      cached: false
    };

    cache.set(cacheKey, {
      createdAt: Date.now(),
      data: payload
    });

    res.status(200).json(payload);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      error: "Live product search failed."
    });
  }
};