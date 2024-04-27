"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const config_json_1 = __importDefault(require("../config/config.json"));
class DisableDiscardLimits {
    postDBLoad(container) {
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const pmcConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.PMC);
        const { logInfo } = useLogger(container);
        const tables = databaseServer.getTables();
        /**
         * Set the item generation weights for backpackLoot, vestLoot, and pocketLoot to zero to prevent extra loot items from spawning on the specified bot type
         * @param botTypes
         */
        const emptyInventory = (botTypes) => {
            botTypes.forEach((type) => {
                logInfo(`Removing loot from ${type}`);
                const backpackWeights = tables.bots.types[type].generation.items.backpackLoot.weights;
                const vestWeights = tables.bots.types[type].generation.items.vestLoot.weights;
                const pocketWeights = tables.bots.types[type].generation.items.pocketLoot.weights;
                Object.keys(backpackWeights).forEach(weight => backpackWeights[weight] = 0);
                Object.keys(vestWeights).forEach(weight => vestWeights[weight] = 0);
                Object.keys(pocketWeights).forEach(weight => pocketWeights[weight] = 0);
            });
        };
        if (!config_json_1.default.pmcSpawnWithLoot) {
            emptyInventory(["usec", "bear"]);
            // Do not allow weapons to spawn in PMC bags
            pmcConfig.looseWeaponInBackpackLootMinMax.max = 0;
        }
        if (!config_json_1.default.scavSpawnWithLoot) {
            emptyInventory(["assault"]);
        }
        logInfo("Marking items with DiscardLimits as InsuranceDisabled");
        for (let itemId in tables.templates.items) {
            const template = tables.templates.items[itemId];
            /**
             * When we set DiscardLimitsEnabled to false further down, this will cause some items to be able to be insured when they normally should not be.
             * The DiscardLimit property is used by BSG for RMT protections and their code internally treats things with discard limits as not insurable.
             * For items that have a DiscardLimit >= 0, we need to manually flag them as InsuranceDisabled to make sure they still cannot be insured by the player.
             * Do not disable insurance if the item is marked as always available for insurance.
             */
            if (template._props.DiscardLimit >= 0 &&
                !template._props.IsAlwaysAvailableForInsurance) {
                template._props.InsuranceDisabled = true;
            }
        }
        tables.globals.config.DiscardLimitsEnabled = false;
        logInfo("Global config DiscardLimitsEnabled set to false");
    }
}
function useLogger(container) {
    const logger = container.resolve("WinstonLogger");
    return {
        logInfo: (message) => {
            logger.info(`[NoDiscardLimit] ${message}`);
        },
    };
}
module.exports = { mod: new DisableDiscardLimits() };
//# sourceMappingURL=mod.js.map