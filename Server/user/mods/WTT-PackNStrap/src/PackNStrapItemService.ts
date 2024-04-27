/* eslint-disable @typescript-eslint/naming-convention */
import { NewItemFromCloneDetails } from "@spt-aki/models/spt/mod/NewItemDetails";
import {
    Preset,
    Item,
    ConfigItem,
    traderIDs,
    currencyIDs,
    allBotTypes,
    inventorySlots
} from "./references/configConsts";
import { ItemMap } from "./references/items";
import { ItemBaseClassMap } from "./references/itemBaseClasses";
import { ItemHandbookCategoryMap } from "./references/itemHandbookCategories";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import * as fs from "fs";
import * as path from "path";
import { WTTInstanceManager } from "./WTTInstanceManager";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";

export class PackNStrapItemService
{
    private configs: ConfigItem;
    private Instance: WTTInstanceManager;

    constructor() 
    {
        this.configs = this.loadCombinedConfig();
    }

    public preAkiLoad(Instance: WTTInstanceManager): void 
    {
        this.Instance = Instance;
    }

    public postDBLoad(): void 
    {
        //const jsonUtil = this.Instance.container.resolve("JsonUtil");
        const tables = this.Instance.database;

        let numItemsAdded = 0;

        for (const itemId in this.configs) 
        {
            const itemConfig = this.configs[itemId];

            const { exampleCloneItem, finalItemTplToClone } =
        this.createExampleCloneItem(itemConfig, itemId);
            if (this.Instance.debug)
            {
                console.log(`Item ID: ${itemId}`);
                console.log(`Prefab Path: ${exampleCloneItem.overrideProperties?.Prefab.path}`);
            }
            this.Instance.customItem.createItemFromClone(exampleCloneItem);

            this.processStaticLootContainers(itemConfig, itemId);
            this.processModSlots(itemConfig, [finalItemTplToClone], itemId); // Wrap finalItemTplToClone in an array
            this.processInventorySlots(itemConfig, itemId, tables); // Pass itemId and inventorySlots in the correct order
            this.processMasterySections(itemConfig, itemId, tables);
            this.processWeaponPresets(itemConfig, itemId, tables);
            this.processBotInventories(
                itemConfig,
                finalItemTplToClone,
                itemId,
                tables
            );
            this.processTraders(itemConfig, tables, itemId);
            //this.modifyQuests(tables, jsonUtil);
            numItemsAdded++;
        }
        if (numItemsAdded > 0) 
        {
            this.Instance.logger.log(
                `[${this.Instance.modName}] Database: Loaded ${numItemsAdded} custom items.`,
                LogTextColor.GREEN
            );
        }
        else 
        {
            this.Instance.logger.log(
                `[${this.Instance.modName}] Database: No custom items loaded.`,
                LogTextColor.GREEN
            );
        }
    }

    /**
   * Creates an example clone item with the provided item configuration and item ID.
   *
   * @param {any} itemConfig - The configuration of the item to clone.
   * @param {string} itemId - The ID of the item.
   * @return {{ exampleCloneItem: NewItemFromCloneDetails, finalItemTplToClone: string }} The created example clone item and the final item template to clone.
   */
    private createExampleCloneItem(
        itemConfig: ConfigItem[string],
        itemId: string
    ): {
            exampleCloneItem: NewItemFromCloneDetails;
            finalItemTplToClone: string;
        } 
    {
        const itemTplToCloneFromMap =
      ItemMap[itemConfig.itemTplToClone] || itemConfig.itemTplToClone;
        const finalItemTplToClone = itemTplToCloneFromMap;

        const parentIdFromMap =
      ItemBaseClassMap[itemConfig.parentId] || itemConfig.parentId;
        const finalParentId = parentIdFromMap;

        const handbookParentIdFromMap =
      ItemHandbookCategoryMap[itemConfig.handbookParentId] ||
      itemConfig.handbookParentId;
        const finalHandbookParentId = handbookParentIdFromMap;

        const itemPrefabPath = `customItems/${itemId}.bundle`;

        const exampleCloneItem: NewItemFromCloneDetails = {
            itemTplToClone: finalItemTplToClone,
            overrideProperties: itemConfig.overrideProperties
                ? {
                    ...itemConfig.overrideProperties,
                    Prefab: {
                        path:
                itemConfig.overrideProperties.Prefab?.path || itemPrefabPath,
                        rcid: ""
                    }
                }
                : undefined,
            parentId: finalParentId,
            newId: itemId,
            fleaPriceRoubles: itemConfig.fleaPriceRoubles,
            handbookPriceRoubles: itemConfig.handbookPriceRoubles,
            handbookParentId: finalHandbookParentId,
            locales: itemConfig.locales
        };
        if (this.Instance.debug)
        {
            console.log(`Cloning item ${finalItemTplToClone} for itemID: ${itemId}`);
        }
        return { exampleCloneItem, finalItemTplToClone };
    }

    /**
   * Adds an item to a static loot container with a given probability.
   *
   * @param {string} containerID - The ID of the loot container.
   * @param {string} itemToAdd - The item to add to the loot container.
   * @param {number} probability - The probability of the item being added.
   * @return {void} This function does not return anything.
   */
    private addToStaticLoot(
        containerID: string,
        itemToAdd: string,
        probability: number
    ): void 
    {
        const lootContainer = this.Instance.database.loot.staticLoot[containerID];

        if (!lootContainer) 
        {
            console.error(`Error: Invalid loot container ID: ${containerID}`);
            return;
        }

        const lootDistribution = lootContainer.itemDistribution;
        const templateFromMap = ItemMap[itemToAdd];
        const finalTemplate = templateFromMap || itemToAdd;

        const newLoot = [
            {
                tpl: finalTemplate,
                relativeProbability: probability
            }
        ];

        lootDistribution.push(...newLoot);
        lootContainer.itemDistribution = lootDistribution;
    }

    /**
   * Processes the static loot containers for a given item.
   *
   * @param {any} itemConfig - The configuration object for the item.
   * @param {string} itemId - The ID of the item.
   * @return {void} This function does not return a value.
   */
    private processStaticLootContainers(itemConfig: any, itemId: string): void 
    {
        if (itemConfig.addtoStaticLootContainers) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing static loot containers for item:", itemId);
            }
            if (Array.isArray(itemConfig.StaticLootContainers)) 
            {
                if (this.Instance.debug)
                {
                    console.log("Adding item to multiple static loot containers:");
                }
                itemConfig.StaticLootContainers.forEach((container) => 
                {
                    const staticLootContainer =
            ItemMap[container.ContainerName] || container.ContainerName;
                    this.addToStaticLoot(
                        staticLootContainer,
                        itemId,
                        container.Probability
                    );
                    if (this.Instance.debug)
                    {
                        console.log(` - Added to container '${staticLootContainer}' with probability ${container.Probability}`);
                    }
                });
            }
            else 
            {
                const staticLootContainer =
          ItemMap[itemConfig.StaticLootContainers] ||
          itemConfig.StaticLootContainers;
                this.addToStaticLoot(
                    staticLootContainer,
                    itemId,
                    itemConfig.Probability
                );
                if (this.Instance.debug)
                {
                    console.log(`Added to container '${staticLootContainer}' with probability ${itemConfig.Probability}`);
                }
            }
        }
    }

    /**
   * Processes the mod slots of an item.
   *
   * @param {any} itemConfig - The configuration of the item.
   * @param {string[]} finalItemTplToClone - The final item template to clone.
   * @param {string} itemId - The ID of the item.
   * @returns {void}
   */
    private processModSlots(
        itemConfig: ConfigItem[string],
        finalItemTplToClone: string[],
        itemId: string
    ): void 
    {
        const tables = this.Instance.database;

        const moddableItemWhitelistIds = Array.isArray(
            itemConfig.ModdableItemWhitelist
        )
            ? itemConfig.ModdableItemWhitelist.map((shortname) => ItemMap[shortname])
            : itemConfig.ModdableItemWhitelist
                ? [ItemMap[itemConfig.ModdableItemWhitelist]]
                : [];

        const moddableItemBlacklistIds = Array.isArray(
            itemConfig.ModdableItemBlacklist
        )
            ? itemConfig.ModdableItemBlacklist.map((shortname) => ItemMap[shortname])
            : itemConfig.ModdableItemBlacklist
                ? [ItemMap[itemConfig.ModdableItemBlacklist]]
                : [];

        const modSlots = Array.isArray(itemConfig.modSlot)
            ? itemConfig.modSlot
            : itemConfig.modSlot
                ? [itemConfig.modSlot]
                : [];

        const lowercaseModSlots = modSlots.map((modSlotName) =>
            modSlotName.toLowerCase()
        );

        if (itemConfig.addtoModSlots) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing mod slots for item:", itemId);
            }
            for (const parentItemId in tables.templates.items) 
            {
                const parentItem = tables.templates.items[parentItemId];

                if (!parentItem._props.Slots) 
                {
                    continue;
                }

                const isBlacklisted = moddableItemBlacklistIds.includes(parentItemId);
                const isWhitelisted = moddableItemWhitelistIds.includes(parentItemId);

                if (isBlacklisted) 
                {
                    continue;
                }

                let addToModSlots = false;

                if (isWhitelisted && itemConfig.modSlot) 
                {
                    addToModSlots = true;
                }
                else if (!isBlacklisted && itemConfig.modSlot) 
                {
                    for (const modSlot of parentItem._props.Slots) 
                    {
                        if (
                            modSlot._props.filters &&
              modSlot._props.filters[0].Filter.some((filterItem) =>
                  finalItemTplToClone.includes(filterItem)
              )
                        ) 
                        {
                            if (lowercaseModSlots.includes(modSlot._name.toLowerCase())) 
                            {
                                addToModSlots = true;
                                break;
                            }
                        }
                    }
                }

                if (addToModSlots) 
                {
                    for (const modSlot of parentItem._props.Slots) 
                    {
                        if (lowercaseModSlots.includes(modSlot._name.toLowerCase())) 
                        {
                            if (!modSlot._props.filters) 
                            {
                                modSlot._props.filters = [
                                    {
                                        AnimationIndex: 0,
                                        Filter: []
                                    }
                                ];
                            }
                            if (!modSlot._props.filters[0].Filter.includes(itemId)) 
                            {
                                modSlot._props.filters[0].Filter.push(itemId);
                                if (this.Instance.debug)
                                {
                                    console.log(`Successfully added item ${itemId} to the filter of mod slot ${modSlot._name} for parent item ${parentItemId}`);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
   * Processes the inventory slots for a given item.
   *
   * @param {any} itemConfig - The configuration object for the item.
   * @param {string} itemId - The ID of the item.
   * @param {any} defaultInventorySlots - The default inventory slots.
   * @return {void} This function does not return a value.
   */
    private processInventorySlots(
        itemConfig: ConfigItem[string],
        itemId: string,
        tables: any
    ): void 
    {
        if (itemConfig.addtoInventorySlots) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing inventory slots for item:", itemId);
            }
            const defaultInventorySlots =
        tables.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots;

            const allowedSlots = Array.isArray(itemConfig.addtoInventorySlots)
                ? itemConfig.addtoInventorySlots
                : [itemConfig.addtoInventorySlots];

            // Iterate over the slots and push the item into the filters per the config
            for (const slot of defaultInventorySlots) 
            {
                const slotName = inventorySlots[slot._name];
                const slotId = Object.keys(inventorySlots).find(
                    (key) => inventorySlots[key] === slot._name
                );

                if (
                    allowedSlots.includes(slot._name) ||
          allowedSlots.includes(slotName) ||
          allowedSlots.includes(slotId)
                ) 
                {
                    if (!slot._props.filters[0].Filter.includes(itemId)) 
                    {
                        slot._props.filters[0].Filter.push(itemId);
                        if (this.Instance.debug)
                        {
                            console.log(`Successfully added item ${itemId} to the filter of slot ${slot._name}`);
                        }
                    }
                }
            }
        }
    }

    /**
   * Processes the mastery sections for an item.
   *
   * @param {any} itemConfig - The configuration object for the item.
   * @param {string} itemId - The ID of the item.
   * @param {any} tables - The tables object containing global configuration.
   * @return {void} This function does not return a value.
   */
    private processMasterySections(
        itemConfig: ConfigItem[string],
        itemId: string,
        tables: any
    ): void 
    {
        if (itemConfig.masteries) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing mastery sections for item:", itemId);
            }
            const masterySections = Array.isArray(itemConfig.masterySections)
                ? itemConfig.masterySections
                : [itemConfig.masterySections];

            for (const mastery of masterySections) 
            {
                const existingMastery = tables.globals.config.Mastering.find(
                    (existing) => existing.Name === mastery.Name
                );
                if (existingMastery) 
                {
                    existingMastery.Templates.push(...mastery.Templates);
                    if (this.Instance.debug)
                    {
                        console.log(` - Adding to existing mastery section for item: ${itemId}`);
                    }
                }
                else 
                {
                    tables.globals.config.Mastering.push(mastery);
                    if (this.Instance.debug)
                    {
                        console.log(` - Adding new mastery section for item: ${itemId}`);
                    }
                }
            }
        }
    }

    /**
   * Processes weapon presets based on the provided item configuration and tables.
   *
   * @param {any} itemConfig - The item configuration.
   * @param {IDatabaseTables} tables - The tables.
   * @return {void} This function does not return anything.
   */
    private processWeaponPresets(
        itemConfig: ConfigItem[string],
        itemId: string,
        tables: IDatabaseTables
    ): void 
    {
        const { addweaponpreset, weaponpresets } = itemConfig;
        const itemPresets = tables.globals.ItemPresets;

        if (addweaponpreset) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing weapon presets for item:", itemId);
            }
            weaponpresets.forEach((presetData) => 
            {
                const preset: Preset = {
                    _changeWeaponName: presetData._changeWeaponName,
                    _encyclopedia: presetData._encyclopedia || undefined,
                    _id: presetData._id,
                    _items: presetData._items.map((itemData: any) => 
                    {
                        const item: Item = {
                            _id: itemData._id,
                            _tpl: itemData._tpl
                        };

                        // Add parentId and slotId only if they are present in itemData
                        if (itemData.parentId) 
                        {
                            item.parentId = itemData.parentId;
                        }
                        if (itemData.slotId) 
                        {
                            item.slotId = itemData.slotId;
                        }

                        return item;
                    }),
                    _name: presetData._name,
                    _parent: presetData._parent,
                    _type: "Preset"
                };

                itemPresets[preset._id] = preset;
                if (this.Instance.debug)
                {
                    console.log(` - Added weapon preset: ${preset._name}`);
                    console.log(` - Preset: ${JSON.stringify(preset)}`);
                }           
            });
        }
    }

    /**
   * Processes traders based on the item configuration.
   *
   * @param {any} itemConfig - The configuration of the item.
   * @param {any} tables - The tables containing the traders.
   * @param {string} itemId - The ID of the item.
   * @return {void} This function does not return a value.
   */
    private processTraders(
        itemConfig: ConfigItem[string],
        tables: any,
        itemId: string
    ): void 
    {
        if (!itemConfig.addtoTraders) 
        {
            return;
        }

        const { traderId, traderItems, barterScheme } = itemConfig;

        const traderIdFromMap = traderIDs[traderId];
        const finalTraderId = traderIdFromMap || traderId;
        const trader = tables.traders[finalTraderId];

        if (!trader) 
        {
            return;
        }

        for (const item of traderItems) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing traders for item:", itemId);
            }
            const newItem = {
                _id: itemId,
                _tpl: itemId,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: item.unlimitedCount,
                    StackObjectsCount: item.stackObjectsCount
                }
            };

            trader.assort.items.push(newItem);
            if (this.Instance.debug)
            {
                console.log(`Successfully added item ${itemId} to the trader ${traderId}`);
            }
        }

        trader.assort.barter_scheme[itemId] = [];

        for (const scheme of barterScheme) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing trader barter scheme for item:", itemId);
            }
            const count = scheme.count;
            const tpl = currencyIDs[scheme._tpl] || ItemMap[scheme._tpl];

            if (!tpl) 
            {
                throw new Error(
                    `Invalid _tpl value in barterScheme for item: ${itemId}`
                );
            }

            trader.assort.barter_scheme[itemId].push([
                {
                    count: count,
                    _tpl: tpl
                }
            ]);
            if (this.Instance.debug)
            {
                console.log(`Successfully added item ${itemId} to the barter scheme of trader ${traderId}`);
            }
        }

        trader.assort.loyal_level_items[itemId] = itemConfig.loyallevelitems;
    }

    /**
   * Modify the quests in the given tables using the provided JSON utility.
   *
   * @param {any} tables - the tables containing the quests
   * @param {any} jsonUtil - the JSON utility for cloning objects
   * @return {void}
   */
    private modifyQuests(tables: IDatabaseTables, jsonUtil: any): void 
    {
        const armoredVests = [
            ["punisher_slick", "punisher_slick_AE", "punisher_slick_2"]
        ];
        const armoredGear = [["punisher_helmet", "punisher_mask"]];

        const survivalistPathQuest =
      tables.templates.quests["5d25aed386f77442734d25d2"];
        if (survivalistPathQuest) 
        {
            const survivalistPathGear =
        survivalistPathQuest.conditions.AvailableForFinish[0].counter
            .conditions[1].equipmentInclusive;

            survivalistPathQuest.conditions.AvailableForFinish[0].counter.conditions[1].equipmentInclusive =
        [...jsonUtil.clone(survivalistPathGear), ...armoredVests];
        }

        const swiftOneQuest = tables.templates.quests["60e729cf5698ee7b05057439"];
        if (swiftOneQuest) 
        {
            const swiftOneGear =
        swiftOneQuest.conditions.AvailableForFinish[0].counter.conditions[1]
            .equipmentInclusive;

            swiftOneQuest.conditions.AvailableForFinish[0].counter.conditions[1].equipmentInclusive =
        [...jsonUtil.clone(swiftOneGear), ...armoredVests, ...armoredGear];
        }
    }

    /**
   * Processes the bot inventories based on the given item configuration.
   *
   * @param {any} itemConfig - The item configuration.
   * @param {string} finalItemTplToClone - The final item template to clone.
   * @param {string} itemId - The item ID.
   * @param {any} tables - The tables object.
   * @return {void} This function does not return anything.
   */
    private processBotInventories(
        itemConfig: ConfigItem[string],
        finalItemTplToClone: string,
        itemId: string,
        tables: any
    ): void 
    {
        if (itemConfig.addtoBots) 
        {
            if (this.Instance.debug)
            {
                console.log("Processing traders for item:", itemId);
            }
            for (const botId in tables.bots.types) 
            {
                const botType = allBotTypes[botId];
                if (botType) 
                {
                    for (const lootSlot in tables.bots.types[botId].inventory.items) 
                    {
                        const items = tables.bots.types[botId].inventory.items;
                        if (items[lootSlot].includes(finalItemTplToClone)) 
                        {
                            if (this.Instance.debug)
                            {
                                console.log(` - Adding item to bot inventory for bot type: ${botType}`);
                            }
                            items.Backpack.push(itemId);
                            items.TacticalVest.push(itemId);
                        }
                    }
                }
            }
        }
    }

    /**
   * Loads and combines multiple configuration files into a single ConfigItem object.
   *
   * @return {any} The combined configuration object.
   */
    private loadCombinedConfig(): any 
    {
        const configFiles = fs
            .readdirSync(path.join(__dirname, "../db/Items"))
            .filter((file) => !file.includes("BaseItemReplacement"));

        const combinedConfig: any = {};

        configFiles.forEach((file) => 
        {
            const configPath = path.join(__dirname, "../db/Items", file);
            const configFileContents = fs.readFileSync(configPath, "utf-8");
            const config = JSON.parse(configFileContents) as ConfigItem;

            Object.assign(combinedConfig, config);
        });

        return combinedConfig;
    }
}
