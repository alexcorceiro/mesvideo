const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { generateToken } = require("../middleware/auth")
const bcrypt = require("bcrypt")

const setTokenCookie= (res, token) => {
    res.cookie('token' , token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 3600000)
    })
}


exports.login = async (req, res) => {
const { email, password} = req.body
try{
    const user = await prisma.users.findUnique({
        where : { email}
    })

    if( !user || !(await bcrypt.compare(password, user.password)) ) {
        return res.status(401).send({ message: 'email ou mot de passe incorrect'})
    }

    const token = generateToken(user)

    setTokenCookie(res, token)
    res.status(200).send({ message:"connexion reussi"});

}catch(err){
    res.status(404).send({ message: err.message})
}

}

exports.register = async (req, res) => {
    const { pseudo , dateNaissance, email , password, confirmPassword } = req.body

    if(password !== confirmPassword){
        return res.status(400).send({ message: "les mot de passe nde correspond pas"})
    }

    try{

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.users.create({
            data: {
                pseudo, 
                email, 
                dateNaissance,
                password: hashedPassword
            }
        });

        const token = generateToken(newUser)

       setTokenCookie(res, token)
       res.status(200).json({message:"inscription reussie", user: newUser})

    }catch(err){
        res.status(500).json({ message: err.message})
    }

}

exports.logout = async (req, res) => {
    res.clearCokie('token')
    res.send('Deconnection avec succée')

}

exports.getProfile = async (req, res) => {
    try {
        // Assurez-vous que req.user.id existe et est correct
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: "Utilisateur non identifié" });
        }

        const user = await prisma.users.findUnique({
            where: { id: req.user.id } // Utilisez l'ID de l'utilisateur
        });

        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.getProfileById = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await prisma.users.findUnique({ 
            where: { id: parseInt(id)}
        })
        res.json(user)
    }catch(err){
        res.status(400).json({ message: err.message })
    }

}

exports.getAllProfiles = async (req, res) => {
try{
    const users = await prisma.users.findMany({})
    res.json(users)
}catch(err){
    res.status(400).json({ message: err.message })
}
}

exports.updateProfile = async (req, res) => {
    const { pseudo, email, dateNaissance, role } = req.body;

    try {
        const updateUser = await prisma.users.update({
            where: { id: req.user.id },
            data: {
                pseudo, 
                email, 
                dateNaissance,
                role 
            }
        });
        res.status(200).json({ message: "Profil mis à jour", user: updateUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProfileById = async (req, res) => {
    const { pseudo, email, dateNaissance, role } = req.body;
    const { id } = req.params;

    try {
        const updatedUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: {
                pseudo, 
                email, 
                dateNaissance, 
                role 
            }
        });
        res.json({ message: "Profil mis à jour", user: updatedUser });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.deleteUser = async () => {
    const { id } = req.params;
    try {
        await prisma.users.delete({
            where: { id: parseInt(id) }
        });
        res.send('Utilisateur supprimé');
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}