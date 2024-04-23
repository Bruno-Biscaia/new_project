const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const registerNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Gera um salt (um valor aleatório) para hashing da senha
    const salt = await bcrypt.genSalt(10);

    // Cria um hash da senha combinando a senha plana com o salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria um novo usuário com a senha hash
    const newUser = new User({ username, email, password: hashedPassword });

    // Salva o novo usuário no banco de dados
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encontrar o usuário pelo e-mail
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Se as credenciais estiverem corretas, faça o login do usuário

      // Gerar um token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET, // Certifique-se de que JWT_SECRET está definido no seu .env
        { expiresIn: "1h" } // O token expira em 1 hora
      );

      res.status(200).json({
        message: "Login realizado com sucesso!",
        token: token,
      });
    } else {
      // Se as credenciais estiverem incorretas, envie um erro
      res.status(401).json({ message: "Email ou senha inválidos!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerNewUser,
  login,
};
