import type { User } from "../types";

export interface DemoAccountCredential {
  email: string;
  password: string;
  user: User;
  label: string;
  description: string;
}

export const SEED_USERS: User[] = [
  {
    id: "user-citizen-001",
    name: "Demo Citizen",
    email: "citizen@sevafix.demo",
    phone: "+91 98765 43210",
    city: "Meerut",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    role: "citizen",
    joinedAt: "2026-01-15",
  },
  {
    id: "user-admin-001",
    name: "Demo Administrator",
    email: "admin@sevafix.demo",
    phone: "+91 98111 22233",
    city: "Meerut",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    role: "admin",
    joinedAt: "2026-01-15",
  },
  {
    id: "user-department-001",
    name: "Demo Department Officer",
    email: "officer@sevafix.demo",
    phone: "+91 99887 76655",
    city: "Meerut",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    role: "department",
    department: "Roads & Infrastructure",
    joinedAt: "2026-01-15",
  },
];

export const DEMO_CREDENTIALS: DemoAccountCredential[] = [
  {
    email: "citizen@sevafix.demo",
    password: "citizen123",
    user: SEED_USERS[0],
    label: "Continue as Citizen",
    description: "Submit & track civic reports, search public schemes",
  },
  {
    email: "admin@sevafix.demo",
    password: "admin123",
    user: SEED_USERS[1],
    label: "Continue as Admin",
    description: "Manage reports, assign departments, view impact analytics",
  },
  {
    email: "officer@sevafix.demo",
    password: "officer123",
    user: SEED_USERS[2],
    label: "Continue as Department Officer",
    description: "Manage assigned issues, update resolution progress",
  },
];
