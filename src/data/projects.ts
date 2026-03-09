export interface Project {
  id: number;
  name: string;
  ward: string;
  scheme: string;
  cost: string;
  status: string;
  coverage: number;
  coverageColor: 'green' | 'orange' | 'red';
  lat: number;
  lng: number;
  description?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Drainage Upgrade",
    ward: "Dwarka Ward 12",
    scheme: "Smart Cities Mission",
    cost: "₹40 Lakh",
    status: "Completed",
    coverage: 85,
    coverageColor: "green",
    lat: 28.5921,
    lng: 77.0460,
  },
  {
    id: 2,
    name: "Government Hospital",
    ward: "Janakpuri Sector 9",
    scheme: "PM Awas Yojana",
    cost: "₹12 Crore",
    status: "Completed",
    coverage: 60,
    coverageColor: "orange",
    lat: 28.6280,
    lng: 77.0850,
  },
  {
    id: 3,
    name: "Streetlight Installation",
    ward: "Rohini Gali 7",
    scheme: "MCD Budget",
    cost: "₹8 Lakh",
    status: "Completed",
    coverage: 22,
    coverageColor: "red",
    lat: 28.7157,
    lng: 77.1170,
  },
  {
    id: 4,
    name: "Road Resurfacing",
    ward: "Karol Bagh Ward 5",
    scheme: "PMGSY",
    cost: "₹65 Lakh",
    status: "Completed",
    coverage: 80,
    coverageColor: "green",
    lat: 28.6519,
    lng: 77.1907,
  },
  {
    id: 5,
    name: "Primary School Renovation",
    ward: "Saket Ward 3",
    scheme: "Smart Cities Mission",
    cost: "₹22 Lakh",
    status: "Completed",
    coverage: 55,
    coverageColor: "orange",
    lat: 28.5244,
    lng: 77.2066,
  },
];
