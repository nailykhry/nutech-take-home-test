const { QueryTypes } = require('sequelize');

class BannerQuery {
  constructor() {
    this.sequelize = sequelize;
  }

  async getAll(data) {
    try {
      let query = `
        SELECT banner_name, banner_image, description
        FROM banners
      `;

      const conditions = Object.entries(data)
                                .filter(([_, value]) => value) 
                                .map(([key, value]) => `${key} = '${value}'`);
      
      if (conditions.length) query += `WHERE ${conditions.join(' AND ')} `;

      const banners = await this.sequelize.query(query, {
        type:  QueryTypes.SELECT, 
      });

      console.log('Berhasil mengambil data banner');
      return banners;
    } catch (error) {
      console.error('Error ketika mengambil data banner:', error);
      throw error; 
    }
  }
}

module.exports = BannerQuery;
