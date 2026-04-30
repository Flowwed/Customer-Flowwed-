async function loadStoryToggle() {

  const params = new URLSearchParams(location.search);

  const token =
    params.get("t") ||
    params.get("token") ||
    sessionStorage.getItem("rsvpToken") ||
    "";

  if (!token) return;

  const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";


  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/our_story_page?select=story_enabled&edit_token=eq.${token}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const data = await res.json();

  if (!data.length) return;

  const enabled =
    data[0].story_enabled === true ||
    data[0].story_enabled === "true";

  if (!enabled) {

    document
      .querySelectorAll('[data-page="our_story.html"], [data-path="/our_story"]')
      .forEach(el => {
        el.remove();
      });

  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadStoryToggle();
});