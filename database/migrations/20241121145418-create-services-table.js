'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE Services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        service_code VARCHAR(15) NOT NULL,
        service_name VARCHAR(255) NOT NULL,
        service_icon VARCHAR(255) NOT NULL,
        service_tariff INT NOT NULL
      );
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Services;
    `);
  }
};
