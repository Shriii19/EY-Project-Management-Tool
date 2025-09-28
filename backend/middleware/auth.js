// Authentication middleware disabled - login functionality removed
// All requests now pass through without authentication
export default async function authMiddleware(req, res, next) {
    // Create a dummy user object for compatibility
    req.user = {
        id: 'dummy_user_id',
        name: 'Anonymous User',
        email: 'anonymous@example.com'
    };
    next();
}