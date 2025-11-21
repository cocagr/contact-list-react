export default function Modal({ open, onClose, onConfirm, message }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-xl w-80">
                <h2 className="text-xl font-semibold mb-4">Confirmación</h2>
                <p className="mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-1 rounded bg-gray-300"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-1 rounded bg-red-500 text-white"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
