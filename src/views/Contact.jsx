import { useContacts } from "../context/ContactContext";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard";

export default function Contact() {
  const { contacts, loading } = useContacts();

  if (loading) {
    return (
      <h2 className="text-center text-xl mt-10">Loading contacts...</h2>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Link
          to="/add"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Contact
        </Link>
      </div>

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No contacts yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}
