const list = (req, res) => {

    res.json(UserService.list())
}
module.exports = list