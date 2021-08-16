import Validator from "./Validator.mjs";
import constructLog from "./Logger.mjs";
import deepCopy from "./Copy.mjs";

export default class Transaction {
    #operationStatus;

    constructor(store = {}) {
        this.logs = [];
        this.store = store;
        this.#operationStatus = {
            DONE: 'SUCCESS',
            ROLLBACK_DONE: 'FAILED: restored with no errors',
            ROLLBACK_FAILED: 'FAILED: restored with errors',
            ROLLBACK_NONE: 'FAILED: error on first index'
        }
    }

    async dispatch(scenarios) {
        this.#validateScenarios(scenarios);
        await this.#call(scenarios);
    }

    async #call(scenarios) {
        let idx;
        try {
            for (const scenario of scenarios) {
                const index = scenarios.indexOf(scenario);
                idx = index;

                let before = deepCopy(this.store);
                await scenario.call(this.store);
                let after = deepCopy(this.store);

                this.logs.push(constructLog(idx, scenario.meta, null, false, before, after));

                if (index === scenarios.length - 1) {
                    this.store = {};
                    console.log(this.#operationStatus.DONE);
                }
            }
        } catch (error) {
            this.logs.push(constructLog(idx, scenarios[idx - 1].meta, error, true));
            await this.#restore(scenarios, idx)
        }

    }

    async #restore(scenarios, index) {
        if (index === 0) {
            this.store = {};
            console.log(this.#operationStatus.ROLLBACK_NONE);
            return;
        }
        try {
            for (let i = index; i >= 0; i--) {
                if (scenarios[i].restore) {
                    await scenarios[i].restore(this.store);
                }
                if (i === 0) {
                    this.store = {};
                    console.log(this.#operationStatus.ROLLBACK_DONE)
                }
            }
        } catch (err) {
            this.store = {};
            console.log(this.#operationStatus.ROLLBACK_FAILED)
        }
    }

    #validateScenarios(scenarios) {
        // Validate types
        scenarios.forEach((scenario, index) => {

            Validator.isObject(scenario);

            if (!scenario.hasOwnProperty('restore')) {
                Validator.size(scenario, 3, 'If Scenario has no restore it');
            } else {
                Validator.size(scenario, 4, 'Scenario');
            }
            Validator.size(scenario.meta, 2, 'Meta');

            Validator.isType(scenario.index, 'number', 'index', index);
            Validator.isType(scenario.meta, 'object', 'meta', index);
            Validator.isType(scenario.meta.title, 'string', 'title', index);
            Validator.isType(scenario.meta.description, 'string', 'description', index);

            Validator.asyncChek(scenario.call, 'call', index);
            if (scenario.restore) Validator.asyncChek(scenario.restore, 'restore', index);

        })
        // Validate sequence
        Validator.indexSequence(scenarios);
    }
}
