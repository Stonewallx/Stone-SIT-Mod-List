import { IHideoutProduction } from "@spt-aki/models/eft/hideout/IHideoutProduction";

/* eslint-disable @typescript-eslint/naming-convention */
export interface ISkillData
{
    MedicalSkills: IMedicalSkillData;
    USECRifleSkill: IWeaponSkillData;
    BEARRifleskill: IWeaponSkillData;
    LockPickingSkill: ILockPickingData;
    UsecTacticsSkill: IUsecTacticsData;
    BearRawPowerSkill: IBearRawPowerData;
}

export interface IMedicalSkillData
{
    MEDKIT_HP_BONUS: number;
    MEDKIT_HP_BONUS_ELITE: number;
    MEDICAL_SPEED_BONUS: number;
    MEDICAL_SPEED_BONUS_ELITE: number;
    FM_ITEM_LIST: string[];
    FA_ITEM_LIST: string[];
}

export interface IWeaponSkillData
{
    WEAPON_PROF_XP: number;
    ERGO_MOD: number;
    ERGO_MOD_ELITE: number;
    RECOIL_REDUCTION: number;
    RECOIL_REDUCTION_ELITE: number;
    WEAPONS: string[];
}

export interface ILockPickingData
{
    ENABLED: boolean;
    INSPECT_BASE_TIME: number;
    INSPECT_CHANCE_BONUS: number;
    BASE_PICK_TIME: number;
    TIME_REDUCTION_BONUS_PER_LEVEL: number;
    TIME_REDUCTION_BONUS_PER_LEVEL_ELITE: number;
    PICK_BASE_SUCCESS_CHANCE: number;
    PICK_BASE_DIFFICULTY_MOD: number;
    INSPECT_LOCK_XP_RATIO: number;
    XP_TABLE: Record<string, number>;
    DOOR_PICK_LEVELS: IDoorPickLevels;
    CRAFTING_RECIPES: IHideoutProduction[]
}

export interface IDoorPickLevels
{
    Factory: Record<string, number>;
    Woods: Record<string, number>;
    Customs: Record<string, number>;
    Interchange: Record<string, number>;
    Reserve: Record<string, number>;
    Shoreline: Record<string, number>;
    Labs: Record<string, number>;
    Lighthouse: Record<string, number>;
    Streets: Record<string, number>;
    GroundZero: Record<string, number>;
}

export interface IUsecTacticsData
{
    USEC_INERTIA_RED_BONUS: number;
    USEC_INERTIA_RED_BONUS_ELITE: number;
}

export interface IBearRawPowerData
{
    BEAR_POWER_HP_BONUS: number;
    BEAR_POWER_HP_BONUS_ELITE: number;
    BEAR_POWER_UPDATE_TIME: number;
}