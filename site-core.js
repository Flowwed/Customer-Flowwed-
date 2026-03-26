var SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";

function getToken() {
  const p = new URLSearchParams(location.search);
  const token =
    p.get("t") ||
    p.get("token") ||
    sessionStorage.getItem("rsvpToken") ||
    "";

  if (token) sessionStorage.setItem("rsvpToken", token);
  return token;
}

async function loadCoupleName() {
  const token = getToken();
  if (!token) return;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/sites?select=couple_name&edit_token=eq.${token}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const arr = await res.json();
    if (!arr?.length) return;

    const name = arr[0].couple_name;
    if (!name) return;

    const el = document.getElementById("coupleName");
    if (el) el.textContent = name;

    document.title = name + " – Wedding";

  } catch (e) {
    console.log("loadCoupleName failed", e);
  }
}

function buildLink(path) {
  const token = getToken();
  if (!token) return path;
  return `${path}?t=${encodeURIComponent(token)}`;
}

function initNavLinks() {
  document.querySelectorAll("[data-page]").forEach(link => {
    link.href = buildLink(link.dataset.page);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCoupleName();
  initNavLinks();
});

function goBack() {
  history.length > 1
    ? history.back()
    : window.location.href = buildLink("home");
}