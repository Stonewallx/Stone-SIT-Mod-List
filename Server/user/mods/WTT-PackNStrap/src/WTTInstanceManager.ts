import * as path from "path";

import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ProfileController } from "@spt-aki/controllers/ProfileController";
import { ProfileCallbacks } from "@spt-aki/callbacks/ProfileCallbacks";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService";
import { TraderAssortService } from "@spt-aki/services/TraderAssortService";
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

export class WTTInstanceManager 
{
    //#region Accessible in or after preAkiLoad
    public modName: string;
    public debug: boolean;
    // Useful Paths
    public modPath: string = path.join(process.cwd(), "\\user\\mods\\WelcomeToTarkov\\");
    public dbPath: string = path.join(process.cwd(), "\\user\\mods\\WelcomeToTarkov\\db");
    public profilePath: string = path.join(process.cwd(), "\\user\\profiles");

    // Instances
    public container: DependencyContainer;
    public preAkiModLoader: PreAkiModLoader;
    public configServer: ConfigServer;
    public saveServer: SaveServer;
    public itemHelper: ItemHelper;
    public logger: ILogger;
    public staticRouter: StaticRouterModService;
    public dynamicRouter: DynamicRouterModService;
    public profileController: ProfileController;
    public profileCallbacks: ProfileCallbacks;
    //#endregion

    //#region Acceessible in or after postDBLoad
    public database: IDatabaseTables;
    public customItem: CustomItemService;
    public imageRouter: ImageRouter;
    public jsonUtil: JsonUtil;
    public profileHelper: ProfileHelper;
    public eventOutputHolder: EventOutputHolder;
    public ragfairPriceService: RagfairPriceService;
    public importerUtil: ImporterUtil;
    public traderAssortService: TraderAssortService;
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
        this.eventOutputHolder = container.resolve<EventOutputHolder>("EventOutputHolder");
        this.profileController = container.resolve<ProfileController>("ProfileController");
        this.profileCallbacks = container.resolve<ProfileCallbacks>("ProfileCallbacks");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.staticRouter = container.resolve<StaticRouterModService>("StaticRouterModService");
        this.dynamicRouter = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        this.traderAssortService = container.resolve<TraderAssortService>("TraderAssortService");

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
}