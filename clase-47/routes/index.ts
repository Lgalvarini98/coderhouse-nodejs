import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import userRouter from './user/user.routes.ts';

const router = new Router({ prefix: '/api' });

router.use(userRouter.routes());
// router.use(userRouter.allowedMethods());

export default router;