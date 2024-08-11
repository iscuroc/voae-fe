import React, { useEffect, useState } from 'react';
import logo1 from '@/assets/logo.avif';
import logo2 from '@/assets/logo2.avif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLoader } from 'react-icons/fi';
import axiosInstance from '../../api/axiosInstance';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

interface FormData {
    password: string;
    passwordConfirmation: string;
    resetToken: string;
}

const ResetPassword: React.FC = () => {
    useEffect(() => {
        document.title = "Restablecer Contraseña - UNAH COPAN";
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        password: '',
        passwordConfirmation: '',
        resetToken: '',
    });

    const [errors, setErrors] = useState({
        password: '',
        passwordConfirmation: '',
        general: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const validateForm = (): boolean => {
        const newErrors = {
            password: '',
            passwordConfirmation: '',
            general: ''
        };
        let isValid = true;

        // Password validation
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un dígito y un carácter especial.';
            isValid = false;
        }

        // Password confirmation
        if (formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmation = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true); // Start loading
            try {
                await axiosInstance.post('/auth/reset-password', {
                    password: formData.password,
                    passwordConfirmation: formData.passwordConfirmation,
                    resetToken: formData.resetToken,
                });
                navigate('/login');
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        const { status } = error.response;
                        if (status === 400) {
                            setErrors(prevErrors => ({ ...prevErrors, general: 'Error al restablecer la contraseña, vuelva a intentarlo.' }));
                        } else {
                            setErrors(prevErrors => ({ ...prevErrors, general: 'Error al restablecer la contraseña, vuelva a intentarlo.' }));
                        }
                    } else {
                        setErrors(prevErrors => ({ ...prevErrors, general: 'Error al restablecer la contraseña, vuelva a intentarlo.' }));
                    }
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, general: 'Error al restablecer la contraseña, vuelva a intentarlo.' }));
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        // Extrae el token de la url
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setFormData(prevState => ({ ...prevState, resetToken: token }));
        }
    }, []);

    return (
        <>
            <div className="mx-5 my-40 h-full bg-white overflow-hidden flex items-center justify-center">
                <div className="flex flex-col md:flex-row w-full h-full items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                    {/* Imágenes */}
                    <div className="flex items-center justify-center">
                        <img src={logo1} alt="Logo 1" className="w-48 h-32 mr-7 md:mr-0 mt-5 md:mt-0 md:w-80 md:h-52" />
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                        <img src={logo2} alt="Logo 2" className="w-48 h-32 md:w-80 md:h-52" />
                    </div>
                    {/* Formulario de Restablecimiento de Contraseña */}
                    <div className="bg-yellow-500 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 shadow-2xl rounded-lg p-4 sm:p-4">
                        <form className="flex flex-col space-y-4 p-1" onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Contraseña"
                                />
                                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="passwordConfirmation" className="text-sm font-medium">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="passwordConfirmation"
                                    value={formData.passwordConfirmation}
                                    onChange={handleInputChange}
                                    className="bg-gray-200 p-2 focus:outline-none rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Confirmar Contraseña"
                                />
                                {errors.passwordConfirmation && <p className="text-red-600 text-sm mt-1">{errors.passwordConfirmation}</p>}
                            </div>
                            
                            {errors.general && <p className="text-red-600 text-sm mt-1">{errors.general}</p>}
                            <button
                                className="bg-gradient-to-b from-blue-800 to-blue-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-md shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (<FiLoader className="mr-2 animate-spin" />) : ('Restablecer Contraseña')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
