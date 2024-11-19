import { Between } from 'typeorm';
import AppDataSource from '../postgres-config.js';
import Action from '../entities/action.entity.js';

const actionController = {
  getActionsWithPagination: async (req, res) => {
    try {
      const {
        PLU,
        shopId,
        action,
        startDate = '1970-01-01',
        endDate = '2100-01-01',
        page = 1,
        limit = 3,
      } = req.query;

      const actionRepository = AppDataSource.getRepository(Action);
      const historyOfActions = await actionRepository.find({
        where: {
          PLU,
          shopId,
          action,
          dateAction: Between(startDate, endDate),
        },
        take: limit,
        skip: (page - 1) * limit,
      });

      if (Object.keys(historyOfActions).length === 0) {
        return res.status(400).json({ error: 'История не найдена!' });
      }

      res.status(200).json({ historyOfActions });
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },

  createAction: async (req, _) => {
    try {
      const { PLU, shopId, action } = req.body;

      const actionRepository = AppDataSource.getRepository(Action);
      await actionRepository.save({ PLU, shopId, action });
    } catch (error) {
      console.error('error', error);
    }
  },
};

export default actionController;
