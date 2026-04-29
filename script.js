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
      name: "B550 Gaming Motherboard",
      brand: "AM4 Board",
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
      name: "X570 Pro Motherboard",
      brand: "AM4 Board",
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
      name: "B650 Gaming Motherboard",
      brand: "AM5 Board",
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
      name: "X670E Elite Motherboard",
      brand: "AM5 Board",
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
      name: "B760 Intel Motherboard",
      brand: "Intel Board",
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
      name: "Z790 Performance Motherboard",
      brand: "Intel Board",
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
      name: "16GB DDR4 3200",
      brand: "DDR4 Kit",
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
      name: "32GB DDR4 3600 RGB",
      brand: "DDR4 Kit",
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
      name: "32GB DDR5 6000 RGB",
      brand: "DDR5 Kit",
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
      name: "64GB DDR5 6400 RGB",
      brand: "DDR5 Kit",
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
      name: "1TB NVMe SSD",
      brand: "NVMe",
      price: 65,
      wattage: 6,
      score: 76,
      capacity: 1000,
      use: "Sample fast boot drive",
      specs: { Capacity: "1TB", Type: "NVMe", Speed: "Fast", Tier: "Balanced" }
    },
    {
      id: "ssd-2tb-nvme",
      name: "2TB NVMe SSD",
      brand: "NVMe",
      price: 120,
      wattage: 7,
      score: 86,
      capacity: 2000,
      use: "Sample gaming storage drive",
      specs: { Capacity: "2TB", Type: "NVMe", Speed: "Fast", Tier: "High" }
    },
    {
      id: "ssd-4tb-nvme",
      name: "4TB Gen4 NVMe SSD",
      brand: "NVMe",
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
      name: "550W Bronze PSU",
      brand: "Power Supply",
      price: 55,
      wattage: 0,
      score: 58,
      capacity: 550,
      use: "Sample budget PSU",
      specs: { Power: "550W", Rating: "Bronze", Modular: "No", Tier: "Budget" }
    },
    {
      id: "psu-650",
      name: "650W Gold PSU",
      brand: "Power Supply",
      price: 85,
      wattage: 0,
      score: 72,
      capacity: 650,
      use: "Sample balanced PSU",
      specs: { Power: "650W", Rating: "Gold", Modular: "Semi", Tier: "Balanced" }
    },
    {
      id: "psu-850",
      name: "850W Gold Modular PSU",
      brand: "Power Supply",
      price: 130,
      wattage: 0,
      score: 88,
      capacity: 850,
      use: "Sample high-end PSU",
      specs: { Power: "850W", Rating: "Gold", Modular: "Full", Tier: "High" }
    },
    {
      id: "psu-1000",
      name: "1000W Platinum PSU",
      brand: "Power Supply",
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
      name: "Budget ATX Case",
      brand: "ATX Case",
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
      name: "Airflow RGB ATX Case",
      brand: "ATX Case",
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
      name: "Glass Showcase RGB Case",
      brand: "ATX Case",
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
      name: "Basic Air Cooler",
      brand: "CPU Cooler",
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
      name: "RGB Tower Cooler",
      brand: "CPU Cooler",
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
      name: "240mm AIO Liquid Cooler",
      brand: "CPU Cooler",
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
      name: "360mm Elite AIO Cooler",
      brand: "CPU Cooler",
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

/* =========================================================
   06. SPLASH SCREEN
========================================================= */
function startSplash() {
  const messages = [
    "Loading sample part database...",
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
        showToast("EMX Builder loaded. Local sample data active.", "good");
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
  const query = searchInput.value.trim().toLowerCase();
  const sort = sortSelect.value;

  let parts = [...partsDB[activeCategory]];

  if (query) {
    parts = parts.filter((part) => {
      return part.name.toLowerCase().includes(query) ||
        part.brand.toLowerCase().includes(query) ||
        String(part.use || "").toLowerCase().includes(query);
    });
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

  if (sort === "recommended") {
    parts.sort((a, b) => getRecommendedScore(b, goalSelect.value) - getRecommendedScore(a, goalSelect.value));
  }

  return parts;
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
                    <span>${formatMoney(suggestion.part.price)} • Score ${suggestion.part.score}</span>
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
  const parts = getVisibleParts();
  categoryTitleText.textContent = categoryLabels[activeCategory] + " Parts";

  if (parts.length === 0) {
    partsList.innerHTML = `<div class="warning warn">No parts found for this search.</div>`;
    return;
  }

  partsList.innerHTML = parts.map(renderPartCard).join("");
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
      <div class="part-top">
        <div class="part-info">
          <span>${escapeHtml(part.brand)}</span>
          <h4>${escapeHtml(part.name)}</h4>
          <p>${escapeHtml(part.use || "Sample PC part")} • Sample Score ${part.score}</p>
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
          <span>${formatMoney(save.total)} • ${save.wattage}W • Score ${save.score}</span>
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
  lines.push("NOTE: V1 uses local sample data, not live pricing/specs.");
  lines.push("-------------------------");
  
  Object.keys(build).forEach((category) => {
    const part = getSelectedPart(category);
    lines.push(categoryLabels[category] + ": " + (part ? part.name + " - " + formatMoney(part.price) : "Not selected"));
  });
  
  lines.push("-------------------------");
  lines.push("Total: " + formatMoney(calculateTotalPrice()));
  lines.push("Estimated Wattage: " + calculateWattage() + "W");
  lines.push("Sample FPS Score: " + calculateFpsScore());
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
    mouse = "Lightweight 1K–4K polling gaming mouse";
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
  lines.push("NOTE: V1 report uses local sample data and estimated projections.");
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
    status.textContent = success ? `${message} ✅` : message;
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
    ctx.fillText(`• ${row}`, x + 24, rowY);
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
        ">×</button>
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

  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === activeCategory);
  });

  renderParts();
  showToast(categoryLabels[activeCategory] + " category opened.", "good");
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
