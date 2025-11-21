import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import { useState } from "react";
import "../styles/ContactCard.css"
import Modal from "./Modal";

export default function ContactCard({ contact }) {
  const { deleteContact } = useContacts();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await deleteContact(contact.id);
    setShowModal(false);
  };

  return (
    <>
      <div className="contact-card">
        <div className="contact-info">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.full_name || contact.name)}&background=random`}
            alt="profile"
          />
          <div className="contact-details">
            <h2>{contact.full_name || contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.address}</p>
          </div>
        </div>

        <div className="contact-actions">
          <Link to={`/edit/${contact.id}`} className="edit-btn">
            Edit
          </Link>
          <button className="delete-btn" onClick={() => setShowModal(true)}>
            Delete
          </button>
        </div>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message={`¿Seguro que deseas eliminar a "${contact.full_name || contact.name}"?`}
      />
    </>
  );
}
