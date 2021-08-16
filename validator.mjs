export default class Validator {
    static isType(value, type, propName, errorPlace) {
        if (value === undefined) {
            throw new TypeError(`Add property ${propName} in scenario with index ${errorPlace + 1}`);
        } else if (typeof value !== type) {
            if (propName === 'index') {
                throw new TypeError(`${propName} is not ${type}, in scenario[${errorPlace}]`);
            }
            throw new TypeError(`${propName} is not a ${type}, in scenario with index ${errorPlace + 1}`);
        }
    }

    static indexSequence(scenarios) {
        for (let i in scenarios) {
            if (scenarios[+i].index !== +i + 1) {
                throw new Error(`Incorrect Index sequence`);
            }
        }
    }

    static isObject(scenario) {
        if (typeof scenario !== 'object' || Array.isArray(scenario) || scenario === null) {
            throw new Error('Scenario can be only an object');
        }
    }

    static asyncChek(method, propName, index) {
        if (method === undefined) {
            throw new Error(`${propName} does not exist in scenario with index ${index + 1}`);
        }
        if (method.constructor.name !== 'AsyncFunction') {
            throw new Error(`${propName} is not an AsyncFunction in scenario with index ${index + 1}`);
        }
    }

    static size(object, maxLength, propName) {
        if (Object.keys(object).length > maxLength) {
            throw new Error(`${propName} can not have more properties than ${maxLength}`);
        }
    }
}
