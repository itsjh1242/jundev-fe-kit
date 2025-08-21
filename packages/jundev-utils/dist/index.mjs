// src/debounce/debounce.ts
var debounce = ({
  fn,
  delay = 200
}) => {
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};

// src/file/downloadFile.ts
import { saveAs } from "file-saver";
var sanitizeFileName = (name) => {
  return name.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "_").trim();
};
var truncateString = (str, maxLength) => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};
var downloadFile = async (fileUrl, fileName) => {
  try {
    const extension = fileUrl.split(".").pop()?.toLowerCase() || "file";
    const finalFileName = fileName ? `${sanitizeFileName(truncateString(fileName, 50))}.${extension}` : fileUrl.split("/").pop() || `download.${extension}`;
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(
        `\uB2E4\uC6B4\uB85C\uB4DC \uC2E4\uD328 (status: ${response.status} ${response.statusText})`
      );
    }
    const blob = await response.blob();
    saveAs(blob, finalFileName);
  } catch (error) {
    console.error("\uD30C\uC77C \uB2E4\uC6B4\uB85C\uB4DC \uC911 \uC624\uB958 \uBC1C\uC0DD:", error);
  }
};

// src/format/currency.ts
var formatKRW = (n) => new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW"
}).format(Number(n));

// src/format/number.ts
var formatNumber = (n) => new Intl.NumberFormat().format(Number(n));

// src/format/date.ts
var isValidDate = (date) => !isNaN(+date);
var formatDate = (date, opts = {
  hour: true,
  minute: true,
  second: true
}) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const pad = (n) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const parts = [`${year}-${month}-${day}`];
  if (opts.hour || opts.minute || opts.second) {
    const timeParts = [];
    if (opts.hour) timeParts.push(pad(date.getHours()));
    if (opts.minute) timeParts.push(pad(date.getMinutes()));
    if (opts.second) timeParts.push(pad(date.getSeconds()));
    parts.push(timeParts.join(":"));
  }
  return parts.join(" ");
};
var stringToDate = (value) => {
  if (!value) return /* @__PURE__ */ new Date(NaN);
  const [datePart, timePart = "00:00:00"] = value.trim().split(" ");
  const [year, month, day] = (datePart?.split("-") ?? []).map(Number);
  const [hours = 0, minutes = 0, seconds = 0] = (timePart?.split(":") ?? []).map(Number);
  if (!year || !month || !day) return /* @__PURE__ */ new Date(NaN);
  const d = /* @__PURE__ */ new Date();
  d.setFullYear(year);
  d.setMonth(month - 1);
  d.setDate(day);
  d.setHours(hours);
  d.setMinutes(minutes);
  d.setSeconds(seconds);
  d.setMilliseconds(0);
  return d;
};

// src/format/dday.ts
var getDDay = (target, opts = {}) => {
  const { prefix = "D", todayLabel = "D-DAY", withSign = true } = opts;
  const now = /* @__PURE__ */ new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );
  const diffInMs = startOfTarget.getTime() - startOfToday.getTime();
  const diffInDays = Math.floor(diffInMs / (1e3 * 60 * 60 * 24));
  if (diffInDays === 0) return todayLabel;
  if (diffInDays > 0) return `${prefix}-${diffInDays}`;
  return `${prefix}${withSign ? "+" : ""}${Math.abs(diffInDays)}`;
};

// src/format/phoneNumber.ts
function isValidPhone(value) {
  const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  return regex.test(value);
}
var formatPhoneNumber = (phone, withHyphen = true) => {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  let formatted = digits;
  if (digits.length === 11) {
    formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(
      7
    )}`;
  } else if (digits.length === 10) {
    if (digits.startsWith("02")) {
      formatted = `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(
        6
      )}`;
    } else {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6
      )}`;
    }
  } else if (digits.length === 8) {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return withHyphen ? formatted : formatted.replace(/-/g, "");
};
export {
  debounce,
  downloadFile,
  formatDate,
  formatKRW,
  formatNumber,
  formatPhoneNumber,
  getDDay,
  isValidDate,
  isValidPhone,
  sanitizeFileName,
  stringToDate,
  truncateString
};
