import { Transaction } from './main.mjs';

const scenario = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        call: async (store) => {},
        restore: async (store) => {}
    },
    {
        index: 2,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        call: async (store) => {},
        restore: async (store) => {}
    },
    {
        index: 3,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        call: async (store) => {},
        restore: async (store) => {}
    }
];

const transaction = new Transaction();

(async() => {
    try {
        await transaction.dispatch(scenario);
        // const store = transaction.store; // {} | null
        // const logs = transation.logs; // []
    } catch (err) {
       console.log(err)
    }
})();
