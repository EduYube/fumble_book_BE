import { Request, Response } from 'express';
import Characters from '../../db/schema/characters';
import { creationError, errorMessage } from '../../utils/utils';

const createCharacter = async (req: Request, res: Response): Promise<void> => {
  const { name, race, charclass, level, campaign } = req.body;
  const user = req.session.userId;

  try {
    const character = await Characters.create({
      data: {
        name,
        race,
        charclass,
        level,
        campaign,
        user,
      },
    });
    res.send(character);
  } catch (e: any) {
    creationError(e, res);
  }
};

const getCharacters = async (req: Request, res: Response): Promise<void> => {
  const user = req.session.userId;

  try {
    const characters = await Characters.find({ user }).select({
      __v: 0,
    });
    res.send(characters);
  } catch (e: any) {
    errorMessage(res, e);
  }
};

const editCharacter = async (req: Request, res: Response): Promise<void> => {
  console.log('editCharacter', req.params);
  const characterId = req.params.characterId;
  const { name, race, charclass, level } = req.body;

  try {
    const editedCharacter = await Characters.findById(characterId).select({
      __v: 0,
    });
    console.log(editedCharacter);
    if (editedCharacter) {
      console.log(req.body);
      const data = editedCharacter.data;
      console.log(data);
      data.name = name || data.name;
      data.race = race || data.race;
      data.charclass = charclass || data.charclass;
      data.level = level || data.level;
      await editedCharacter.save();
      res.send(editedCharacter);
    } else {
      errorMessage(res, 'Something went wrong, try again in a few minutes');
    }
  } catch (e: any) {
    console.log('catch');
    errorMessage(res, e);
  }
};

const deleteCharacter = async (req: Request, res: Response): Promise<void> => {
  const characterId = req.params.characterId;
  try {
    const deteletedCharacter = await Characters.findByIdAndDelete(characterId);
    if (deteletedCharacter) res.send(deteletedCharacter.data.name + ' deleted');
    errorMessage(res, 'Something went wrong, try again in a few minutes');
  } catch (e: any) {
    errorMessage(res, e);
  }
};

export default {
  createCharacter,
  getCharacters,
  editCharacter,
  deleteCharacter,
};
