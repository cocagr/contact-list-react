import { useState, useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import { useNavigate, useParams } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/AddContact.css"

export default function AddContact() {
  const { contacts, addContact, updateContact } = useContacts();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentContact = contacts.find((c) => c.id === parseInt(id));

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (currentContact) {
      setForm({
        full_name: currentContact.full_name || "",
        email: currentContact.email || "",
        phone: currentContact.phone || "",
        address: currentContact.address || "",
      });
    }
  }, [currentContact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.phone || !form.address) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (currentContact) {
        await updateContact(currentContact.id, form);
      } else {
        await addContact(form);
      }
      navigate("/");
    } catch (err) {
      alert("Ocurrió un error. Revisa la consola.");
      console.error(err);
    }
  };

  return (
    <div className="add-contact-container">
      <h1>{currentContact ? "Edit Contact" : "Add Contact"}</h1>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="floating-input">
          <FaUser className="icon" />
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
          <label>Full Name</label>
        </div>

        <div className="floating-input">
          <FaEnvelope className="icon" />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="floating-input">
          <FaPhone className="icon" />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <label>Phone</label>
        </div>

        <div className="floating-input">
          <FaMapMarkerAlt className="icon" />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <label>Address</label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}