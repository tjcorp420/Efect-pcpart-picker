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
  return cleanString(value).toLowerCase().replace(/\s+/g, " ");
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

  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    res.status(500).json({
      ok: false,
      error: "SERPAPI_KEY is missing in Vercel Environment Variables."
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

    let products = shoppingResults
      .map((product, index) => normalizeProduct(product, index, category))
      .filter((product) => product.name && product.price > 0 && product.link);

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