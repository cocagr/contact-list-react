import { ensureAgenda } from "./agendaServices.js";

export const API_BASE = "https://playground.4geeks.com/contact";
export const AGENDA_SLUG = "my_super_agenda";

export const getContactsFromAPI = async () => {
    try {
        const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`);
        const data = await res.json();
        return Array.isArray(data) ? data : data.contacts || [];
    } catch (err) {
        console.error("Error fetching contacts:", err);
        return [];
    }
};

export const addContactToAPI = async (contactData) => {
    try {
        await ensureAgenda(API_BASE, AGENDA_SLUG);

        const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: String(contactData.full_name),
                email: String(contactData.email),
                phone: String(contactData.phone),
                address: String(contactData.address),
                agenda_slug: AGENDA_SLUG,
            }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(JSON.stringify(data));
        return data;

    } catch (err) {
        console.error("Error creating contact:", err);
        throw err;
    }
};

export const updateContactInAPI = async (id, updatedData) => {
    try {
        const res = await fetch(
            `${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: String(updatedData.full_name),
                    email: String(updatedData.email),
                    phone: String(updatedData.phone),
                    address: String(updatedData.address),
                    agenda_slug: AGENDA_SLUG,
                }),
            }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(JSON.stringify(data));
        return data;

    } catch (err) {
        console.error("Error updating contact:", err);
        throw err;
    }
};

export const deleteContactInAPI = async (id) => {
    try {
        const res = await fetch(
            `${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`,
            { method: "DELETE" }
        );
        if (!res.ok) {
            const data = await res.json();
            throw new Error(JSON.stringify(data));
        }
        return true;
    } catch (err) {
        console.error("Error deleting contact:", err);
        throw err;
    }
};
