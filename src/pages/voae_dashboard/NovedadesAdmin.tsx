import React, { useState } from 'react';
import HeaderLogin from '../../components/Header_login';

const NovedadesAdmin: React.FC = () => {
  const [banners, setBanners] = useState([
    { id: 1, src: "/ruta/a/tu/imagen1.jpg", title: "Banner 1" },
    { id: 2, src: "/ruta/a/tu/imagen2.jpg", title: "Banner 2" },
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newBanner = {
        id: banners.length + 1,
        src: URL.createObjectURL(file),
        title: `Banner ${banners.length + 1}`, // Default title
      };

      // Prompt user for a title (you can use prompt, modal, etc.)
      const newTitle = prompt('Enter title for the banner:', `Banner ${banners.length + 1}`);
      if (newTitle) {
        newBanner.title = newTitle;
      }

      setBanners([...banners, newBanner]);
    }
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
  };

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
            <button 
              onClick={() => handleDeleteBanner(banners[i].id)} 
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Eliminar
            </button>
          </div>
          {banners[i + 1] && (
            <div className="flex-1 bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">{banners[i + 1].title}</h2>
              <img 
                src={banners[i + 1].src} 
                alt={banners[i + 1].title} 
                className="w-full h-64 object-contain rounded-lg mb-2"
              />
              <button 
                onClick={() => handleDeleteBanner(banners[i + 1].id)} 
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      );
    }
    return bannerRows;
  };

  return (
    <div className="novedades-estudiantes">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Novedades Estudiantes</h1>
        
        <div className="bg-yellow-500 shadow-lg rounded-lg p-6 min-h-[80vh]">
          {renderBanners()}
        </div>
        
        <div className="flex justify-center mt-6">
          <input type="file" onChange={handleImageUpload} className="hidden" id="upload-input" />
          <label htmlFor="upload-input" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Subir Imagen
          </label>
        </div>
      </div>
    </div>
  );
};

export default NovedadesAdmin;
