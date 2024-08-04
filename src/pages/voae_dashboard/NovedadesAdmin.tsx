// src/screens/NovedadesAdmin.tsx
import React, { useState } from 'react';
import HeaderLogin from '../../components/Header_login';
import Banners from '../../components/Banners';

const NovedadesAdmin: React.FC = () => {
  const [banners, setBanners] = useState([
    { id: 1, src: "/ruta/a/tu/imagen1.jpg", title: "Banner 1" },
    { id: 2, src: "/ruta/a/tu/imagen2.jpg", title: "Banner 2" },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newBanner = {
        id: banners.length + 1,
        src: URL.createObjectURL(file),
        title: `Banner ${banners.length + 1}`, // Default title
      };

      const newTitle = prompt('Enter title for the banner:', `Banner ${banners.length + 1}`);
      if (newTitle) {
        newBanner.title = newTitle;
      }

      setBanners([...banners, newBanner]);
    }
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter(banner => banner.id !== id));
  };

  return (
    <div className="novedades-estudiantes">
      <HeaderLogin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Publicar Novedad o Actividad </h1>
        
        <div className="bg-yellow-500 shadow-lg rounded-lg p-6 min-h-[80vh]">
          <Banners banners={banners} handleDeleteBanner={handleDeleteBanner} />
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

