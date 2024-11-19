import { EntitySchema } from 'typeorm';

const Action = new EntitySchema({
  name: 'Action',
  tableName: 'actions',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },

    PLU: {
      type: 'text',
    },

    shopId: {
      type: 'int',
    },

    dateAction: {
      type: 'date',
      createDate: true,
    },

    action: {
      type: 'text',
    },
  },
});

export default Action;
