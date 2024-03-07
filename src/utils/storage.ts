export const setStorage = (
  key: string,
  value: unknown,
  type: "local" | "session" = "local"
): void => {
  if (type === "local") {
    localStorage.setItem(key, JSON.stringify(value));
  }
  if (type === "session") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getStorage = <T extends any>(
  key: string,
  type: "local" | "session" = "local"
): T => {
  if (type === "local") {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } else if (type === "session") {
    return JSON.parse(sessionStorage.getItem(key) ?? "[]");
  }
  throw new Error("Invalid storage type");
};
