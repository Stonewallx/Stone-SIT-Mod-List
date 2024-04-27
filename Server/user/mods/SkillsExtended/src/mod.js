"use strict";
/* eslint-disable @typescript-eslint/naming-convention */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const InstanceManager_1 = require("./InstanceManager");
const SkillsConfig = __importStar(require("../config/SkillsConfig.json"));
const Money_1 = require("C:/snapshot/project/obj/models/enums/Money");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
var ItemIDS;
(function (ItemIDS) {
    ItemIDS["Lockpick"] = "6622c28aed7e3bc72e301e22";
    ItemIDS["Pda"] = "662400eb756ca8948fe64fe8";
})(ItemIDS || (ItemIDS = {}));
class SkillsPlus {
    Instance = new InstanceManager_1.InstanceManager();
    locale;
    customItemService;
    preAkiLoad(container) {
        this.Instance.preAkiLoad(container, "Skills Extended");
        this.registerRoutes();
    }
    postDBLoad(container) {
        this.Instance.postDBLoad(container);
        this.customItemService = container.resolve("CustomItemService");
        this.setLocales();
        this.CreateItems();
        this.addCraftsToDatabase();
        this.locale = this.Instance.database.locales.global;
    }
    setLocales() {
        this.Instance.database.locales.global.en.FirstAidDescription += "FirstAidDescriptionPattern";
        this.Instance.database.locales.global.en.FieldMedicineDescription = "FieldMedicineDescriptionPattern";
    }
    getKeys() {
        const items = Object.values(this.Instance.database.templates.items);
        const keys = {
            keyLocale: {}
        };
        const ItemHelper = this.Instance.itemHelper;
        const keyItems = items.filter(x => x._type === "Item"
            && ItemHelper.isOfBaseclasses(x._id, [BaseClasses_1.BaseClasses.KEY, BaseClasses_1.BaseClasses.KEY_MECHANICAL, BaseClasses_1.BaseClasses.KEYCARD]));
        for (const item of keyItems) {
            keys.keyLocale[item._id] = this.locale.en[`${item._id} Name`];
        }
        return JSON.stringify(keys);
    }
    registerRoutes() {
        this.Instance.staticRouter.registerStaticRouter("GetSkillsConfig", [
            {
                url: "/skillsExtended/GetSkillsConfig",
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                action: (url, info, sessionId, output) => {
                    return JSON.stringify(SkillsConfig);
                }
            }
        ], "");
        this.Instance.staticRouter.registerStaticRouter("GetKeys", [
            {
                url: "/skillsExtended/GetKeys",
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                action: (url, info, sessionId, output) => {
                    return this.getKeys();
                }
            }
        ], "");
    }
    CreateItems() {
        this.CreateLockpick();
        //this.CreatePDA();
    }
    // Clones factory key to be used as a blank for bump lock picking
    CreateLockpick() {
        const lockPick = {
            itemTplToClone: "5448ba0b4bdc2d02308b456c",
            overrideProperties: {
                CanSellOnRagfair: false,
                MaximumNumberOfUsage: 5,
                Prefab: {
                    path: "lockpick.bundle",
                    rcid: ""
                },
                BackgroundColor: "orange"
            },
            parentId: "5c99f98d86f7745c314214b3",
            newId: ItemIDS.Lockpick,
            fleaPriceRoubles: 120000,
            handbookPriceRoubles: 75000,
            handbookParentId: "5c518ec986f7743b68682ce2",
            locales: {
                en: {
                    name: "Lockpick set",
                    shortName: "Lockpick",
                    description: "A set of tools used for picking locks"
                }
            }
        };
        this.customItemService.createItemFromClone(lockPick);
        const mechanic = this.Instance.database.traders[Traders_1.Traders.MECHANIC];
        mechanic.assort.items.push({
            _id: ItemIDS.Lockpick,
            _tpl: ItemIDS.Lockpick,
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: false,
                StackObjectsCount: 10
            }
        });
        mechanic.assort.barter_scheme[ItemIDS.Lockpick] = [
            [
                {
                    count: 75000,
                    _tpl: Money_1.Money.ROUBLES
                }
            ]
        ];
        mechanic.assort.loyal_level_items[ItemIDS.Lockpick] = 2;
    }
    CreatePDA() {
        const Pda = {
            itemTplToClone: "5bc9b720d4351e450201234b",
            overrideProperties: {
                CanSellOnRagfair: false,
                Prefab: {
                    path: "pda.bundle",
                    rcid: ""
                }
            },
            parentId: "5c164d2286f774194c5e69fa",
            newId: ItemIDS.Pda,
            fleaPriceRoubles: 3650000,
            handbookPriceRoubles: 75000,
            handbookParentId: "5c164d2286f774194c5e69fa",
            locales: {
                en: {
                    name: "Flipper zero",
                    shortName: "Flipper",
                    description: "A hacking device used for gaining access to key card doors. Requires Lockpicking level 20 to use."
                }
            }
        };
        this.customItemService.createItemFromClone(Pda);
        const peaceKeeper = this.Instance.database.traders[Traders_1.Traders.PEACEKEEPER];
        peaceKeeper.assort.items.push({
            _id: ItemIDS.Pda,
            _tpl: ItemIDS.Pda,
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: false,
                StackObjectsCount: 1
            }
        });
        peaceKeeper.assort.barter_scheme[ItemIDS.Pda] = [
            [
                {
                    count: 12500,
                    _tpl: Money_1.Money.DOLLARS
                }
            ]
        ];
        peaceKeeper.assort.loyal_level_items[ItemIDS.Pda] = 3;
    }
    addCraftsToDatabase() {
        const crafts = SkillsConfig.LockPickingSkill.CRAFTING_RECIPES;
        crafts.forEach((craft) => {
            this.Instance.database.hideout.production.push(craft);
        });
    }
}
module.exports = { mod: new SkillsPlus() };
//# sourceMappingURL=mod.js.map