import { Validator } from "./validator.mjs";

export class Transaction {
    constructor() { }
    async dispatch (scenarios) {
        this.validateScenarios(scenarios)
        // Validator.isType(scenario[0]['index'],'string','index')
    }

    validateScenarios (scenarios) {
        scenarios.forEach((scenario, index) => {

            // Validate types
            Validator.isType(scenario['index'],'number','index',index + 1);
            Validator.isType(scenario['meta'],'object','meta',index + 1);
            Validator.isType(scenario['meta']['title'],'string','title',index + 1);
            Validator.isType(scenario['meta']['description'],'string','description',index + 1);
            // Validate sequence
            Validator.indexSequence(scenarios);
        })
    }
}
