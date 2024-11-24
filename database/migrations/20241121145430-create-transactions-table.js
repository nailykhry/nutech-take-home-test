'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_number VARCHAR(15) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        transaction_type VARCHAR(15) NOT NULL,
        description VARCHAR(255) NOT NULL,
        total_amount INT NOT NULL,
        created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_transaction_member_email FOREIGN KEY (email) REFERENCES members(email) ON DELETE CASCADE
      );
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS transactions;
    `);
  }
};
