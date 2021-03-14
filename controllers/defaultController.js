module.exports = {
    index: (req, res) => {
        res.render('default/index')
    },
    login: (req, res) => {
        res.send('login page')
    }
}