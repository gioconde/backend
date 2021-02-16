const remove = (req, res) => {
    const { id } = req.body
    if (!id) return res.send("Necessita 'id'")

    UserService.remove(id)

    res.json({ status: "success"})
}
module.exports = remove