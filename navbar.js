async function loadStoryToggle() {

  console.time("NAVBAR_TOTAL");

  try {

    const params = new URLSearchParams(location.search);

    const token =
      params.get("t") ||
      params.get("token") ||
      sessionStorage.getItem("rsvpToken") ||
      "";

    if (!token) {
      console.warn("NO TOKEN");
      return;
    }

    const SUPABASE_URL =
      "https://octwwpatppbenqwkcqaw.supabase.co";

    const SUPABASE_KEY =

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";


    // ===== OUR STORY TOGGLE =====

    console.time("STORY_FETCH");

    const storyRes = await fetch(
      `${SUPABASE_URL}/rest/v1/our_story_page?select=story_enabled&edit_token=eq.${token}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    console.timeEnd("STORY_FETCH");

    const storyRows = await storyRes.json();

    const storyEnabled =
      storyRows?.[0]?.story_enabled === true ||
      storyRows?.[0]?.story_enabled === "true";

    // ===== GLOBAL PAGE TOGGLES =====

    console.time("TOGGLES_FETCH");

    const siteRes = await fetch(
      `${SUPABASE_URL}/rest/v1/sites?edit_token=eq.${token}&select=page_toggles`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    console.timeEnd("TOGGLES_FETCH");

    const siteRows = await siteRes.json();

    const toggles =
      siteRows?.[0]?.page_toggles || {};

    console.log("TOGGLES:", toggles);

    // ===== HIDE OUR STORY =====

    if (!storyEnabled) {

      document
        .querySelectorAll(
          '[data-page="our_story.html"], [data-path="/our_story"], [data-path="our_story_mobile.html"]'
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

    if (toggles.justMarried === false) {

      document
        .querySelectorAll(
          '[data-page="just_married.html"], [data-path="/just_married"]'
        )
        .forEach(el => {
          el.remove();
        });

    }

    if (toggles.gift_registry === false) {

      document
        .querySelectorAll(
          '[data-page="gift_registry.html"], [data-path="/gift_registry"]'
        )
        .forEach(el => {
          el.remove();
        });

    }

    if (toggles.updates === false) {

      document
        .querySelectorAll(
          '[data-page="web-updates.html"], [data-path="/web-updates"]'
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

  } catch (e) {

    console.error("NAVBAR ERROR:", e);

  } finally {

    console.timeEnd("NAVBAR_TOTAL");

  }

}

document.addEventListener("DOMContentLoaded", () => {
  loadStoryToggle();
});