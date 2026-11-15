import {
  getAllUsersService,
  createUserService,
  loginUserService,
  searchUsersService,
} from "../services/user.service.js";

export function statusUserController(req, res) {
  res.status(200).json({
    mensaje: "Router de usuarios conectado correctamente",
  });
}

export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener los usuarios",
    });
  }
}

export async function createUserController(req, res) {
  try {
    const { email, username, name, password, address } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        mensaje: "El email es obligatorio",
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    if (
      address !== undefined &&
      address !== null &&
      (typeof address !== "string" || !address.trim())
    ) {
      return res.status(400).json({
        mensaje: "La dirección no es válida",
      });
    }

    const user = await createUserService(
      email.trim().toLowerCase(),
      username,
      name,
      password,
      address,
    );

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.sqlState === "23505") {
      return res.status(409).json({
        mensaje: "El email ya está registrado",
      });
    }

    res.status(500).json({
      mensaje: "Error al crear el usuario",
    });
  }
}

export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Email y contraseña obligatorios",
      });
    }

    const result = await loginUserService(email.trim().toLowerCase(), password);

    if (!result) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
}

export async function searchUsersController(req, res) {
  try {
    const { solicitud } = req.body;

    if (typeof solicitud !== "string" || !solicitud.trim()) {
      return res.status(400).json({
        mensaje: "La solicitud es obligatoria",
      });
    }

    const users = await searchUsersService(solicitud.trim());

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al buscar usuarios",
    });
  }
}
