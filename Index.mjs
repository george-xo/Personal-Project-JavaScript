import Transaction from './Transaction.mjs';

const scenario = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        call: async store => {
            store.amount += 500;

            // Can add new property

            // for example
            // store.step = 1;
        },
        restore: async store => store.amount -= 500,
    },
    {
        index: 2,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        call: async store => store.amount *= 5,
        restore: async store => store.amount /= 5,
    },
    {
        index: 3,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        call: async store => store.amount = 0,
    }
];

const transaction = new Transaction({amount: 2000});

(async () => {
    try {
        const logs = transaction.logs;
        await transaction.dispatch(scenario);
        console.log(logs);
    } catch (err) {
        console.log(err)
    }
})();
