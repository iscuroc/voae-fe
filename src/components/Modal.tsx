import React from 'react';
import { Dialog } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const SuccessModal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleClose = () => {
        onClose();
        const pathname = location.pathname;

        if (pathname.includes('/dashboard-voae')) {
            navigate('/dashboard-voae/main');
        } else if (pathname.includes('/dashboard-estudiante')) {
            navigate('/dashboard-estudiante/main');
        } else if (pathname.includes('/dashboard-coordinador')) {
            navigate('/dashboard-coordinador/main');
        } else {
            navigate('/');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-70">
            <Dialog.Panel className="bg-white p-8 rounded-lg shadow-xl transform transition-all max-w-sm w-full">
                <Dialog.Title className="text-2xl font-extrabold text-gray-800 mb-4">Operación Completada!!</Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 mb-6">
                    {message}
                </Dialog.Description>
                <div className="flex justify-end">
                    <button
                        onClick={handleClose}
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Aceptar
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>

    );
};

export default SuccessModal;
