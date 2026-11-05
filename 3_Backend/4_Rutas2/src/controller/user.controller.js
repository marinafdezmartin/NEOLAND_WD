import { userProfileService } from "../services/user.service.js";

// asi se hacia sin el user.service.js
// export function userProfileController(req, res) {
//   res.status(200).send("userProfileController");
// }

export function userProfileController(req, res) {
  res.status(200).send(userProfileService());
}
