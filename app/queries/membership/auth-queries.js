const { QueryTypes } = require('sequelize');

class AuthQuery {
  constructor() {
    this.sequelize = sequelize;
  }

  async regist(memberData) {
    const { email, first_name, last_name, password } = memberData;

    try {
      const query = `
        INSERT INTO members (email, first_name, last_name, password) 
        VALUES (:email, :first_name, :last_name, :password);
      `;

      await this.sequelize.query(query, {
        type:  QueryTypes.INSERT,
        replacements: {
          email,
          first_name,
          last_name,
          password
        } 
      });

      console.log('Berhasil register member baru');
    } catch (error) {
      console.error('Errorketika mendaftar:', error);
      throw error; 
    }
  }

  async getMemberByEmail(memberData) {
    const { email } = memberData;

    try {
      const query = `
        SELECT email, password
        FROM members
        WHERE email = :email
        LIMIT 1;
      `;

      const member = await this.sequelize.query(query, {
        type:  QueryTypes.SELECT,
        replacements: {
          email
        } 
      });

      return member;
    } catch (error) {
      console.error('Error ketika login:', error);
      throw error; 
    }
  }
}

module.exports = AuthQuery;
