import React from 'react';

const InformacionEstudiante: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-center md:space-x-6 mb-8">
      <img
        src="https://voae.unah.edu.hn/assets/VOAE/paginas/home/_resampled/ResizedImageWzM3OSwxOTJd/Logo-oficial-VOAE.jpg"
        alt="VOAE Logo"
        className="w-48 h-38 mb-4 md:mb-0"
      />
      <div className="text-center md:text-left">
        <p className="text-m font-bold">Juan Perez Lopez</p>
        <p className="text-m font-bold">20242100777</p>
        <p className="text-m font-bold">Ingeniería en Sistemas</p>
      </div>
    </div>
  );
};

export default InformacionEstudiante;
