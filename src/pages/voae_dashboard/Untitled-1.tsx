// src/components/Dashboard.tsx
import DashboardButton from "@/components/DashboardButton";
import React, { useEffect } from "react";

interface DashboardProps {
  title: string;
  routes: Record<string, string>;
  getIconByTitle: (title: string) => JSX.Element | null;
}

const Dashboard: React.FC<DashboardProps> = ({
  title,
  routes,
  getIconByTitle,
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="h-full flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(routes).map((routeTitle) => (
            <DashboardButton
              key={routeTitle}
              title={routeTitle}
              icon={getIconByTitle(routeTitle)}
              route={routes[routeTitle]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
