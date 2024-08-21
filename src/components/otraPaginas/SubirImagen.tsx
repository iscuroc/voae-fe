import React, { useState } from 'react';
import { FaFileImage } from 'react-icons/fa';

const SubirImagen: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {
            // Aquí puedes agregar la lógica para enviar la imagen al servidor
            console.log('Enviando archivo:', selectedFile);
        } else {
            alert('Por favor, selecciona una imagen antes de enviar.');
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Subir Imagen</h1>
            
            <div className="mb-6">
                <label className="block text-gray-500 font-bold mb-2" htmlFor="file-upload">
                    Selecciona una imagen para subir:
                </label>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200"
                    >
                        <FaFileImage  className='text-gray-600'/>
                        <span className="text-sm text-gray-500 mt-2">Haz clic para seleccionar una imagen</span>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>

            {imagePreview && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-600 mb-4">Vista previa de la imagen:</h2>
                    <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="w-full h-auto rounded shadow-lg mb-6"
                    />
                </div>
            )}

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
                Enviar Imagen
            </button>
        </div>
    );
};

export default SubirImagen;

