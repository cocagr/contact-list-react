// context/ContactContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  getContactsFromAPI,
  addContactToAPI,
  updateContactInAPI,
  deleteContactInAPI,
} from "../services/contactServices.js";
import { ensureAgenda } from "../services/agendaServices.js";

const ContactContext = createContext();
export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContactsFromAPI();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchContacts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      // Asegura agenda (esto evita errores al crear contactos)
      try {
        await ensureAgenda();
      } catch (e) {
        // ignore
      }
      await fetchContacts();
    };
    init();
  }, []);

  const addContact = async (contact) => {
    await addContactToAPI(contact);
    await fetchContacts();
  };

  const updateContact = async (id, contact) => {
    await updateContactInAPI(id, contact);
    await fetchContacts();
  };

  const deleteContact = async (id) => {
    await deleteContactInAPI(id);
    // eliminar localmente para una respuesta más rápida
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        fetchContacts,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
