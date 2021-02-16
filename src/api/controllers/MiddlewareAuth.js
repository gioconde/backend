
const middlewareAuth = (jwt) => (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send("Necessita token de acesso!")
    const token = req.headers.authorization.replace('Bearer ', '');

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            switch (err.name) {
                case "TokenExpiredError":
                    return res.status(440).send("Token expirou!")
                default:
                    return res.status(498).send("Token inválido!")
            }
        }
        const userTokenReq = { ...decoded }
        const existsUserToken = UserService.findToken(userTokenReq.id,token)
        if (existsUserToken) {
            req.user = userTokenReq
            return next()
        }
        return res.status(498).send("User e token incompatíveis!")
    });
}
module.exports = middlewareAuth