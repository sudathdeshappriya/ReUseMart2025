function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.body.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ success: false, message: 'Access Denied: You do not have permission.' });
    }

    next();
  };
}

export default checkRole;
