export const ensureAgenda = async (API_BASE, AGENDA_SLUG) => {
    try {
      await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, { method: "POST" });
    } catch (err) {
      console.error("Error creating agenda:", err);
    }
  };
