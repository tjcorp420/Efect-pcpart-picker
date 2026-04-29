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
    return (
      t.includes("graphics card") ||
      t.includes("video card") ||
      t.includes("geforce") ||
      t.includes("radeon") ||
      t.includes("rtx") ||
      t.includes("gtx") ||
      /\brx\s?\d{3,4}\b/.test(t)
    );
  }

  if (category === "cpu") {
    if (t.includes("cooler") || t.includes("fan")) {
      return false;
    }

    return (
      t.includes("processor") ||
      t.includes("cpu") ||
      t.includes("ryzen") ||
      t.includes("intel core") ||
      /\bi[3579][-\s]?\d{4,5}/.test(t)
    );
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
    return (
      t.includes("cooler") ||
      t.includes("aio") ||
      t.includes("liquid cooling") ||
      t.includes("air cooler") ||
      t.includes("cpu fan")
    );
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

function getProductScore(product, category) {
  const price = getNumber(product.extracted_price || product.price);
  const rating = getNumber(product.rating);
  const reviews = getNumber(product.reviews);

  let score = 58;

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

  if (price > 0) {
    if (category === "gpu" && price >= 400) score += 5;
    if (category === "cpu" && price >= 180) score += 4;
    if (category === "ram" && price >= 60) score += 3;
    if (category === "storage" && price >= 70) score += 3;
  }

  return Math.max(45, Math.min(100, Math.round(score)));
}

function normalizeProduct(product, index, category) {
  const title = cleanString(product.title || "Live Product");
  const price = getNumber(product.extracted_price || product.price);
  const brand = getBrandFromTitle(title);

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

    score: getProductScore(product, category),
    wattage: 0,
    length: 0,

    use:
      "Live Google Shopping result • " +
      source +
      (product.delivery ? " • " + cleanString(product.delivery) : ""),

    specs: {
      Store: source,
      Brand: brand,
      Rating: product.rating ? String(product.rating) + " / 5" : "Not listed",
      Reviews: product.reviews ? String(product.reviews) : "Not listed",
      Delivery: cleanString(product.delivery || "Check listing"),
      Type: "Live product"
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