import { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts"
import { createUser, getUsers } from "../models/daos/user/user.mem.dao.ts"
import { UserPayload } from "../models/interfaces/User.ts";

export const getUsersController = async (ctx: Context) => {
    const users = await getUsers();
    ctx.response.body = users
}

export const getUserByIdController = (): string => {
    return "OK"
}

export const createUserController = async (ctx: Context) => {
    const body: UserPayload = await ctx.request.body().value;
    const newUser = await createUser(body);
    ctx.response.status = 201;
    ctx.response.body = newUser;
}