const knex = require("../config/database");
const dayjs = require('dayjs')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const UserController =  {
    index: async (req, res) => {
        try {
            const users =  await knex('users');

            return res.status(200).json({
                message: 'Berhasil mengambil data user',
                data: users
            });
    
        } catch (error) {
            return res.status(500).json({
                message: error,
            });
        }
    },
    store: async (req, res) => {
        const { name, email, password, role } = req.body;
        const now = dayjs().format('YYYY-MM-DD hh:mm:ss')
        const hash = bcrypt.hashSync(password, salt);
        
        try {
            const user = await knex('users').insert({name, email, password: hash, role, createdAt: now});

            return res.status(200).json({
                message: 'Berhasil menambah data user',
                data: user
            });
        } catch (error) {
            return res.status(500).json({ 
                message: error,
            })
        }
    },
    show: async (req, res) => {
        try {
            const data =  await knex('users').where('id', req.params.id).first();

            if(!data){
                return res.status(404).json({ 
                    message: 'Data user tidak ditemukan',
                    data
                })
            }

            return res.status(200).json({ 
                message: 'Data user ditemukan',
                data
            })

        } catch (error) {
            return res.status(500).json({ 
                message: error,
            })
        }
    },
    update: async (req, res) => {
        const { name, email, password, role } = req.body;
        const now = dayjs().format('YYYY-MM-DD hh:mm:ss');
        const hash = bcrypt.hashSync(password, salt);

        try {
            const user = await knex('users').where('id', req.params.id).update({name, email, password: hash, role, updatedAt: now});

            return res.status(200).json({
                message: 'Berhasil mengupdate data user',
                data: user
            });
        } catch (error) {
            return res.status(500).json({ 
                message: error,
            })
        }
    },
    destroy: async (req, res) => {
        try {
            const data =  await knex('users').where('id', req.params.id).del();

            return res.status(200).json({ 
                message: 'Berhasil menghapus user',
                data
            })

        } catch (error) {
            return res.status(500).json({ 
                message: error,
            })
        }
    },

}

module.exports =  UserController;