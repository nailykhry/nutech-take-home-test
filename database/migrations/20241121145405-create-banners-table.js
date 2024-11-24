'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE Banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        banner_name VARCHAR(255) NOT NULL,
        banner_image VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
      );
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Banners;
    `);
  }
};
