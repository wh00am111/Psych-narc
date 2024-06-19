module.exports = function(permission) {
    return function(req, res, next) {
        if (req.user.permission !== permission) {
            return res.status(403).json({ message: "Нет доступа" });
        }
        next();
    };
}