import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { listCreators } from '../services/catalog.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		return ok(res, await listCreators());
	} catch (error) {
		return next(error);
	}
});

export default router;
