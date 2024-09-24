import React, { useEffect, useState } from "react";
import logo1 from "@/assets/logo.avif";
import logo2 from "@/assets/logo2.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import { Carrera, obtenerTodasLasCarreras } from "../../api/servicios/carreras";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MultiSelect, Option } from "react-multi-select-component";
import { useGetOrganizationsQuery } from "@/api/servicios/organizaciones";
import { toast } from "react-toastify";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

interface FormData {
  names: string;
  lastnames: string;
  accountNumber: string;
  password: string;
  passwordConfirmation: string;
  emailConfirmationToken: string;
  careerId: number | string;
  organizationIds: number[];
}

interface ErrorDetail {
  code: string;
  description: string;
}

const errorMessages: { [key: number]: string } = {
  401: "No autorizado. El enlace de confirmacion ha expirado, vuelve a1 registrarse",
  409: "El número de cuenta ya está en uso.",
};

const successMessages: { [key: number]: string } = {
  200: "Registro exitoso. Verifica tu bandeja de entrada o SPAM.",
};

const defaultErrorMessage = "Error al confirmar usuario, vuelva a intentarlo.";

const DetallesRegistro: React.FC = () => {
  const [errors, setErrors] = useState({
    password: "",
    passwordConfirmation: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    names: "",
    lastnames: "",
    accountNumber: "",
    password: "",
    passwordConfirmation: "",
    emailConfirmationToken: "",
    careerId: 0,
    organizationIds: [],
  });
  console.log("formData", formData);

  const [carrera, setCarreras] = useState<Carrera[]>([]);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const [{ data: organizations = [], loading: loadingOrganizations }] =
    useGetOrganizationsQuery();

  const [selected, setSelected] = useState<Option[]>([]);

  const validateStudentsOrganizations = (selected: Option[]) => {
    if (!selected.length) return true;
    const areStudentsOrganizations = selected.every((org) => org.value <= 3);
    const careerId = areStudentsOrganizations ? formData.careerId : "";

    setFormData((prevState) => ({
      ...prevState,
      careerId: careerId,
      organizationIds: selected.map((s) => s.value),
    }));
    return areStudentsOrganizations;
  };

  const handleSelectOrganization = (selected: Option[]) => {
    setSelected(selected);
    setFormData((prevState) => ({
      ...prevState,
      organizationIds: selected.map((s) => s.value),
    }));
    if (!formData.careerId) return;
    const isValidCareer = validateStudentsOrganizations(selected);

    if (!isValidCareer) {
      toast.info("Las áreas seleccionadas no son válidas para estudiantes");
      // setFormData((prevState) => ({
      //   ...prevState,
      //   organizationIds: [],
      // }));
      return;
    }
  };

  useEffect(() => {
    document.title = "Registro - UNAH COPAN";
    const fetchCarreras = async () => {
      try {
        const resultado = await obtenerTodasLasCarreras();
        setCarreras(resultado);
      } catch (error) {
        console.error("Error al obtener las carreras:", error);
      }
    };
    fetchCarreras();

    // Extrae el token de la url
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setFormData((prevState) => ({
        ...prevState,
        emailConfirmationToken: token,
      }));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === "careerId") {
      console.log("careerId", value);

      const isValidCareer = validateStudentsOrganizations(selected);
      console.log("isValidCareer", isValidCareer);

      if (!isValidCareer) {
        toast.info("Las áreas seleccionadas no son válidas para estudiantes");

        return;
      }
    }
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      password: "",
      passwordConfirmation: "",
      general: "",
    };
    let isValid = true;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un dígito y un solo carácter especial(@, $, !, %, ?, &).";
      isValid = false;
    }

    if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Las contraseñas no coinciden.";
      isValid = false;
    }

    //se debe seleccionar carrera u organizacion
    if (!formData.careerId && !formData.organizationIds.length) {
      newErrors.general = "Seleccione una carrera u organización.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const dto = { ...formData } as Record<string, unknown>;
        if (!formData.careerId) {
          dto.careerId = null;
        }
        await axiosInstance.post("/auth/confirm", formData);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: successMessages[200] || defaultErrorMessage,
        }));
        setTimeout(() => navigate("/login"), 3000); // Redirect after showing the success message
      } catch (error: unknown) {
        let errorMessage = defaultErrorMessage;
        if (axios.isAxiosError(error) && error.response) {
          const { status, data } = error.response;
          const responseData = data as {
            type?: string;
            errors?: ErrorDetail[];
          };

          if (errorMessages[status]) {
            errorMessage = errorMessages[status];
          } else if (responseData.errors && responseData.errors.length > 0) {
            const errorDetail = responseData.errors[0];
            switch (errorDetail.code) {
              case "Authentication.InvalidToken":
                errorMessage = "El token de confirmación es inválido.";
                break;
              case "Authentication.TokenExpired":
                errorMessage = "El token de confirmación ha expirado.";
                break;
              case "Authentication.EmailAlreadyConfirmed":
                errorMessage = "El correo electrónico ya ha sido confirmado.";
                break;
              case "Authentication.InvalidAccountNumber":
                errorMessage = "Número de cuenta inválido.";
                break;
              case "Authentication.AccountNumberInUse":
                errorMessage =
                  "Número de cuenta ya en uso o no valido, (si es empleado y su cuenta es de 4 digitos coloque un cero(0) al principio para completar los 5 digitos requeridos.";
                break;
              default:
                break;
            }
          }
        }
        setErrors((prevErrors) => ({ ...prevErrors, general: errorMessage }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const visibilidadDeLaContrasena = () => {
    setShowPassword((prev) => !prev);
  };

  const visibilidadDeLaContrasenaDeValidacion = () => {
    setShowPasswordConfirmation((prev) => !prev);
  };

  return (
    <div className="ml-5 mr-5 h-full md:mt-5 bg-white  flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full h-full items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Imágenes */}
        <div className="flex items-center justify-center">
          <img
            src={logo1}
            alt="Logo 1"
            className="w-48 h-32 mr-7 md:mr-0 mt-5 md:mt-0 md:w-80 md:h-52"
          />
        </div>
        <div className="hidden md:flex items-center justify-center">
          <img src={logo2} alt="Logo 2" className="w-48 h-32 md:w-80 md:h-52" />
        </div>
        {/* Formulario de Registro */}
        <div className="bg-yellow-500 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 shadow-2xl rounded-lg p-4 sm:p-4">
          <form className="flex flex-col space-y-4 p-1" onSubmit={handleSubmit}>
            <div className="flex flex-col ">
              <label htmlFor="names" className="text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="names"
                value={formData.names}
                onChange={handleInputChange}
                className=" p-2 focus:outline-none rounded-sm shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="lastnames" className="text-sm font-medium">
                Apellidos
              </label>
              <input
                type="text"
                id="lastnames"
                value={formData.lastnames}
                onChange={handleInputChange}
                className=" p-2 focus:outline-none rounded-sm shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Apellidos"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="accountNumber" className="text-sm font-medium">
                Número de cuenta
              </label>
              <input
                type="text"
                id="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className=" p-2 focus:outline-none rounded-sm shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Número de cuenta"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="careerId" className="text-sm font-medium">
                Carrera
              </label>
              <select
                id="careerId"
                value={formData.careerId}
                onChange={handleInputChange}
                className="bg-white p-2 focus:outline-none rounded-sm shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Selecciona una carrera</option>
                {carrera.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="Select">
                <span className="text-sm font-medium">
                  Áreas (opcional para estudiantes)
                </span>
                <MultiSelect
                  isLoading={loadingOrganizations}
                  options={
                    [...organizations]
                      ?.sort((a, b) => b.id - a.id)
                      .map((org) => ({ label: org.name, value: org.id })) || []
                  }
                  value={selected}
                  onChange={handleSelectOrganization}
                  labelledBy="Select"
                  overrideStrings={{
                    selectSomeItems: "Selecciona una o más organizaciones",
                    allItemsAreSelected:
                      "Todas las organizaciones están seleccionadas",
                    selectAll: "Seleccionar todas",
                    search: "Buscar",
                  }}
                  className="z-50 bg-slate-400"
                  hasSelectAll={false}
                />
              </label>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className=" p-2 w-full focus:outline-none rounded-sm shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={visibilidadDeLaContrasena}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <IoEye className="bg-gray-200 " />
                  ) : (
                    <IoMdEyeOff className="bg-gray-200 " />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="passwordConfirmation"
                className="text-sm font-medium"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPasswordConfirmation ? "text" : "password"}
                  id="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleInputChange}
                  className=" p-2 w-full focus:outline-none rounded-sm shadow-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Confirmar Contraseña"
                />
                <button
                  type="button"
                  onClick={visibilidadDeLaContrasenaDeValidacion}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPasswordConfirmation ? (
                    <IoEye className="bg-gray-200 " />
                  ) : (
                    <IoMdEyeOff className="bg-gray-200 " />
                  )}
                </button>
              </div>
              {errors.passwordConfirmation && (
                <span className="text-red-500 text-xs">
                  {errors.passwordConfirmation}
                </span>
              )}
            </div>
            {errors.general && (
              <div className="text-red-500 text-sm mb-4">{errors.general}</div>
            )}
            <button
              type="submit"
              className="bg-gradient-to-b from-blue-800 to-blue-900 text-white p-2 rounded-sm shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              disabled={isLoading}
            >
              {isLoading ? <FiLoader className="animate-spin" /> : "Registrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetallesRegistro;
