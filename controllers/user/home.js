class HomeCtrl {
    
    static async home(req, res,next) {
        res.render('index', { title: 'Coinratecap' });
    }
}

module.exports = HomeCtrl;
