const ContainerMongoDB = require('../../contenedores/contenedorMongoDB')
const logger = require('../../utils/logger.js')
const mongoose = require('mongoose');
const Usuarios = require('../../models/usuario')
const { options } = require('../../options/config.js')


class ServerMongoDB extends ContainerMongoDB{
    constructor() {
        //super(options.mongoDB.connection.URL)
        super(options.mongoRemote.MONGO_URL_CONNECT)
    }
    
    // connect() {
    //     try {
    //         const URL = process.env.MONGO_URL_CONNECT_ECOM
    //         mongoose.connect(URL, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true
    //         })
    //         console.log('Connected to MongoDB Server')
            
    //     } catch (error) {
    //         console.error('Error connection to DB: '+error)
    //     }
    // }

    async createUser(usuario){
        try {
            const newUser = new Usuarios(usuario)
            await newUser.save()
            logger.info('User created: ' + newUser)
            //////////////////// phone text message //////////////////////
            const accountSid = process.env.TWILIO_ACCOUNTSID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const client = require("twilio")(accountSid, authToken);
            
            
            ;(async () => {
                try {
                    const message = await client.messages.create({
                        body: `El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente!`,
                        //from: '+17753169623',
                        from: 'whatsapp:+14155238886',
                        // from: 'whatsapp:+17753169623',

                        to: 'whatsapp:+5493513057343'
                        
                    })
                    console.log("aca whatsapp");
                    logger.info(message)
                } catch (error) {
                    logger.error(error)
                }
            })()
            
            //////////////////// gmail //////////////////////
            const { createTransport } = require('nodemailer')
            const TEST_EMAIL = process.env.TEST_EMAIL
            const PASS_EMAIL = process.env.PASS_EMAIL

            const transporter = createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: TEST_EMAIL,
                    pass: PASS_EMAIL
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const mailOptions = {
                from: 'Servidor Node JS - Gmail ',
                to: TEST_EMAIL,
                subject: 'Mail de Registro nuevo Usuario desde Node JS - Gmail',
                html: `<h3 style="color: green;">El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente!</h3>`,
                attachments: [
                    {
                        path: 'https://res.cloudinary.com/hdsqazxtw/image/upload/v1600707758/coderhouse-logo.png'
                    }
                ]
            }

            ;(async () => {
                try {
                    const info = await transporter.sendMail(mailOptions)
                    logger.info(info)
                } catch (err) {
                    logger.error(err)
                }
            })()
        } catch (error) {
            logger.error(error)
        }
    }

    async getUser(){
        try {
            const users = await Usuarios.find()
            logger.info(users)
        } catch (error) {
            logger.error(error)
        }
    }

    async getUserByUsername(username){
        try {
            const user = await Usuarios.findOne( {username: `${username}`} )
            logger.info('usuario: ', user)
            return user
        } catch (error) {
            logger.error(error)
        }
    }

    async getUserByUsernameAndPass(username, password) { 
        logger.info('username--pass-- ', username)
        try {
            const user = await Usuarios.findOne( {username: `${username}`, password: `${password}` } )
            // console.log('user-::>> ', user)
            if ( user === [] || user === undefined || user === null) {
                return false    
            } else {
                return true
            }
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = { ServerMongoDB }