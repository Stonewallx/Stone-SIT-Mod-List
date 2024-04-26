import { MinMax } from "@spt-aki/models/common/MinMax";
import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
import { LootRequest } from "@spt-aki/models/spt/services/LootRequest";
export interface ITraderConfig extends IBaseConfig {
    kind: "aki-trader";
    updateTime: UpdateTime[];
    purchasesAreFoundInRaid: boolean;
    updateTimeDefault: number;
    traderPriceMultipler: number;
    /** Keep track of purchased trader-limited items beyond server restarts to prevent server-restart item scumming */
    persistPurchaseDataInProfile: boolean;
    fence: FenceConfig;
}
export interface UpdateTime {
    traderId: string;
    seconds: number;
}
export interface FenceConfig {
    discountOptions: DiscountOptions;
    partialRefreshTimeSeconds: number;
    partialRefreshChangePercent: number;
    assortSize: number;
    maxPresetsPercent: number;
    itemPriceMult: number;
    presetPriceMult: number;
    armorMaxDurabilityPercentMinMax: MinMax;
    presetMaxDurabilityPercentMinMax: MinMax;
    /** Key: item tpl */
    itemStackSizeOverrideMinMax: Record<string, MinMax>;
    itemTypeLimits: Record<string, number>;
    regenerateAssortsOnRefresh: boolean;
    /** Max rouble price before item is not listed on flea */
    itemCategoryRoublePriceLimit: Record<string, number>;
    /** Each slotid with % to be removed prior to listing on fence */
    presetSlotsToRemoveChancePercent: Record<string, number>;
    /** Block seasonal items from appearing when season is inactive */
    blacklistSeasonalItems: boolean;
    blacklist: string[];
    coopExtractGift: CoopExtractReward;
}
export interface CoopExtractReward extends LootRequest {
    sendGift: boolean;
    messageLocaleIds: string[];
    giftExpiryHours: number;
}
export interface DiscountOptions {
    assortSize: number;
    itemPriceMult: number;
    presetPriceMult: number;
}
