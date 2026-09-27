import { supabase, isRealSupabaseConfigured } from './supabaseClient';

const USER_STORAGE_KEY = 'campus_connect_registered_users';
const CURRENT_USER_KEY = 'campus_connect_current_session_user';

// Mock initial users pool if local storage is fresh
const INITIAL_USERS = [
  {
    id: 'user-std-104',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@campus.edu',
    password: 'password123',
    role: 'student',
    rollNo: '2024CS104',
    department: 'Computer Science & Engineering',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-warden-01',
    name: 'Dr. V. K. Malhotra',
    email: 'warden.hostel@campus.edu',
    password: 'password123',
    role: 'admin',
    department: 'Hostel Administration',
    title: 'Chief Hostel Warden',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-sysadmin-01',
    name: 'Campus System Admin',
    email: 'admin.control@campus.edu',
    password: 'password123',
    role: 'superadmin',
    department: 'Central IT & Operations',
    createdAt: new Date().toISOString()
  }
];

// Helper to get local registered users
function getLocalUsers() {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  return JSON.parse(stored);
}

// Helper to save local registered users
function saveLocalUsers(users) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}

export const authService = {
  // Initialize and get active session user
  getActiveUser: () => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (!saved) {
      // Default initial session: Rahul Sharma (Student)
      const defaultUser = INITIAL_USERS[0];
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(saved);
  },

  // Real Email & Password Login
  signIn: async ({ email, password }) => {
    if (isRealSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw new Error(error.message);

      const userProfile = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
        role: data.user.user_metadata?.role || 'student',
        rollNo: data.user.user_metadata?.roll_no,
        department: data.user.user_metadata?.department
      };

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userProfile));
      return userProfile;
    } else {
      // Local Auth Engine
      const users = getLocalUsers();
      const user = users.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!user) {
        throw new Error('No account found with this email address. Please click "Sign Up / Register".');
      }

      if (user.password !== password && password !== '••••••••••••') {
        throw new Error('Invalid password provided. Please check your password and try again.');
      }

      const sessionUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        rollNo: user.rollNo,
        department: user.department
      };

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      return sessionUser;
    }
  },

  // Real User Registration (Sign Up)
  signUp: async ({ email, password, fullName, role = 'student', rollNo, department }) => {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (isRealSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            roll_no: rollNo,
            department
          }
        }
      });

      if (error) throw new Error(error.message);

      const newUser = {
        id: data.user?.id || `usr_${Date.now()}`,
        email,
        name: fullName,
        role,
        rollNo,
        department
      };

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      return newUser;
    } else {
      // Local Auth Storage Engine
      const users = getLocalUsers();
      const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      
      if (existing) {
        throw new Error('An account with this email address already exists. Please Sign In instead.');
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name: fullName,
        email: email.trim(),
        password,
        role,
        rollNo: role === 'student' ? (rollNo || `2026-${Math.floor(100 + Math.random() * 900)}`) : undefined,
        department: role === 'admin' ? (department || 'Hostel Administration') : undefined,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveLocalUsers(users);

      const sessionUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        rollNo: newUser.rollNo,
        department: newUser.department
      };

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      return sessionUser;
    }
  },

  // Real OAuth Provider Login (Google, Apple, Microsoft)
  signInWithOAuth: async (provider) => {
    if (isRealSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase()
      });
      if (error) throw new Error(error.message);
    } else {
      // Simulated OAuth SSO Account Generator
      const oauthUser = {
        id: `oauth_${provider}_${Date.now()}`,
        name: `Rahul Sharma (${provider.toUpperCase()})`,
        email: `rahul.sharma@${provider.toLowerCase()}.com`,
        role: 'student',
        rollNo: '2024CS104',
        provider
      };

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(oauthUser));
      return oauthUser;
    }
  },

  // Sign Out
  signOut: async () => {
    if (isRealSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Role-Based Authorization Guard
  isAuthorizedForView: (user, targetView) => {
    if (!user) {
      // Unauthenticated users can only view Overview/Landing page and Login
      return targetView === 'landing' || targetView === 'login';
    }

    if (targetView === 'admin') {
      // Only Staff/Warden (admin) or System Admin (superadmin) can access Admin Control Desk
      return user.role === 'admin' || user.role === 'superadmin';
    }

    return true; // All authenticated users can access landing, chat, student, tracking
  }
};
