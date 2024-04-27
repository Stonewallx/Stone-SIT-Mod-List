/* eslint-disable @typescript-eslint/naming-convention */

import { InstanceManager } from "./InstanceManager";
import * as SkillsConfig from "../config/SkillsConfig.json";

import type { DependencyContainer } from "tsyringe";
import type { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { CustomItemService } from "@spt-aki/services/mod/CustomItemService";
import type { NewItemFromCloneDetails } from "@spt-aki/models/spt/mod/NewItemDetails";
import type { IKeys } from "./Models/IKeys";

import { Money } from "@spt-aki/models/enums/Money";
import { Traders } from "@spt-aki/models/enums/Traders";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";

enum ItemIDS {
    Lockpick  = "6622c28aed7e3bc72e301e22",
    Pda = "662400eb756ca8948fe64fe8"
}

class SkillsPlus implements IPreAkiLoadMod, IPostDBLoadMod
{
    private Instance: InstanceManager = new InstanceManager();
    private locale: Record<string, Record<string, string>>; 
    private customItemService: CustomItemService;

    public preAkiLoad(container: DependencyContainer): void 
    {
        this.Instance.preAkiLoad(container, "Skills Extended");
        this.registerRoutes();
    }

    public postDBLoad(container: DependencyContainer): void 
    {
        this.Instance.postDBLoad(container);
        this.customItemService = container.resolve<CustomItemService>("CustomItemService");

        this.setLocales();
        this.CreateItems();
        this.addCraftsToDatabase();
        this.locale = this.Instance.database.locales.global;
    }

    private setLocales(): void
    {
        this.Instance.database.locales.global.en.FirstAidDescription += "FirstAidDescriptionPattern";
        this.Instance.database.locales.global.en.FieldMedicineDescription = "FieldMedicineDescriptionPattern";
    }

    private getKeys(): string
    {
        const items = Object.values(this.Instance.database.templates.items);

        const keys: IKeys = {
            keyLocale: {}
        }

        const ItemHelper = this.Instance.itemHelper;
        
        const keyItems = items.filter(x => 
            x._type === "Item" 
            && ItemHelper.isOfBaseclasses(x._id, [BaseClasses.KEY, BaseClasses.KEY_MECHANICAL, BaseClasses.KEYCARD]))

        for (const item of keyItems)
        {
            keys.keyLocale[item._id] = this.locale.en[`${item._id} Name`];
        }

        return JSON.stringify(keys);
    }

    private registerRoutes(): void
    {
        this.Instance.staticRouter.registerStaticRouter(
            "GetSkillsConfig",
            [
                {
                    url: "/skillsExtended/GetSkillsConfig",
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    action: (url, info, sessionId, output) => 
                    {                     
                        return JSON.stringify(SkillsConfig);
                    }
                }
            ],
            ""
        );

        this.Instance.staticRouter.registerStaticRouter(
            "GetKeys",
            [
                {
                    url: "/skillsExtended/GetKeys",
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    action: (url, info, sessionId, output) => 
                    {                     
                        return this.getKeys();
                    }
                }
            ],
            ""
        );
    }

    private CreateItems(): void
    {
        this.CreateLockpick();
        //this.CreatePDA();
    }

    // Clones factory key to be used as a blank for bump lock picking
    private CreateLockpick(): void
    {
        const lockPick: NewItemFromCloneDetails = {
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
        }

        this.customItemService.createItemFromClone(lockPick);

        const mechanic = this.Instance.database.traders[Traders.MECHANIC];
        
        mechanic.assort.items.push({
            _id: ItemIDS.Lockpick,
            _tpl: ItemIDS.Lockpick,
            parentId: "hideout",
            slotId: "hideout",
            upd:
            {
                UnlimitedCount: false,
                StackObjectsCount: 10
            }
        });

        mechanic.assort.barter_scheme[ItemIDS.Lockpick] = [
            [
                {
                    count: 75000,
                    _tpl: Money.ROUBLES
                }
            ]
        ];
        
        mechanic.assort.loyal_level_items[ItemIDS.Lockpick] = 2;
    }

    private CreatePDA(): void
    {
        const Pda: NewItemFromCloneDetails = {
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
        }

        this.customItemService.createItemFromClone(Pda);
        
        const peaceKeeper = this.Instance.database.traders[Traders.PEACEKEEPER];

        peaceKeeper.assort.items.push({
            _id: ItemIDS.Pda,
            _tpl: ItemIDS.Pda,
            parentId: "hideout",
            slotId: "hideout",
            upd:
            {
                UnlimitedCount: false,
                StackObjectsCount: 1
            }
        });

        peaceKeeper.assort.barter_scheme[ItemIDS.Pda] = [
            [
                {
                    count: 12500,
                    _tpl: Money.DOLLARS
                }
            ]
        ];
        
        peaceKeeper.assort.loyal_level_items[ItemIDS.Pda] = 3;
    }

    private addCraftsToDatabase(): void
    {
        const crafts = SkillsConfig.LockPickingSkill.CRAFTING_RECIPES;

        crafts.forEach((craft) => {
            this.Instance.database.hideout.production.push(craft);
        })
    }
}

module.exports = { mod: new SkillsPlus() }