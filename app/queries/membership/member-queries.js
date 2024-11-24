const { QueryTypes } = require('sequelize');

class MemberQuery {
  constructor() {
    this.sequelize = sequelize;
  }

  async getMember(memberData) {
    const { email } = memberData;

    try {
      const query = `
        SELECT email, first_name, last_name, profile_image
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
      console.error('Error ketika mengambil data member:', error);
      throw error; 
    }
  }

  async updateMember(memberData) {
    const { email, first_name, last_name } = memberData;

    try {
      const query = `
        UPDATE members 
        SET first_name = :first_name, last_name = :last_name
        WHERE email = :email
      `;

      const member = await this.sequelize.query(query, {
        type:  QueryTypes.UPDATE,
        replacements: {
          email,
          first_name,
          last_name
        } 
      });

      return member;
    } catch (error) {
      console.error('Error ketika update profile:', error);
      throw error; 
    }
  }

  async updateImage(memberData) {
    const { email, profile_image } = memberData;

    try {
      const query = `
        UPDATE members 
        SET profile_image = :profile_image
        WHERE email = :email
      `;

      const member = await this.sequelize.query(query, {
        type:  QueryTypes.UPDATE,
        replacements:{
          email,
          profile_image
        } 
      });

      return member[0];
    } catch (error) {
      console.error('Error ketika update image:', error);
      throw error; 
    }
  }
}

module.exports = MemberQuery;
