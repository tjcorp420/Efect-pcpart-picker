/* =========================================================
   01. HTML ELEMENTS
========================================================= */
const splashScreen = document.getElementById("splashScreen");
const builderScreen = document.getElementById("builderScreen");

const loadingBar = document.getElementById("loadingBar");
const bootText = document.getElementById("bootText");

const saveBuildBtn = document.getElementById("saveBuildBtn");
const clearBuildBtn = document.getElementById("clearBuildBtn");
const copyBuildBtn = document.getElementById("copyBuildBtn");
const loadBuildBtn = document.getElementById("loadBuildBtn");

const totalPriceText = document.getElementById("totalPriceText");
const wattageText = document.getElementById("wattageText");
const fpsScoreText = document.getElementById("fpsScoreText");
const statusText = document.getElementById("statusText");

const budgetInput = document.getElementById("budgetInput");
const goalSelect = document.getElementById("goalSelect");

const warningsList = document.getElementById("warningsList");
const selectedPartsList = document.getElementById("selectedPartsList");
const partsList = document.getElementById("partsList");
const savedBuildsList = document.getElementById("savedBuildsList");

const categoryTabs = document.getElementById("categoryTabs");
const categoryTitleText = document.getElementById("categoryTitleText");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const brandFilter = document.getElementById("brandFilter");
const retailerFilter = document.getElementById("retailerFilter");
const conditionFilter = document.getElementById("conditionFilter");
const platformFilter = document.getElementById("platformFilter");
const minPriceInput = document.getElementById("minPriceInput");
const maxPriceInput = document.getElementById("maxPriceInput");
const minScoreInput = document.getElementById("minScoreInput");
const minRatingInput = document.getElementById("minRatingInput");
const maxWattageInput = document.getElementById("maxWattageInput");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const liveSearchBtn = document.getElementById("liveSearchBtn");

/* =========================================================
   01B. REPORT MODAL ELEMENTS
========================================================= */
const openReportBtn = document.getElementById("openReportBtn");
const reportModal = document.getElementById("reportModal");
const reportBackdrop = document.getElementById("reportBackdrop");
const closeReportBtn = document.getElementById("closeReportBtn");
const copyReportBtn = document.getElementById("copyReportBtn");

const reportTitleText = document.getElementById("reportTitleText");
const reportSubtitleText = document.getElementById("reportSubtitleText");
const reportGradeText = document.getElementById("reportGradeText");
const reportPriceText = document.getElementById("reportPriceText");
const reportWattageText = document.getElementById("reportWattageText");
const reportFpsScoreText = document.getElementById("reportFpsScoreText");
const reportStatusText = document.getElementById("reportStatusText");

const reportGamesList = document.getElementById("reportGamesList");
const reportNotesList = document.getElementById("reportNotesList");
const reportPeripheralsList = document.getElementById("reportPeripheralsList");
const reportUpgradeList = document.getElementById("reportUpgradeList");

const manualCopyModal = document.getElementById("manualCopyModal");
const manualCopyText = document.getElementById("manualCopyText");
const manualSelectBtn = document.getElementById("manualSelectBtn");
const manualCloseBtn = document.getElementById("manualCloseBtn");

/* =========================================================
   02. TOAST SYSTEM
========================================================= */
const toastStack = document.createElement("div");
toastStack.className = "toast-stack";
document.body.appendChild(toastStack);

function showToast(message, type = "good") {
  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.textContent = message;

  toastStack.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px) scale(0.98)";
  }, 2200);

  setTimeout(() => {
    toast.remove();
  }, 2600);
}

/* =========================================================
   03. APP STATE
========================================================= */
let activeCategory = "cpu";

let build = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  psu: null,
  case: null,
  cooler: null
};

/* =========================================================
   04. LOCAL SAMPLE PART DATABASE
========================================================= */
const partsDB = {
  cpu: [
    {
      id: "cpu-r5-5600",
      name: "AMD Ryzen 5 5600",
      brand: "AMD",
      price: 125,
      wattage: 65,
      score: 72,
      socket: "AM4",
      use: "Sample budget gaming CPU",
      specs: { Cores: "6C / 12T", Socket: "AM4", Power: "65W", Tier: "Budget" }
    },
    {
      id: "cpu-r7-5800x3d",
      name: "AMD Ryzen 7 5800X3D",
      brand: "AMD",
      price: 290,
      wattage: 105,
      score: 92,
      socket: "AM4",
      use: "Sample high FPS gaming CPU",
      specs: { Cores: "8C / 16T", Socket: "AM4", Power: "105W", Tier: "High FPS" }
    },
    {
      id: "cpu-r5-7600",
      name: "AMD Ryzen 5 7600",
      brand: "AMD",
      price: 200,
      wattage: 65,
      score: 86,
      socket: "AM5",
      use: "Sample modern gaming CPU",
      specs: { Cores: "6C / 12T", Socket: "AM5", Power: "65W", Tier: "Mid" }
    },
    {
      id: "cpu-r7-7800x3d",
      name: "AMD Ryzen 7 7800X3D",
      brand: "AMD",
      price: 380,
      wattage: 120,
      score: 99,
      socket: "AM5",
      use: "Sample elite gaming CPU",
      specs: { Cores: "8C / 16T", Socket: "AM5", Power: "120W", Tier: "Elite" }
    },
    {
      id: "cpu-i5-13400f",
      name: "Intel Core i5-13400F",
      brand: "Intel",
      price: 185,
      wattage: 65,
      score: 82,
      socket: "LGA1700",
      use: "Sample balanced gaming CPU",
      specs: { Cores: "10C / 16T", Socket: "LGA1700", Power: "65W", Tier: "Mid" }
    },
    {
      id: "cpu-i7-13700k",
      name: "Intel Core i7-13700K",
      brand: "Intel",
      price: 330,
      wattage: 125,
      score: 94,
      socket: "LGA1700",
      use: "Sample gaming + creator CPU",
      specs: { Cores: "16C / 24T", Socket: "LGA1700", Power: "125W", Tier: "High" }
    }
  ],

  gpu: [
    {
      id: "gpu-rx6600",
      name: "AMD Radeon RX 6600",
      brand: "AMD",
      price: 200,
      wattage: 132,
      score: 65,
      length: 240,
      use: "Sample 1080p budget GPU",
      specs: { VRAM: "8GB", Power: "132W", Length: "240mm", Tier: "Budget" }
    },
    {
      id: "gpu-rtx4060",
      name: "NVIDIA RTX 4060",
      brand: "NVIDIA",
      price: 300,
      wattage: 115,
      score: 72,
      length: 245,
      use: "Sample 1080p efficient GPU",
      specs: { VRAM: "8GB", Power: "115W", Length: "245mm", Tier: "Mid" }
    },
    {
      id: "gpu-rx7700xt",
      name: "AMD Radeon RX 7700 XT",
      brand: "AMD",
      price: 420,
      wattage: 245,
      score: 85,
      length: 280,
      use: "Sample 1440p gaming GPU",
      specs: { VRAM: "12GB", Power: "245W", Length: "280mm", Tier: "High" }
    },
    {
      id: "gpu-rtx4070s",
      name: "NVIDIA RTX 4070 Super",
      brand: "NVIDIA",
      price: 600,
      wattage: 220,
      score: 91,
      length: 267,
      use: "Sample 1440p high FPS GPU",
      specs: { VRAM: "12GB", Power: "220W", Length: "267mm", Tier: "High" }
    },
    {
      id: "gpu-rtx4080s",
      name: "NVIDIA RTX 4080 Super",
      brand: "NVIDIA",
      price: 1000,
      wattage: 320,
      score: 97,
      length: 310,
      use: "Sample 4K / elite gaming GPU",
      specs: { VRAM: "16GB", Power: "320W", Length: "310mm", Tier: "Elite" }
    },
    {
      id: "gpu-rtx4090",
      name: "NVIDIA RTX 4090",
      brand: "NVIDIA",
      price: 1800,
      wattage: 450,
      score: 100,
      length: 340,
      use: "Sample max performance GPU",
      specs: { VRAM: "24GB", Power: "450W", Length: "340mm", Tier: "Extreme" }
    }
  ],

  motherboard: [
    {
      id: "mb-b550",
      name: "MSI B550 Gaming Motherboard",
      brand: "MSI",
      price: 120,
      wattage: 35,
      score: 65,
      socket: "AM4",
      ramType: "DDR4",
      formFactor: "ATX",
      use: "Sample AM4 DDR4 board",
      specs: { Socket: "AM4", Memory: "DDR4", Size: "ATX", Tier: "Budget" }
    },
    {
      id: "mb-x570",
      name: "ASUS X570 Pro Motherboard",
      brand: "ASUS",
      price: 210,
      wattage: 45,
      score: 78,
      socket: "AM4",
      ramType: "DDR4",
      formFactor: "ATX",
      use: "Sample AM4 high-end board",
      specs: { Socket: "AM4", Memory: "DDR4", Size: "ATX", Tier: "High" }
    },
    {
      id: "mb-b650",
      name: "Gigabyte B650 Gaming Motherboard",
      brand: "Gigabyte",
      price: 170,
      wattage: 40,
      score: 76,
      socket: "AM5",
      ramType: "DDR5",
      formFactor: "ATX",
      use: "Sample AM5 DDR5 board",
      specs: { Socket: "AM5", Memory: "DDR5", Size: "ATX", Tier: "Modern" }
    },
    {
      id: "mb-x670e",
      name: "ASRock X670E Elite Motherboard",
      brand: "ASRock",
      price: 320,
      wattage: 55,
      score: 90,
      socket: "AM5",
      ramType: "DDR5",
      formFactor: "ATX",
      use: "Sample AM5 elite board",
      specs: { Socket: "AM5", Memory: "DDR5", Size: "ATX", Tier: "Elite" }
    },
    {
      id: "mb-b760",
      name: "ASUS B760 Intel Motherboard",
      brand: "ASUS",
      price: 150,
      wattage: 38,
      score: 74,
      socket: "LGA1700",
      ramType: "DDR4",
      formFactor: "ATX",
      use: "Sample Intel DDR4 board",
      specs: { Socket: "LGA1700", Memory: "DDR4", Size: "ATX", Tier: "Mid" }
    },
    {
      id: "mb-z790",
      name: "MSI Z790 Performance Motherboard",
      brand: "MSI",
      price: 280,
      wattage: 55,
      score: 88,
      socket: "LGA1700",
      ramType: "DDR5",
      formFactor: "ATX",
      use: "Sample Intel DDR5 board",
      specs: { Socket: "LGA1700", Memory: "DDR5", Size: "ATX", Tier: "High" }
    }
  ],

  ram: [
    {
      id: "ram-16-ddr4",
      name: "Corsair 16GB DDR4 3200",
      brand: "Corsair",
      price: 45,
      wattage: 8,
      score: 58,
      ramType: "DDR4",
      capacity: 16,
      use: "Sample DDR4 RAM kit",
      specs: { Capacity: "16GB", Type: "DDR4", Speed: "3200", Tier: "Budget" }
    },
    {
      id: "ram-32-ddr4",
      name: "G.Skill 32GB DDR4 3600 RGB",
      brand: "G.Skill",
      price: 80,
      wattage: 10,
      score: 72,
      ramType: "DDR4",
      capacity: 32,
      use: "Sample balanced DDR4 kit",
      specs: { Capacity: "32GB", Type: "DDR4", Speed: "3600", Tier: "Balanced" }
    },
    {
      id: "ram-32-ddr5",
      name: "Kingston 32GB DDR5 6000 RGB",
      brand: "Kingston",
      price: 115,
      wattage: 12,
      score: 86,
      ramType: "DDR5",
      capacity: 32,
      use: "Sample high-speed DDR5 kit",
      specs: { Capacity: "32GB", Type: "DDR5", Speed: "6000", Tier: "High" }
    },
    {
      id: "ram-64-ddr5",
      name: "Crucial 64GB DDR5 6400 RGB",
      brand: "Crucial",
      price: 220,
      wattage: 18,
      score: 94,
      ramType: "DDR5",
      capacity: 64,
      use: "Sample elite DDR5 kit",
      specs: { Capacity: "64GB", Type: "DDR5", Speed: "6400", Tier: "Elite" }
    }
  ],

  storage: [
    {
      id: "ssd-1tb-nvme",
      name: "WD 1TB NVMe SSD",
      brand: "Western Digital",
      price: 65,
      wattage: 6,
      score: 76,
      capacity: 1000,
      use: "Sample fast boot drive",
      specs: { Capacity: "1TB", Type: "NVMe", Speed: "Fast", Tier: "Balanced" }
    },
    {
      id: "ssd-2tb-nvme",
      name: "Samsung 2TB NVMe SSD",
      brand: "Samsung",
      price: 120,
      wattage: 7,
      score: 86,
      capacity: 2000,
      use: "Sample gaming storage drive",
      specs: { Capacity: "2TB", Type: "NVMe", Speed: "Fast", Tier: "High" }
    },
    {
      id: "ssd-4tb-nvme",
      name: "Crucial 4TB Gen4 NVMe SSD",
      brand: "Crucial",
      price: 280,
      wattage: 9,
      score: 96,
      capacity: 4000,
      use: "Sample elite storage drive",
      specs: { Capacity: "4TB", Type: "Gen4 NVMe", Speed: "Elite", Tier: "Elite" }
    }
  ],

  psu: [
    {
      id: "psu-550",
      name: "EVGA 550W Bronze PSU",
      brand: "EVGA",
      price: 55,
      wattage: 0,
      score: 58,
      capacity: 550,
      use: "Sample budget PSU",
      specs: { Power: "550W", Rating: "Bronze", Modular: "No", Tier: "Budget" }
    },
    {
      id: "psu-650",
      name: "Seasonic 650W Gold PSU",
      brand: "Seasonic",
      price: 85,
      wattage: 0,
      score: 72,
      capacity: 650,
      use: "Sample balanced PSU",
      specs: { Power: "650W", Rating: "Gold", Modular: "Semi", Tier: "Balanced" }
    },
    {
      id: "psu-850",
      name: "Corsair 850W Gold Modular PSU",
      brand: "Corsair",
      price: 130,
      wattage: 0,
      score: 88,
      capacity: 850,
      use: "Sample high-end PSU",
      specs: { Power: "850W", Rating: "Gold", Modular: "Full", Tier: "High" }
    },
    {
      id: "psu-1000",
      name: "be quiet! 1000W Platinum PSU",
      brand: "be quiet!",
      price: 220,
      wattage: 0,
      score: 96,
      capacity: 1000,
      use: "Sample elite PSU",
      specs: { Power: "1000W", Rating: "Platinum", Modular: "Full", Tier: "Elite" }
    }
  ],

  case: [
    {
      id: "case-budget-atx",
      name: "Montech Budget ATX Case",
      brand: "Montech",
      price: 55,
      wattage: 0,
      score: 55,
      formFactor: "ATX",
      maxGpuLength: 280,
      use: "Sample budget case",
      specs: { Size: "ATX", GPU: "280mm", Airflow: "Basic", Tier: "Budget" }
    },
    {
      id: "case-airflow-atx",
      name: "Corsair Airflow RGB ATX Case",
      brand: "Corsair",
      price: 95,
      wattage: 0,
      score: 76,
      formFactor: "ATX",
      maxGpuLength: 330,
      use: "Sample airflow case",
      specs: { Size: "ATX", GPU: "330mm", Airflow: "Good", Tier: "Balanced" }
    },
    {
      id: "case-showcase-atx",
      name: "Lian Li Glass Showcase RGB Case",
      brand: "Lian Li",
      price: 160,
      wattage: 0,
      score: 90,
      formFactor: "ATX",
      maxGpuLength: 360,
      use: "Sample showcase case",
      specs: { Size: "ATX", GPU: "360mm", Airflow: "High", Tier: "Elite" }
    }
  ],

  cooler: [
    {
      id: "cooler-stock",
      name: "DeepCool Basic Air Cooler",
      brand: "DeepCool",
      price: 30,
      wattage: 0,
      score: 55,
      maxCpuWattage: 90,
      sockets: ["AM4", "AM5", "LGA1700"],
      use: "Sample budget cooler",
      specs: { Type: "Air", Limit: "90W", RGB: "No", Tier: "Budget" }
    },
    {
      id: "cooler-tower",
      name: "Thermalright RGB Tower Cooler",
      brand: "Thermalright",
      price: 60,
      wattage: 3,
      score: 72,
      maxCpuWattage: 140,
      sockets: ["AM4", "AM5", "LGA1700"],
      use: "Sample balanced cooler",
      specs: { Type: "Air", Limit: "140W", RGB: "Yes", Tier: "Balanced" }
    },
    {
      id: "cooler-aio-240",
      name: "NZXT 240mm AIO Liquid Cooler",
      brand: "NZXT",
      price: 115,
      wattage: 6,
      score: 86,
      maxCpuWattage: 190,
      sockets: ["AM4", "AM5", "LGA1700"],
      use: "Sample high-end cooler",
      specs: { Type: "AIO", Limit: "190W", RGB: "Yes", Tier: "High" }
    },
    {
      id: "cooler-aio-360",
      name: "Corsair 360mm Elite AIO Cooler",
      brand: "Corsair",
      price: 180,
      wattage: 9,
      score: 96,
      maxCpuWattage: 250,
      sockets: ["AM4", "AM5", "LGA1700"],
      use: "Sample elite cooler",
      specs: { Type: "AIO", Limit: "250W", RGB: "Yes", Tier: "Elite" }
    }
  ]
};

/* =========================================================
   05. CATEGORY LABELS
========================================================= */
const categoryLabels = {
  cpu: "CPU",
  gpu: "GPU",
  motherboard: "Motherboard",
  ram: "RAM",
  storage: "Storage",
  psu: "PSU",
  case: "Case",
  cooler: "Cooler"
};

const knownBrandsByCategory = {
  cpu: ["AMD", "Intel"],
  gpu: ["NVIDIA", "AMD", "ASUS", "MSI", "Gigabyte", "PNY", "Zotac", "Sapphire", "PowerColor", "XFX", "ASRock", "Acer", "Galax", "Palit"],
  motherboard: ["ASUS", "MSI", "Gigabyte", "ASRock", "EVGA", "NZXT", "Biostar", "Aorus", "ROG", "TUF"],
  ram: ["Corsair", "G.Skill", "Kingston", "Crucial", "Teamgroup", "Patriot", "PNY", "ADATA", "Lexar", "Mushkin", "Silicon Power"],
  storage: ["Samsung", "Western Digital", "WD", "Crucial", "Kingston", "Seagate", "Solidigm", "Sabrent", "SK hynix", "Lexar", "Corsair", "Teamgroup", "ADATA", "PNY", "SanDisk", "Inland"],
  psu: ["Corsair", "Seasonic", "EVGA", "be quiet!", "Thermaltake", "Cooler Master", "MSI", "ASUS", "SilverStone", "Super Flower", "FSP", "NZXT", "Lian Li", "Antec"],
  case: ["Corsair", "NZXT", "Lian Li", "Fractal", "Fractal Design", "Phanteks", "Cooler Master", "Thermaltake", "be quiet!", "Hyte", "Montech", "DeepCool", "Antec", "SilverStone", "ASUS", "MSI"],
  cooler: ["Noctua", "Cooler Master", "Corsair", "NZXT", "Arctic", "be quiet!", "Thermaltake", "Lian Li", "DeepCool", "EK", "MSI", "ASUS", "ID-COOLING", "Scythe", "Thermalright"]
};

const trustedRetailers = [
  "Amazon",
  "Newegg",
  "Best Buy",
  "B&H",
  "Micro Center",
  "Walmart",
  "Adorama",
  "Antonline",
  "Dell",
  "HP",
  "Lenovo",
  "Corsair",
  "ASUS",
  "MSI",
  "NVIDIA",
  "AMD",
  "Intel",
  "Samsung",
  "Western Digital",
  "Crucial"
];

const platformOptionsByCategory = {
  cpu: ["AM5", "AM4", "LGA1851", "LGA1700"],
  gpu: ["RTX 50", "RTX 40", "RX 9000", "RX 7000", "RX 6000", "16GB+", "12GB+", "8GB"],
  motherboard: ["AM5", "AM4", "LGA1851", "LGA1700", "DDR5", "DDR4", "ATX", "Micro ATX", "Mini ITX"],
  ram: ["DDR5", "DDR4", "64GB", "32GB", "16GB"],
  storage: ["NVMe", "PCIe 5.0", "PCIe 4.0", "4TB", "2TB", "1TB"],
  psu: ["ATX 3.0", "ATX 3.1", "80+ Gold", "80+ Platinum", "Modular", "850W+", "750W+"],
  case: ["ATX", "Micro ATX", "Mini ITX", "Airflow", "Mesh", "Glass"],
  cooler: ["AM5", "AM4", "LGA1851", "LGA1700", "360mm", "280mm", "240mm", "Air Cooler"]
};

/* =========================================================
   06. SPLASH SCREEN
========================================================= */
function startSplash() {
  const messages = [
    "Loading builder database...",
    "Checking compatibility engine...",
    "Preparing EMX builder...",
    "Loading saved builds...",
    "Builder ready."
  ];

  let progress = 0;
  let messageIndex = 0;

  const interval = setInterval(() => {
    progress += 7 + Math.random() * 10;

    if (progress >= 100) {
      progress = 100;
    }

    loadingBar.style.width = progress + "%";

    const nextMessageIndex = Math.min(
      messages.length - 1,
      Math.floor((progress / 100) * messages.length)
    );

    if (nextMessageIndex !== messageIndex) {
      messageIndex = nextMessageIndex;
      bootText.textContent = messages[messageIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        splashScreen.classList.remove("active");
        builderScreen.classList.add("active");
        renderAll();
        showToast("Loading live product pictures and prices...", "good");
        emxAutoLoadLiveCategory();
      }, 350);
    }
  }, 90);
}

/* =========================================================
   07. FORMATTERS / HELPERS
========================================================= */
function formatMoney(value) {
  return "$" + Math.round(value || 0).toLocaleString();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getPartById(category, id) {
  if (!id || !partsDB[category]) {
    return null;
  }

  return partsDB[category].find((part) => part.id === id) || null;
}

function getSelectedPart(category) {
  return getPartById(category, build[category]);
}

function getSelectedPartsArray() {
  return Object.keys(build)
    .map((category) => ({ category, part: getSelectedPart(category) }))
    .filter((item) => Boolean(item.part));
}

/* =========================================================
   08. BUILD CALCULATIONS
========================================================= */
function calculateTotalPrice() {
  return getSelectedPartsArray().reduce((total, item) => total + item.part.price, 0);
}

function calculateWattage() {
  const selected = getSelectedPartsArray();
  const baseSystemWattage = selected.length > 0 ? 35 : 0;

  return selected.reduce((total, item) => total + (item.part.wattage || 0), baseSystemWattage);
}

function calculateFpsScore() {
  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const ram = getSelectedPart("ram");
  const storage = getSelectedPart("storage");
  const cooler = getSelectedPart("cooler");

  if (!cpu && !gpu && !ram && !storage && !cooler) {
    return 0;
  }

  return Math.round(
    (cpu ? cpu.score * 0.28 : 0) +
    (gpu ? gpu.score * 0.52 : 0) +
    (ram ? ram.score * 0.1 : 0) +
    (storage ? storage.score * 0.04 : 0) +
    (cooler ? cooler.score * 0.06 : 0)
  );
}

function getBuildStatus() {
  const selectedCount = getSelectedPartsArray().length;

  if (selectedCount === 0) {
    return "Empty";
  }

  const warnings = getCompatibilityWarnings();
  const badCount = warnings.filter((warning) => warning.type === "bad").length;
  const warnCount = warnings.filter((warning) => warning.type === "warn").length;

  if (badCount > 0) {
    return "Issues";
  }

  if (selectedCount < 8) {
    return "Incomplete";
  }

  if (warnCount > 0) {
    return "Check";
  }

  return "Ready";
}

/* =========================================================
   09. COMPATIBILITY ENGINE
========================================================= */
function getCompatibilityWarnings() {
  const warnings = [];

  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const motherboard = getSelectedPart("motherboard");
  const ram = getSelectedPart("ram");
  const psu = getSelectedPart("psu");
  const pcCase = getSelectedPart("case");
  const cooler = getSelectedPart("cooler");

  const totalPrice = calculateTotalPrice();
  const budget = Number(budgetInput.value || 0);
  const wattage = calculateWattage();

  if (getSelectedPartsArray().length === 0) {
    return [{ type: "good", text: "Select parts to start compatibility checks." }];
  }

  if (budget > 0 && totalPrice > budget) {
    warnings.push({
      type: "bad",
      issueType: "budget",
      text: "Build is over budget by " + formatMoney(totalPrice - budget) + "."
    });
  }

  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    warnings.push({
      type: "bad",
      issueType: "socket",
      text: "CPU socket mismatch. CPU is " + cpu.socket + ", motherboard is " + motherboard.socket + "."
    });
  }

  if (ram && motherboard && ram.ramType !== motherboard.ramType) {
    warnings.push({
      type: "bad",
      issueType: "ram",
      text: "RAM mismatch. RAM is " + ram.ramType + ", motherboard needs " + motherboard.ramType + "."
    });
  }

  if (psu && wattage > psu.capacity * 0.82) {
    warnings.push({
      type: "bad",
      issueType: "psu",
      text: "PSU may be too weak. Estimated wattage is " + wattage + "W and PSU is " + psu.capacity + "W."
    });
  }

  if (gpu && pcCase && gpu.length > pcCase.maxGpuLength) {
    warnings.push({
      type: "bad",
      issueType: "gpu-case",
      text: "GPU may not fit. GPU length is " + gpu.length + "mm, case supports " + pcCase.maxGpuLength + "mm."
    });
  }

  if (cpu && cooler && cpu.wattage > cooler.maxCpuWattage) {
    warnings.push({
      type: "warn",
      issueType: "cooler-power",
      text: "Cooler may be weak. CPU is " + cpu.wattage + "W, cooler rating is " + cooler.maxCpuWattage + "W."
    });
  }

  if (cpu && cooler && !cooler.sockets.includes(cpu.socket)) {
    warnings.push({
      type: "bad",
      issueType: "cooler-socket",
      text: "Cooler does not support CPU socket " + cpu.socket + "."
    });
  }

  if (gpu && psu && gpu.wattage >= 320 && psu.capacity < 850) {
    warnings.push({
      type: "warn",
      issueType: "psu-high-gpu",
      text: "High-end GPU selected. 850W or stronger PSU recommended."
    });
  }

  const missing = Object.keys(build).filter((category) => !getSelectedPart(category));

  if (missing.length > 0) {
    warnings.push({
      type: "warn",
      text: "Missing parts: " + missing.map((category) => categoryLabels[category]).join(", ") + "."
    });
  }

  if (warnings.length === 0) {
    warnings.push({
      type: "good",
      text: "No compatibility issues found. Build looks ready."
    });
  }

  return warnings;
}

function getCompatibilitySuggestions() {
  const suggestions = [];

  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const motherboard = getSelectedPart("motherboard");
  const ram = getSelectedPart("ram");
  const psu = getSelectedPart("psu");
  const pcCase = getSelectedPart("case");
  const cooler = getSelectedPart("cooler");

  const totalPrice = calculateTotalPrice();
  const budget = Number(budgetInput.value || 0);
  const wattage = calculateWattage();

  function addSuggestion(issueType, issueText, category, part) {
    if (!part) {
      return;
    }

    const alreadySelected = build[category] === part.id;

    if (alreadySelected) {
      return;
    }

    const alreadyExists = suggestions.some((suggestion) => {
      return suggestion.issueType === issueType &&
        suggestion.category === category &&
        suggestion.part.id === part.id;
    });

    if (alreadyExists) {
      return;
    }

    suggestions.push({
      issueType,
      issueText,
      category,
      part
    });
  }

  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    const issueText = "CPU socket mismatch. CPU is " + cpu.socket + ", motherboard is " + motherboard.socket + ".";

    partsDB.motherboard
      .filter((part) => part.socket === cpu.socket)
      .filter((part) => !ram || part.ramType === ram.ramType)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)
      .forEach((part) => addSuggestion("socket", issueText, "motherboard", part));

    partsDB.cpu
      .filter((part) => part.socket === motherboard.socket)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .forEach((part) => addSuggestion("socket", issueText, "cpu", part));
  }

  if (ram && motherboard && ram.ramType !== motherboard.ramType) {
    const issueText = "RAM mismatch. RAM is " + ram.ramType + ", motherboard needs " + motherboard.ramType + ".";

    partsDB.ram
      .filter((part) => part.ramType === motherboard.ramType)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .forEach((part) => addSuggestion("ram", issueText, "ram", part));

    partsDB.motherboard
      .filter((part) => part.ramType === ram.ramType)
      .filter((part) => !cpu || part.socket === cpu.socket)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .forEach((part) => addSuggestion("ram", issueText, "motherboard", part));
  }

  if (psu && wattage > psu.capacity * 0.82) {
    const issueText = "PSU may be too weak. Estimated wattage is " + wattage + "W and PSU is " + psu.capacity + "W.";

    partsDB.psu
      .filter((part) => wattage <= part.capacity * 0.82)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)
      .forEach((part) => addSuggestion("psu", issueText, "psu", part));
  }

  if (gpu && psu && gpu.wattage >= 320 && psu.capacity < 850) {
    const issueText = "High-end GPU selected. 850W or stronger PSU recommended.";

    partsDB.psu
      .filter((part) => part.capacity >= 850)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)
      .forEach((part) => addSuggestion("psu-high-gpu", issueText, "psu", part));
  }

  if (gpu && pcCase && gpu.length > pcCase.maxGpuLength) {
    const issueText = "GPU may not fit. GPU length is " + gpu.length + "mm, case supports " + pcCase.maxGpuLength + "mm.";

    partsDB.case
      .filter((part) => part.maxGpuLength >= gpu.length)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)
      .forEach((part) => addSuggestion("gpu-case", issueText, "case", part));

    partsDB.gpu
      .filter((part) => part.length <= pcCase.maxGpuLength)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .forEach((part) => addSuggestion("gpu-case", issueText, "gpu", part));
  }

  if (cpu && cooler && cpu.wattage > cooler.maxCpuWattage) {
    const issueText = "Cooler may be weak. CPU is " + cpu.wattage + "W, cooler rating is " + cooler.maxCpuWattage + "W.";

    partsDB.cooler
      .filter((part) => part.maxCpuWattage >= cpu.wattage)
      .filter((part) => part.sockets.includes(cpu.socket))
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)
      .forEach((part) => addSuggestion("cooler-power", issueText, "cooler", part));
  }

  if (cpu && cooler && !cooler.sockets.includes(cpu.socket)) {
    const issueText = "Cooler does not support CPU socket " + cpu.socket + ".";

    partsDB.cooler
      .filter((part) => part.sockets.includes(cpu.socket))
      .filter((part) => part.maxCpuWattage >= cpu.wattage)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)
      .forEach((part) => addSuggestion("cooler-socket", issueText, "cooler", part));
  }

  if (budget > 0 && totalPrice > budget) {
    const issueText = "Build is over budget by " + formatMoney(totalPrice - budget) + ".";

    Object.keys(build).forEach((category) => {
      const selected = getSelectedPart(category);

      if (!selected) {
        return;
      }

      partsDB[category]
        .filter((part) => part.price < selected.price)
        .sort((a, b) => (b.score / Math.max(b.price, 1)) - (a.score / Math.max(a.price, 1)))
        .slice(0, 1)
        .forEach((part) => addSuggestion("budget", issueText, category, part));
    });
  }

  return suggestions;
}

/* =========================================================
   10. FILTERING / SORTING
========================================================= */
function getVisibleParts() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const sort = sortSelect ? sortSelect.value : "recommended";
  const brand = brandFilter ? brandFilter.value : "all";
  const retailer = retailerFilter ? retailerFilter.value : "trusted";
  const platform = platformFilter ? platformFilter.value : "all";

  const minPrice = minPriceInput ? Number(minPriceInput.value || 0) : 0;
  const maxPrice = maxPriceInput ? Number(maxPriceInput.value || 0) : 0;
  const minScore = minScoreInput ? Number(minScoreInput.value || 0) : 0;
  const minRating = minRatingInput ? Number(minRatingInput.value || 0) : 0;
  const maxWattage = maxWattageInput ? Number(maxWattageInput.value || 0) : 0;

  let parts = [...partsDB[activeCategory]];

  if (query) {
    parts = parts.filter((part) => {
      return getPartSearchText(part).includes(query);
    });
  }

  if (brand && brand !== "all") {
    parts = parts.filter((part) => {
      return String(part.brand || "").toLowerCase() === brand.toLowerCase();
    });
  }

  if (platform && platform !== "all") {
    parts = parts.filter((part) => partMatchesPlatform(part, platform));
  }

  if (retailer && retailer !== "all" && retailer !== "trusted") {
    parts = parts.filter((part) => {
      return String(part.source || part.seller || "").toLowerCase().includes(retailer.toLowerCase());
    });
  }

  if (minPrice > 0) {
    parts = parts.filter((part) => Number(part.price || 0) >= minPrice);
  }

  if (maxPrice > 0) {
    parts = parts.filter((part) => Number(part.price || 0) <= maxPrice);
  }

  if (minScore > 0) {
    parts = parts.filter((part) => Number(part.score || 0) >= minScore);
  }

  if (minRating > 0) {
    parts = parts.filter((part) => Number(part.rating || 0) >= minRating);
  }

  if (maxWattage > 0) {
    parts = parts.filter((part) => Number(part.wattage || 0) <= maxWattage);
  }

  if (sort === "priceLow") {
    parts.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceHigh") {
    parts.sort((a, b) => b.price - a.price);
  }

  if (sort === "performance") {
    parts.sort((a, b) => b.score - a.score);
  }

  if (sort === "rating") {
    parts.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  }

  if (sort === "trusted") {
    parts.sort((a, b) => Number(b.trustScore || 0) - Number(a.trustScore || 0));
  }

  if (sort === "recommended") {
    parts.sort((a, b) => getRecommendedScore(b, goalSelect.value) - getRecommendedScore(a, goalSelect.value));
  }

  return parts;
}

function getPartSearchText(part) {
  const specsText = part.specs
    ? Object.keys(part.specs).map((key) => key + " " + part.specs[key]).join(" ")
    : "";

  return [
    part.name,
    part.brand,
    part.use,
    part.price,
    part.wattage,
    part.score,
    part.socket,
    part.ramType,
    part.formFactor,
    part.capacity,
    part.length,
    part.generation,
    part.tier,
    part.vram,
    part.source,
    part.seller,
    specsText
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function partMatchesPlatform(part, platform) {
  const wanted = String(platform || "").toLowerCase();

  if (!wanted || wanted === "all") {
    return true;
  }

  if (wanted === "16gb+") {
    return /\b(16|20|24|32|48)gb\b/i.test(getPartSearchText(part));
  }

  if (wanted === "12gb+") {
    return /\b(12|16|20|24|32|48)gb\b/i.test(getPartSearchText(part));
  }

  if (wanted === "rtx 50") {
    return /\brtx\s?50\d{2}\b/i.test(getPartSearchText(part));
  }

  if (wanted === "rtx 40") {
    return /\brtx\s?40\d{2}\b/i.test(getPartSearchText(part));
  }

  if (wanted === "rx 9000") {
    return /\brx\s?9\d{3}\b/i.test(getPartSearchText(part));
  }

  if (wanted === "rx 7000") {
    return /\brx\s?7\d{3}\b/i.test(getPartSearchText(part));
  }

  if (wanted === "rx 6000") {
    return /\brx\s?6\d{3}\b/i.test(getPartSearchText(part));
  }

  if (wanted === "850w+") {
    return Number(part.capacity || 0) >= 850 || /\b(850|900|1000|1200|1300|1500)w\b/i.test(getPartSearchText(part));
  }

  if (wanted === "750w+") {
    return Number(part.capacity || 0) >= 750 || /\b(750|850|900|1000|1200|1300|1500)w\b/i.test(getPartSearchText(part));
  }

  return getPartSearchText(part).includes(wanted);
}

function renderBrandFilter() {
  if (!brandFilter || !partsDB[activeCategory]) {
    return;
  }

  const currentValue = brandFilter.value || "all";
  const sourceParts = emxLiveModeActive ? emxLiveProducts : partsDB[activeCategory];

  const brands = [...new Set([
    ...(knownBrandsByCategory[activeCategory] || []),
    ...sourceParts
      .map((part) => String(part.brand || "").trim())
      .filter(Boolean)
  ])].sort((a, b) => a.localeCompare(b));

  brandFilter.innerHTML = `
    <option value="all">All Brands</option>
    ${brands.map((brand) => `<option value="${escapeHtml(brand)}">${escapeHtml(brand)}</option>`).join("")}
  `;

  const stillExists = brands.some((brand) => brand.toLowerCase() === currentValue.toLowerCase());

  brandFilter.value = stillExists ? currentValue : "all";
}

function renderRetailerFilter(parts = []) {
  if (!retailerFilter) {
    return;
  }

  const currentValue = retailerFilter.value || "trusted";
  const retailers = [...new Set([
    ...trustedRetailers,
    ...parts
      .map((part) => String(part.source || part.seller || "").trim())
      .filter(Boolean)
  ])].sort((a, b) => a.localeCompare(b));

  retailerFilter.innerHTML = `
    <option value="trusted">Trusted Stores</option>
    <option value="all">All Safe Results</option>
    ${retailers.map((retailer) => `<option value="${escapeHtml(retailer)}">${escapeHtml(retailer)}</option>`).join("")}
  `;

  const stillExists = currentValue === "trusted" || currentValue === "all" || retailers.some((retailer) => {
    return retailer.toLowerCase() === currentValue.toLowerCase();
  });

  retailerFilter.value = stillExists ? currentValue : "trusted";
}

function renderPlatformFilter() {
  if (!platformFilter) {
    return;
  }

  const currentValue = platformFilter.value || "all";
  const options = platformOptionsByCategory[activeCategory] || [];

  platformFilter.innerHTML = `
    <option value="all">Any Spec</option>
    ${options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}
  `;

  const stillExists = options.some((option) => option.toLowerCase() === currentValue.toLowerCase());
  platformFilter.value = stillExists ? currentValue : "all";
}

function clearAdvancedFilters() {
  if (searchInput) searchInput.value = "";
  if (brandFilter) brandFilter.value = "all";
  if (retailerFilter) retailerFilter.value = "trusted";
  if (conditionFilter) conditionFilter.value = "new";
  if (platformFilter) platformFilter.value = "all";
  if (minPriceInput) minPriceInput.value = "";
  if (maxPriceInput) maxPriceInput.value = "";
  if (minScoreInput) minScoreInput.value = "";
  if (minRatingInput) minRatingInput.value = "";
  if (maxWattageInput) maxWattageInput.value = "";
  if (sortSelect) sortSelect.value = "recommended";

  renderParts();
  showToast("Filters reset.", "good");
}

function getRecommendedScore(part, goal) {
  let score = part.score;

  if (goal === "budget") {
    score += Math.max(0, 100 - part.price / 5);
  }

  if (goal === "fortnite") {
    score += part.score * 0.3;

    if (part.name.toLowerCase().includes("x3d")) {
      score += 12;
    }

    if (part.brand === "NVIDIA") {
      score += 4;
    }
  }

  if (goal === "streaming") {
    if (part.brand === "NVIDIA") {
      score += 8;
    }

    if (String(part.specs?.Cores || "").includes("16")) {
      score += 8;
    }
  }

  if (goal === "creator") {
    if (String(part.specs?.Capacity || "").includes("64GB")) {
      score += 14;
    }

    if (String(part.specs?.VRAM || "").includes("16GB") || String(part.specs?.VRAM || "").includes("24GB")) {
      score += 12;
    }
  }

  if (goal === "elite") {
    score += part.score * 0.45;
  }

  return score;
}

/* =========================================================
   11. RENDER SYSTEM
========================================================= */
function renderAll() {
  renderSummary();
  renderWarnings();
  renderSelectedParts();
  renderParts();
  renderSavedBuilds();
}

function renderSummary() {
  totalPriceText.textContent = formatMoney(calculateTotalPrice());
  wattageText.textContent = calculateWattage() + "W";
  fpsScoreText.textContent = calculateFpsScore();
  statusText.textContent = getBuildStatus();
}

function renderWarnings() {
  const warnings = getCompatibilityWarnings();
  const suggestions = getCompatibilitySuggestions();

  warningsList.innerHTML = warnings
    .map((warning) => {
      const matchingSuggestions = suggestions.filter((suggestion) => {
        return suggestion.issueType === warning.issueType || suggestion.issueText === warning.text;
      });

      const suggestionHtml = matchingSuggestions.length
        ? `
          <div class="suggestion-box">
            <div class="suggestion-title">Compatible swap options</div>
            ${matchingSuggestions
              .map((suggestion) => {
                return `
                  <button
                    class="suggestion-card"
                    data-suggest-category="${escapeHtml(suggestion.category)}"
                    data-suggest-id="${escapeHtml(suggestion.part.id)}"
                    type="button"
                  >
                    <strong>${escapeHtml(categoryLabels[suggestion.category])}: ${escapeHtml(suggestion.part.name)}</strong>
                    <span>${formatMoney(suggestion.part.price)}  -  Score ${suggestion.part.score}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        `
        : "";

      return `
        <div class="warning ${warning.type}">
          ${escapeHtml(warning.text)}
          ${suggestionHtml}
        </div>
      `;
    })
    .join("");
}

function renderSelectedParts() {
  selectedPartsList.innerHTML = Object.keys(build)
    .map((category) => {
      const part = getSelectedPart(category);
      const label = categoryLabels[category];

      if (!part) {
        return `
          <div class="selected-row">
            <span>${escapeHtml(label)}</span>
            <strong>Not selected</strong>
            <em>$0</em>
          </div>
        `;
      }

      return `
        <div class="selected-row">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(part.name)}</strong>
          <em>${formatMoney(part.price)}</em>
        </div>
      `;
    })
    .join("");
}

function renderParts() {
  renderBrandFilter();
  renderPlatformFilter();

  const parts = getVisibleParts();
  renderRetailerFilter(parts);
  categoryTitleText.textContent = categoryLabels[activeCategory] + " Parts (" + parts.length + ")";

  if (parts.length === 0) {
    partsList.innerHTML = `<div class="warning warn">No parts found for this search.</div>`;
    return;
  }

  partsList.innerHTML = parts.map(renderPartCard).join("");
}

function getPartVisualMarkup(part) {
  const label = categoryLabels[part.category || activeCategory] || "Part";

  if (part.image) {
    return `
      <div class="part-thumb-wrap">
        <img src="${escapeHtml(part.image)}" alt="${escapeHtml(part.name)}" loading="lazy">
      </div>
    `;
  }

  return `
    <div class="part-thumb-wrap part-thumb-placeholder" aria-label="${escapeHtml(label)} preview">
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function renderPartCard(part) {
  const isSelected = build[activeCategory] === part.id;

  const specsHtml = Object.keys(part.specs)
    .map((key) => {
      return `
        <div class="spec">
          <span>${escapeHtml(key)}</span>
          <strong>${escapeHtml(part.specs[key])}</strong>
        </div>
      `;
    })
    .join("");

  return `
    <article class="part-card ${isSelected ? "selected" : ""}">
      ${getPartVisualMarkup(part)}

      <div class="part-top">
        <div class="part-info">
          <span>${escapeHtml(part.brand)}</span>
          <h4>${escapeHtml(part.name)}</h4>
          <p>${escapeHtml(part.use || "Curated PC part")} - Performance Score ${part.score}</p>
        </div>

        <div class="part-price">${formatMoney(part.price)}</div>
      </div>

      <div class="spec-grid">
        ${specsHtml}
      </div>

      <div class="card-actions">
        <button class="select-btn" data-part-id="${escapeHtml(part.id)}" type="button">
          ${isSelected ? "Selected" : "Select Part"}
        </button>
      </div>
    </article>
  `;
}

function renderSavedBuilds() {
  const saves = getSavedBuilds();

  if (saves.length === 0) {
    savedBuildsList.innerHTML = `<div class="warning good">No saved builds yet. Press SAVE to store your current build.</div>`;
    return;
  }

  savedBuildsList.innerHTML = saves
    .slice()
    .reverse()
    .map((save) => {
      return `
        <button class="saved-build-card" data-save-id="${save.id}" type="button">
          <strong>${escapeHtml(save.name)}</strong>
          <span>${formatMoney(save.total)}  -  ${save.wattage}W  -  Score ${save.score}</span>
        </button>
      `;
    })
    .join("");
}

/* =========================================================
   12. BUILD ACTIONS
========================================================= */
function selectPart(partId) {
  const part = getPartById(activeCategory, partId);

  if (!part) {
    showToast("Part could not be selected.", "bad");
    return;
  }

  build[activeCategory] = partId;
  saveCurrentDraft();
  renderAll();

  const badWarnings = getCompatibilityWarnings().filter((warning) => warning.type === "bad");

  if (badWarnings.length > 0) {
    showToast(part.name + " added, but compatibility issues were found.", "warn");
  } else {
    showToast(part.name + " added to your build.", "good");
  }
}

function applySuggestedPart(category, partId) {
  const part = getPartById(category, partId);

  if (!part) {
    showToast("Suggested part could not be found.", "bad");
    return;
  }

  build[category] = partId;
  activeCategory = category;

  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === activeCategory);
  });

  saveCurrentDraft();
  renderAll();

  const badWarnings = getCompatibilityWarnings().filter((warning) => warning.type === "bad");

  if (badWarnings.length > 0) {
    showToast("Swapped to " + part.name + ", but more issues remain.", "warn");
  } else {
    showToast("Swapped to compatible part: " + part.name + ".", "good");
  }
}

function clearBuild() {
  build = {
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooler: null
  };

  saveCurrentDraft();
  renderAll();
  showToast("Build cleared.", "warn");
}

function saveBuild() {
  const selectedCount = getSelectedPartsArray().length;

  if (selectedCount === 0) {
    showToast("Select at least one part before saving.", "bad");
    return;
  }

  const saves = getSavedBuilds();

  const save = {
    id: Date.now(),
    name: "EMX Build " + new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    build: { ...build },
    budget: Number(budgetInput.value || 0),
    goal: goalSelect.value,
    total: calculateTotalPrice(),
    wattage: calculateWattage(),
    score: calculateFpsScore()
  };

  saves.push(save);
  localStorage.setItem("emx_pc_builder_saves", JSON.stringify(saves));

  saveCurrentDraft();
  renderAll();
  showToast("Build saved locally.", "good");
}

function loadBuildById(id) {
  const saves = getSavedBuilds();
  const save = saves.find((item) => String(item.id) === String(id));

  if (!save) {
    showToast("Saved build not found.", "bad");
    return;
  }

  build = { ...save.build };
  budgetInput.value = save.budget || 1500;
  goalSelect.value = save.goal || "budget";

  saveCurrentDraft();
  renderAll();
  showToast(save.name + " loaded.", "good");
}

function loadLatestBuild() {
  const saves = getSavedBuilds();

  if (saves.length === 0) {
    showToast("No saved builds yet.", "bad");
    return;
  }

  loadBuildById(saves[saves.length - 1].id);
}

async function copyBuildToClipboard() {
  const selectedCount = getSelectedPartsArray().length;
  
  if (selectedCount === 0) {
    showToast("No parts selected to copy.", "bad");
    return;
  }
  
  const text = getBuildText();
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      showToast("Build copied to clipboard.", "good");
      return;
    }
    
    fallbackCopyText(text);
  } catch (error) {
    fallbackCopyText(text);
  }
}

function getBuildText() {
  const lines = [];
  
  lines.push("EMX PC Builder Parts List");
  lines.push("NOTE: Live Search results include current store data when SerpAPI is configured. Curated entries use estimated specs.");
  lines.push("-------------------------");
  
  Object.keys(build).forEach((category) => {
    const part = getSelectedPart(category);
    lines.push(categoryLabels[category] + ": " + (part ? part.name + " - " + formatMoney(part.price) : "Not selected"));
  });
  
  lines.push("-------------------------");
  lines.push("Total: " + formatMoney(calculateTotalPrice()));
  lines.push("Estimated Wattage: " + calculateWattage() + "W");
  lines.push("Estimated FPS Score: " + calculateFpsScore());
  lines.push("Status: " + getBuildStatus());
  
  return lines.join("\n");
}

function fallbackCopyText(text) {
  openManualCopyModal(text);
}

function openManualCopyModal(text) {
  if (!manualCopyModal || !manualCopyText) {
    alert(text);
    return;
  }
  
  manualCopyText.value = text;
  manualCopyModal.classList.add("active");
  
  setTimeout(() => {
    manualCopyText.focus();
    manualCopyText.select();
    manualCopyText.setSelectionRange(0, manualCopyText.value.length);
  }, 80);
  
  showToast("Manual copy mode opened.", "warn");
}

function closeManualCopyModal() {
  if (!manualCopyModal) {
    return;
  }
  
  manualCopyModal.classList.remove("active");
}

function selectManualCopyText() {
  if (!manualCopyText) {
    return;
  }
  
  manualCopyText.focus();
  manualCopyText.select();
  manualCopyText.setSelectionRange(0, manualCopyText.value.length);
  showToast("Report text selected. Use copy from your phone menu.", "good");
}
/* =========================================================
   13. STORAGE
========================================================= */
function saveCurrentDraft() {
  const draft = {
    build: { ...build },
    budget: Number(budgetInput.value || 0),
    goal: goalSelect.value
  };

  localStorage.setItem("emx_pc_builder_draft", JSON.stringify(draft));
}

function loadCurrentDraft() {
  const saved = localStorage.getItem("emx_pc_builder_draft");

  if (!saved) {
    return;
  }

  try {
    const draft = JSON.parse(saved);

    build = {
      cpu: draft.build?.cpu || null,
      gpu: draft.build?.gpu || null,
      motherboard: draft.build?.motherboard || null,
      ram: draft.build?.ram || null,
      storage: draft.build?.storage || null,
      psu: draft.build?.psu || null,
      case: draft.build?.case || null,
      cooler: draft.build?.cooler || null
    };

    if (typeof draft.budget === "number") {
      budgetInput.value = draft.budget;
    }

    if (draft.goal) {
      goalSelect.value = draft.goal;
    }
  } catch (error) {
    console.warn("Could not load EMX draft:", error);
  }
}

function getSavedBuilds() {
  const saved = localStorage.getItem("emx_pc_builder_saves");

  if (!saved) {
    return [];
  }

  try {
    const saves = JSON.parse(saved);
    return Array.isArray(saves) ? saves : [];
  } catch (error) {
    return [];
  }
}

/* =========================================================
   14. EMX PERFORMANCE REPORT SYSTEM
========================================================= */
function getPerformanceTier(score) {
  if (score >= 95) {
    return {
      grade: "S+",
      label: "Extreme Elite",
      text: "This build is positioned for top-tier high refresh gaming and heavy multitasking."
    };
  }

  if (score >= 88) {
    return {
      grade: "S",
      label: "Elite",
      text: "This build should deliver excellent high refresh performance in most modern games."
    };
  }

  if (score >= 78) {
    return {
      grade: "A",
      label: "High Performance",
      text: "This build is strong for competitive gaming and smooth 1440p-style performance."
    };
  }

  if (score >= 65) {
    return {
      grade: "B",
      label: "Balanced Gaming",
      text: "This build is solid for mainstream gaming with good settings control."
    };
  }

  if (score >= 50) {
    return {
      grade: "C",
      label: "Entry Gaming",
      text: "This build can game, but settings may need to be reduced for higher FPS targets."
    };
  }

  if (score > 0) {
    return {
      grade: "D",
      label: "Basic",
      text: "This build is incomplete or low performance. Add stronger core parts for better output."
    };
  }

  return {
    grade: "--",
    label: "No Build",
    text: "Select parts first to generate a meaningful EMX report."
  };
}

function estimateGameFps() {
  const score = calculateFpsScore();

  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const ram = getSelectedPart("ram");

  const cpuScore = cpu ? cpu.score : 0;
  const gpuScore = gpu ? gpu.score : 0;
  const ramScore = ram ? ram.score : 0;

  const balancePenalty = Math.abs(cpuScore - gpuScore) > 25 ? 0.88 : 1;
  const ramBonus = ramScore >= 86 ? 1.06 : ramScore >= 72 ? 1.02 : 0.96;

  function fps(base, scale, cap) {
    if (score <= 0) {
      return 0;
    }

    const raw = (base + score * scale) * balancePenalty * ramBonus;
    return Math.max(25, Math.min(cap, Math.round(raw)));
  }

  return [
    {
      game: "Fortnite Performance Mode",
      fps: fps(40, 5.8, 520),
      note: "Competitive settings estimate. CPU and GPU balance matter heavily."
    },
    {
      game: "Fortnite DX12 High Settings",
      fps: fps(30, 3.5, 300),
      note: "Heavier visual settings estimate with more GPU pressure."
    },
    {
      game: "Valorant Competitive",
      fps: fps(80, 6.2, 600),
      note: "Light esports title estimate. High refresh monitor recommended."
    },
    {
      game: "Call of Duty / Warzone",
      fps: fps(20, 2.4, 220),
      note: "Heavier shooter estimate. GPU and RAM capacity matter more."
    },
    {
      game: "GTA V / FiveM",
      fps: fps(35, 2.8, 240),
      note: "Server/mod load can change real performance heavily."
    },
    {
      game: "Apex Legends",
      fps: fps(35, 3.0, 280),
      note: "Balanced esports estimate with GPU-heavy scenes."
    }
  ];
}

function getPeripheralSuggestions() {
  const score = calculateFpsScore();
  const total = calculateTotalPrice();

  let monitor = "1080p 144Hz monitor";
  let keyboard = "Mechanical keyboard with low-latency switches";
  let mouse = "Lightweight gaming mouse, 1K polling";
  let headset = "Closed-back gaming headset with clear mic";

  if (score >= 78) {
    monitor = "1440p 165Hz or 1080p 240Hz monitor";
    keyboard = "Low-latency mechanical keyboard with rapid trigger-style feel";
    mouse = "Lightweight 1K-4K polling gaming mouse";
    headset = "Low-latency wireless headset or clean wired headset";
  }

  if (score >= 88) {
    monitor = "1440p 240Hz or 1080p 360Hz esports monitor";
    keyboard = "Premium rapid-trigger keyboard for competitive inputs";
    mouse = "Ultra-light 4K/8K polling mouse";
    headset = "Premium spatial audio headset or studio headphones + mic";
  }

  if (total > 0 && total < 900) {
    monitor = "1080p 144Hz budget monitor";
  }

  return [
    { title: "Monitor", text: monitor },
    { title: "Keyboard", text: keyboard },
    { title: "Mouse", text: mouse },
    { title: "Audio", text: headset }
  ];
}

function getUpgradeRecommendations() {
  const recommendations = [];

  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const ram = getSelectedPart("ram");
  const storage = getSelectedPart("storage");
  const psu = getSelectedPart("psu");
  const cooler = getSelectedPart("cooler");

  if (!cpu) recommendations.push({ title: "Add CPU", text: "CPU is required for a real performance estimate and compatibility check." });
  if (!gpu) recommendations.push({ title: "Add GPU", text: "GPU has the largest impact on most gaming FPS projections." });
  if (!ram) recommendations.push({ title: "Add RAM", text: "RAM affects smoothness, multitasking, and modern game stability." });
  if (!storage) recommendations.push({ title: "Add Storage", text: "NVMe storage improves load times and overall system responsiveness." });
  if (!psu) recommendations.push({ title: "Add PSU", text: "PSU capacity is required to verify power safety." });
  if (!cooler) recommendations.push({ title: "Add Cooler", text: "Cooler selection helps prevent thermal limits on stronger CPUs." });

  if (cpu && gpu) {
    if (gpu.score - cpu.score >= 22) {
      recommendations.push({
        title: "CPU Upgrade Recommended",
        text: "GPU is much stronger than CPU. A better CPU may reduce bottlenecks in high-FPS games."
      });
    }

    if (cpu.score - gpu.score >= 22) {
      recommendations.push({
        title: "GPU Upgrade Recommended",
        text: "CPU is much stronger than GPU. A better GPU would improve visual settings and average FPS."
      });
    }
  }

  if (ram && ram.capacity < 32) {
    recommendations.push({
      title: "RAM Upgrade Recommended",
      text: "32GB RAM is recommended for modern gaming, streaming, and multitasking."
    });
  }

  const badWarnings = getCompatibilityWarnings().filter((warning) => warning.type === "bad");

  if (badWarnings.length > 0) {
    recommendations.push({
      title: "Fix Compatibility First",
      text: "This build has blocking compatibility issues. Use the compatible swap options before buying."
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Build Looks Balanced",
      text: "No major upgrade priority found. This build is balanced for the selected parts."
    });
  }

  return recommendations.slice(0, 6);
}

function getReportNotes() {
  const notes = [];

  const status = getBuildStatus();
  const score = calculateFpsScore();
  const total = calculateTotalPrice();
  const budget = Number(budgetInput.value || 0);
  const wattage = calculateWattage();
  const psu = getSelectedPart("psu");
  const warnings = getCompatibilityWarnings();

  const badCount = warnings.filter((warning) => warning.type === "bad").length;
  const warnCount = warnings.filter((warning) => warning.type === "warn").length;
  const tier = getPerformanceTier(score);

  notes.push({
    type: score >= 78 ? "good" : score > 0 ? "warn" : "bad",
    text: tier.label + ": " + tier.text
  });

  if (budget > 0) {
    if (total <= budget) {
      notes.push({
        type: "good",
        text: "Budget check passed. Build is " + formatMoney(budget - total) + " under budget."
      });
    } else {
      notes.push({
        type: "bad",
        text: "Budget check failed. Build is " + formatMoney(total - budget) + " over budget."
      });
    }
  }

  if (psu) {
    const headroom = psu.capacity - wattage;

    notes.push({
      type: headroom >= 150 ? "good" : headroom >= 75 ? "warn" : "bad",
      text: "Power headroom: estimated " + wattage + "W draw with a " + psu.capacity + "W PSU. Approx. " + headroom + "W headroom."
    });
  }

  if (badCount > 0) {
    notes.push({
      type: "bad",
      text: badCount + " blocking compatibility issue(s) found. Fix these before considering the build ready."
    });
  } else if (warnCount > 0) {
    notes.push({
      type: "warn",
      text: warnCount + " warning(s) found. Build may work, but should be reviewed."
    });
  } else if (status === "Ready") {
    notes.push({
      type: "good",
      text: "Compatibility status is clean. Build is marked ready."
    });
  }

  return notes;
}

function openPerformanceReport() {
  if (!reportModal) {
    showToast("Report modal HTML is missing from index.html.", "bad");
    return;
  }

  renderPerformanceReport();
  reportModal.classList.add("active");
  document.body.style.overflow = "hidden";
  showToast("EMX performance report generated.", "good");
}

function closePerformanceReport() {
  if (!reportModal) {
    return;
  }

  reportModal.classList.remove("active");
  document.body.style.overflow = "";
}

function renderPerformanceReport() {
  const score = calculateFpsScore();
  const tier = getPerformanceTier(score);
  const selectedCount = getSelectedPartsArray().length;

  reportTitleText.textContent = selectedCount > 0 ? tier.label + " Build" : "Build Analysis";
  reportSubtitleText.textContent = selectedCount > 0
    ? "Detailed estimated performance, compatibility, upgrade, and peripheral recommendations for your selected EMX build."
    : "Select PC parts first to unlock a complete EMX performance report.";

  reportGradeText.textContent = tier.grade;
  reportPriceText.textContent = formatMoney(calculateTotalPrice());
  reportWattageText.textContent = calculateWattage() + "W";
  reportFpsScoreText.textContent = score;
  reportStatusText.textContent = getBuildStatus();

  reportGamesList.innerHTML = estimateGameFps()
    .map((item) => {
      return `
        <div class="game-fps-row">
          <div>
            <strong>${escapeHtml(item.game)}</strong>
            <small>${escapeHtml(item.note)}</small>
          </div>
          <span>${item.fps} FPS</span>
        </div>
      `;
    })
    .join("");

  reportNotesList.innerHTML = getReportNotes()
    .map((note) => `<div class="report-note ${note.type}">${escapeHtml(note.text)}</div>`)
    .join("");

  reportPeripheralsList.innerHTML = getPeripheralSuggestions()
    .map((item) => {
      return `
        <div class="peripheral-row">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `;
    })
    .join("");

  reportUpgradeList.innerHTML = getUpgradeRecommendations()
    .map((item) => {
      return `
        <div class="upgrade-row">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `;
    })
    .join("");
}

function getReportText() {
  const score = calculateFpsScore();
  const tier = getPerformanceTier(score);
  const lines = [];

  lines.push("EMX PERFORMANCE REPORT");
  lines.push("NOTE: Reports use estimated projections; live results include current store data when SerpAPI is configured.");
  lines.push("-------------------------");
  lines.push("Rating: " + tier.grade + " - " + tier.label);
  lines.push("Total Price: " + formatMoney(calculateTotalPrice()));
  lines.push("Estimated Wattage: " + calculateWattage() + "W");
  lines.push("FPS Score: " + score);
  lines.push("Status: " + getBuildStatus());
  lines.push("");

  lines.push("Selected Parts:");
  Object.keys(build).forEach((category) => {
    const part = getSelectedPart(category);
    lines.push(categoryLabels[category] + ": " + (part ? part.name + " - " + formatMoney(part.price) : "Not selected"));
  });

  lines.push("");
  lines.push("Estimated Game FPS:");
  estimateGameFps().forEach((game) => {
    lines.push(game.game + ": " + game.fps + " FPS");
  });

  lines.push("");
  lines.push("Performance Notes:");
  getReportNotes().forEach((note) => {
    lines.push("- " + note.text);
  });

  lines.push("");
  lines.push("Suggested Peripherals:");
  getPeripheralSuggestions().forEach((item) => {
    lines.push("- " + item.title + ": " + item.text);
  });

  lines.push("");
  lines.push("Upgrade Priority:");
  getUpgradeRecommendations().forEach((item) => {
    lines.push("- " + item.title + ": " + item.text);
  });

  return lines.join("\n");
}

async function copyPerformanceReport() {
  const text = getReportText();

  if (!text.trim()) {
    showToast("No report text available.", "bad");
    return;
  }

  showCopyOverlay();
  updateCopyOverlay("INITIALIZING EXPORT...", 10);

  await wait(800);
  updateCopyOverlay("VALIDATING REPORT DATA...", 25);

  await wait(900);
  updateCopyOverlay("BUILDING PERFORMANCE REPORT...", 45);

  await wait(900);
  updateCopyOverlay("PREPARING SHARE PACKAGE...", 70);

  await wait(800);
  updateCopyOverlay("REPORT READY", 100, true);

  setTimeout(() => {
    try {
      showShareButton(text);
    } catch (error) {
      console.error("showShareButton failed:", error);
      forceExportButtons(text);
      return;
    }

    const actions = document.getElementById("copyOverlayActions");

    if (!actions) {
      forceExportButtons(text);
    }
  }, 120);
}

function forceExportButtons(text) {
  const terminal = document.querySelector(".emx-export-terminal");

  if (!terminal) {
    showToast("Export terminal not found.", "bad");
    return;
  }

  const oldActions = document.getElementById("copyOverlayActions");

  if (oldActions) {
    oldActions.remove();
  }

  const actions = document.createElement("div");
  actions.id = "copyOverlayActions";
  actions.className = "emx-terminal-actions";

  actions.innerHTML = `
    <button id="shareReportOverlayBtn" type="button">SHARE REPORT</button>
    <button id="downloadReportOverlayBtn" type="button">DOWNLOAD TXT</button>
    <button id="saveReportImageOverlayBtn" type="button">SAVE REPORT IMAGE</button>
    <button id="manualCopyOverlayBtn" type="button">MANUAL COPY</button>
    <button id="closeExportOverlayBtn" type="button">DONE</button>
  `;

  terminal.appendChild(actions);

  const shareBtn = document.getElementById("shareReportOverlayBtn");
  const downloadBtn = document.getElementById("downloadReportOverlayBtn");
  const imageBtn = document.getElementById("saveReportImageOverlayBtn");
  const manualBtn = document.getElementById("manualCopyOverlayBtn");
  const closeBtn = document.getElementById("closeExportOverlayBtn");

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          showToast("Report copied. Paste it anywhere to share.", "good");
          return;
        }
      } catch (error) {
        console.warn("Clipboard failed:", error);
      }

      hideCopyOverlay();
      openManualCopyModal(text);
      showToast("Manual copy opened.", "warn");
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      downloadReportText(text);
    });
  }

  if (imageBtn) {
    imageBtn.addEventListener("click", () => {
      downloadReportImage();
    });
  }

  if (manualBtn) {
    manualBtn.addEventListener("click", () => {
      hideCopyOverlay();
      openManualCopyModal(text);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", hideCopyOverlay);
  }
}

function showCopyOverlay() {
  if (document.getElementById("copyOverlay")) return;
  
  const overlay = document.createElement("div");
  overlay.id = "copyOverlay";
  
  overlay.innerHTML = `
  <div class="emx-export-terminal">
    <div class="emx-orbit-wrap">
      <div class="emx-orbit-ring"></div>
      <div class="emx-orbit-ring second"></div>

      <div class="emx-floating-logo">
        <img src="emx-logo.png" alt="EMX">
      </div>
    </div>

    <div class="emx-terminal-label">PERFORMANCE REPORT EXPORT</div>

    <div id="copyOverlayStatus" class="emx-terminal-status">
      INITIALIZING EXPORT...
    </div>

    <div class="emx-terminal-progress">
      <div id="copyOverlayProgress" class="emx-terminal-progress-fill"></div>
    </div>

    <div id="copyOverlayPercent" class="emx-terminal-percent">0%</div>

    <div class="emx-terminal-lines">
      <p>> Validating report data</p>
      <p>> Preparing share package</p>
      <p>> Encrypting EMX output shell</p>
    </div>
  </div>
`;
  
  document.body.appendChild(overlay);
}

function updateCopyOverlay(message, percent, success = false) {
  const status = document.getElementById("copyOverlayStatus");
  const progress = document.getElementById("copyOverlayProgress");
  const percentText = document.getElementById("copyOverlayPercent");
  
  if (status) {
    status.textContent = success ? `${message} OK` : message;
  }
  
  if (progress) {
    progress.style.width = `${percent}%`;
  }
  
  if (percentText) {
    percentText.textContent = `${percent}%`;
  }
}


async function downloadReportImage() {
  try {
    showToast("Generating report image...", "good");

    const canvas = await buildReportCanvasSafe();

    canvas.toBlob((blob) => {
      if (!blob) {
        showToast("Could not create report image.", "bad");
        return;
      }

      const imageUrl = URL.createObjectURL(blob);
      showReportImagePreview(imageUrl, blob);
      showToast("Report image preview opened.", "good");
    }, "image/png");
  } catch (error) {
    console.error(error);
    showToast("Report image failed.", "bad");
  }
}

async function buildReportCanvasSafe() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas engine unavailable.");
  }

  canvas.width = 1080;
  canvas.height = 1350;

  const score = calculateFpsScore();
  const tier = getPerformanceTier(score);
  const selectedParts = getSelectedPartsArray();

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#020403");
  gradient.addColorStop(0.55, "#07120a");
  gradient.addColorStop(1, "#12051a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.shadowColor = "#39ff14";
  ctx.shadowBlur = 34;
  ctx.strokeStyle = "#39ff14";
  ctx.lineWidth = 5;
  roundRect(ctx, 70, 70, 940, 1210, 46, false, true);

  ctx.shadowBlur = 0;

  await drawLogoOnCanvas(ctx, 540, 175);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("PERFORMANCE REPORT", 540, 300);

  ctx.fillStyle = "#39ff14";
  ctx.font = "900 106px Arial";
  ctx.fillText(tier.grade, 540, 430);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 44px Arial";
  ctx.fillText(tier.label.toUpperCase(), 540, 500);

  drawStat(ctx, "TOTAL", formatMoney(calculateTotalPrice()), 130, 585);
  drawStat(ctx, "WATTAGE", calculateWattage() + "W", 560, 585);
  drawStat(ctx, "FPS SCORE", String(score), 130, 745);
  drawStat(ctx, "STATUS", getBuildStatus(), 560, 745);

  ctx.fillStyle = "#39ff14";
  ctx.font = "900 36px Arial";
  ctx.textAlign = "left";
  ctx.fillText("SELECTED PARTS", 130, 940);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 27px Arial";

  let y = 1000;

  if (selectedParts.length === 0) {
    ctx.fillText("No parts selected yet.", 130, y);
  } else {
    selectedParts.slice(0, 8).forEach((item) => {
      const line = categoryLabels[item.category] + ": " + item.part.name;
      ctx.fillText(line.slice(0, 52), 130, y);
      y += 45;
    });
  }

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "800 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Generated by EMX PC Builder", 540, 1228);

  return canvas;
}

function getSelectedPartMap(selectedParts) {
  const map = {};

  selectedParts.forEach((item) => {
    if (!item || !item.category) return;
    map[String(item.category).toLowerCase()] = item.part || null;
  });

  return map;
}

function pickPartValue(part, keys, fallback = "N/A") {
  if (!part) return fallback;

  const lowerKeys = keys.map((k) => String(k).toLowerCase());

  const tryObject = (obj) => {
    if (!obj || typeof obj !== "object") return null;

    for (const [key, value] of Object.entries(obj)) {
      if (lowerKeys.includes(String(key).toLowerCase())) {
        if (value !== undefined && value !== null && String(value).trim() !== "") {
          return String(value);
        }
      }
    }

    return null;
  };

  return (
    tryObject(part) ||
    tryObject(part.specs) ||
    tryObject(part.details) ||
    fallback
  );
}

function extractNumberFromValue(value) {
  if (!value) return 0;
  const match = String(value).match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function getGameFpsEstimates(score) {
  const scale = Math.max(0.55, score / 75);
  const calc = (base) => Math.max(30, Math.round(base * scale));

  return [
    { name: "Fortnite", fps: calc(165) },
    { name: "Warzone", fps: calc(105) },
    { name: "Apex", fps: calc(145) },
    { name: "GTA V", fps: calc(130) }
  ];
}

function getResolutionTarget(score) {
  if (score >= 90) return "1440p High";
  if (score >= 75) return "1080p Ultra";
  if (score >= 60) return "1080p High";
  if (score >= 45) return "1080p Medium";
  return "1080p Low / Esports Settings";
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawSectionTitle(ctx, text, x, y) {
  ctx.fillStyle = "#39ff14";
  ctx.font = "900 36px Arial";
  ctx.textAlign = "left";
  ctx.fillText(text, x, y);
}

function drawCanvasCard(ctx, x, y, width, height, radius = 28) {
  ctx.save();
  ctx.shadowColor = "#39ff14";
  ctx.shadowBlur = 16;
  ctx.strokeStyle = "rgba(57,255,20,0.8)";
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, width, height, radius, false, true);
  ctx.restore();

  ctx.fillStyle = "rgba(57,255,20,0.12)";
  roundRect(ctx, x, y, width, height, radius, true, false);
}

function drawMetricCard(ctx, x, y, width, height, label, value) {
  drawCanvasCard(ctx, x, y, width, height, 24);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "900 24px Arial";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 24, y + 38);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 54px Arial";
  ctx.fillText(value, x + 24, y + 88);
}

function drawDetailCard(ctx, x, y, width, height, label, value, subline = "") {
  drawCanvasCard(ctx, x, y, width, height, 26);

  ctx.fillStyle = "#39ff14";
  ctx.font = "900 24px Arial";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 22, y + 36);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 30px Arial";
  drawWrappedText(ctx, value, x + 22, y + 75, width - 44, 34);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "800 22px Arial";
  drawWrappedText(ctx, subline, x + 22, y + 132, width - 44, 28);
}

function drawMiniGameCard(ctx, x, y, width, height, label, value) {
  drawCanvasCard(ctx, x, y, width, height, 22);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "900 24px Arial";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 18, y + 34);

  ctx.fillStyle = "#39ff14";
  ctx.font = "900 42px Arial";
  ctx.fillText(value, x + 18, y + 88);
}

function drawInfoStrip(ctx, x, y, width, height, rows) {
  drawCanvasCard(ctx, x, y, width, height, 24);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 24px Arial";
  ctx.textAlign = "left";

  let rowY = y + 28;

  rows.slice(0, 5).forEach((row) => {
    ctx.fillText(` -  ${row}`, x + 24, rowY);
    rowY += 20;
  });
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || "").split(" ");
  let line = "";
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[i] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
  }
}

function drawLogoOnCanvas(ctx, x, y) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = "emx-logo.png";

    img.onload = () => {
      ctx.save();
      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = 35;

      const size = 180;
      ctx.drawImage(img, x - size / 2, y - size / 2, size, size);

      ctx.restore();
      resolve();
    };

    img.onerror = () => {
      ctx.fillStyle = "#39ff14";
      ctx.font = "900 82px Arial";
      ctx.textAlign = "center";
      ctx.fillText("EMX", x, y + 25);
      resolve();
    };
  });
}

function showReportImagePreview(imageUrl, blob) {
  const oldPreview = document.getElementById("reportImagePreviewOverlay");
  if (oldPreview) {
    oldPreview.remove();
  }

  const overlay = document.createElement("div");
  overlay.id = "reportImagePreviewOverlay";

  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 120000;
    display: grid;
    place-items: center;
    padding: 18px;
    background: rgba(0, 0, 0, 0.86);
    backdrop-filter: blur(14px);
  `;

  overlay.innerHTML = `
    <div style="
      width: min(96vw, 560px);
      max-height: 92vh;
      overflow: auto;
      padding: 14px;
      border-radius: 26px;
      border: 1px solid rgba(57, 255, 20, 0.42);
      background: rgba(5, 8, 10, 0.96);
      box-shadow: 0 0 34px rgba(57, 255, 20, 0.2);
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      ">
        <strong style="
          color: #39ff14;
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        ">Report Image Preview</strong>

        <button id="closeReportImagePreviewBtn" type="button" style="
          width: 40px;
          height: 40px;
          border-radius: 14px;
          border: 1px solid rgba(255, 49, 93, 0.45);
          background: rgba(255, 49, 93, 0.14);
          color: #fff;
          font-size: 1.3rem;
          font-weight: 900;
        ">x</button>
      </div>

      <img src="${imageUrl}" alt="EMX Performance Report" style="
        display: block;
        width: 100%;
        border-radius: 18px;
        border: 1px solid rgba(57, 255, 20, 0.28);
        background: #000;
      ">

      <div style="
        display: grid;
        gap: 10px;
        margin-top: 12px;
      ">
        <button id="downloadPreviewImageBtn" type="button" style="
          min-height: 50px;
          border-radius: 16px;
          border: 0;
          color: #041006;
          background: linear-gradient(135deg, #39ff14, #b7ff81);
          font-weight: 950;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        ">Download PNG</button>

        <button id="openPreviewImageBtn" type="button" style="
          min-height: 50px;
          border-radius: 16px;
          border: 1px solid rgba(57, 255, 20, 0.38);
          color: #39ff14;
          background: rgba(57, 255, 20, 0.08);
          font-weight: 950;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        ">Open Image Tab</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = document.getElementById("closeReportImagePreviewBtn");
  const downloadBtn = document.getElementById("downloadPreviewImageBtn");
  const openBtn = document.getElementById("openPreviewImageBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.remove();
      URL.revokeObjectURL(imageUrl);
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      fallbackDownloadReportImage(blob);
    });
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      window.open(imageUrl, "_blank");
      showToast("Image opened in new tab.", "good");
    });
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.remove();
      URL.revokeObjectURL(imageUrl);
    }
  });
}

function fallbackDownloadReportImage(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.download = "emx-performance-report.png";
  link.href = url;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 8000);

  showToast("Report image downloaded.", "good");
}

function drawStat(ctx, label, value, x, y) {
  ctx.shadowColor = "#39ff14";
  ctx.shadowBlur = 14;
  ctx.strokeStyle = "rgba(57,255,20,0.65)";
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, 390, 115, 24, false, true);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(57,255,20,0.16)";
  roundRect(ctx, x, y, 390, 115, 24, true, false);

  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.font = "900 22px Arial";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 28, y + 38);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 38px Arial";
  ctx.fillText(value, x + 28, y + 84);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fill) {
    ctx.fill();
  }

  if (stroke) {
    ctx.stroke();
  }
}
function hideCopyOverlay() {
  const overlay = document.getElementById("copyOverlay");
  
  if (overlay) {
    overlay.classList.add("closing");
    
    setTimeout(() => {
      overlay.remove();
    }, 250);
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* =========================================================
   15. EVENT LISTENERS
========================================================= */
categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".tab-btn");

  if (!button) {
    return;
  }

  activeCategory = button.dataset.category;
  
  if (brandFilter) {
    brandFilter.value = "all";
  }

  if (platformFilter) {
    platformFilter.value = "all";
  }

  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === activeCategory);
  });

  if (emxLiveModeActive) {
    emxExitLiveMode();
  } else {
    renderParts();
  }

  showToast(categoryLabels[activeCategory] + " category opened.", "good");
  emxAutoLoadLiveCategory();
});

partsList.addEventListener("click", (event) => {
  const button = event.target.closest(".select-btn");

  if (!button) {
    return;
  }

  selectPart(button.dataset.partId);
});

savedBuildsList.addEventListener("click", (event) => {
  const button = event.target.closest(".saved-build-card");

  if (!button) {
    return;
  }

  loadBuildById(button.dataset.saveId);
});

warningsList.addEventListener("click", (event) => {
  const button = event.target.closest(".suggestion-card");

  if (!button) {
    return;
  }

  applySuggestedPart(button.dataset.suggestCategory, button.dataset.suggestId);
});

searchInput.addEventListener("input", renderParts);
if (brandFilter) {
  brandFilter.addEventListener("change", renderParts);
}

if (retailerFilter) {
  retailerFilter.addEventListener("change", renderParts);
}

if (conditionFilter) {
  conditionFilter.addEventListener("change", renderParts);
}

if (platformFilter) {
  platformFilter.addEventListener("change", renderParts);
}

if (minPriceInput) {
  minPriceInput.addEventListener("input", renderParts);
}

if (maxPriceInput) {
  maxPriceInput.addEventListener("input", renderParts);
}

if (minScoreInput) {
  minScoreInput.addEventListener("input", renderParts);
}

if (minRatingInput) {
  minRatingInput.addEventListener("input", renderParts);
}

if (maxWattageInput) {
  maxWattageInput.addEventListener("input", renderParts);
}

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", clearAdvancedFilters);
}

sortSelect.addEventListener("change", () => {
  renderParts();
  showToast("Sort changed to " + sortSelect.options[sortSelect.selectedIndex].text + ".", "good");
});

budgetInput.addEventListener("input", () => {
  saveCurrentDraft();
  renderAll();
});

goalSelect.addEventListener("change", () => {
  saveCurrentDraft();
  renderAll();
  showToast("Build goal changed to " + goalSelect.options[goalSelect.selectedIndex].text + ".", "good");
});

saveBuildBtn.addEventListener("click", saveBuild);
clearBuildBtn.addEventListener("click", clearBuild);
copyBuildBtn.addEventListener("click", copyBuildToClipboard);
loadBuildBtn.addEventListener("click", loadLatestBuild);

if (openReportBtn) {
  openReportBtn.addEventListener("click", openPerformanceReport);
}

if (closeReportBtn) {
  closeReportBtn.addEventListener("click", closePerformanceReport);
}

if (reportBackdrop) {
  reportBackdrop.addEventListener("click", closePerformanceReport);
}

if (copyReportBtn) {
  copyReportBtn.addEventListener("click", copyPerformanceReport);
}

if (manualSelectBtn) {
  manualSelectBtn.addEventListener("click", selectManualCopyText);
}

if (manualCloseBtn) {
  manualCloseBtn.addEventListener("click", closeManualCopyModal);
}

if (manualCopyModal) {
  manualCopyModal.addEventListener("click", (event) => {
    if (event.target === manualCopyModal) {
      closeManualCopyModal();
    }
  });
}

/* =========================================================
   16. STARTUP
========================================================= */
loadCurrentDraft();
startSplash();
/* =========================================================
   17. EMX FINAL REPORT EXPORT OVERRIDES
   Paste this at the VERY BOTTOM of script.js
========================================================= */

function getReportText() {
  const score = calculateFpsScore();
  const tier = getPerformanceTier(score);
  const lines = [];

  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const motherboard = getSelectedPart("motherboard");
  const ram = getSelectedPart("ram");
  const storage = getSelectedPart("storage");
  const psu = getSelectedPart("psu");
  const pcCase = getSelectedPart("case");
  const cooler = getSelectedPart("cooler");

  const wattage = calculateWattage();
  const total = calculateTotalPrice();
  const psuHeadroom = psu ? psu.capacity - wattage : 0;

  lines.push("EMX PERFORMANCE REPORT");
  lines.push("Generated by EMX PC Builder");
  lines.push("NOTE: Reports use estimated projections; live results include current store data when SerpAPI is configured.");
  lines.push("=================================================");
  lines.push("");
  lines.push("OVERALL RATING");
  lines.push("Rating: " + tier.grade + " - " + tier.label);
  lines.push("Summary: " + tier.text);
  lines.push("");
  lines.push("CORE STATS");
  lines.push("Total Price: " + formatMoney(total));
  lines.push("Estimated Wattage: " + wattage + "W");
  lines.push("FPS Score: " + score + "/100");
  lines.push("Build Status: " + getBuildStatus());
  lines.push("Resolution Target: " + getResolutionTarget(score));
  lines.push("");
  lines.push("SELECTED PARTS");
  lines.push("CPU: " + (cpu ? cpu.name + " | " + cpu.specs.Cores + " | Socket " + cpu.socket + " | " + cpu.wattage + "W" : "Not selected"));
  lines.push("GPU: " + (gpu ? gpu.name + " | " + gpu.specs.VRAM + " | " + gpu.wattage + "W | " + gpu.length + "mm" : "Not selected"));
  lines.push("Motherboard: " + (motherboard ? motherboard.name + " | Socket " + motherboard.socket + " | " + motherboard.ramType + " | " + motherboard.formFactor : "Not selected"));
  lines.push("RAM: " + (ram ? ram.name + " | " + ram.specs.Capacity + " | " + ram.specs.Type + " | Speed " + ram.specs.Speed : "Not selected"));
  lines.push("Storage: " + (storage ? storage.name + " | " + storage.specs.Capacity + " | " + storage.specs.Type : "Not selected"));
  lines.push("PSU: " + (psu ? psu.name + " | " + psu.capacity + "W | Headroom " + psuHeadroom + "W" : "Not selected"));
  lines.push("Case: " + (pcCase ? pcCase.name + " | Max GPU " + pcCase.maxGpuLength + "mm | " + pcCase.specs.Airflow + " airflow" : "Not selected"));
  lines.push("Cooler: " + (cooler ? cooler.name + " | Supports up to " + cooler.maxCpuWattage + "W CPU heat" : "Not selected"));
  lines.push("");
  lines.push("ESTIMATED GAME FPS");
  estimateGameFps().forEach((game) => {
    lines.push(game.game + ": " + game.fps + " FPS - " + game.note);
  });
  lines.push("");
  lines.push("PERFORMANCE NOTES");
  getReportNotes().forEach((note) => {
    lines.push("- " + note.text);
  });
  lines.push("");
  lines.push("UPGRADE PRIORITY");
  getUpgradeRecommendations().forEach((item) => {
    lines.push("- " + item.title + ": " + item.text);
  });
  lines.push("");
  lines.push("SUGGESTED PERIPHERALS");
  getPeripheralSuggestions().forEach((item) => {
    lines.push("- " + item.title + ": " + item.text);
  });

  return lines.join("\n");
}

async function copyPerformanceReport() {
  const text = getReportText();

  if (!text.trim()) {
    showToast("No report text available.", "bad");
    return;
  }

  showCopyOverlay();
  updateCopyOverlay("INITIALIZING EXPORT...", 10);

  await wait(700);
  updateCopyOverlay("VALIDATING REPORT DATA...", 25);

  await wait(800);
  updateCopyOverlay("BUILDING PERFORMANCE REPORT...", 45);

  await wait(800);
  updateCopyOverlay("PREPARING SHARE PACKAGE...", 70);

  await wait(700);
  updateCopyOverlay("REPORT READY", 100, true);

  setTimeout(() => {
    showShareButton(text);
  }, 120);
}

function showShareButton(text) {
  const terminal = document.querySelector(".emx-export-terminal");

  if (!terminal) {
    showToast("Export terminal not found.", "bad");
    return;
  }

  const oldActions = document.getElementById("copyOverlayActions");

  if (oldActions) {
    oldActions.remove();
  }

  const actions = document.createElement("div");
  actions.id = "copyOverlayActions";
  actions.className = "emx-terminal-actions";

  actions.innerHTML = `
    <button id="downloadReportOverlayBtn" type="button">DOWNLOAD TXT</button>
    <button id="saveReportImageOverlayBtn" type="button">SAVE REPORT IMAGE</button>
    <button id="manualCopyOverlayBtn" type="button">MANUAL COPY</button>
    <button id="closeExportOverlayBtn" type="button">DONE</button>
  `;

  terminal.appendChild(actions);

  const downloadBtn = document.getElementById("downloadReportOverlayBtn");
  const imageBtn = document.getElementById("saveReportImageOverlayBtn");
  const manualBtn = document.getElementById("manualCopyOverlayBtn");
  const closeBtn = document.getElementById("closeExportOverlayBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      downloadReportText(text);
    });
  }

  if (imageBtn) {
    imageBtn.addEventListener("click", () => {
      downloadReportImage();
    });
  }

  if (manualBtn) {
    manualBtn.addEventListener("click", () => {
      hideCopyOverlay();
      openManualCopyModal(text);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", hideCopyOverlay);
  }
}

async function copyTextSafe(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn("Modern clipboard failed:", error);
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    textarea.remove();

    return success;
  } catch (error) {
    console.warn("Fallback clipboard failed:", error);
    return false;
  }
}

function downloadReportText(text) {
  try {
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = "emx-performance-report.txt";
    link.href = url;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 2000);

    showToast("Report TXT downloaded.", "good");
  } catch (error) {
    console.error(error);
    openManualCopyModal(text);
    showToast("TXT download failed. Manual copy opened.", "warn");
  }
}

async function downloadReportImage() {
  try {
    showToast("Generating detailed report image...", "good");

    const canvas = await buildReportCanvasSafe();

    canvas.toBlob((blob) => {
      if (!blob) {
        showToast("Could not create report image.", "bad");
        return;
      }

      const imageUrl = URL.createObjectURL(blob);

      hideCopyOverlay();

      setTimeout(() => {
        showReportImagePreview(imageUrl, blob);
        showToast("Detailed report image ready.", "good");
      }, 280);
    }, "image/png");
  } catch (error) {
    console.error(error);
    showToast("Report image failed.", "bad");
  }
}

async function buildReportCanvasSafe() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas engine unavailable.");
  }

  canvas.width = 1400;
  canvas.height = 2550;

  const score = calculateFpsScore();
  const tier = getPerformanceTier(score);
  const total = calculateTotalPrice();
  const wattage = calculateWattage();
  const status = getBuildStatus();

  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const motherboard = getSelectedPart("motherboard");
  const ram = getSelectedPart("ram");
  const storage = getSelectedPart("storage");
  const psu = getSelectedPart("psu");
  const pcCase = getSelectedPart("case");
  const cooler = getSelectedPart("cooler");

  const psuHeadroom = psu ? psu.capacity - wattage : 0;

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, "#020403");
  bg.addColorStop(0.38, "#061108");
  bg.addColorStop(0.72, "#08070f");
  bg.addColorStop(1, "#170520");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawNeonPanel(ctx, 70, 70, 1260, 2380, 46);

  await drawReportLogo(ctx, 700, 175);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 58px Arial";
  ctx.fillText("EMX PERFORMANCE REPORT", 700, 330);

  ctx.fillStyle = "#39ff14";
  ctx.font = "900 126px Arial";
  ctx.fillText(tier.grade, 700, 485);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 50px Arial";
  ctx.fillText(tier.label.toUpperCase(), 700, 560);

  drawBigStat(ctx, 130, 640, 540, 130, "TOTAL PRICE", formatMoney(total));
  drawBigStat(ctx, 730, 640, 540, 130, "EST. WATTAGE", wattage + "W");
  drawBigStat(ctx, 130, 810, 540, 130, "FPS SCORE", score + "/100");
  drawBigStat(ctx, 730, 810, 540, 130, "STATUS", status);

  drawSectionHeader(ctx, "CORE HARDWARE", 130, 1030);

  drawInfoCard(
    ctx,
    130,
    1070,
    540,
    165,
    "CPU",
    cpu ? cpu.name : "Not selected",
    cpu ? cpu.specs.Cores + "  -  " + cpu.socket + "  -  " + cpu.wattage + "W" : "Select a CPU"
  );

  drawInfoCard(
    ctx,
    730,
    1070,
    540,
    165,
    "GPU",
    gpu ? gpu.name : "Not selected",
    gpu ? gpu.specs.VRAM + "  -  " + gpu.wattage + "W  -  " + gpu.length + "mm" : "Select a GPU"
  );

  drawInfoCard(
    ctx,
    130,
    1270,
    540,
    165,
    "MOTHERBOARD",
    motherboard ? motherboard.name : "Not selected",
    motherboard ? motherboard.socket + "  -  " + motherboard.ramType + "  -  " + motherboard.formFactor : "Select motherboard"
  );

  drawInfoCard(
    ctx,
    730,
    1270,
    540,
    165,
    "MEMORY",
    ram ? ram.name : "Not selected",
    ram ? ram.specs.Capacity + "  -  " + ram.specs.Type + "  -  " + ram.specs.Speed : "Select RAM"
  );

  drawInfoCard(
    ctx,
    130,
    1470,
    540,
    165,
    "STORAGE",
    storage ? storage.name : "Not selected",
    storage ? storage.specs.Capacity + "  -  " + storage.specs.Type + "  -  " + storage.specs.Speed : "Select storage"
  );

  drawInfoCard(
    ctx,
    730,
    1470,
    540,
    165,
    "POWER",
    psu ? psu.name : "Not selected",
    psu ? psu.capacity + "W PSU  -  " + psuHeadroom + "W headroom" : "Select PSU"
  );

  drawInfoCard(
    ctx,
    130,
    1670,
    540,
    165,
    "CASE",
    pcCase ? pcCase.name : "Not selected",
    pcCase ? "Max GPU " + pcCase.maxGpuLength + "mm  -  " + pcCase.specs.Airflow + " airflow" : "Select case"
  );

  drawInfoCard(
    ctx,
    730,
    1670,
    540,
    165,
    "COOLING",
    cooler ? cooler.name : "Not selected",
    cooler ? "Supports up to " + cooler.maxCpuWattage + "W CPU heat" : "Select cooler"
  );

  drawSectionHeader(ctx, "ESTIMATED GAME FPS", 130, 1940);

  const games = estimateGameFps();
  const gameCards = [
    {
      name: "Fortnite Perf",
      fps: games[0] ? games[0].fps + " FPS" : "N/A"
    },
    {
      name: "Fortnite DX12",
      fps: games[1] ? games[1].fps + " FPS" : "N/A"
    },
    {
      name: "Valorant",
      fps: games[2] ? games[2].fps + " FPS" : "N/A"
    },
    {
      name: "Warzone",
      fps: games[3] ? games[3].fps + " FPS" : "N/A"
    }
  ];

  gameCards.forEach((game, index) => {
    const x = 130 + index * 300;
    drawGameCard(ctx, x, 1980, 255, 135, game.name, game.fps);
  });

  drawSectionHeader(ctx, "BUILD NOTES", 130, 2200);

  const notes = [
    "Resolution Target: " + getResolutionTarget(score),
    "PSU Headroom: " + (psu ? psuHeadroom + "W remaining" : "N/A"),
    "GPU Fit: " + getGpuFitText(gpu, pcCase),
    "Cooling: " + getCoolingText(cpu, cooler)
  ];

  drawNoteStrip(ctx, 130, 2240, 1140, 145, notes);

  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "800 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Generated by EMX PC Builder - Estimated performance report", 700, 2430);

  return canvas;
}

async function drawReportLogo(ctx, x, y) {
  try {
    const img = await loadReportImage("emx-logo.png");
    ctx.save();
    ctx.shadowColor = "#39ff14";
    ctx.shadowBlur = 30;
    ctx.drawImage(img, x - 140, y - 90, 280, 180);
    ctx.restore();
  } catch (error) {
    ctx.fillStyle = "#39ff14";
    ctx.font = "900 88px Arial";
    ctx.textAlign = "center";
    ctx.fillText("EMX", x, y + 25);
  }
}

function loadReportImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;

    img.src = src;
  });
}

function drawNeonPanel(ctx, x, y, w, h, r) {
  ctx.save();
  ctx.shadowColor = "#39ff14";
  ctx.shadowBlur = 34;
  ctx.strokeStyle = "#39ff14";
  ctx.lineWidth = 5;
  roundedCanvasRect(ctx, x, y, w, h, r);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "rgba(0, 10, 4, 0.68)";
  roundedCanvasRect(ctx, x, y, w, h, r);
  ctx.fill();
}

function drawBigStat(ctx, x, y, w, h, label, value) {
  drawSmallPanel(ctx, x, y, w, h, 26);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "900 25px Arial";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 30, y + 43);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 50px Arial";
  ctx.fillText(value, x + 30, y + 96);
}

function drawInfoCard(ctx, x, y, w, h, label, title, detail) {
  drawSmallPanel(ctx, x, y, w, h, 28);

  ctx.fillStyle = "#39ff14";
  ctx.font = "900 24px Arial";
  ctx.textAlign = "left";
  ctx.fillText(label, x + 26, y + 38);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 31px Arial";
  drawCanvasWrappedText(ctx, title, x + 26, y + 82, w - 52, 34, 2);

  ctx.fillStyle = "rgba(255,255,255,0.68)";
  ctx.font = "800 23px Arial";
  drawCanvasWrappedText(ctx, detail, x + 26, y + 145, w - 52, 28, 1);
}

function drawGameCard(ctx, x, y, w, h, game, fps) {
  drawSmallPanel(ctx, x, y, w, h, 24);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "900 23px Arial";
  ctx.textAlign = "left";
  drawCanvasWrappedText(ctx, game, x + 20, y + 36, w - 40, 26, 1);

  ctx.fillStyle = "#39ff14";
  ctx.font = "900 40px Arial";
  ctx.fillText(fps, x + 20, y + 92);
}

function drawNoteStrip(ctx, x, y, w, h, notes) {
  drawSmallPanel(ctx, x, y, w, h, 28);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 24px Arial";
  ctx.textAlign = "left";

  let yPos = y + 36;

  notes.slice(0, 4).forEach((note) => {
    drawCanvasWrappedText(ctx, " -  " + note, x + 28, yPos, w - 56, 26, 1);
    yPos += 28;
  });
}

function drawSmallPanel(ctx, x, y, w, h, r) {
  ctx.save();
  ctx.shadowColor = "#39ff14";
  ctx.shadowBlur = 16;
  ctx.strokeStyle = "rgba(57,255,20,0.72)";
  ctx.lineWidth = 3;
  roundedCanvasRect(ctx, x, y, w, h, r);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "rgba(57,255,20,0.12)";
  roundedCanvasRect(ctx, x, y, w, h, r);
  ctx.fill();
}

function drawSectionHeader(ctx, text, x, y) {
  ctx.fillStyle = "#39ff14";
  ctx.font = "900 36px Arial";
  ctx.textAlign = "left";
  ctx.fillText(text, x, y);
}

function drawCanvasWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text || "").split(" ");
  let line = "";
  let lineCount = 0;
  let yPos = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const width = ctx.measureText(testLine).width;

    if (width > maxWidth && i > 0) {
      lineCount++;

      if (lineCount >= maxLines) {
        ctx.fillText(line.trim() + "...", x, yPos);
        return;
      }

      ctx.fillText(line.trim(), x, yPos);
      line = words[i] + " ";
      yPos += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line.trim()) {
    ctx.fillText(line.trim(), x, yPos);
  }
}

function roundedCanvasRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function getResolutionTarget(score) {
  if (score >= 92) return "1440p High / 240Hz esports";
  if (score >= 80) return "1440p Medium-High / 1080p Ultra";
  if (score >= 65) return "1080p High / Competitive";
  if (score >= 50) return "1080p Medium";
  return "1080p Low / Esports settings";
}

function getGpuFitText(gpu, pcCase) {
  if (!gpu || !pcCase) return "Need GPU and case selected";

  if (gpu.length <= pcCase.maxGpuLength) {
    return "Fits case with " + (pcCase.maxGpuLength - gpu.length) + "mm clearance";
  }

  return "GPU too long by " + (gpu.length - pcCase.maxGpuLength) + "mm";
}

function getCoolingText(cpu, cooler) {
  if (!cpu || !cooler) return "Need CPU and cooler selected";

  if (cpu.wattage <= cooler.maxCpuWattage) {
    return "Cooler has " + (cooler.maxCpuWattage - cpu.wattage) + "W thermal headroom";
  }

  return "Cooler may be weak by " + (cpu.wattage - cooler.maxCpuWattage) + "W";
}

/* =========================================================
   18. EMX PERFORMANCE MODEL V2
========================================================= */

function emxPartText(part) {
  if (!part) return "";

  return [
    part.name,
    part.brand,
    part.use,
    part.tier,
    part.generation,
    part.vram,
    part.ramType,
    part.specs ? Object.values(part.specs).join(" ") : ""
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function emxClamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function emxExtractGb(text, fallback = 0) {
  const match = String(text || "").match(/\b(\d{1,3})\s*gb\b/i);
  return match ? Number(match[1]) : fallback;
}

function emxGetRamCapacity(ram) {
  if (!ram) return 0;
  return Number(ram.capacity || emxExtractGb(emxPartText(ram), 0));
}

function emxGetVram(gpu) {
  if (!gpu) return 0;
  const text = emxPartText(gpu);
  const direct = emxExtractGb(text, 0);

  if (direct) return direct;
  if (text.includes("4090")) return 24;
  if (text.includes("4080") || text.includes("5080") || text.includes("9070") || text.includes("7900 xtx")) return 16;
  if (text.includes("4070") || text.includes("5070") || text.includes("7700")) return 12;
  if (text.includes("4060") || text.includes("7600") || text.includes("6600")) return 8;

  return 8;
}

function emxGetLiveConfidence() {
  const selected = getSelectedPartsArray().map((item) => item.part);
  if (selected.length === 0) return 0;

  const liveCount = selected.filter((part) => part.live).length;
  const trustedCount = selected.filter((part) => Number(part.trustScore || 0) >= 80).length;

  return Math.round(((liveCount * 0.65 + trustedCount * 0.35) / selected.length) * 100);
}

function getBuildPerformanceModel() {
  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const motherboard = getSelectedPart("motherboard");
  const ram = getSelectedPart("ram");
  const storage = getSelectedPart("storage");
  const psu = getSelectedPart("psu");
  const cooler = getSelectedPart("cooler");
  const pcCase = getSelectedPart("case");

  const selectedCount = getSelectedPartsArray().length;
  const warnings = getCompatibilityWarnings();
  const badCount = warnings.filter((warning) => warning.type === "bad").length;
  const warnCount = warnings.filter((warning) => warning.type === "warn").length;
  const wattage = calculateWattage();
  const ramGb = emxGetRamCapacity(ram);
  const vramGb = emxGetVram(gpu);

  if (!cpu && !gpu && !ram && !storage && !psu && !cooler && !pcCase && !motherboard) {
    return {
      score: 0,
      confidence: 0,
      cpuScore: 0,
      gpuScore: 0,
      ramGb: 0,
      vramGb: 0,
      bottleneck: "No parts selected",
      bottleneckPenalty: 0,
      powerHeadroom: 0,
      thermalHeadroom: 0,
      readinessPenalty: 0,
      notes: []
    };
  }

  const cpuScore = Number(cpu?.score || 0);
  const gpuScore = Number(gpu?.score || 0);
  const ramScore = Number(ram?.score || 0);
  const storageScore = Number(storage?.score || 0);
  const coolerScore = Number(cooler?.score || 0);

  const cpuGpuGap = cpu && gpu ? Math.abs(cpuScore - gpuScore) : 0;
  const bottleneckPenalty = cpu && gpu ? emxClamp((cpuGpuGap - 12) * 0.32, 0, 10) : 18;
  const missingCorePenalty = (!cpu ? 18 : 0) + (!gpu ? 22 : 0) + (!ram ? 8 : 0);
  const missingSystemPenalty = Math.max(0, 8 - selectedCount) * 1.6;
  const compatibilityPenalty = badCount * 14 + warnCount * 4;

  let ramModifier = 0;
  if (ram) {
    if (ramGb >= 64) ramModifier += 4;
    else if (ramGb >= 32) ramModifier += 7;
    else if (ramGb >= 16) ramModifier += 1;
    else ramModifier -= 8;

    if (String(ram.ramType || "").toUpperCase() === "DDR5") ramModifier += 3;
  }

  let vramModifier = 0;
  if (gpu) {
    if (vramGb >= 16) vramModifier += 4;
    else if (vramGb >= 12) vramModifier += 2;
    else if (vramGb < 8) vramModifier -= 8;
  }

  const powerHeadroom = psu ? Number(psu.capacity || 0) - wattage : 0;
  let powerModifier = 0;
  if (psu) {
    if (powerHeadroom >= 250) powerModifier += 3;
    else if (powerHeadroom >= 150) powerModifier += 1;
    else if (powerHeadroom >= 75) powerModifier -= 4;
    else powerModifier -= 11;
  }

  const thermalHeadroom = cpu && cooler ? Number(cooler.maxCpuWattage || 0) - Number(cpu.wattage || 0) : 0;
  let thermalModifier = 0;
  if (cpu && cooler) {
    if (thermalHeadroom >= 80) thermalModifier += 2;
    else if (thermalHeadroom >= 25) thermalModifier += 1;
    else if (thermalHeadroom >= 0) thermalModifier -= 2;
    else thermalModifier -= 8;
  }

  const weighted =
    (gpu ? gpuScore * 0.54 : 0) +
    (cpu ? cpuScore * 0.27 : 0) +
    (ram ? ramScore * 0.09 : 0) +
    (storage ? storageScore * 0.04 : 0) +
    (cooler ? coolerScore * 0.03 : 0) +
    (motherboard ? Number(motherboard.score || 0) * 0.03 : 0);

  const score = Math.round(emxClamp(
    weighted +
      ramModifier +
      vramModifier +
      powerModifier +
      thermalModifier -
      bottleneckPenalty -
      missingCorePenalty -
      missingSystemPenalty -
      compatibilityPenalty,
    selectedCount > 0 ? 18 : 0,
    100
  ));

  let bottleneck = "Balanced core parts";
  if (!cpu || !gpu) bottleneck = "Needs CPU and GPU for a real FPS estimate";
  else if (gpuScore - cpuScore >= 18) bottleneck = "CPU-limited in high-FPS games";
  else if (cpuScore - gpuScore >= 18) bottleneck = "GPU-limited in visual-heavy games";

  return {
    score,
    confidence: emxClamp(54 + selectedCount * 4 + emxGetLiveConfidence() * 0.18 - badCount * 12, 0, 96),
    cpuScore,
    gpuScore,
    ramGb,
    vramGb,
    bottleneck,
    bottleneckPenalty,
    powerHeadroom,
    thermalHeadroom,
    readinessPenalty: missingCorePenalty + missingSystemPenalty + compatibilityPenalty,
    notes: warnings
  };
}

function calculateFpsScore() {
  return getBuildPerformanceModel().score;
}

function estimateGameFps() {
  const model = getBuildPerformanceModel();
  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const ram = getSelectedPart("ram");
  const storage = getSelectedPart("storage");

  if (!cpu || !gpu || !ram) {
    return [
      {
        game: "Add CPU + GPU + RAM",
        fps: 0,
        note: "Select the core performance parts to unlock real game estimates."
      }
    ];
  }

  const cpuFactor = emxClamp(model.cpuScore / 100, 0.42, 1.05);
  const gpuFactor = emxClamp(model.gpuScore / 100, 0.42, 1.06);
  const ramFactor = model.ramGb >= 32 ? 1.06 : model.ramGb >= 16 ? 1 : 0.88;
  const storageFactor = storage && Number(storage.score || 0) >= 85 ? 1.02 : 1;
  const penaltyFactor = emxClamp(1 - model.bottleneckPenalty / 100 - model.readinessPenalty / 180, 0.68, 1);

  function project({ base, cpuWeight, gpuWeight, ramWeight = 0.08, cap }) {
    const raw = base *
      (cpuFactor * cpuWeight + gpuFactor * gpuWeight + ramFactor * ramWeight + storageFactor * 0.03) *
      penaltyFactor;

    return Math.max(35, Math.min(cap, Math.round(raw)));
  }

  return [
    {
      game: "Fortnite Performance Mode",
      fps: project({ base: 520, cpuWeight: 0.52, gpuWeight: 0.37, cap: 560 }),
      note: "CPU-heavy competitive estimate using " + cpu.name + " with " + gpu.name + "."
    },
    {
      game: "Fortnite DX12 High",
      fps: project({ base: 330, cpuWeight: 0.28, gpuWeight: 0.62, cap: 360 }),
      note: "GPU-heavy estimate; VRAM and GPU tier matter more here."
    },
    {
      game: "Valorant Competitive",
      fps: project({ base: 610, cpuWeight: 0.62, gpuWeight: 0.27, cap: 650 }),
      note: "High-refresh esports estimate. CPU bottleneck has the biggest effect."
    },
    {
      game: "Call of Duty / Warzone",
      fps: project({ base: 245, cpuWeight: 0.28, gpuWeight: 0.58, ramWeight: 0.12, cap: 280 }),
      note: model.ramGb >= 32 ? "32GB+ RAM helps large maps and background apps." : "32GB RAM would improve stability for this title."
    },
    {
      game: "GTA V / FiveM",
      fps: project({ base: 270, cpuWeight: 0.42, gpuWeight: 0.42, ramWeight: 0.12, cap: 300 }),
      note: "Server scripts/mods can change results; CPU and RAM capacity matter."
    },
    {
      game: "Cyberpunk 2077 High",
      fps: project({ base: 155, cpuWeight: 0.18, gpuWeight: 0.72, cap: 190 }),
      note: model.vramGb >= 12 ? "VRAM looks healthy for high textures." : "Lower textures may be needed with this VRAM level."
    }
  ];
}

function getReportNotes() {
  const model = getBuildPerformanceModel();
  const notes = [];
  const score = model.score;
  const total = calculateTotalPrice();
  const budget = Number(budgetInput.value || 0);
  const psu = getSelectedPart("psu");
  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const cooler = getSelectedPart("cooler");
  const tier = getPerformanceTier(score);
  const warnings = getCompatibilityWarnings();
  const badCount = warnings.filter((warning) => warning.type === "bad").length;
  const warnCount = warnings.filter((warning) => warning.type === "warn").length;

  notes.push({
    type: score >= 78 ? "good" : score >= 55 ? "warn" : "bad",
    text: tier.label + ": " + tier.text + " Estimate confidence: " + Math.round(model.confidence) + "%."
  });

  if (cpu && gpu) {
    notes.push({
      type: model.bottleneckPenalty >= 5 ? "warn" : "good",
      text: "CPU/GPU balance: " + model.bottleneck + ". CPU score " + model.cpuScore + ", GPU score " + model.gpuScore + "."
    });
  }

  if (model.ramGb > 0) {
    notes.push({
      type: model.ramGb >= 32 ? "good" : "warn",
      text: "Memory profile: " + model.ramGb + "GB " + (getSelectedPart("ram")?.ramType || "RAM") + ". " +
        (model.ramGb >= 32 ? "Good for gaming, streaming, and multitasking." : "16GB works, but 32GB is the safer modern target.")
    });
  }

  if (psu) {
    notes.push({
      type: model.powerHeadroom >= 150 ? "good" : model.powerHeadroom >= 75 ? "warn" : "bad",
      text: "Power headroom: estimated " + calculateWattage() + "W draw with " + psu.capacity + "W PSU. Headroom: " + model.powerHeadroom + "W."
    });
  }

  if (cpu && cooler) {
    notes.push({
      type: model.thermalHeadroom >= 25 ? "good" : model.thermalHeadroom >= 0 ? "warn" : "bad",
      text: "Cooling check: " + getCoolingText(cpu, cooler) + "."
    });
  }

  if (budget > 0) {
    notes.push({
      type: total <= budget ? "good" : "bad",
      text: total <= budget
        ? "Budget check passed. Build is " + formatMoney(budget - total) + " under budget."
        : "Budget check failed. Build is " + formatMoney(total - budget) + " over budget."
    });
  }

  if (badCount > 0) {
    notes.push({
      type: "bad",
      text: badCount + " blocking compatibility issue(s) found. Fix these before buying parts."
    });
  } else if (warnCount > 0) {
    notes.push({
      type: "warn",
      text: warnCount + " warning(s) found. Review these before ordering."
    });
  } else if (getBuildStatus() === "Ready") {
    notes.push({
      type: "good",
      text: "Compatibility status is clean. Build is marked ready."
    });
  }

  return notes;
}

function getUpgradeRecommendations() {
  const recommendations = [];
  const model = getBuildPerformanceModel();
  const cpu = getSelectedPart("cpu");
  const gpu = getSelectedPart("gpu");
  const ram = getSelectedPart("ram");
  const storage = getSelectedPart("storage");
  const psu = getSelectedPart("psu");
  const cooler = getSelectedPart("cooler");
  const pcCase = getSelectedPart("case");
  const motherboard = getSelectedPart("motherboard");

  if (!cpu) recommendations.push({ title: "Add CPU", text: "CPU is required for FPS, compatibility, and motherboard matching." });
  if (!gpu) recommendations.push({ title: "Add GPU", text: "GPU drives most visual quality and average FPS estimates." });
  if (!motherboard) recommendations.push({ title: "Add Motherboard", text: "Motherboard is needed to validate socket, RAM type, and platform." });
  if (!ram) recommendations.push({ title: "Add RAM", text: "RAM affects smoothness, streaming, and modern game stability." });
  if (!storage) recommendations.push({ title: "Add Storage", text: "NVMe storage improves loading and overall responsiveness." });
  if (!psu) recommendations.push({ title: "Add PSU", text: "PSU is required to verify power safety and headroom." });
  if (!pcCase) recommendations.push({ title: "Add Case", text: "Case is needed to verify GPU clearance and airflow." });
  if (!cooler) recommendations.push({ title: "Add Cooler", text: "Cooler is needed to validate CPU thermal headroom." });

  if (cpu && gpu) {
    if (model.gpuScore - model.cpuScore >= 18) {
      recommendations.push({
        title: "CPU Upgrade Recommended",
        text: gpu.name + " is stronger than " + cpu.name + ". Upgrade CPU for higher esports FPS and smoother lows."
      });
    } else if (model.cpuScore - model.gpuScore >= 18) {
      recommendations.push({
        title: "GPU Upgrade Recommended",
        text: cpu.name + " has more headroom than " + gpu.name + ". Upgrade GPU for higher visual settings."
      });
    }
  }

  if (ram && model.ramGb < 32) {
    recommendations.push({
      title: "Move To 32GB RAM",
      text: "32GB is the safer target for modern games, Discord, browsers, streaming, and background apps."
    });
  }

  if (psu && model.powerHeadroom < 150) {
    recommendations.push({
      title: "Increase PSU Headroom",
      text: "Target 150W+ headroom for quieter operation, transient spikes, and future GPU upgrades."
    });
  }

  const badWarnings = getCompatibilityWarnings().filter((warning) => warning.type === "bad");

  if (badWarnings.length > 0) {
    recommendations.unshift({
      title: "Fix Compatibility First",
      text: "Blocking compatibility issues matter more than performance upgrades."
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: "Build Looks Balanced",
      text: "No obvious weak link found. Next move would be based on your target resolution and refresh rate."
    });
  }

  return recommendations.slice(0, 7);
}

function emxSafeSpec(part, key, fallback = "N/A") {
  return part && part.specs && part.specs[key] ? part.specs[key] : fallback;
}

function emxReportPartLine(category, part) {
  if (!part) {
    return categoryLabels[category] + ": Not selected";
  }

  const extras = [];

  if (category === "cpu") extras.push(emxSafeSpec(part, "Cores"), part.socket, Number(part.wattage || 0) + "W");
  if (category === "gpu") extras.push(part.vram || emxSafeSpec(part, "VRAM"), Number(part.wattage || 0) + "W", Number(part.length || 0) + "mm");
  if (category === "motherboard") extras.push(part.socket, part.ramType, part.formFactor);
  if (category === "ram") extras.push(emxSafeSpec(part, "Capacity"), part.ramType || emxSafeSpec(part, "Type"), emxSafeSpec(part, "Speed"));
  if (category === "storage") extras.push(emxSafeSpec(part, "Capacity"), emxSafeSpec(part, "Type"), emxSafeSpec(part, "Speed"));
  if (category === "psu") extras.push(Number(part.capacity || 0) + "W", emxSafeSpec(part, "Rating"), emxSafeSpec(part, "Modular"));
  if (category === "case") extras.push(part.formFactor, "GPU " + Number(part.maxGpuLength || 0) + "mm", emxSafeSpec(part, "Airflow"));
  if (category === "cooler") extras.push(emxSafeSpec(part, "Type"), "CPU limit " + Number(part.maxCpuWattage || 0) + "W");

  if (part.live) {
    extras.push(part.source || "Live store", "Trust " + Number(part.trustScore || 0) + "/100");
  }

  return categoryLabels[category] + ": " + part.name + " | " + extras.filter(Boolean).join(" | ") + " | " + formatMoney(part.price);
}

function getReportText() {
  const model = getBuildPerformanceModel();
  const score = model.score;
  const tier = getPerformanceTier(score);
  const lines = [];

  const selected = {
    cpu: getSelectedPart("cpu"),
    gpu: getSelectedPart("gpu"),
    motherboard: getSelectedPart("motherboard"),
    ram: getSelectedPart("ram"),
    storage: getSelectedPart("storage"),
    psu: getSelectedPart("psu"),
    case: getSelectedPart("case"),
    cooler: getSelectedPart("cooler")
  };

  lines.push("EMX PERFORMANCE REPORT");
  lines.push("Generated by EMX PC Builder");
  lines.push("Live-data confidence: " + Math.round(model.confidence) + "%");
  lines.push("=================================================");
  lines.push("");
  lines.push("OVERALL");
  lines.push("Rating: " + tier.grade + " - " + tier.label);
  lines.push("Summary: " + tier.text);
  lines.push("FPS Score: " + score + "/100");
  lines.push("Build Status: " + getBuildStatus());
  lines.push("Resolution Target: " + getResolutionTarget(score));
  lines.push("Estimated Wattage: " + calculateWattage() + "W");
  lines.push("Total Price: " + formatMoney(calculateTotalPrice()));
  lines.push("Bottleneck Read: " + model.bottleneck);
  lines.push("");
  lines.push("SELECTED PARTS");
  Object.keys(selected).forEach((category) => {
    lines.push(emxReportPartLine(category, selected[category]));
  });
  lines.push("");
  lines.push("GAME ESTIMATES");
  estimateGameFps().forEach((game) => {
    lines.push(game.game + ": " + game.fps + " FPS - " + game.note);
  });
  lines.push("");
  lines.push("BUILD ANALYSIS");
  getReportNotes().forEach((note) => {
    lines.push("- " + note.text);
  });
  lines.push("");
  lines.push("UPGRADE PRIORITY");
  getUpgradeRecommendations().forEach((item, index) => {
    lines.push((index + 1) + ". " + item.title + ": " + item.text);
  });
  lines.push("");
  lines.push("SUGGESTED SETUP");
  getPeripheralSuggestions().forEach((item) => {
    lines.push("- " + item.title + ": " + item.text);
  });
  lines.push("");
  lines.push("IMPORTANT: FPS is an estimate based on selected part tiers, balance, RAM, power/cooling headroom, and compatibility. Real FPS depends on game updates, settings, drivers, maps, servers, and background apps.");

  return lines.join("\n");
}

async function copyPerformanceReport() {
  const text = getReportText();

  if (!text.trim()) {
    showToast("No report text available.", "bad");
    return;
  }

  showCopyOverlay();
  updateCopyOverlay("Analyzing selected parts...", 18);

  await wait(450);
  updateCopyOverlay("Checking CPU, GPU, RAM, power, and cooling...", 42);

  await wait(550);
  updateCopyOverlay("Building detailed EMX report...", 68);

  await wait(500);
  updateCopyOverlay("Report ready for copy or export", 100, true);

  setTimeout(() => {
    showShareButton(text);
  }, 120);
}

function showCopyOverlay() {
  if (document.getElementById("copyOverlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "copyOverlay";
  overlay.className = "emx-copy-overlay";

  overlay.innerHTML = `
    <div class="emx-export-terminal">
      <img src="emx-logo.png" alt="EMX" class="emx-terminal-logo">

      <div class="emx-terminal-label">EMX REPORT EXPORT</div>

      <div id="copyOverlayStatus" class="emx-terminal-status">
        Preparing build analysis...
      </div>

      <div class="emx-terminal-progress">
        <div id="copyOverlayProgress" class="emx-terminal-progress-fill"></div>
      </div>

      <div id="copyOverlayPercent" class="emx-terminal-percent">0%</div>

      <div class="emx-terminal-lines">
        <p>Build data: selected parts, prices, wattage</p>
        <p>Performance: game estimates and bottlenecks</p>
        <p>Safety: compatibility, power, and cooling checks</p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function showShareButton(text) {
  const terminal = document.querySelector(".emx-export-terminal");

  if (!terminal) {
    showToast("Export panel not found.", "bad");
    return;
  }

  const oldActions = document.getElementById("copyOverlayActions");

  if (oldActions) {
    oldActions.remove();
  }

  const actions = document.createElement("div");
  actions.id = "copyOverlayActions";
  actions.className = "emx-terminal-actions";

  actions.innerHTML = `
    <button id="copyReportOverlayBtn" type="button">COPY REPORT</button>
    <button id="downloadReportOverlayBtn" type="button">DOWNLOAD TXT</button>
    <button id="saveReportImageOverlayBtn" type="button">SAVE IMAGE</button>
    <button id="manualCopyOverlayBtn" type="button">MANUAL COPY</button>
    <button id="closeExportOverlayBtn" type="button">DONE</button>
  `;

  terminal.appendChild(actions);

  const copyBtn = document.getElementById("copyReportOverlayBtn");
  const downloadBtn = document.getElementById("downloadReportOverlayBtn");
  const imageBtn = document.getElementById("saveReportImageOverlayBtn");
  const manualBtn = document.getElementById("manualCopyOverlayBtn");
  const closeBtn = document.getElementById("closeExportOverlayBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const copied = await copyTextSafe(text);
      showToast(copied ? "Report copied to clipboard." : "Clipboard blocked. Manual copy opened.", copied ? "good" : "warn");

      if (!copied) {
        hideCopyOverlay();
        openManualCopyModal(text);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => downloadReportText(text));
  }

  if (imageBtn) {
    imageBtn.addEventListener("click", () => downloadReportImage());
  }

  if (manualBtn) {
    manualBtn.addEventListener("click", () => {
      hideCopyOverlay();
      openManualCopyModal(text);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", hideCopyOverlay);
  }
}

async function buildReportCanvasSafe() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas engine unavailable.");
  }

  canvas.width = 1600;
  canvas.height = 2300;

  const model = getBuildPerformanceModel();
  const score = model.score;
  const tier = getPerformanceTier(score);
  const total = calculateTotalPrice();
  const wattage = calculateWattage();
  const status = getBuildStatus();

  const selected = {
    cpu: getSelectedPart("cpu"),
    gpu: getSelectedPart("gpu"),
    motherboard: getSelectedPart("motherboard"),
    ram: getSelectedPart("ram"),
    storage: getSelectedPart("storage"),
    psu: getSelectedPart("psu"),
    case: getSelectedPart("case"),
    cooler: getSelectedPart("cooler")
  };

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, "#071b12");
  bg.addColorStop(0.36, "#08131f");
  bg.addColorStop(0.72, "#0b0d18");
  bg.addColorStop(1, "#1a0625");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(40,209,124,0.12)";
  ctx.fillRect(0, 0, canvas.width, 280);

  drawNeonPanel(ctx, 60, 60, 1480, 2180, 36);
  await drawReportLogo(ctx, 190, 165);

  ctx.textAlign = "left";
  ctx.fillStyle = "#28d17c";
  ctx.font = "900 28px Arial";
  ctx.fillText("EMX PERFORMANCE REPORT", 330, 135);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 70px Arial";
  ctx.fillText(tier.label.toUpperCase(), 330, 215);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "800 25px Arial";
  ctx.fillText("Part-aware estimate - confidence " + Math.round(model.confidence) + "% - " + model.bottleneck, 330, 260);

  drawBigStat(ctx, 100, 340, 320, 115, "TOTAL", formatMoney(total));
  drawBigStat(ctx, 455, 340, 320, 115, "WATTAGE", wattage + "W");
  drawBigStat(ctx, 810, 340, 320, 115, "FPS SCORE", score + "/100");
  drawBigStat(ctx, 1165, 340, 320, 115, "STATUS", status);

  drawSectionHeader(ctx, "SELECTED PARTS", 100, 540);
  const partRows = Object.keys(selected).map((category) => ({
    label: categoryLabels[category],
    text: selected[category] ? selected[category].name : "Not selected",
    detail: selected[category]
      ? emxReportPartLine(category, selected[category]).replace(categoryLabels[category] + ": " + selected[category].name + " | ", "")
      : "Add this part to complete the build."
  }));

  partRows.forEach((row, index) => {
    const x = index % 2 === 0 ? 100 : 815;
    const y = 585 + Math.floor(index / 2) * 150;
    drawInfoCard(ctx, x, y, 675, 118, row.label, row.text, row.detail);
  });

  drawSectionHeader(ctx, "GAME ESTIMATES", 100, 1245);
  estimateGameFps().slice(0, 6).forEach((game, index) => {
    const x = index % 3 === 0 ? 100 : index % 3 === 1 ? 575 : 1050;
    const y = 1290 + Math.floor(index / 3) * 145;
    drawGameCard(ctx, x, y, 415, 115, game.game, game.fps + " FPS");
  });

  drawSectionHeader(ctx, "BUILD ANALYSIS", 100, 1635);
  drawNoteStrip(ctx, 100, 1680, 675, 280, getReportNotes().slice(0, 6).map((note) => note.text));

  drawSectionHeader(ctx, "UPGRADE PRIORITY", 815, 1635);
  drawNoteStrip(ctx, 815, 1680, 675, 280, getUpgradeRecommendations().slice(0, 5).map((item) => item.title + ": " + item.text));

  drawSectionHeader(ctx, "TARGET", 100, 2045);
  drawInfoCard(ctx, 100, 2088, 1390, 110, "BEST USE", getResolutionTarget(score), "Power headroom " + model.powerHeadroom + "W - VRAM " + model.vramGb + "GB - RAM " + model.ramGb + "GB");

  ctx.fillStyle = "rgba(255,255,255,0.62)";
  ctx.font = "800 22px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Generated by EMX PC Builder - estimates vary by settings, drivers, game version, and background apps", 800, 2240);

  return canvas;
}

/* =========================================================
   18. EMX CLOUD / GUEST SAVE SEPARATION
   PASTE AT VERY BOTTOM OF script.js
========================================================= */

let emxCloudBuildCache = [];

const EMX_GUEST_SAVE_KEY = "emx_pc_builder_guest_saves";
const EMX_LOCAL_SAVE_KEY = "emx_pc_builder_saves";

function emxIsCloudUser() {
  return Boolean(window.emxCurrentUser && window.emxAuthAPI && !window.emxGuestMode);
}

function emxGetLocalSaveKey() {
  if (window.emxGuestMode) {
    return EMX_GUEST_SAVE_KEY;
  }

  return EMX_LOCAL_SAVE_KEY;
}

window.addEventListener("emxAuthChanged", (event) => {
  const detail = event.detail || {};

  if (detail.user && !detail.guestMode) {
    emxCloudBuildCache = Array.isArray(detail.builds) ? detail.builds : [];
  } else {
    emxCloudBuildCache = [];
  }

  if (typeof renderSavedBuilds === "function") {
    renderSavedBuilds();
  }

  if (detail.user && typeof showToast === "function") {
    showToast("Cloud builds loaded for " + (detail.user.email || "EMX user") + ".", "good");
  }
});

function getSavedBuilds() {
  if (emxIsCloudUser()) {
    return emxCloudBuildCache;
  }

  const saved = localStorage.getItem(emxGetLocalSaveKey());

  if (!saved) {
    return [];
  }

  try {
    const saves = JSON.parse(saved);
    return Array.isArray(saves) ? saves : [];
  } catch (error) {
    return [];
  }
}

async function saveBuild() {
  const selectedCount = getSelectedPartsArray().length;

  if (selectedCount === 0) {
    showToast("Select at least one part before saving.", "bad");
    return;
  }

  const save = {
    id: Date.now(),
    name: "EMX Build " + new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    build: { ...build },
    budget: Number(budgetInput.value || 0),
    goal: goalSelect.value,
    total: calculateTotalPrice(),
    wattage: calculateWattage(),
    score: calculateFpsScore()
  };

  if (emxIsCloudUser()) {
    try {
      emxCloudBuildCache = await window.emxAuthAPI.saveBuild(save);
      saveCurrentDraft();
      renderAll();
      showToast("Build saved to your EMX account.", "good");
      return;
    } catch (error) {
      console.error(error);
      showToast("Cloud save failed. Saving as local browser save.", "warn");
    }
  }

  const saves = getSavedBuilds();
  saves.push(save);

  localStorage.setItem(emxGetLocalSaveKey(), JSON.stringify(saves));

  saveCurrentDraft();
  renderAll();

  if (window.emxGuestMode) {
    showToast("Guest build saved locally.", "warn");
  } else {
    showToast("Build saved locally.", "good");
  }
}

function loadLatestBuild() {
  const saves = getSavedBuilds();

  if (saves.length === 0) {
    showToast("No saved builds yet.", "bad");
    return;
  }

  loadBuildById(saves[saves.length - 1].id);
}

/* =========================================================
   19. EMX SAVED BUILD MANAGER
   Paste at VERY BOTTOM of script.js
========================================================= */

function emxManagerIsCloudUser() {
  return Boolean(window.emxCurrentUser && window.emxAuthAPI && !window.emxGuestMode);
}

function emxManagerGetSaveType() {
  if (emxManagerIsCloudUser()) {
    return "CLOUD";
  }

  if (window.emxGuestMode) {
    return "GUEST";
  }

  return "LOCAL";
}

function emxManagerGetLocalKey() {
  if (window.emxGuestMode) {
    return "emx_pc_builder_guest_saves";
  }

  return "emx_pc_builder_saves";
}

function emxManagerSetLocalSaves(saves) {
  localStorage.setItem(emxManagerGetLocalKey(), JSON.stringify(saves));
}

function emxManagerGetDateText(save) {
  if (!save) {
    return "Unknown";
  }

  if (save.createdAtText) {
    return save.createdAtText;
  }

  if (save.id) {
    const date = new Date(Number(save.id));

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }

  return "Saved build";
}

function emxManagerSetSavedPanelLabel() {
  const savedPanel = savedBuildsList ? savedBuildsList.closest(".saved-panel") : null;
  const label = savedPanel ? savedPanel.querySelector(".panel-label") : null;

  if (!label) {
    return;
  }

  const saveType = emxManagerGetSaveType();

  if (saveType === "CLOUD") {
    label.textContent = "CLOUD SAVES";
    return;
  }

  if (saveType === "GUEST") {
    label.textContent = "GUEST SAVES";
    return;
  }

  label.textContent = "LOCAL SAVES";
}

function emxManagerGetBadgeClass() {
  const saveType = emxManagerGetSaveType();

  if (saveType === "CLOUD") {
    return "cloud";
  }

  if (saveType === "GUEST") {
    return "guest";
  }

  return "local";
}

function renderSavedBuilds() {
  emxManagerSetSavedPanelLabel();

  const saves = getSavedBuilds();
  const saveType = emxManagerGetSaveType();
  const badgeClass = emxManagerGetBadgeClass();

  if (!savedBuildsList) {
    return;
  }

  if (saves.length === 0) {
    savedBuildsList.innerHTML = `
      <div class="warning good">
        No ${saveType.toLowerCase()} builds yet. Press SAVE to store your current build.
      </div>
    `;
    return;
  }

  savedBuildsList.innerHTML = saves
    .slice()
    .reverse()
    .map((save) => {
      const safeName = escapeHtml(save.name || "EMX Build");
      const dateText = escapeHtml(emxManagerGetDateText(save));
      const total = formatMoney(save.total || 0);
      const wattage = Number(save.wattage || 0);
      const score = Number(save.score || 0);

      return `
        <div class="saved-build-card emx-save-card" data-save-id="${escapeHtml(save.id)}">
          <div class="emx-save-main">
            <div>
              <div class="emx-save-topline">
                <span class="emx-save-badge ${badgeClass}">${saveType}</span>
                <span class="emx-save-date">${dateText}</span>
              </div>

              <strong class="emx-save-name">${safeName}</strong>

              <span class="emx-save-meta">
                ${total}  -  ${wattage}W  -  Score ${score}
              </span>
            </div>
          </div>

          <div class="emx-save-actions">
            <button data-save-action="load" data-save-id="${escapeHtml(save.id)}" type="button">LOAD</button>
            <button data-save-action="rename" data-save-id="${escapeHtml(save.id)}" type="button">RENAME</button>
            <button data-save-action="delete" data-save-id="${escapeHtml(save.id)}" type="button">DELETE</button>
          </div>
        </div>
      `;
    })
    .join("");
}

async function emxRenameSavedBuild(saveId) {
  const saves = getSavedBuilds();
  const save = saves.find((item) => String(item.id) === String(saveId));

  if (!save) {
    showToast("Saved build not found.", "bad");
    return;
  }

  const newName = prompt("Rename this EMX build:", save.name || "EMX Build");

  if (!newName) {
    return;
  }

  const cleanName = newName.trim();

  if (!cleanName) {
    showToast("Build name cannot be empty.", "bad");
    return;
  }

  if (emxManagerIsCloudUser() && window.emxAuthAPI.renameBuild) {
    try {
      const updatedBuilds = await window.emxAuthAPI.renameBuild(saveId, cleanName);

      if (typeof emxCloudBuildCache !== "undefined") {
        emxCloudBuildCache = Array.isArray(updatedBuilds) ? updatedBuilds : [];
      }

      renderSavedBuilds();
      showToast("Cloud build renamed.", "good");
      return;
    } catch (error) {
      console.error(error);
      showToast("Cloud rename failed.", "bad");
      return;
    }
  }

  const updatedSaves = saves.map((item) => {
    if (String(item.id) !== String(saveId)) {
      return item;
    }

    return {
      ...item,
      name: cleanName
    };
  });

  emxManagerSetLocalSaves(updatedSaves);
  renderSavedBuilds();
  showToast("Saved build renamed.", "good");
}

async function emxDeleteSavedBuild(saveId) {
  const saves = getSavedBuilds();
  const save = saves.find((item) => String(item.id) === String(saveId));

  if (!save) {
    showToast("Saved build not found.", "bad");
    return;
  }

  const confirmed = confirm("Delete this saved build?\n\n" + (save.name || "EMX Build"));

  if (!confirmed) {
    return;
  }

  if (emxManagerIsCloudUser() && window.emxAuthAPI.deleteBuild) {
    try {
      const updatedBuilds = await window.emxAuthAPI.deleteBuild(saveId);

      if (typeof emxCloudBuildCache !== "undefined") {
        emxCloudBuildCache = Array.isArray(updatedBuilds) ? updatedBuilds : [];
      }

      renderSavedBuilds();
      showToast("Cloud build deleted.", "warn");
      return;
    } catch (error) {
      console.error(error);
      showToast("Cloud delete failed.", "bad");
      return;
    }
  }

  const updatedSaves = saves.filter((item) => String(item.id) !== String(saveId));

  emxManagerSetLocalSaves(updatedSaves);
  renderSavedBuilds();
  showToast("Saved build deleted.", "warn");
}

if (savedBuildsList) {
  savedBuildsList.addEventListener(
    "click",
    (event) => {
      const actionButton = event.target.closest("[data-save-action]");

      if (!actionButton) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const action = actionButton.dataset.saveAction;
      const saveId = actionButton.dataset.saveId;

      if (action === "load") {
        loadBuildById(saveId);
        return;
      }

      if (action === "rename") {
        emxRenameSavedBuild(saveId);
        return;
      }

      if (action === "delete") {
        emxDeleteSavedBuild(saveId);
      }
    },
    true
  );
}

/* =========================================================
   21. EMX LIVE PRODUCT SEARCH
   Paste at VERY BOTTOM of script.js
========================================================= */

let emxLiveModeActive = false;
let emxLiveProducts = [];
let emxLiveLastQuery = "";
let emxLiveLoading = false;
let emxLiveAutoLoadedCategory = "";

const emxDefaultLiveQueries = {
  cpu: "AMD Ryzen Intel Core desktop processor",
  gpu: "RTX Radeon desktop graphics card",
  motherboard: "B650 X670 Z790 B760 desktop motherboard",
  ram: "DDR5 DDR4 desktop memory kit",
  storage: "NVMe SSD internal storage",
  psu: "850W Gold modular PC power supply",
  case: "ATX airflow desktop PC case",
  cooler: "CPU cooler AIO air cooler"
};

function emxGetLiveSearchQuery(queryOverride = "") {
  if (queryOverride) {
    return queryOverride;
  }

  const query = searchInput ? searchInput.value.trim() : "";

  if (query) {
    return query;
  }

  return emxDefaultLiveQueries[activeCategory] || categoryLabels[activeCategory] || activeCategory || "pc part";
}

function emxGetLiveSearchParams(queryOverride = "") {
  const params = new URLSearchParams();

  params.set("category", activeCategory);
  params.set("q", emxGetLiveSearchQuery(queryOverride));

  if (brandFilter && brandFilter.value && brandFilter.value !== "all") {
    params.set("brand", brandFilter.value);
  }

  if (retailerFilter && retailerFilter.value) {
    params.set("retailer", retailerFilter.value);
  }

  if (conditionFilter && conditionFilter.value) {
    params.set("condition", conditionFilter.value);
  }

  if (platformFilter && platformFilter.value && platformFilter.value !== "all") {
    params.set("platform", platformFilter.value);
  }

  if (sortSelect && sortSelect.value) {
    params.set("sort", sortSelect.value);
  }

  if (minPriceInput && minPriceInput.value) {
    params.set("minPrice", minPriceInput.value);
  }

  if (maxPriceInput && maxPriceInput.value) {
    params.set("maxPrice", maxPriceInput.value);
  }

  if (minScoreInput && minScoreInput.value) {
    params.set("minScore", minScoreInput.value);
  }

  if (minRatingInput && minRatingInput.value) {
    params.set("minRating", minRatingInput.value);
  }

  if (maxWattageInput && maxWattageInput.value) {
    params.set("maxWattage", maxWattageInput.value);
  }

  return params;
}

function emxSetLiveButtonState() {
  if (!liveSearchBtn) {
    return;
  }

  if (emxLiveLoading) {
    liveSearchBtn.textContent = "SEARCHING...";
    liveSearchBtn.disabled = true;
    return;
  }

  liveSearchBtn.disabled = false;
  liveSearchBtn.textContent = emxLiveModeActive ? "REFRESH LIVE" : "LIVE SEARCH";
}

async function emxRunLiveSearch(options = {}) {
  if (emxLiveLoading) {
    return;
  }

  const query = emxGetLiveSearchQuery(options.query || "");

  if (!query || query.length < 2) {
    if (!options.silent) {
      showToast("Type a product search first.", "bad");
    }
    return;
  }

  emxLiveLoading = true;
  emxSetLiveButtonState();

  try {
    if (!options.silent) {
      showToast("Searching live products...", "good");
    }

    const params = emxGetLiveSearchParams(query);
    const response = await fetch("/api/search-products?" + params.toString());

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Live search failed.");
    }

    emxLiveProducts = Array.isArray(data.products) ? data.products : [];
    emxLiveModeActive = true;
    emxLiveLastQuery = data.query || query;

    renderParts();

    if (emxLiveProducts.length === 0) {
      if (!options.silent) {
        showToast("No live products found. Try a different search.", "warn");
      }
      return;
    }

    if (!options.silent) {
      showToast("Loaded " + emxLiveProducts.length + " live products.", "good");
    } else if (options.auto) {
      showToast("Live product pictures loaded.", "good");
    }
  } catch (error) {
    console.error(error);
    if (!options.silent) {
      showToast(error.message || "Live search failed.", "bad");
    }
  } finally {
    emxLiveLoading = false;
    emxSetLiveButtonState();
  }
}

function emxAutoLoadLiveCategory() {
  if (emxLiveLoading || emxLiveAutoLoadedCategory === activeCategory) {
    return;
  }

  emxLiveAutoLoadedCategory = activeCategory;
  emxRunLiveSearch({
    auto: true,
    silent: true,
    query: emxDefaultLiveQueries[activeCategory]
  });
}

function emxExitLiveMode() {
  emxLiveModeActive = false;
  emxLiveProducts = [];
  emxLiveLastQuery = "";
  emxSetLiveButtonState();
  renderParts();
}

const emxOriginalGetVisiblePartsLive = getVisibleParts;

function emxApplyLiveClientFilters(products) {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const brand = brandFilter ? brandFilter.value : "all";
  const retailer = retailerFilter ? retailerFilter.value : "trusted";
  const platform = platformFilter ? platformFilter.value : "all";
  const minPrice = minPriceInput ? Number(minPriceInput.value || 0) : 0;
  const maxPrice = maxPriceInput ? Number(maxPriceInput.value || 0) : 0;
  const minScore = minScoreInput ? Number(minScoreInput.value || 0) : 0;
  const minRating = minRatingInput ? Number(minRatingInput.value || 0) : 0;
  const maxWattage = maxWattageInput ? Number(maxWattageInput.value || 0) : 0;
  const sort = sortSelect ? sortSelect.value : "recommended";

  let filtered = [...products];

  if (query) {
    filtered = filtered.filter((part) => emxGetTextForLivePart(part).includes(query));
  }

  if (brand && brand !== "all") {
    filtered = filtered.filter((part) => String(part.brand || "").toLowerCase() === brand.toLowerCase());
  }

  if (retailer && retailer !== "all" && retailer !== "trusted") {
    filtered = filtered.filter((part) => String(part.source || part.seller || "").toLowerCase().includes(retailer.toLowerCase()));
  }

  if (platform && platform !== "all") {
    filtered = filtered.filter((part) => partMatchesPlatform(part, platform));
  }

  if (minPrice > 0) filtered = filtered.filter((part) => Number(part.price || 0) >= minPrice);
  if (maxPrice > 0) filtered = filtered.filter((part) => Number(part.price || 0) <= maxPrice);
  if (minScore > 0) filtered = filtered.filter((part) => Number(part.score || 0) >= minScore);
  if (minRating > 0) filtered = filtered.filter((part) => Number(part.rating || 0) >= minRating);
  if (maxWattage > 0) filtered = filtered.filter((part) => Number(part.wattage || 0) <= maxWattage);

  if (sort === "priceLow") filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  if (sort === "priceHigh") filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  if (sort === "performance") filtered.sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  if (sort === "rating") filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  if (sort === "trusted") filtered.sort((a, b) => Number(b.trustScore || 0) - Number(a.trustScore || 0));
  if (sort === "recommended") filtered.sort((a, b) => {
    const scoreA = Number(a.score || 0) + Number(a.shoppingScore || 0) * 0.25 + Number(a.trustScore || 0) * 0.35;
    const scoreB = Number(b.score || 0) + Number(b.shoppingScore || 0) * 0.25 + Number(b.trustScore || 0) * 0.35;
    return scoreB - scoreA;
  });

  return filtered;
}

getVisibleParts = function () {
  if (emxLiveModeActive) {
    return emxApplyLiveClientFilters(emxLiveProducts);
  }

  return emxOriginalGetVisiblePartsLive();
};

const emxOriginalRenderPartCardLive = renderPartCard;

renderPartCard = function (part) {
  if (!part || !part.live) {
    return emxOriginalRenderPartCardLive(part);
  }

  const isSelected = build[part.category] === part.id;

  const specsHtml = Object.keys(part.specs || {})
    .map((key) => {
      return `
        <div class="spec">
          <span>${escapeHtml(key)}</span>
          <strong>${escapeHtml(part.specs[key])}</strong>
        </div>
      `;
    })
    .join("");

  return `
    <article class="part-card live-part-card ${isSelected ? "selected" : ""}">
      <div class="live-product-image-wrap">
        ${part.image ? `<img src="${escapeHtml(part.image)}" alt="${escapeHtml(part.name)}" loading="lazy">` : `<div class="live-product-placeholder">EMX</div>`}
      </div>

      <div class="part-top">
        <div class="part-info">
          <span>LIVE - ${escapeHtml(part.source || "Store")} - Trust ${Number(part.trustScore || 0)}</span>
          <h4>${escapeHtml(part.name)}</h4>
          <p>${escapeHtml(part.use || "Live product")} - Score ${Number(part.score || 0)}${part.rating ? " - " + Number(part.rating || 0) + "/5" : ""}</p>
        </div>

        <div class="part-price">${formatMoney(part.price)}</div>
      </div>

      <div class="spec-grid">
        ${specsHtml}
      </div>

      <div class="card-actions live-card-actions">
        <button class="select-live-btn" data-live-id="${escapeHtml(part.id)}" type="button">
          ${isSelected ? "Selected" : "Select Live Part"}
        </button>

        ${part.link ? `<a class="view-product-link" href="${escapeHtml(part.link)}" target="_blank" rel="noopener noreferrer">VIEW PRODUCT</a>` : ""}
      </div>
    </article>
  `;
};

if (partsList) {
  partsList.addEventListener(
    "click",
    (event) => {
      const liveButton = event.target.closest(".select-live-btn");

      if (!liveButton) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      selectLivePart(liveButton.dataset.liveId);
    },
    true
  );
}

function emxGetTextForLivePart(part) {
  return [
    part.name,
    part.brand,
    part.use,
    part.tier,
    part.generation,
    part.vram,
    part.source,
    part.specs ? Object.values(part.specs).join(" ") : ""
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function emxExtractWattageFromText(text, fallback = 0) {
  const match = String(text || "").match(/\b(\d{3,4})w\b/i);

  if (match && match[1]) {
    return Number(match[1]);
  }

  return fallback;
}

function emxGetLiveCoolerLimit(part) {
  const text = emxGetTextForLivePart(part);

  if (text.includes("420mm")) return 280;
  if (text.includes("360mm")) return 250;
  if (text.includes("280mm")) return 220;
  if (text.includes("240mm")) return 190;
  if (text.includes("aio") || text.includes("liquid")) return 190;
  if (text.includes("dual tower")) return 190;
  if (text.includes("tower") || text.includes("air cooler")) return 140;

  return 140;
}

function emxNormalizeLivePartForBuild(part) {
  const category = part.category || activeCategory;
  const text = emxGetTextForLivePart(part);

  const normalizedPart = {
    ...part,
    id: String(part.id),
    category,
    price: Number(part.price || 0),
    score: Number(part.score || 60),
    wattage: Number(part.wattage || 0),
    length: Number(part.length || 0),
    specs: part.specs || {}
  };

  if (category === "cpu") {
    if (!normalizedPart.socket) {
      if (text.includes("am5")) normalizedPart.socket = "AM5";
      else if (text.includes("am4")) normalizedPart.socket = "AM4";
      else if (text.includes("lga1851")) normalizedPart.socket = "LGA1851";
      else if (text.includes("lga1700") || text.includes("intel")) normalizedPart.socket = "LGA1700";
      else normalizedPart.socket = "Unknown";
    }

    normalizedPart.wattage = Number(normalizedPart.wattage || emxExtractWattageFromText(text, 95));
  }

  if (category === "gpu") {
    normalizedPart.length = Number(normalizedPart.length || 300);
    normalizedPart.wattage = Number(normalizedPart.wattage || emxExtractWattageFromText(text, 200));
  }

  if (category === "motherboard") {
    if (!normalizedPart.socket) {
      if (text.includes("am5") || text.includes("b650") || text.includes("x670")) normalizedPart.socket = "AM5";
      else if (text.includes("am4") || text.includes("b550") || text.includes("x570")) normalizedPart.socket = "AM4";
      else if (text.includes("lga1851") || text.includes("z890") || text.includes("b860")) normalizedPart.socket = "LGA1851";
      else if (text.includes("lga1700") || text.includes("b760") || text.includes("z790")) normalizedPart.socket = "LGA1700";
      else normalizedPart.socket = "Unknown";
    }

    if (!normalizedPart.ramType) {
      if (text.includes("ddr5")) normalizedPart.ramType = "DDR5";
      else if (text.includes("ddr4")) normalizedPart.ramType = "DDR4";
      else normalizedPart.ramType = "Unknown";
    }

    normalizedPart.formFactor = normalizedPart.formFactor || "ATX";
    normalizedPart.wattage = Number(normalizedPart.wattage || 40);
  }

  if (category === "ram") {
    if (!normalizedPart.ramType) {
      normalizedPart.ramType = text.includes("ddr5") ? "DDR5" : "DDR4";
    }

    if (!normalizedPart.capacity) {
      if (text.includes("64gb")) normalizedPart.capacity = 64;
      else if (text.includes("32gb")) normalizedPart.capacity = 32;
      else if (text.includes("16gb")) normalizedPart.capacity = 16;
      else normalizedPart.capacity = 32;
    }

    normalizedPart.wattage = Number(normalizedPart.wattage || 10);
  }

  if (category === "storage") {
    if (!normalizedPart.capacity) {
      if (text.includes("4tb")) normalizedPart.capacity = 4000;
      else if (text.includes("2tb")) normalizedPart.capacity = 2000;
      else if (text.includes("1tb")) normalizedPart.capacity = 1000;
      else normalizedPart.capacity = 1000;
    }

    normalizedPart.wattage = Number(normalizedPart.wattage || 8);
  }

  if (category === "psu") {
    normalizedPart.capacity = Number(normalizedPart.capacity || emxExtractWattageFromText(text, 650));
    normalizedPart.wattage = 0;
  }

  if (category === "case") {
    normalizedPart.formFactor = normalizedPart.formFactor || "ATX";
    normalizedPart.maxGpuLength = Number(normalizedPart.maxGpuLength || 360);
    normalizedPart.wattage = 0;
  }

  if (category === "cooler") {
    normalizedPart.maxCpuWattage = Number(normalizedPart.maxCpuWattage || emxGetLiveCoolerLimit(part));
    normalizedPart.sockets = Array.isArray(normalizedPart.sockets)
      ? normalizedPart.sockets
      : ["AM4", "AM5", "LGA1700", "LGA1851"];

    normalizedPart.wattage = Number(normalizedPart.wattage || 6);
  }

  return normalizedPart;
}

function selectLivePart(partId) {
  const part = emxLiveProducts.find((item) => String(item.id) === String(partId));

  if (!part) {
    showToast("Live product could not be selected.", "bad");
    return;
  }

  const normalizedPart = emxNormalizeLivePartForBuild(part);
  const category = normalizedPart.category || activeCategory;

  if (!partsDB[category]) {
    showToast("This live product category is not supported yet.", "bad");
    return;
  }

  const exists = partsDB[category].some((item) => {
    return String(item.id) === String(normalizedPart.id);
  });

  if (!exists) {
    partsDB[category].push(normalizedPart);
  }

  build[category] = normalizedPart.id;
  activeCategory = category;

  if (brandFilter) {
    brandFilter.value = "all";
  }

  saveCurrentDraft();
  renderAll();

  showToast(normalizedPart.name + " added to your build.", "good");
}
