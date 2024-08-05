// src/components/Banners.tsx
import React from 'react';

interface Banner {
  id: number;
  src: string;
  title: string;
}

interface BannersProps {
  banners: Banner[];
  handleDeleteBanner?: (id: number) => void; // Opcional para poder reutilizar el componente sin necesidad de eliminar
}

const Banners: React.FC<BannersProps> = ({ banners, handleDeleteBanner }) => {
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
            {handleDeleteBanner && (
              <button
                onClick={() => handleDeleteBanner(banners[i].id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Eliminar
              </button>
            )}
          </div>
          {banners[i + 1] && (
            <div className="flex-1 bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">{banners[i + 1].title}</h2>
              <img
                src={banners[i + 1].src}
                alt={banners[i + 1].title}
                className="w-full h-64 object-contain rounded-lg mb-2"
              />
              {handleDeleteBanner && (
                <button
                  onClick={() => handleDeleteBanner(banners[i + 1].id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      );
    }
    return bannerRows;
  };

  return <>{renderBanners()}</>;
};

export default Banners;
