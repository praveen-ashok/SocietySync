import seedUsers from "../data/users";
import seedSocieties from "../data/societies";

// Old data (saved before multi-society support) has no societyId.
// It is treated as belonging to this society so nothing breaks.
export const DEFAULT_SOCIETY_ID = "MH001";

// ---------- Societies ----------

export function getSocieties() {
  const stored = JSON.parse(localStorage.getItem("societies"));

  if (stored) return stored;

  // First run: seed the sample societies
  localStorage.setItem("societies", JSON.stringify(seedSocieties));
  return seedSocieties;
}

export function saveSocieties(list) {
  localStorage.setItem("societies", JSON.stringify(list));
}

export function getSociety(societyId) {
  return getSocieties().find((s) => s.id === societyId);
}

// ---------- Users ----------

// Seed users + registered users. Users without a societyId
// (old data) get the default society. Super Admin has no society.
export function getAllUsers() {
  const registered = JSON.parse(localStorage.getItem("users")) || [];

  return [...seedUsers, ...registered].map((u) =>
    u.role === "superadmin" || u.societyId
      ? u
      : { ...u, societyId: DEFAULT_SOCIETY_ID }
  );
}

export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

// ---------- Society-wise filtering ----------

export function belongsToSociety(item, societyId) {
  return (item.societyId || DEFAULT_SOCIETY_ID) === societyId;
}

export function filterBySociety(list, societyId) {
  return list.filter((item) => belongsToSociety(item, societyId));
}
