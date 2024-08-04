// rutas de dashboard Estudiantes
export const estudianteRoutes = {
    "Mis Horas VOAE": "/dashboard-estudiante/mis-actividades",
    "Actividades Disponibles": "/dashboard-estudiante/actividades-en-curso",
    "Actividades Solicitadas": "/dashboard-estudiante/actividades-solicitadas",
    "Crear Actividad": "/dashboard-estudiante/crear-actividad",
    "Mis Certificados": "/dashboard-estudiante/mis-certificados",
  } as const;
  
  export type EstudianteRouteKeys = keyof typeof estudianteRoutes;

// routesConfig.ts
export const coordinadorRoutes = {
  "Crear Actividad": "/dashboard-coordinador/crear-actividad",
  "Actividades Disponibles": "/dashboard-coordinador/actividad-en-curso",
  "Gestion de Actividades": "/dashboard-coordinador/gestion-actividad",
  "Horas por Estudiante": "/dashboard-coordinador/horas-voae",
} as const;

export type CoordinadorRouteKeys = keyof typeof coordinadorRoutes;

// rutas de dashboard VOAE
export const voaeRoutes = {
  "Gestion de Solicitudes": "/dashboard-voae/gestionar-solicitud",
  "Actividades": "/dashboard-voae/gestion-actividad",
  "Actividades Disponibles": "/dashboard-voae/actividad-en-curso",
  "Crear Actividad": "/dashboard-voae/crear-actividad",
  "Novedades": "/dashboard-voae/novedades-admin",
  "Horas por Usuario": "/dashboard-voae/horas-voae",
  "Gestión de Usuarios" : "/dashboard-voae/gestion-usuarios"
   // Agrega más rutas según sea necesario
} as const;

export type VoaeRouteKeys = keyof typeof voaeRoutes;
