export class Validator {
    static isType (value, type, propName, errorPlace) {
        if(value === undefined) {
            throw new TypeError(`Add property ${propName} in scenario with index ${errorPlace}`);
        } else if (typeof value !== type) {
            throw new TypeError(`${propName} is not a ${type}, in scenario with index ${errorPlace}`);
        }
    }

    static indexSequence (scenarios) {
        for (let i in scenarios) {
            if (scenarios[+i].index !== +i + 1) {
                throw new Error(`scenario with index ${scenarios[+i].index} is not precisely increased`);
            }
        }
    }
}
