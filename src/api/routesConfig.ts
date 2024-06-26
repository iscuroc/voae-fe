// rutas de dashboard Estudiantes
export const estudianteRoutes = {
    "Mis Actividades": "/dashboard-estudiante/mis-actividades",
    "Actividades en Curso": "/dashboard-estudiante/pestudiantes",
    "Actividades Solicitadas": "#",
    "Crear Actividad": "#",
    "Novedades": "#",
    "Mis Horas VOAE": "#",
    "Mis Certificados": "#",
  } as const;
  
  export type EstudianteRouteKeys = keyof typeof estudianteRoutes;

// routesConfig.ts
export const coordinadorRoutes = {
    "Crear Actividad": "#",
    "Actividades en Curso": "#",
    "Gestion de Actividades": "/dashboard-coordinador/pcoordinadores",
    "Novedades": "#",
    "Horas por Estudiante": "#",
    // Agrega más rutas según sea necesario
} as const;

export type CoordinadorRouteKeys = keyof typeof coordinadorRoutes;

 // rutas de dashboard VOAE
 export const voaeRoutes = {
    "Gestion de Solicitudes": "#",
    "Gestion de Actividades": "/dashboard-voae/pvoae",
    "Actividades en Curso": "#",
    "Crear Actividad": "#",
    "Novedades": "#",
    "Horas por Usuario": "#",
     // Agrega más rutas según sea necesario
  } as const;
  
  export type VoaeRouteKeys = keyof typeof voaeRoutes;
  