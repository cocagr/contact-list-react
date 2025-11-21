import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import Contact from "./views/Contact";
import AddContact from "./views/AddContact";


export default function App() {
    return (
        <BrowserRouter>
            <ContactProvider>
                <Routes>
                    <Route path="/" element={<Contact />} />
                    <Route path="/edit/:id" element={<AddContact />} />
                    <Route path="/add" element={<AddContact />} />
                </Routes>
            </ContactProvider>
        </BrowserRouter>
    );
}