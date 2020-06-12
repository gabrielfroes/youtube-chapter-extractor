import { Router } from "https://deno.land/x/oak/mod.ts";
import { getChapters } from "../controllers/youtube-chapters-controller.ts";

const router = new Router();

router.get("/api/v1/video-chapters/:id", getChapters);

export default router;
