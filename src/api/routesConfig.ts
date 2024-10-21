// rutas de dashboard Estudiantes
export const estudianteRoutes = {
    "Mis Horas VOAE": "/mis-actividades",
    "Actividades Disponibles": "/actividades-en-curso",
    "Actividades Solicitadas": "/actividades-solicitadas",
    "Crear Actividad": "/crear-actividad",
    // "Mis Certificados": "/dashboard-estudiante/mis-certificados",
  } as const;
  
  export type EstudianteRouteKeys = keyof typeof estudianteRoutes;
  
  // routesConfig.ts
  export const coordinadorRoutes = {
    "Crear Actividad": "/dashboard-coordinador/crear-actividad",
    "Actividades Disponibles": "/dashboard-coordinador/actividad-en-curso",
    "Gestion de Actividades": "/dashboard-coordinador/gestion-actividad",
    // "Horas por Estudiante": "/dashboard-coordinador/horas-estudiantes",
    "Actividades Solicitadas": "/dashboard-coordinador/actividades-solicitadas",
  } as const;
  
  export type CoordinadorRouteKeys = keyof typeof coordinadorRoutes;
  
  // rutas de dashboard VOAE
  export const voaeRoutes = {
    "Gestion de Solicitudes": "/dashboard-voae/gestionar-solicitud",
    "Actividades": "/dashboard-voae/gestion-actividad",
    "Actividades Disponibles": "/dashboard-voae/actividad-en-curso",
    "Crear Actividad": "/dashboard-voae/crear-actividad",
    "Actividades Solicitadas": "/dashboard-voae/actividades-solicitadas",
} as const;

export type VoaeRouteKeys = keyof typeof voaeRoutes;
