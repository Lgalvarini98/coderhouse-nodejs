import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { 
    getUserByIdController, 
    getUsersController, 
    createUserController } from "../../controllers/user.controller.ts";

const router = new Router({ prefix: '/users' })

router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);

export default router