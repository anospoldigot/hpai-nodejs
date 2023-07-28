const knex = require("../config/database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const AuthController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const data = await knex('users').where('email', email).first();

            if(!data){
                return res.status(401).json({ 
                    message: 'Email tidak ditemukan',
                })
            }

            if(!bcrypt.compareSync(password, data.password)){
                return res.status(401).json({ 
                    message: 'Password salah',
                })
            }

            const token = jwt.sign({ 
                id:data.id, username: data.username,  email: data.email, role: data.role
            }, 'shhhhh');

            return res.status(200).json({ 
                message: 'Berhasil login',
                token,
                data
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Error'
            })
        }


    },
}


module.exports = AuthController;