"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const ContextVariableType_1 = require("C:/snapshot/project/obj/context/ContextVariableType");
const JsonUtil_1 = require("C:/snapshot/project/obj/utils/JsonUtil");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ClassDef = __importStar(require("./ClassDef"));
const ClassDef_1 = require("./ClassDef");
// General SWAG Config
const config_json_1 = __importDefault(require("../config/config.json"));
const bossConfig_json_1 = __importDefault(require("../config/bossConfig.json"));
// Bosses
const gluhar_json_1 = __importDefault(require("../config/bosses/gluhar.json"));
const goons_json_1 = __importDefault(require("../config/bosses/goons.json"));
const kaban_json_1 = __importDefault(require("../config/bosses/kaban.json"));
const killa_json_1 = __importDefault(require("../config/bosses/killa.json"));
const kolontay_json_1 = __importDefault(require("../config/bosses/kolontay.json"));
const reshala_json_1 = __importDefault(require("../config/bosses/reshala.json"));
const sanitar_json_1 = __importDefault(require("../config/bosses/sanitar.json"));
const shturman_json_1 = __importDefault(require("../config/bosses/shturman.json"));
const tagilla_json_1 = __importDefault(require("../config/bosses/tagilla.json"));
const zryachiy_json_1 = __importDefault(require("../config/bosses/zryachiy.json"));
// Spawn Configs
const bloodhounds_json_1 = __importDefault(require("../config/other/bloodhounds.json"));
const cultists_json_1 = __importDefault(require("../config/other/cultists.json"));
const raiders_json_1 = __importDefault(require("../config/other/raiders.json"));
const rogues_json_1 = __importDefault(require("../config/other/rogues.json"));
const scav_snipers_json_1 = __importDefault(require("../config/other/scav_snipers.json"));
// Custom
const punisher_json_1 = __importDefault(require("../config/custom/punisher.json"));
const otherSpawnConfigs = [
    bloodhounds_json_1.default,
    cultists_json_1.default,
    scav_snipers_json_1.default,
    raiders_json_1.default,
    rogues_json_1.default
];
const bossSpawnConfigs = [
    gluhar_json_1.default,
    goons_json_1.default,
    kaban_json_1.default,
    killa_json_1.default,
    kolontay_json_1.default,
    reshala_json_1.default,
    sanitar_json_1.default,
    shturman_json_1.default,
    tagilla_json_1.default,
    zryachiy_json_1.default
];
const customSpawnConfigs = [
    punisher_json_1.default
];
const modName = "SWAG";
let logger;
let LocationCallbacks;
LocationCallbacks;
let jsonUtil;
JsonUtil_1.JsonUtil;
let botConfig;
let pmcConfig;
let iGlobals;
let configServer;
let databaseServer;
let locations;
let seasonalEvents;
let randomUtil;
let BossWaveSpawnedOnceAlready;
const customPatterns = {};
class SWAG {
    static savedLocationData = {
        factory4_day: undefined,
        factory4_night: undefined,
        bigmap: undefined,
        interchange: undefined,
        laboratory: undefined,
        lighthouse: undefined,
        rezervbase: undefined,
        shoreline: undefined,
        tarkovstreets: undefined,
        woods: undefined,
        // unused
        develop: undefined,
        hideout: undefined,
        privatearea: undefined,
        suburbs: undefined,
        terminal: undefined,
        town: undefined,
    };
    static pmcType = ["sptbear", "sptusec"];
    static randomWaveTimer = {
        time_min: 0,
        time_max: 0,
    };
    static actual_timers = {
        time_min: 0,
        time_max: 0,
    };
    static waveCounter = {
        count: 1,
    };
    static raid_time = {
        time_of_day: "day",
    };
    static bossCount = {
        count: 0,
    };
    preAkiLoad(container) {
        const HttpResponse = container.resolve("HttpResponseUtil");
        const staticRouterModService = container.resolve("StaticRouterModService");
        staticRouterModService.registerStaticRouter(`${modName}/client/match/offline/end`, [
            {
                url: "/client/match/offline/end",
                action: (url, info, sessionID, output) => {
                    SWAG.ClearDefaultSpawns();
                    SWAG.ConfigureMaps();
                    return LocationCallbacks.getLocationData(url, info, sessionID);
                },
            },
        ], "SWAG");
        staticRouterModService.registerStaticRouter(`${modName}/client/locations`, [
            {
                url: "/client/locations",
                action: (url, info, sessionID, output) => {
                    SWAG.ClearDefaultSpawns();
                    SWAG.ConfigureMaps();
                    return LocationCallbacks.getLocationData(url, info, sessionID);
                },
            },
        ], "SWAG");
        staticRouterModService.registerStaticRouter(`${modName}/client/items`, [
            {
                url: "/client/items",
                action: (url, info, sessionID, output) => {
                    const locationConfig = container.resolve("ConfigServer").getConfig(ConfigTypes_1.ConfigTypes.LOCATION);
                    // as of SPT 3.6.0 we need to disable the new spawn system so that SWAG can clear spawns properly
                    if (!config_json_1.default?.UseDefaultSpawns?.Waves ||
                        !config_json_1.default?.UseDefaultSpawns?.Bosses ||
                        !config_json_1.default?.UseDefaultSpawns?.TriggeredWaves) {
                        SWAG.disableSpawnSystems();
                    }
                    // disable more vanilla spawn stuff
                    locationConfig.splitWaveIntoSingleSpawnsSettings.enabled = false;
                    locationConfig.rogueLighthouseSpawnTimeSettings.enabled = false;
                    locationConfig.fixEmptyBotWavesSettings.enabled = false;
                    locationConfig.addOpenZonesToAllMaps = false;
                    locationConfig.addCustomBotWavesToMaps = false;
                    locationConfig.enableBotTypeLimits = false;
                    logger.info("SWAG: Vanilla spawn systems disabled");
                    return output;
                },
            },
        ], "SWAG");
        staticRouterModService.registerStaticRouter(`${modName}/client/raid/configuration`, [{
                url: "/client/raid/configuration",
                action: (url, info, sessionID, output) => {
                    try {
                        // Retrieve configurations
                        const botConfig = container.resolve("ConfigServer").getConfig(ConfigTypes_1.ConfigTypes.BOT);
                        const pmcConfig = container.resolve("ConfigServer").getConfig(ConfigTypes_1.ConfigTypes.PMC);
                        // Disable PMC conversion
                        const conversionTypes = ["assault", "cursedassault", "pmcbot", "exusec", "arenafighter", "arenafighterevent", "crazyassaultevent"];
                        conversionTypes.forEach(type => {
                            pmcConfig.convertIntoPmcChance[type] = { min: 0, max: 0 };
                        });
                        logger.info("SWAG: PMC conversion is OFF (this is good - be sure this loads AFTER Realism/SVM)");
                        // Adjust time and map caps
                        const appContext = container.resolve("ApplicationContext");
                        const weatherController = container.resolve("WeatherController");
                        const matchInfoStartOff = appContext.getLatestValue(ContextVariableType_1.ContextVariableType.RAID_CONFIGURATION).getValue();
                        const time = weatherController.generate().time;
                        let realTime = time;
                        if (matchInfoStartOff.timeVariant === "PAST") {
                            let [hours, minutes] = time.split(":").map(Number);
                            hours = (hours - 12 + 24) % 24; // Adjust time backwards by 12 hours and ensure it wraps correctly
                            realTime = `${hours}:${minutes}`;
                        }
                        // Determine Time of Day
                        let TOD = "day";
                        let [hours] = realTime.split(":").map(Number);
                        if ((matchInfoStartOff.location !== "factory4_night" && hours >= 5 && hours < 22) ||
                            matchInfoStartOff.location === "factory4_day" ||
                            matchInfoStartOff.location.toLowerCase() === "laboratory") {
                            TOD = "day";
                        }
                        else {
                            TOD = "night";
                        }
                        // Set map caps based on Time of Day
                        if (TOD === "day") {
                            Object.keys(config_json_1.default.MaxBotCap).forEach(key => {
                                botConfig.maxBotCap[key] = config_json_1.default.MaxBotCap[key];
                            });
                        }
                        else { // "night"
                            Object.keys(config_json_1.default.NightMaxBotCap).forEach(key => {
                                botConfig.maxBotCap[key] = config_json_1.default.NightMaxBotCap[key];
                            });
                        }
                        logger.info(`SWAG: ${TOD} Raid Max Bot Caps set`);
                        return HttpResponse.nullResponse();
                    }
                    catch (e) {
                        logger.error(`SWAG: Failed To modify PMC conversion, you may have more PMCs than you're supposed to. Error: ${e}`);
                        return HttpResponse.nullResponse();
                    }
                },
            }], "SWAG");
    }
    postDBLoad(container) {
        logger = container.resolve("WinstonLogger");
        LocationCallbacks =
            container.resolve("LocationCallbacks");
        jsonUtil = container.resolve("JsonUtil");
        configServer = container.resolve("ConfigServer");
        botConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        pmcConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.PMC);
        databaseServer = container.resolve("DatabaseServer");
        locations = databaseServer.getTables().locations;
        randomUtil = container.resolve("RandomUtil");
        seasonalEvents = container.resolve("SeasonalEventService");
    }
    /**
     * Returns all available OpenZones specified in location.base.OpenZones as well as any OpenZone found in the SpawnPointParams.
     * Filters out all sniper zones
     * @param map
     * @returns
     */
    static GetOpenZones(map) {
        const baseobj = locations[map]?.base;
        // Get all OpenZones defined in the base obj that do not include sniper zones. Need to filter for empty strings as well.
        const foundOpenZones = baseobj?.OpenZones?.split(",")
            .filter((name) => !name.includes("Snipe"))
            .filter((name) => name.trim() !== "") ?? [];
        // Sometimes there are zones in the SpawnPointParams that arent listed in the OpenZones, parse these and add them to the list of zones
        baseobj?.SpawnPointParams?.forEach((spawn) => {
            //check spawn for open zones and if it doesn't exist add to end of array
            if (spawn?.BotZoneName &&
                !foundOpenZones.includes(spawn.BotZoneName) &&
                !spawn.BotZoneName.includes("Snipe")) {
                foundOpenZones.push(spawn.BotZoneName);
            }
        });
        //logger.info(`SWAG: Open Zones(${map}): ${JSON.stringify(foundOpenZones)}`);
        return foundOpenZones;
    }
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    static ConfigureMaps() {
        const bossConfigs = {};
        const otherConfigs = {};
        const customConfigs = {};
        bossSpawnConfigs.forEach(data => {
            Object.keys(data).forEach(mapKey => {
                if (bossConfig_json_1.default.TotalBossesPerMap[mapKey] === 0 || config_json_1.default.disableAllSpawns.bosses) {
                    return;
                }
                if (!bossConfigs[mapKey]) {
                    bossConfigs[mapKey] = [];
                }
                const filteredBosses = data[mapKey].filter(boss => {
                    // ignore boarsniper
                    if (boss.BossName == "bossboarsniper") {
                        return false;
                    }
                    const shouldSkip = boss.BossChance === 0 ||
                        (bossConfig_json_1.default.Bosses.useGlobalBossSpawnChance &&
                            bossConfig_json_1.default.Bosses[ClassDef_1.reverseBossNames[boss.BossName]][mapKey] === 0);
                    return !shouldSkip;
                });
                bossConfigs[mapKey].push(...filteredBosses);
            });
        });
        otherSpawnConfigs.forEach(data => {
            Object.keys(data).forEach(mapKey => {
                if (!otherConfigs[mapKey]) {
                    otherConfigs[mapKey] = [];
                }
                const filteredBosses = data[mapKey].filter(boss => {
                    const bossType = ClassDef_1.reverseBossNames[boss.BossName];
                    if (config_json_1.default.disableAllSpawns[bossType]) {
                        return false;
                    }
                    const shouldSkip = boss.BossChance === 0 ||
                        (config_json_1.default.Spawns.useGlobalSpawnChance && config_json_1.default.Spawns[bossType][mapKey] === 0);
                    return !shouldSkip;
                });
                otherConfigs[mapKey].push(...filteredBosses);
            });
        });
        customSpawnConfigs.forEach(data => {
            Object.keys(data).forEach(mapKey => {
                if (!customConfigs[mapKey]) {
                    customConfigs[mapKey] = [];
                }
                const filteredBosses = data[mapKey].filter(boss => {
                    if (boss.BossName == "gifter") {
                        if (!bossConfig_json_1.default.CustomBosses.santa.enabled ||
                            (!seasonalEvents.christmasEventEnabled() && !bossConfig_json_1.default.CustomBosses.santa.forceSpawnOutsideEvent)) {
                            return false;
                        }
                    }
                    const shouldSkip = boss.BossChance === 0 ||
                        !bossConfig_json_1.default.CustomBosses[ClassDef_1.reverseBossNames[boss.BossName]].enabled ||
                        (bossConfig_json_1.default.CustomBosses[ClassDef_1.reverseBossNames[boss.BossName]].enabled &&
                            bossConfig_json_1.default.CustomBosses[ClassDef_1.reverseBossNames[boss.BossName]][mapKey] === 0);
                    return !shouldSkip;
                });
                customConfigs[mapKey].push(...filteredBosses);
            });
        });
        // Shuffle each array within the configuration objects
        Object.values(bossConfigs).forEach(array => this.shuffleArray(array));
        Object.values(otherConfigs).forEach(array => this.shuffleArray(array));
        Object.values(customConfigs).forEach(array => this.shuffleArray(array));
        ClassDef.validMaps.forEach((globalmap) => {
            if (bossConfigs[ClassDef_1.reverseMapNames[globalmap]]) {
                bossConfigs[ClassDef_1.reverseMapNames[globalmap]].forEach(boss => {
                    SWAG.SpawnBosses(boss, globalmap);
                    SWAG.bossCount.count += 1;
                });
            }
            // reset boss count for the next map
            SWAG.bossCount.count = 0;
            if (otherConfigs[ClassDef_1.reverseMapNames[globalmap]]) {
                otherConfigs[ClassDef_1.reverseMapNames[globalmap]].forEach(spawn => {
                    SWAG.SpawnBots(spawn, globalmap);
                });
            }
            if (customConfigs[ClassDef_1.reverseMapNames[globalmap]]) {
                customConfigs[ClassDef_1.reverseMapNames[globalmap]].forEach(custom => {
                    SWAG.SpawnCustom(custom, globalmap);
                });
            }
            logger.warning(`SWAG: Configured boss spawns for map ${globalmap}`);
        });
    }
    static SpawnBosses(boss, globalmap) {
        if (bossConfig_json_1.default.TotalBossesPerMap[ClassDef_1.reverseMapNames[globalmap]] == 0) {
            config_json_1.default.DebugOutput &&
                logger.info("SWAG: TotalBosses set to 0 for this map, skipping boss spawn");
            return;
        }
        else if (bossConfig_json_1.default.TotalBossesPerMap[ClassDef_1.reverseMapNames[globalmap]] != -1 && (SWAG.bossCount.count >= bossConfig_json_1.default.TotalBossesPerMap[ClassDef_1.reverseMapNames[globalmap]])) {
            config_json_1.default.DebugOutput &&
                logger.info("SWAG: Skipping boss spawn as total boss count has been met already");
            return;
        }
        else {
            let wave = SWAG.ConfigureBossWave(boss, globalmap);
            locations[globalmap].base.BossLocationSpawn.push(wave);
        }
    }
    static SpawnBots(boss, globalmap) {
        let wave = SWAG.ConfigureBossWave(boss, globalmap);
        locations[globalmap].base.BossLocationSpawn.push(wave);
    }
    static SpawnCustom(boss, globalmap) {
        let wave = SWAG.ConfigureBossWave(boss, globalmap);
        locations[globalmap].base.BossLocationSpawn.push(wave);
    }
    static ConfigureBossWave(boss, globalmap) {
        let spawnChance = 0;
        let spawnZones = boss.BossZone || null;
        let bossName = ClassDef_1.roleCase[boss.BossName.toLowerCase()] || boss.BossName;
        const getRandomDifficulty = () => {
            const availableDifficulties = ["easy", "normal", "hard", "impossible"];
            const randomIndex = Math.floor(Math.random() * availableDifficulties.length);
            return availableDifficulties[randomIndex];
        };
        let difficultyKey = boss.BossDifficult || config_json_1.default.BossDifficulty.toLowerCase();
        let difficulty = difficultyKey === "asonline" ? getRandomDifficulty() : ClassDef_1.diffProper[difficultyKey];
        let escortDifficultyKey = boss.BossEscortDifficult || config_json_1.default.BossEscortDifficulty.toLowerCase();
        let escort_difficulty = escortDifficultyKey === "asonline" ? getRandomDifficulty() : ClassDef_1.diffProper[escortDifficultyKey];
        boss?.Supports?.forEach((escort) => {
            escort.BossEscortDifficult = [escort_difficulty];
            escort.BossEscortType = ClassDef_1.roleCase[escort.BossEscortType.toLowerCase()];
        });
        // exclusive to bosses only
        if (boss.BossName.startsWith("boss")) {
            spawnChance = this.adjustBossSpawnChance(boss, globalmap);
        }
        // something other than bosses
        else if (config_json_1.default.Spawns.useGlobalSpawnChance) {
            spawnChance = config_json_1.default.Spawns[ClassDef_1.reverseBossNames[boss.BossName]][ClassDef_1.reverseMapNames[globalmap]];
        }
        else {
            spawnChance = boss.BossChance || 0;
        }
        // zones
        if (spawnZones != null) {
            spawnZones = boss.BossZone || spawnZones;
            if (spawnZones.length > 1) {
                // let's just pick one zone, can't trust BSG to do this correctly
                let random_zone = SWAG.getRandIntInclusive(0, spawnZones.length - 1);
                spawnZones = spawnZones[random_zone];
            }
            // if it's not > 1 and not null, then we'll assume there's a single zone defined instead
            else {
                spawnZones = spawnZones[0];
            }
        }
        // Using the SPT class here
        const wave = {
            BossName: bossName,
            BossChance: spawnChance,
            BossZone: !!spawnZones
                ? spawnZones
                : SWAG.savedLocationData[globalmap].openZones &&
                    SWAG.savedLocationData[globalmap].openZones.length > 0
                    ? randomUtil.getStringArrayValue(SWAG.savedLocationData[globalmap].openZones)
                    : "",
            BossPlayer: false,
            BossDifficult: difficulty,
            BossEscortType: ClassDef_1.roleCase[boss.BossEscortType.toLowerCase()],
            BossEscortDifficult: escort_difficulty,
            BossEscortAmount: boss.BossEscortAmount || "0",
            Time: boss.Time || -1,
            Supports: boss.Supports || null,
            RandomTimeSpawn: boss.RandomTimeSpawn || false,
            TriggerId: boss.TriggerId || "",
            TriggerName: boss.TriggerName || ""
        };
        if (spawnChance != 0) {
            config_json_1.default.DebugOutput && logger.warning(`Configured Boss Wave: ${JSON.stringify(wave)}`);
        }
        return wave;
    }
    static adjustBossSpawnChance(boss, globalmap) {
        // I need to refactor this garbage
        if (boss.BossName === "bosspunisher") {
            if (bossConfig_json_1.default.CustomBosses.punisher.enabled) {
                if (bossConfig_json_1.default.CustomBosses.punisher.useProgressSpawnChance) {
                    const punisherBossProgressFilePath = path.resolve(__dirname, "../../PunisherBoss/src/progress.json");
                    try {
                        const progressData = JSON.parse(fs.readFileSync(punisherBossProgressFilePath, "utf8"));
                        return progressData?.actualPunisherChance ?? 1;
                    }
                    catch (error) {
                        logger.warning("SWAG: Unable to load Punisher Boss progress file, either you don't have the mod installed or you don't have a Punisher progress file yet.");
                    }
                }
                // if progress spawn chance is not enabled
                return bossConfig_json_1.default.Bosses["punisher"][ClassDef_1.reverseMapNames[globalmap]];
            }
            // if punisher is not enabled
            else {
                return 0;
            }
        }
        // all other bosses...
        else if (bossConfig_json_1.default.Bosses.useGlobalBossSpawnChance) {
            // edge case, only applies to Kaban
            if (boss.BossName == "bossboarsniper") {
                return boss.BossChance;
            }
            return bossConfig_json_1.default.Bosses[ClassDef_1.reverseBossNames[boss.BossName]][ClassDef_1.reverseMapNames[globalmap]];
        }
        // if global boss chance is not enabled
        else {
            return boss.BossChance;
        }
    }
    static getRandIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static disableSpawnSystems() {
        let map;
        for (map in locations) {
            if (map === "base" || map === "hideout") {
                continue;
            }
            locations[map].base.OfflineNewSpawn = false;
            locations[map].base.OfflineOldSpawn = true;
            locations[map].base.NewSpawn = false;
            locations[map].base.OldSpawn = true;
        }
    }
    static ClearDefaultSpawns() {
        let map;
        for (map in locations) {
            if (map === "base" || map === "hideout") {
                continue;
            }
            // Save a backup of the wave data and the BossLocationSpawn to use when restoring defaults on raid end. Store openzones in this data as well
            if (!SWAG.savedLocationData[map]) {
                const locationBase = locations[map].base;
                SWAG.savedLocationData[map] = {
                    waves: locationBase.waves,
                    BossLocationSpawn: locationBase.BossLocationSpawn,
                    openZones: this.GetOpenZones(map),
                };
            }
            // Reset Database, Cringe  -- i stole this code from LUA
            locations[map].base.waves = [...SWAG.savedLocationData[map].waves];
            locations[map].base.BossLocationSpawn = [
                ...SWAG.savedLocationData[map].BossLocationSpawn,
            ];
            //Clear bots spawn
            if (!config_json_1.default?.UseDefaultSpawns?.Waves) {
                locations[map].base.waves = [];
            }
            //Clear boss spawn
            const bossLocationSpawn = locations[map].base.BossLocationSpawn;
            if (!config_json_1.default?.UseDefaultSpawns?.Bosses &&
                !config_json_1.default?.UseDefaultSpawns?.TriggeredWaves) {
                locations[map].base.BossLocationSpawn = [];
            }
            else {
                // Remove Default Boss Spawns
                if (!config_json_1.default?.UseDefaultSpawns?.Bosses) {
                    for (let i = 0; i < bossLocationSpawn.length; i++) {
                        // Triggered wave check
                        if (bossLocationSpawn[i]?.TriggerName?.length === 0) {
                            locations[map].base.BossLocationSpawn.splice(i--, 1);
                        }
                    }
                }
                // Remove Default Triggered Waves
                if (!config_json_1.default?.UseDefaultSpawns?.TriggeredWaves) {
                    for (let i = 0; i < bossLocationSpawn.length; i++) {
                        // Triggered wave check
                        if (bossLocationSpawn[i]?.TriggerName?.length > 0) {
                            locations[map].base.BossLocationSpawn.splice(i--, 1);
                        }
                    }
                }
            }
        }
    }
}
module.exports = { mod: new SWAG() };
//# sourceMappingURL=SWAG.js.map