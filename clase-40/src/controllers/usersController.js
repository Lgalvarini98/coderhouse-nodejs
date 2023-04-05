import UsersService from "../services/usersService.js";
const userService = new UsersService();
import UsersDTO from "../dtos/usersDto.js";

const getUsers = async (req, res) => {
  let result = await userService.getUsers();
  let resultDTO = result.map((user) => new UsersDTO(user));
  res.send(resultDTO);
};

const saveUser = async (req, res) => {
  let user = req.body;
  let result = await userService.addUser(user);
  res.send(new UsersDTO(result));
};

export default {
  saveUser,
  getUsers,
};
