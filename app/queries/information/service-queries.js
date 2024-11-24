const { QueryTypes } = require('sequelize');

class ServiceQuery {
  constructor() {
    this.sequelize = sequelize;
  }

  async getService(data) {
    try {
      let query = `
        SELECT service_code, service_name, service_icon, service_tariff
        FROM services
      `;

      const conditions = Object.entries(data)
                                .filter(([_, value]) => value) 
                                .map(([key, value]) => `${key} = '${value}'`);
      
      if (conditions.length) query += `WHERE ${conditions.join(' AND ')} `;

      const services = await this.sequelize.query(query, {
        type:  QueryTypes.SELECT, 
      });

      console.log('Berhasil mengambil data service');
      return services;
    } catch (error) {
      console.error('Error ketika mengambil data service:', error);
      throw error; 
    }
  }
}

module.exports = ServiceQuery;
