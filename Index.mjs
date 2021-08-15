import Transaction from './Transaction.mjs';

const scenario = [
    {
        index: 1,
        meta: {
            title: '111111111Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        call: async store => {
            store.amount = {}

            // Cann add new property

            // for example
            // store.step = 1;
        },
        restore: async store => store.amount -= 100,
    },
    {
        index: 2,
        meta: {
            title: '222222222222222Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        call: async store => {
            // throw new Error('Error')
        },
        restore: async store => {},
    },
    {
        index: 3,
        meta: {
            title: '33333333333Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        call: async store => store.amount = 0,
    }
];

const transaction = new Transaction({amount: 500});

(async () => {
    try {
        const logs = transaction.logs;
        await transaction.dispatch(scenario);
        console.log(logs);
    } catch (err) {
        console.log(err)
    }
})();
