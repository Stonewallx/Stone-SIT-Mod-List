"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
class Mod {
    questConfig;
    preAkiLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const dynamicRouterModService = container.resolve("DynamicRouterModService");
        const staticRouterModService = container.resolve("StaticRouterModService");
        const profileHelper = container.resolve("ProfileHelper");
        const questHelper = container.resolve("QuestHelper");
        const configServer = container.resolve("ConfigServer");
        this.questConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.QUEST);
        //const questConditionHelper = container.resolve<QuestConditionHelper>("QuestConditionHelper");
        const traderHelper = container.resolve("TraderHelper");
        const databaseServer = container.resolve("DatabaseServer");
        const fenceService = container.resolve("FenceService");
        // Hook up a new static route
        staticRouterModService.registerStaticRouter("MoreCheckmarksRoutes", [
            {
                url: "/MoreCheckmarksRoutes/quests",
                action: (url, info, sessionID, output) => {
                    logger.info("MoreCheckmarks making quest data request");
                    const quests = [];
                    const allQuests = questHelper.getQuestsFromDb();
                    //const allQuests = databaseServer.getTables().templates.quests;
                    const profile = profileHelper.getPmcProfile(sessionID);
                    if (profile && profile.Quests) {
                        for (const quest of allQuests) {
                            // Skip if not a quest we can have
                            if (profile.Info && this.questIsForOtherSide(profile.Info.Side, quest._id)) {
                                continue;
                            }
                            // Skip if already complete or can't complete
                            const questStatus = questHelper.getQuestStatus(profile, quest._id);
                            /*
                            Locked = 0,
                            AvailableForStart = 1,
                            Started = 2,
                            AvailableForFinish = 3,
                            Success = 4,
                            Fail = 5,
                            FailRestartable = 6,
                            MarkedAsFailed = 7,
                            Expired = 8,
                            AvailableAfter = 9
                            */
                            if (questStatus >= 3 && questStatus <= 8) {
                                continue;
                            }
                            quests.push(quest);
                        }
                        logger.info("Got quests");
                    }
                    else {
                        logger.info("Unable to fetch quests for MoreCheckmarks");
                    }
                    return JSON.stringify(quests);
                }
            },
            {
                url: "/MoreCheckmarksRoutes/assorts",
                action: (url, info, sessionID, output) => {
                    logger.info("MoreCheckmarks making trader assort data request");
                    const assorts = [];
                    if (databaseServer && databaseServer.getTables()) {
                        if (Traders_1.Traders && traderHelper) {
                            for (const value of Object.values(Traders_1.Traders)) {
                                if (value == "579dc571d53a0658a154fbec" && fenceService.getRawFenceAssorts()) {
                                    assorts.push(fenceService.getRawFenceAssorts());
                                }
                                else if (databaseServer.getTables().traders[value] && databaseServer.getTables().traders[value].assort) {
                                    assorts.push(databaseServer.getTables().traders[value].assort);
                                }
                            }
                        }
                        else {
                            logger.info("Unable to fetch assorts for MoreCheckmarks");
                        }
                    }
                    return JSON.stringify(assorts);
                }
            },
            {
                url: "/MoreCheckmarksRoutes/items",
                action: (url, info, sessionID, output) => {
                    logger.info("MoreCheckmarks making item data request");
                    const items = {};
                    if (databaseServer && databaseServer.getTables() && databaseServer.getTables().templates && databaseServer.getTables().templates.items) {
                        return JSON.stringify(databaseServer.getTables().templates.items);
                    }
                    else {
                        return JSON.stringify(items);
                    }
                }
            },
            {
                url: "/MoreCheckmarksRoutes/locales",
                action: (url, info, sessionID, output) => {
                    logger.info("MoreCheckmarks making locale request");
                    const locales = {};
                    if (databaseServer && databaseServer.getTables() && databaseServer.getTables().locales) {
                        return JSON.stringify(databaseServer.getTables().locales);
                    }
                    else {
                        return JSON.stringify(locales);
                    }
                }
            },
            {
                url: "/MoreCheckmarksRoutes/productions",
                action: (url, info, sessionID, output) => {
                    logger.info("MoreCheckmarks making productions request");
                    const production = {};
                    if (databaseServer && databaseServer.getTables() && databaseServer.getTables().hideout && databaseServer.getTables().hideout.production) {
                        return JSON.stringify(databaseServer.getTables().hideout.production);
                    }
                    else {
                        return JSON.stringify(production);
                    }
                }
            }
        ], "custom-static-MoreCheckmarksRoutes");
    }
    questIsForOtherSide(playerSide, questId) {
        const isUsec = playerSide.toLowerCase() === "usec";
        if (isUsec && this.questConfig.bearOnlyQuests.includes(questId)) {
            // player is usec and quest is bear only, skip
            return true;
        }
        if (!isUsec && this.questConfig.usecOnlyQuests.includes(questId)) {
            // player is bear and quest is usec only, skip
            return true;
        }
        return false;
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=MoreCheckmarksStaticRouter.js.map