class HomeCtrl {

    static async home(req, res,next) {
        res.send('respond with a resource from Coinratecap');
    }
}

module.exports = HomeCtrl;
