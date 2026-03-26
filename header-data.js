(function(){

  const SUPABASE_URL = "https://octwwpatppbenqwkcqaw.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI";

  // 👉 создаём клиент (ВАЖНО)
  const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  function getToken(){
    const p = new URLSearchParams(location.search);

    return (
      p.get("t") ||
      p.get("token") ||
      p.get("edit_token") ||
      p.get("rsvptoken") ||
      sessionStorage.getItem("rsvpToken") ||
      ""
    );
  }

  async function loadHeader(){

    const token = getToken();
    if(!token) return;

    sessionStorage.setItem("rsvpToken", token);

    try{

      const { data, error } = await sb
        .from("sites")
        .select("couple_name,wedding_date")
        .eq("edit_token", token)
        .maybeSingle();

      if(error || !data) return;

      // 👉 NAME
      const nameEl = document.getElementById("coupleName");
      if(nameEl && data.couple_name){
        nameEl.textContent = data.couple_name;

        setTimeout(()=>{
          nameEl.classList.add("show");
        }, 200);
      }

      // 👉 DATE
      if(data.wedding_date){
        const d = new Date(data.wedding_date);

        const formatted = d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        const dateEl = document.getElementById("eventDate");
        if(dateEl){
          dateEl.textContent = formatted;
dateEl.style.fontWeight = "500";   // 👈 ВОТ ЭТО

        }
      }

    }catch(e){
      console.log("header load error:", e);
    }
  }

  // 🚀 запуск
  window.addEventListener("DOMContentLoaded", loadHeader);

})();