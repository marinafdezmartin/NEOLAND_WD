export function statusUserController(req, res) {
  res
    .status(200)
    .json({ mensaje: "Router de usuarios conectado correctamente" });
}
