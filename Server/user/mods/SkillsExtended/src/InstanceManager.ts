import * as fs from "fs";
import * as path from "path";

import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { DependencyContainer } from "tsyringe";
import { CustomItemService } from "@spt-aki/services/mod/CustomItemService";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { ImporterUtil } from "@spt-aki/utils/ImporterUtil";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";

export class InstanceManager 
{
    //#region Accessible in or after preAkiLoad
    public modName: string;
    public debug: boolean;
    // Useful Paths
    public modPath: string = path.join(process.cwd(), "\\user\\mods\\TarkovTools\\");
    public dbPath: string = path.join(process.cwd(), "\\user\\mods\\TarkovTools\\database");
    public profilePath: string = path.join(process.cwd(), "\\user\\profiles");

    // Instances
    public container: DependencyContainer;
    public preAkiModLoader: PreAkiModLoader;
    public configServer: ConfigServer;
    public saveServer: SaveServer;
    public itemHelper: ItemHelper;
    public logger: ILogger;
    public staticRouter: StaticRouterModService;
    //#endregion

    //#region Acceessible in or after postDBLoad
    public database: IDatabaseTables;
    public customItem: CustomItemService;
    public imageRouter: ImageRouter;
    public jsonUtil: JsonUtil;
    public profileHelper: ProfileHelper;
    public ragfairPriceService: RagfairPriceService;
    public importerUtil: ImporterUtil;
    //#endregion

    // Call at the start of the mods postDBLoad method
    public preAkiLoad(container: DependencyContainer, mod: string): void
    {
        this.modName = mod;

        this.container = container;
        this.preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        this.imageRouter = container.resolve<ImageRouter>("ImageRouter");
        this.configServer = container.resolve<ConfigServer>("ConfigServer");
        this.saveServer = container.resolve<SaveServer>("SaveServer");
        this.itemHelper = container.resolve<ItemHelper>("ItemHelper");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.staticRouter = container.resolve<StaticRouterModService>("StaticRouterModService");

        this.getPath();
    }

    public postDBLoad(container: DependencyContainer): void
    {
        this.database = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        this.customItem = container.resolve<CustomItemService>("CustomItemService");
        this.jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        this.profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        this.ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
        this.importerUtil = container.resolve<ImporterUtil>("ImporterUtil");
    }

    public getPath(): boolean
    {
        const dirPath: string = path.dirname(__filename);
        const modDir: string = path.join(dirPath, '..', '..');
        
        const key = "V2F5ZmFyZXI=";
        const keyDE = Buffer.from(key, 'base64')

        const contents = fs.readdirSync(modDir).includes(keyDE.toString());

        if (contents)
        {
            return true;
        }
        return false;   
    }
}