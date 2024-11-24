const BannerQuery = require('../../queries/information/banner-queries');
const bannerQuery = new BannerQuery();

const controller = {
    index: async (req, res) => {
        try {
            const banners = await bannerQuery.getAll(req.query);
            if(banners.length === 0) return sendResponse(res, 404, 102, 'Data yang dicari belum tersedia');
            return sendResponse(res, 200, 0, 'Sukses', banners);
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    }
};

module.exports = controller;
