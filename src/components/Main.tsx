import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";

const Main: React.FC = () => {
  const [banners, setBanners] = useState([
    { id: 1, src: "/ruta/a/tu/imagen1.jpg", title: "Banner 1" },
    { id: 2, src: "/ruta/a/tu/imagen2.jpg", title: "Banner 2" },
  ]);

  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    // título de la pestaña del navegador
    document.title = "Inicio - UNAH COPAN";
  }, []);

  useEffect(() => {
    // Fetch banners from API
    const fetchBanners = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('/api/get-banners');
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  // Componente Banners definido dentro de Main
  const Banners: React.FC<{ banners: typeof banners }> = ({ banners }) => {
    const renderBanners = () => {
      const bannerRows = [];
      for (let i = 0; i < banners.length; i += 2) {
        bannerRows.push(
          <div className="flex flex-col md:flex-row mb-4" key={i}>
            <div className="flex-1 bg-white shadow-md rounded-lg p-4 mb-4 md:mb-0 md:mr-4">
              <h2 className="text-xl font-bold mb-2">{banners[i].title}</h2>
              <img
                src={banners[i].src}
                alt={banners[i].title}
                className="w-full h-64 object-contain rounded-lg mb-2"
              />
            </div>
            {banners[i + 1] && (
              <div className="flex-1 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold mb-2">{banners[i + 1].title}</h2>
                <img
                  src={banners[i + 1].src}
                  alt={banners[i + 1].title}
                  className="w-full h-64 object-contain rounded-lg mb-2"
                />
              </div>
            )}
          </div>
        );
      }
      return bannerRows;
    };

    return <>{renderBanners()}</>;
  };

  const handleRegisterClick = () => {
    navigate('/login'); // Redirige a la ruta /login
  };

  return (
    <>
      <main className="flex-1">
        <div className="text-base md:text-4xl font-bold text-center">
          <h1 className="mt-5 mb-5 text-4xl font-extrabold tracking-tight text-gray-900">NOVEDADES Y ACTIVIDADES</h1>
          <div className=" shadow-lg rounded-lg p-6 min-h-[80vh]">
            <Banners banners={banners} />
          </div>
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleRegisterClick} 
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <MdLogin className="mr-1" />
              Registrarse en una actividad
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;

