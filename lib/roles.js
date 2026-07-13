// Role-based access control configuration

// Admin emails - Chỉ những email này có full quyền admin
export const ADMIN_EMAILS = [
  "tranxuanbinh2k1@gmail.com",
  // Thêm các admin khác ở đây
];

// Hoặc dùng Clerk User ID nếu muốn
export const ADMIN_USER_IDS = [
  // 'user_xxxxxxxxxxxxx', // Uncomment và thay bằng Clerk User ID của bạn
];

// Role definitions
export const ROLES = {
  ADMIN: "admin",
  AUTHOR: "author",
  READER: "reader",
};

// Check if user is admin
export function isAdmin(user) {
  if (!user) return false;

  // Check by email
  if (user.emailAddresses && user.emailAddresses.length > 0) {
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (ADMIN_EMAILS.includes(primaryEmail)) {
      return true;
    }
  }

  // Check by user ID
  if (user.id && ADMIN_USER_IDS.includes(user.id)) {
    return true;
  }

  return false;
}

// Get user role
export function getUserRole(user) {
  if (!user) return ROLES.READER;
  if (isAdmin(user)) return ROLES.ADMIN;
  return ROLES.AUTHOR; // Logged in users are authors by default
}

// Check permissions
export function canCreateBlog(user) {
  const role = getUserRole(user);
  return role === ROLES.ADMIN || role === ROLES.AUTHOR;
}

export function canEditBlog(user, blogAuthorId) {
  if (!user) return false;
  const role = getUserRole(user);

  // Admin can edit all blogs
  if (role === ROLES.ADMIN) return true;

  // Author can only edit their own blogs
  if (role === ROLES.AUTHOR && user.id === blogAuthorId) return true;

  return false;
}

export function canDeleteBlog(user, blogAuthorId) {
  // Same logic as edit
  return canEditBlog(user, blogAuthorId);
}

export function canManageUsers(user) {
  return isAdmin(user);
}

export function canViewAdminDashboard(user) {
  return isAdmin(user);
}

export function canViewAuthorDashboard(user) {
  const role = getUserRole(user);
  return role === ROLES.ADMIN || role === ROLES.AUTHOR;
}
