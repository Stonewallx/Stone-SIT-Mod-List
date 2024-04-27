"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiAmountProper = exports.validMaps = exports.pmcType = exports.diffProper = exports.reverseMapNames = exports.reverseBossNames = exports.roleCase = exports.Props = exports.Center = exports.ColliderParams = exports.Position = exports.SpawnPointParam = exports.MapWrapper = exports.GroupPattern = exports.Bot = void 0;
class Bot {
    BotType;
    MaxBotCount;
}
exports.Bot = Bot;
class GroupPattern {
    Name;
    Bots;
    Time_min;
    Time_max;
    BotZone;
    RandomTimeSpawn;
    OnlySpawnOnce;
}
exports.GroupPattern = GroupPattern;
class MapWrapper {
    MapName;
    MapGroups;
    MapBosses;
}
exports.MapWrapper = MapWrapper;
class SpawnPointParam {
    Id;
    Position;
    Rotation;
    Sides;
    Categories;
    Infiltration;
    DelayToCanSpawnSec;
    ColliderParams;
    BotZoneName;
}
exports.SpawnPointParam = SpawnPointParam;
class Position {
    x;
    y;
    z;
}
exports.Position = Position;
class ColliderParams {
    _parent;
    _props;
}
exports.ColliderParams = ColliderParams;
class Center {
    x;
    y;
    z;
}
exports.Center = Center;
class Props {
    Center;
    Radius;
}
exports.Props = Props;
exports.roleCase = {
    assault: "assault",
    exusec: "exUsec",
    marksman: "marksman",
    pmcbot: "pmcBot",
    sectantpriest: "sectantPriest",
    sectantwarrior: "sectantWarrior",
    assaultgroup: "assaultGroup",
    bossbully: "bossBully",
    bosstagilla: "bossTagilla",
    bossgluhar: "bossGluhar",
    bosskilla: "bossKilla",
    bosskojaniy: "bossKojaniy",
    bosssanitar: "bossSanitar",
    bossboar: "bossBoar",
    bossboarsniper: "bossBoarSniper",
    bosskolontay: "bossKolontay",
    bosspunisher: "bossPunisher",
    followerboar: "followerBoar",
    followerboarclose1: "followerBoarClose1",
    followerboarclose2: "followerBoarClose2",
    followerbully: "followerBully",
    followergluharassault: "followerGluharAssault",
    followergluharscout: "followerGluharScout",
    followergluharsecurity: "followerGluharSecurity",
    followergluharsnipe: "followerGluharSnipe",
    followerkojaniy: "followerKojaniy",
    followersanitar: "followerSanitar",
    followertagilla: "followerTagilla",
    followerkolontayassault: "followerKolontayAssault",
    followerkolontaysecurity: "followerKolontaySecurity",
    cursedassault: "cursedAssault",
    pmc: "pmc",
    usec: "usec",
    bear: "bear",
    sptbear: "sptBear",
    sptusec: "sptUsec",
    bosstest: "bossTest",
    followertest: "followerTest",
    gifter: "gifter",
    bossknight: "bossKnight",
    followerbigpipe: "followerBigPipe",
    followerbirdeye: "followerBirdEye",
    bosszryachiy: "bossZryachiy",
    followerzryachiy: "followerZryachiy",
    arenafighterevent: "arenaFighterEvent",
    crazyassaultevent: "crazyAssaultEvent"
};
exports.reverseBossNames = {
    bossboar: "kaban",
    bossbully: "reshala",
    bosstagilla: "tagilla",
    bossgluhar: "gluhar",
    bosskilla: "killa",
    bosskojaniy: "shturman",
    bosssanitar: "sanitar",
    bossknight: "goons",
    bosszryachiy: "zryachiy",
    bosskolontay: "kolontay",
    marksman: "scav_snipers",
    sectantpriest: "cultists",
    exusec: "rogues",
    pmcbot: "raiders",
    crazyassaultevent: "crazyscavs",
    arenafighterevent: "bloodhounds",
    bosspunisher: "punisher",
    gifter: "santa"
};
exports.reverseMapNames = {
    factory4_day: "factory",
    factory4_night: "factory_night",
    bigmap: "customs",
    woods: "woods",
    shoreline: "shoreline",
    lighthouse: "lighthouse",
    rezervbase: "reserve",
    interchange: "interchange",
    laboratory: "laboratory",
    tarkovstreets: "streets",
    sandbox: "groundzero"
};
exports.diffProper = {
    easy: "easy",
    asonline: "random",
    normal: "normal",
    hard: "hard",
    impossible: "impossible"
};
exports.pmcType = ["sptbear", "sptusec"];
exports.validMaps = [
    "bigmap",
    "factory4_day",
    "factory4_night",
    "interchange",
    "laboratory",
    "lighthouse",
    "rezervbase",
    "shoreline",
    "tarkovstreets",
    "woods",
    "sandbox"
];
exports.aiAmountProper = {
    low: 0.5,
    asonline: 1,
    medium: 1,
    high: 2,
    horde: 4,
};
//# sourceMappingURL=ClassDef.js.map