const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const UNIT_MAP: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  halli: "হালি",
};

const WEEKDAYS_BN = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const MONTHS_BN = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function toBanglaDigits(input: number | string): string {
  return String(input).replace(/[0-9]/g, (digit) => {
    return BANGLA_DIGITS[Number(digit)] ?? digit;
  });
}

export function formatBanglaPrice(value: number, decimals = 0): string {
  const isFiniteNum = Number.isFinite(value) ? value : 0;
  const parts = Math.abs(isFiniteNum).toFixed(decimals).split(".");
  const integerPart = (parts[0] || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1] ? `.${parts[1]}` : "";
  const banglaFormatted = toBanglaDigits(integerPart + (decimals > 0 ? decimalPart : ""));
  return value < 0 ? `-${banglaFormatted}` : banglaFormatted;
}

export function getBanglaUnit(unit: string): string {
  return UNIT_MAP[unit] || unit;
}

export function getDirectionSymbol(dir: "up" | "down" | "flat" | string): string {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "—";
}

export function getDirectionClass(dir: "up" | "down" | "flat" | string): string {
  if (dir === "up") return "price-up";
  if (dir === "down") return "price-down";
  return "price-flat";
}

export function getDirectionText(dir: "up" | "down" | "flat" | string): string {
  if (dir === "up") return "বেড়েছে";
  if (dir === "down") return "কমেছে";
  return "অপরিবর্তিত";
}

export function getBanglaCurrentDate(): string {
  const now = new Date();
  const dayName = WEEKDAYS_BN[now.getDay()];
  const dayNum = toBanglaDigits(now.getDate());
  const monthName = MONTHS_BN[now.getMonth()];
  const yearNum = toBanglaDigits(now.getFullYear());

  return `${dayName}, ${dayNum} ${monthName}, ${yearNum}`;
}
