import User from "../models/user.model.js";

//autenticaciones

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userFound = await User.findOne({ username });

    if (userFound) {
      return res
        .status(400)
        .json({ message: ["El usuario ya se encuentra registrado"] });
    }
    const newUser = new User({ username, password, role });

    const savedUser = await newUser.save();

    res.json({
      savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.status(400).json({ message: ["Usuario no encontrado"] });
    }
    if (userFound.password !== password) {
      return res.status(400).json({ message: ["Contraseña invalida"] });
    }
    res.json({
      id: userFound._id,
      username: userFound.username,
      role: userFound.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Method HTTP User:

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: ["Usuario no encotrado"] });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userUpdate = { ...req.body };
  try {
    const user = await User.findByIdAndUpdate(req.params.id, userUpdate, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({ message: ["Usuario no encotrado"] });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({ message: ["Usuario no encotrado"] });
    }
    res.json({ message: ["Usuario eliminado exitosamente"] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
