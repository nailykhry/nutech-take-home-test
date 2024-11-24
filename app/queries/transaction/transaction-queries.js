const { QueryTypes } = require('sequelize');

class TransactionQuery {
  constructor() {
    this.sequelize = sequelize;
  }

  async getBalance(data) {
    const { email } = data;
    try {
      const query = `
        SELECT balance
        FROM wallets
        WHERE email = :email
        LIMIT 1;
      `;

      const transaction = await this.sequelize.query(query, {
        type:  QueryTypes.SELECT,
        replacements: {
          email
        } 
      });
      return transaction;
    } catch (error) {
      console.error('Error ketika mengambil data balance:', error);
      throw error; 
    }
  }

  async createWallet(data, dbTransaction=null) {
    const { email, balance } = data;
    try {
      const query = `
        INSERT INTO wallets (email, balance) 
        VALUES (:email, :balance);
      `;

      await this.sequelize.query(query, {
        type:  QueryTypes.INSERT,
        replacements:{
          email,
          balance
        },
        transaction: dbTransaction ? dbTransaction.transaction : undefined
      });

      console.log('Berhasil menambahkan balance pada wallets');
    } catch (error) {
      console.error('Error ketika menambahkan balance:', error);
      throw error; 
    }
  }

  async updateBalance(data, dbTransaction=null) {
    const { email, updatedBalance } = data;
    try {
      const query = `
        UPDATE wallets 
        SET balance = :updatedBalance
        WHERE email = :email
      `;

      await this.sequelize.query(query, {
        type:  QueryTypes.UPDATE, 
        replacements : {
          email, 
          updatedBalance
        },
        transaction: dbTransaction ? dbTransaction.transaction : undefined
      });

      console.log('berhasil update balance pada wallets');
    } catch (error) {
      console.error('Error ketika melakukan update:', error);
      throw error; 
    }
  }

  async getTransaction(data, dbTransaction=null, limit=null, offset=null) {
    try {
      let conditions = Object.entries(data)
                                .filter(([_, value]) => value) 
                                .map(([key, value]) => `${key} = '${value}'`);
      
      if (conditions.length) conditions = `WHERE ${conditions.join(' AND ')} `;
      if (limit > 0) conditions += ` LIMIT :limit`;
      if (offset > 0) conditions += ` OFFSET :offset`;
      
      let query = `
        SELECT invoice_number, transaction_type, description, total_amount, created_on
        FROM transactions
        ${conditions};
      `;
      
      const transaction = await this.sequelize.query(query, {
        type:  QueryTypes.SELECT, 
        replacements: {
          limit,
          offset
        },
        transaction: dbTransaction ? dbTransaction.transaction : undefined
      });
      return transaction;
    } catch (error) {
      console.error('Error ketika mengambil data transaksi:', error);
      throw error; 
    }
  }

  async createTransaction(data, dbTransaction=null) {
    const { email, invoice_number, transaction_type, description, total_amount } = data;
    try {
      const query = `
      INSERT INTO transactions (email, invoice_number, transaction_type, description, total_amount) 
            VALUES (:email, :invoice_number, :transaction_type, :description, :total_amount);
      `;

      await this.sequelize.query(query, {
        type:  QueryTypes.INSERT,
        replacements: { 
          email, 
          invoice_number, 
          transaction_type, 
          description, 
          total_amount 
        },
        transaction: dbTransaction ? dbTransaction.transaction : undefined
      });
      console.log('Berhasil menambah transaksi');
    } catch (error) {
      console.error('Error ketika menambahkan transaksi:', error);
      throw error; 
    }
  }
}

module.exports = TransactionQuery;
