import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface DashboardButtonProps {
  title: string;
  icon: React.ReactNode;
  route: string; // Añadimos la propiedad route
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ title, icon, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-yellow-500 p-4 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
      onClick={handleClick}
    >
      <div className="mb-2 flex items-center justify-center">
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
      <div className="flex justify-center mt-4">
        {icon && <span className="text-5xl">{icon}</span>}
      </div>
    </motion.button>
  );
};

export default DashboardButton;
