export const INITIAL_QUERIES = [
  {
    id: "CC-2026-10482",
    title: "Hostel Administration · Water issue",
    studentSays: "There is a water problem in my hostel room 304, Block B.",
    category: "Hostel maintenance",
    department: "Hostel Administration",
    assignedTo: "Chief Warden Office (Mr. Ramesh Kumar)",
    priority: "Normal",
    status: "Resolved",
    createdAt: "2026-09-26T14:32:00Z",
    updatedAt: "2026-09-27T09:15:00Z",
    timeline: [
      { status: "Submitted", time: "Sep 26, 02:32 PM", note: "Request raised by Rahul Sharma (Roll: 2024CS104)" },
      { status: "Assigned", time: "Sep 26, 02:35 PM", note: "Smart-routed to Hostel Maintenance & Warden Office" },
      { status: "In Progress", time: "Sep 26, 04:10 PM", note: "Plumber assigned to Room 304" },
      { status: "Resolved", time: "Sep 27, 09:15 AM", note: "Valve replaced and water pressure restored. Verified by student." }
    ],
    replies: [
      { sender: "System", text: "Query auto-categorized under Hostel Maintenance -> Water Issue.", time: "Sep 26, 02:32 PM" },
      { sender: "Warden Office", text: "Maintenance team dispatched. Please ensure room is accessible.", time: "Sep 26, 04:10 PM" }
    ]
  },
  {
    id: "CC-2026-10483",
    title: "Hostel Maintenance · Ceiling Fan Repair",
    studentSays: "I have a problem with my hostel room fan. It is making loud noise and not rotating.",
    category: "Hostel maintenance",
    department: "Hostel Administration",
    assignedTo: "Hostel Electrical Team",
    priority: "Normal",
    status: "Submitted",
    createdAt: "2026-09-27T10:15:00Z",
    updatedAt: "2026-09-27T10:15:00Z",
    timeline: [
      { status: "Submitted", time: "Sep 27, 10:15 AM", note: "Submitted by Priya Verma (Roll: 2024EC089)" },
      { status: "Assigned", time: "Sep 27, 10:16 AM", note: "Auto-assigned to Hostel Maintenance & Warden Office" }
    ],
    replies: [
      { sender: "System", text: "Query intent recognized: Hostel Room Fan Repair. Routed to Hostel Electrical Team.", time: "Sep 27, 10:16 AM" }
    ]
  },
  {
    id: "CC-2026-10479",
    title: "IT & Wi-Fi · Library Access Point Outage",
    studentSays: "Cannot connect to Campus_5G Wi-Fi on 2nd Floor Central Library.",
    category: "IT & Wi-Fi",
    department: "IT Support Desk",
    assignedTo: "Network Operations Center",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-09-27T08:20:00Z",
    updatedAt: "2026-09-27T09:40:00Z",
    timeline: [
      { status: "Submitted", time: "Sep 27, 08:20 AM", note: "Request raised by Amit Patel" },
      { status: "Assigned", time: "Sep 27, 08:21 AM", note: "Routed to IT Support NOC Team" },
      { status: "In Progress", time: "Sep 27, 09:40 AM", note: "Technician inspecting Access Point AP-LIB-02" }
    ],
    replies: [
      { sender: "IT Support", text: "Access point AP-LIB-02 rebooting. Estimated resolution time 15 mins.", time: "Sep 27, 09:40 AM" }
    ]
  },
  {
    id: "CC-2026-10470",
    title: "ID cards & documents · Bonafide Certificate",
    studentSays: "Need Bonafide Certificate urgent for passport application.",
    category: "ID cards & documents",
    department: "Academic Registrar Office",
    assignedTo: "Student Records Desk",
    priority: "Normal",
    status: "Resolved",
    createdAt: "2026-09-25T11:00:00Z",
    updatedAt: "2026-09-26T16:00:00Z",
    timeline: [
      { status: "Submitted", time: "Sep 25, 11:00 AM", note: "Submitted by Sneha Reddy" },
      { status: "Assigned", time: "Sep 25, 11:02 AM", note: "Assigned to Registrar Office" },
      { status: "In Progress", time: "Sep 25, 14:00 PM", note: "Document verification completed" },
      { status: "Resolved", time: "Sep 26, 16:00 PM", note: "Digitally signed Bonafide PDF sent to student email." }
    ],
    replies: []
  }
];

export const CAMPUS_SERVICES = [
  { id: "hostel", name: "Hostel maintenance", icon: "Building", count: 42, color: "from-amber-500/20 to-orange-500/20" },
  { id: "exam", name: "Examination", icon: "FileText", count: 18, color: "from-purple-500/20 to-indigo-500/20" },
  { id: "idcards", name: "ID cards & documents", icon: "CreditCard", count: 29, color: "from-blue-500/20 to-cyan-500/20" },
  { id: "scholarships", name: "Scholarships", icon: "GraduationCap", count: 12, color: "from-emerald-500/20 to-teal-500/20" },
  { id: "wifi", name: "IT & Wi-Fi", icon: "Wifi", count: 35, color: "from-sky-500/20 to-blue-500/20" },
  { id: "library", name: "Library", icon: "BookOpen", count: 15, color: "from-pink-500/20 to-rose-500/20" },
  { id: "transport", name: "Transport", icon: "Bus", count: 8, color: "from-yellow-500/20 to-amber-500/20" },
  { id: "placements", name: "Placements", icon: "Briefcase", count: 24, color: "from-violet-500/20 to-purple-500/20" },
  { id: "welfare", name: "Student welfare", icon: "HeartHandshake", count: 9, color: "from-red-500/20 to-pink-500/20" },
];

export const DEPARTMENTS = [
  { name: "Hostel Administration", head: "Dr. V. K. Malhotra", email: "hostel.admin@campus.edu", activeTickets: 12 },
  { name: "IT Support Desk", head: "Eng. Suresh Nair", email: "itsupport@campus.edu", activeTickets: 8 },
  { name: "Academic Registrar Office", head: "Prof. Ananya Roy", email: "registrar@campus.edu", activeTickets: 5 },
  { name: "Accounts & Finance", head: "Mr. R. P. Gupta", email: "accounts@campus.edu", activeTickets: 9 },
  { name: "Training & Placement Cell", head: "Dr. Meenakshi Sundaram", email: "placement@campus.edu", activeTickets: 4 },
  { name: "Library Services", head: "Mrs. Sunita Sharma", email: "library@campus.edu", activeTickets: 3 },
];
