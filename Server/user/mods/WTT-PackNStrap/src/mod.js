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
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const config = __importStar(require("../config/config.json"));
// WTT imports
const WTTInstanceManager_1 = require("./WTTInstanceManager");
// Boss imports
const PackNStrapItemService_1 = require("./PackNStrapItemService");
class PackNStrap {
    Instance = new WTTInstanceManager_1.WTTInstanceManager();
    version;
    modName = "WTT-Pack 'n' Strap";
    //#region CustomBosses
    PackNStrapItemService = new PackNStrapItemService_1.PackNStrapItemService();
    debug = false;
    preAkiLoad(container) {
        this.Instance.preAkiLoad(container, this.modName);
        this.Instance.debug = this.debug;
        // Custom Bosses
        this.PackNStrapItemService.preAkiLoad(this.Instance);
    }
    postDBLoad(container) {
        this.Instance.postDBLoad(container);
        this.PackNStrapItemService.postDBLoad();
        this.Instance.logger.log(`[${this.modName}] Database: Loading complete.`, LogTextColor_1.LogTextColor.GREEN);
        if (config.loseArmbandOnDeath) {
            const dblostondeathConfig = this.Instance.configServer.getConfig(ConfigTypes_1.ConfigTypes.LOST_ON_DEATH);
            dblostondeathConfig.equipment.ArmBand = true;
        }
    }
}
module.exports = { mod: new PackNStrap() };
//# sourceMappingURL=mod.js.map