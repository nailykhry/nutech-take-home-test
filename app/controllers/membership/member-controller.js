require('dotenv').config();
const MemberQuery = require('../../queries/membership/member-queries');
const memberQuery = new MemberQuery();

const upload = require('../../middlewares/upload-image');

const controller = {
    show: async (req, res) => {
        try {
            const {email} = req.member;
            const member = await memberQuery.getMember({email});
            if(member.length === 0) return sendResponse(res, 404, 0, 'Data yang dicari tidak tersedia');
            return sendResponse(res, 200, 0, 'Sukses', member[0]);
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    },

    update: async (req, res) => {
        try {
            const {email} = req.member;
            const member = await memberQuery.getMember({email});
            if(member.length === 0)  return sendResponse(res, 404, 0, 'Data yang dicari tidak tersedia');
           
            const updatedData = {
                email,
                first_name : req.body.first_name ||  member[0].first_name,
                last_name : req.body.last_name ||  member[0].last_name
            }

            await memberQuery.updateMember(updatedData);
            const updatedMember = await memberQuery.getMember({email});
            return sendResponse(res, 200, 0, 'pdate Pofile berhasil', updatedMember[0]);
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    },

    updateImage: async (req, res) => {
        try {
            upload.single('file')(req, res, async (err) => {
                if (err) return sendResponse(res, 400, 102, err.message || 'Gagal upload file');
                if (!req.file) return sendResponse(res, 400, 102, 'Tidak ada file yang diupload');
                  
                const { email } = req.member; 
                const member = await memberQuery.getMember({ email });
                if(member.length === 0) return sendResponse(res, 404, 102, 'Data yang dicari tidak tersedia');

                const filePath = `${process.env.APP_URL}/public/${req.file.filename}`;
                await memberQuery.updateImage({ email, profile_image: filePath });
                const updatedMember = await memberQuery.getMember({ email });
                return sendResponse(res, 200, 0, 'Update Profile Image berhasil', updatedMember[0]);
            });
        } catch (error) {
            console.log(error);
            return sendResponse(res, 500, 500, 'Internal server error');
        }
    }
};

module.exports = controller;
