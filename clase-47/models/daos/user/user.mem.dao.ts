import { User, UserMap, UserPayload } from "../../interfaces/User.ts";

const users: UserMap = {};

export const getUsers = (): Promise<User[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const usersList = Object.values(users);
            resolve(usersList)
        }, 1000);
    })
}

export const getUserById = (id: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        const user = users[id];
        setTimeout(() => {
            if (!user) {
                reject(`NOT FOUND: User ${id} does not exist`)
            } else {
                resolve(user)
            }
        }, 1000)
    })
}

export const createUser = (userPayload: UserPayload): Promise<User> => {
    const id = crypto.randomUUID()
    const newUser: User = {
        id,
        ...userPayload,
        isActive: true
    };
    users[id] = newUser;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(users[id]);
        }, 1000);
    });
};