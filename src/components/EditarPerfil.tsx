import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
    const [user, setUser] = useState({
        nombre: 'Juan Perez',
        telefono: '87456321',
        fechaNacimiento: '24-05-2000',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para guardar los cambios.
        console.log('Perfil actualizado:', user);
        navigate('/perfil');
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 font-semibold">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={user.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="telefono" className="block text-gray-700 font-semibold">Teléfono</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={user.telefono}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fechaNacimiento" className="block text-gray-700 font-semibold">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        value={user.fechaNacimiento}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/perfil')}
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors shadow-md"
                    >
                        Regresar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarPerfil;
