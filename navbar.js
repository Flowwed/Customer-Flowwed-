async function loadStoryToggle() {

  const params = new URLSearchParams(location.search);

  const token =
    params.get("t") ||
    params.get("token") ||
    sessionStorage.getItem("rsvpToken") ||
    "";

  if (!token) return;

  const SUPABASE_URL =
    "https://octwwpatppbenqwkcqaw.supabase.co";

  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";

  // ===== OUR STORY TOGGLE =====

  const storyRes = await fetch(
    `${SUPABASE_URL}/rest/v1/our_story_page?select=story_enabled&edit_token=eq.${token}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const storyRows = await storyRes.json();

  const storyEnabled =
    storyRows?.[0]?.story_enabled === true ||
    storyRows?.[0]?.story_enabled === "true";

  // ===== GLOBAL PAGE TOGGLES =====

  const siteRes = await fetch(
    `${SUPABASE_URL}/rest/v1/sites?edit_token=eq.${token}&select=page_toggles`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const siteRows = await siteRes.json();

  const toggles =
    siteRows?.[0]?.page_toggles || {};

  // ===== HIDE OUR STORY =====

  if (!storyEnabled) {

    document
      .querySelectorAll(
        '[data-page="our_story.html"], [data-path="/our_story"]'
      )
      .forEach(el => {
        el.remove();
      });

  }

  // ===== HIDE PHOTO GALLERY =====

  if (toggles.gallery === false) {

    document
      .querySelectorAll(
        '[data-page="photo_gallery.html"], [data-path="/photo_gallery"]'
      )
      .forEach(el => {
        el.remove();
      });

  }

if (toggles.travel === false) {

  document
    .querySelectorAll(
      '[data-page="venue_map.html"], [data-path="/venue_map"]'
    )
    .forEach(el => {
      el.remove();
    });

}


  // ===== SHOW NAVBAR AFTER FILTER =====

  document
    .querySelectorAll('.hero-steps, .nav-center')
    .forEach(el => {
      el.style.visibility = 'visible';
    });

}

document.addEventListener("DOMContentLoaded", () => {
  loadStoryToggle();
});