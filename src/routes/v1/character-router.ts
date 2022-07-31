import { Router } from 'express';
import characterController from '../../controller/v1/character-controller';
import { checkAuth } from '../../middleware/auth';

export const characterRouter = Router();

characterRouter.post('/create', checkAuth, characterController.createCharacter);
characterRouter.get('/', checkAuth, characterController.getCharacters);
characterRouter.patch(
  '/:characterId',
  checkAuth,
  characterController.editCharacter
);
characterRouter.delete(
  '/:characterId',
  checkAuth,
  characterController.deleteCharacter
);
