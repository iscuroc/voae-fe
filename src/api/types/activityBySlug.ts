import { ActivityStatus } from "../servicios/actividades";
import { OrganizerType } from "../servicios/actividadPost";
import { Role } from "../servicios/usuarios";

export interface GetActivityBySlug {
  id: number;
  slug: string;
  name: string;
  description: string;
  location: string;
  mainActivities: string[];
  goals: string[];
  startDate: string;
  endDate: string;
  totalSpots: number;
  bannerLink: string;
  lastRequestedAt: Date;
  activityStatus: ActivityStatus;
  lastReviewedAt: Date;
  reviewObservations: string[];
  organizers: Organizer[];
  supervisor: Coordinator;
  coordinator: Coordinator;
  requestedBy: Coordinator;
  foreingCareers: ForeingCareer[];
  scopes: Scope[];
  members: Member[];
}

export interface Member {
  id: number;
  names: string;
  lastnames: string;
  account: number;
  career: string;
  scopes: number[];
}
interface Coordinator {
  id: number;
  names: string;
  lastnames: string;
  role: Role;
}

interface ForeingCareer {
  id: number;
  name: string;
  type: OrganizerType;
}

interface Organizer {
  career: ForeingCareer;
  organization: ForeingCareer;
}

interface Scope {
  id: number;
  hours: number;
  scope: number;
}
