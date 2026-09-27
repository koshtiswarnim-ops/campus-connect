/**
 * Smart AI Query Classifier & Intent Routing Engine for Campus Connect
 * Converts natural language student input into structured routing data.
 */

export function classifyQuery(text, isAnonymous = false) {
  const lowerText = text.toLowerCase();

  // ---------------- 1. FAQ / KNOWLEDGE BASE DIRECT ANSWERS ----------------
  if (lowerText.includes("library close") || lowerText.includes("library timing") || lowerText.includes("library open")) {
    return {
      intent: "Library Timings Inquiry",
      category: "Library Services",
      department: "Library Desk",
      action: "answer",
      priority: "Low",
      requires_human: false,
      anonymous_requested: isAnonymous,
      entities: ["Central Library", "Timings"],
      confidence: 0.99,
      faqAnswer: "The Central Library is open Monday through Saturday from 8:00 AM to 11:00 PM. Digital e-library portal and digital archives are accessible 24/7."
    };
  }

  if (lowerText.includes("hostel timing") || lowerText.includes("curfew") || lowerText.includes("gate timing")) {
    return {
      intent: "Hostel Gate Curfew Timings",
      category: "Hostel Administration",
      department: "Hostel Warden Office",
      action: "answer",
      priority: "Low",
      requires_human: false,
      anonymous_requested: isAnonymous,
      entities: ["Hostel Gate", "Curfew"],
      confidence: 0.98,
      faqAnswer: "Hostel main gates close at 10:00 PM on weekdays (Mon-Fri) and 10:30 PM on weekends. Late entry requests must be submitted through the Campus Connect portal."
    };
  }

  if (lowerText.includes("fee deadline") || lowerText.includes("last date for fee") || lowerText.includes("due date fee")) {
    return {
      intent: "Fee Payment Deadline Inquiry",
      category: "Accounts & Fees",
      department: "Accounts Department",
      action: "answer",
      priority: "Low",
      requires_human: false,
      anonymous_requested: isAnonymous,
      entities: ["Fee Deadline", "Semester 5"],
      confidence: 0.97,
      faqAnswer: "The last date to pay semester fees without a late fine for Autumn 2026 is October 15, 2026. Online receipts can be downloaded from the Accounts tab."
    };
  }

  // ---------------- 2. HOSTEL & MAINTENANCE ----------------
  if (
    lowerText.includes("hostel") ||
    lowerText.includes("room") ||
    lowerText.includes("fan") ||
    lowerText.includes("water") ||
    lowerText.includes("bed") ||
    lowerText.includes("mess") ||
    lowerText.includes("warden") ||
    lowerText.includes("plumber") ||
    lowerText.includes("bathroom") ||
    lowerText.includes("drain") ||
    lowerText.includes("light")
  ) {
    let priority = "Normal";
    if (lowerText.includes("urgent") || lowerText.includes("leak") || lowerText.includes("fire") || lowerText.includes("short circuit")) {
      priority = "Urgent";
    }

    const entities = [];
    if (lowerText.includes("fan")) entities.push("Ceiling Fan");
    if (lowerText.includes("water") || lowerText.includes("leak")) entities.push("Water Leakage");
    if (lowerText.includes("room")) entities.push("Hostel Room");

    return {
      intent: "Hostel Maintenance Request",
      category: "Hostel maintenance",
      department: "Hostel Administration",
      assignedTo: "Warden / Hostel Maintenance Office",
      action: "ticket",
      priority,
      requires_human: true,
      anonymous_requested: isAnonymous,
      entities,
      nextAction: "Maintenance team dispatched for on-site repair inspection",
      confidence: 0.98,
      suggestedSLA: "24 Hours"
    };
  }

  // ---------------- 3. TECHNICAL & IT SUPPORT ----------------
  if (
    lowerText.includes("wifi") ||
    lowerText.includes("wi-fi") ||
    lowerText.includes("internet") ||
    lowerText.includes("portal") ||
    lowerText.includes("password") ||
    lowerText.includes("login") ||
    lowerText.includes("moodle") ||
    lowerText.includes("laptop") ||
    lowerText.includes("network") ||
    lowerText.includes("it support")
  ) {
    let priority = "Normal";
    if (lowerText.includes("exam") || lowerText.includes("urgent") || lowerText.includes("cannot login")) {
      priority = "High";
    }

    return {
      intent: "IT & Network Support Request",
      category: "IT & Wi-Fi",
      department: "IT Support Desk",
      assignedTo: "IT Support / NOC Team",
      action: "ticket",
      priority,
      requires_human: true,
      anonymous_requested: isAnonymous,
      entities: ["Campus Wi-Fi", "Network Access Point"],
      nextAction: "Network Operations Center verifying MAC address & node AP status",
      confidence: 0.96,
      suggestedSLA: "4 Hours"
    };
  }

  // ---------------- 4. ID CARDS & OFFICIAL DOCUMENTS ----------------
  if (
    lowerText.includes("id card") ||
    lowerText.includes("lost id") ||
    lowerText.includes("document") ||
    lowerText.includes("bonafide") ||
    lowerText.includes("transcript") ||
    lowerText.includes("certificate") ||
    lowerText.includes("letter")
  ) {
    let priority = "Normal";
    if (lowerText.includes("urgent") || lowerText.includes("passport")) priority = "High";

    return {
      intent: "ID Card & Document Issuance",
      category: "ID cards & documents",
      department: "Student Administration",
      assignedTo: "Student Records & Registrar Desk",
      action: "ticket",
      priority,
      requires_human: true,
      anonymous_requested: isAnonymous,
      entities: [lowerText.includes("lost") ? "Lost ID Card" : "Bonafide Certificate"],
      nextAction: "Student verification & automated document clearance",
      confidence: 0.97,
      suggestedSLA: "24 Hours"
    };
  }

  // ---------------- 5. ACADEMIC & EXAMINATION ----------------
  if (
    lowerText.includes("academic") ||
    lowerText.includes("doubt") ||
    lowerText.includes("exam") ||
    lowerText.includes("faculty") ||
    lowerText.includes("professor") ||
    lowerText.includes("assignment") ||
    lowerText.includes("grade") ||
    lowerText.includes("marks") ||
    lowerText.includes("course")
  ) {
    return {
      intent: "Academic & Examination Inquiry",
      category: "Examination",
      department: "Examination Cell",
      assignedTo: "Exam Controller & Faculty Advisor",
      action: "ticket",
      priority: "Normal",
      requires_human: true,
      anonymous_requested: isAnonymous,
      entities: ["Exam Grade Sheet", "Course Marks"],
      nextAction: "Forwarded to Controller of Examinations for evaluation",
      confidence: 0.94,
      suggestedSLA: "48 Hours"
    };
  }

  // ---------------- 6. ACCOUNTS & FEES ----------------
  if (
    lowerText.includes("fee") ||
    lowerText.includes("fees") ||
    lowerText.includes("payment") ||
    lowerText.includes("receipt") ||
    lowerText.includes("account") ||
    lowerText.includes("scholarship")
  ) {
    return {
      intent: "Fee Payment & Scholarship Processing",
      category: "Accounts & Fees",
      department: "Accounts Department",
      assignedTo: "Finance & Accounts Officer",
      action: "ticket",
      priority: "Normal",
      requires_human: true,
      anonymous_requested: isAnonymous,
      entities: ["Fee Receipt", "Scholarship Disbursement"],
      nextAction: "Bank transaction & fee reconciliation check",
      confidence: 0.95,
      suggestedSLA: "24 Hours"
    };
  }

  // ---------------- 7. PLACEMENTS ----------------
  if (
    lowerText.includes("placement") ||
    lowerText.includes("drive") ||
    lowerText.includes("interview") ||
    lowerText.includes("company") ||
    lowerText.includes("resume") ||
    lowerText.includes("t&p")
  ) {
    return {
      intent: "Placement & Career Assistance",
      category: "Placements",
      department: "Placement & Career Cell",
      assignedTo: "T&P Student Coordinator",
      action: "ticket",
      priority: "High",
      requires_human: true,
      anonymous_requested: isAnonymous,
      entities: ["T&P Drive", "Resume Verification"],
      nextAction: "Forwarded to Training & Placement Officer",
      confidence: 0.97,
      suggestedSLA: "12 Hours"
    };
  }

  // DEFAULT FALLBACK ROUTER
  return {
    intent: "General Campus Assistance",
    category: "General Query",
    department: "Student Administration",
    assignedTo: "Campus Helpdesk Office",
    action: "ticket",
    priority: "Normal",
    requires_human: true,
    anonymous_requested: isAnonymous,
    entities: ["General Inquiry"],
    nextAction: "Reviewed by General Administration Officer",
    confidence: 0.88,
    suggestedSLA: "24 Hours"
  };
}
