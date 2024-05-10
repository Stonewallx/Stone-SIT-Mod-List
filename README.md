# SIT Mod List

**Game Version:** 0.14.1.3.29351

**SIT Version:** 1.10.8882.41069

# **Important Links/Info:**

- Install Instructions / Documentation: [Link](https://docs.stayintarkov.com/)
- SIT Manager: [Link](https://github.com/stayintarkov/SIT.Manager.Avalonia/releases)
- SIT Discord: [Link](https://discord.gg/f4CN4n3nP2)

**Update and please run your SIT and make sure it works and you can connect to your server before installing mods.**

# Mod Information

There are 2 types of mods: Server and Client.

**Server Mods**

- Server mods go here: **`SIT/Server/user/mods`,** and consist of a folder with a package.json in it.
- **Only the server needs these installed.**
- **Only the server host needs to have the Server installed, everyone else can just join through the launcher.**
- Server mods gotten from SPT will mostly work out of the box on the server.

Client Mods

- Client Mods go here: **`SIT/Game/BepInEx/plugins`,** and have .dll files that will usually need to be ported to work with SIT due to the differences in code between them.
- To find ports for mods you can check at [Releases](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases), [SIT Compatible Mods Thread](https://discord.com/channels/1175114933713776690/1175168404878008320), and possibly [SIT Port Requests](https://discord.com/channels/1175114933713776690/1175169674057621575).
- These mods can have just a .dll for them or have a .dll and a folder with other files.
- **All clients should have the same mods installed in their `Game/BepInEx/plugins` folder.**
- **Download and open the .zip folders of the mod you want and extract/drag and drop the contents to your SIT folder.**

# Load Order

Load Order should be done to ensure mods are loading in the proper order. Mods load from top to bottom. You can edit the order easily using this: [Load Order Editor](https://hub.sp-tarkov.com/files/file/1923-load-order-editor-drag-drop/)
- Install this load order editor to your `SIT/Server` folder.

- Load Order should be done to ensure mods are loading in the proper order.
- Mods load from top to bottom. Meaning whatever loads after will overwrite anything that changes the same thing above.
- **SITCoop should always be #1 on the list.**

**Format:** - Load order file can be found at **Server/user/mods/order.json**.

`{
  "order": [
    "SITCoop",
    "SWAG",
    "Virtual's Custom Quest Loader",
    "IhanaMies-LootValueBackend",
    "MoreCheckmarksBackend",
    "Fontaine-FOV-Fix",
    "WTT-PackNStrap",
    "Skwizzy-NoDiscardLimit",
    "DanW-SPTQuestingBots",
    "zSolarint-SAIN-ServerMod"
  ]
}`

**This is my general opinion on making a load order:**
SIT -> SWAG / Spawn Mod -> VCQL ->UI / Display -> Traders -> Content Bundle Mods -> SVM -> Misc Mods -> LootingBots / QuestingBots -> Realism -> SAIN

 # Disclaimer:

- I do not take credit for any ports or mods, you can find the authors of both the original mods and ports in the links below. I simply have put mods in a list to easily install.
- A few mods have had changes done to improve general stability/performance, changes are listed below.

**Any and all issues should be taken up in their respective port threads or at in the Discord** [Support Channel](https://discord.com/channels/1175114933713776690/1175127842737094656).

**Please ensure your game runs fine before installing mods.**

# Client Mods - Ported.
**These are mods ported by community members to work with the latest SIT. Any issues you have can be mentioned at the respective port threads listed or in the Mods-Chat channel in discord if there is none.**


[**BigBrain**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1219-bigbrain/) by DrakiaXYZ. 
- Mod Version: **0.4.0**

[**Waypoints**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1119-waypoints-expanded-navmesh/) by DrakiaXYZ. 
- Mod Version: **1.4.3**

[**SAIN**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1062-sain-2-0-solarint-s-ai-modifications-full-ai-combat-system-replacement/) by Solarint & DrakiaXYZ.
- [Port Thread](https://discord.com/channels/1175114933713776690/1226055276629594122/1226055276629594122)
- Mod Version: **2.2.1**
- Requires: BigBrain, Waypoints. (Included in download)
- Changes Made: Disabled grenades for bots.

[**SWAG & Donuts**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/878-swag-donuts-dynamic-spawn-waves-and-custom-spawn-points/) by nooky & Props.
- [Port Thread](https://discord.com/channels/1175114933713776690/1226055276629594122/1226055276629594122)
- Mod Version: 3.3.5
- Requires: BigBrain, Waypoints. (Included in download)
- Changes Made:
    - Despawn turned off.
    - Bot Hard Cap on.
    - Scav Sniper Group fixed.

[**LootingBots**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1096-looting-bots/) by Skwizzy.
- [Port Thread](https://discord.com/channels/1175114933713776690/1238368277215051776/1238368277215051776)
- Mod Version: **1.3.2**
- Requires: BigBrain. (Included in download)

[**QuestingBots**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1534-questing-bots/) by DanW.
- [Port Thread](https://discord.com/channels/1175114933713776690/1229157836030869586)
- Mod Version: **0.5.0**
- Requires: BigBrain, Waypoints. (Included in download)
- Changes Made:
    - Spawning disabled for use with SWAG & Donuts.
    - AI Limiting is off. Turn on if you have too much FPS drop. (Will cause some quiter raids.)

[**MoreCheckmarks**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1159-morecheckmarks/) by VIPkiller17.
- [Port Thread](https://discord.com/channels/1175114933713776690/1227359245658488895/1227359245658488895)
- Mod Version: **1.5.13**

[**SkillsExtended**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1722-beta-skills-extended/#overview) by Dirtbikercj.
- [Port Thread](https://discord.com/channels/1175114933713776690/1229922127801749574/1229922127801749574)
- Mod Version: **0.5.3**

[**Rai’s Hidden Caches**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1770-rai-s-hidden-caches/) by RaiRaiTheRaichu.
- [Port Thread](https://discord.com/channels/1175114933713776690/1232433240888053810/1232433240888053810)
- Mod Version: **1.0**

[**CWX Debugging Tool**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1874-botmonitor-cwx-s-debugging-tool/#overview) by CWX, nooky.
- [Port Thread](https://discord.com/channels/1175114933713776690/1232426761824768181/1232426761824768181)
- Mod Version: **2.3.0**
- Known Issues: Will not work when playing with others.

[**Fontaine’s FOV Fix & Variable Optics**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/942-fontaine-s-fov-fix-variable-optics/) by Fontaine.
- [Port Thread](https://discord.com/channels/1175114933713776690/1229982011301826581/1229982011301826581)
- Mod Version: **1.11.0**

[**That’s Lit**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1453-that-s-lit/#overview) by 3371.
- [Port Thread](https://discord.com/channels/1175114933713776690/1228091760492675203/1228091760492675203)
- Mod Version: **1.380.10**

[**Accurate Circular Radar**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1522-accurate-circular-radar/) by Leonana69.
- [Port Thread](https://discord.com/channels/1175114933713776690/1228847129741754368/1231998007235313767)
- Mod Version: **1.1.3**
- Changes Made: HUD moved to top right of screen.

[**WTT - Pack & Strap**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1790-wtt-pack-n-strap/) by GrooveypenguinX.
- [Port Thread](https://discord.com/channels/1175114933713776690/1229669368346972221/1229669368346972221)
- Mod Version: **1.0.4**

[**Amands’ Graphics**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/813-amands-s-graphics/) by Amands2Mello.
- Mod Version: **1.5.3**

[**Amands’ Sense**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1361-amands-sense/) ny Amands2Mello.
- Mod Version: **1.1.0**

[**Prop’s In-Raid Modding**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/850-props-in-raid-modding-pirm/#overview) by Props.
- Mod Version: **1.8.0**

[**Use Items Anywhere**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1416-use-items-anywhere/) by Dirtbikercj.
- Mod Version: **1.1.0**

[**Stash Search**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1769-stash-search/) by Dirtbikercj.
- Mod Version: **1.1.1**

[**Inventory Organizing Features**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1152-inventory-organizing-features/) by Nightingale.
- [Port Thread](https://discord.com/channels/1175114933713776690/1233670245181558837/1233670245181558837)
- Mod Version: **1.1.0-spt371**

[**Fontaine’s Weapon Modding QoL**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1188-fontaine-s-weapon-modding-quality-of-life) by Fontaine.
- Mod Version: **1.3.0**

[**Boss Notifier**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1737-boss-notifier/) by Mattdokn.
- Mod Version: **1.4.1**

[**Bot Debug**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1242-botdebug/) by DrakiaXYZ.
- [Port Thread](https://discord.com/channels/1175114933713776690/1228055098995904584/1228055098995904584)
- Mod Version: **1.3.0**

[**Tyr-DeClutterer**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1785-de-clutterer-updated-by-cj/) by Tyrian & Dirtbikercj.
- [Port Thread](https://discord.com/channels/1175114933713776690/1234211678535549038/1234211678535549038)
- Mod Version: **1.2.2**

[**Always Level Endurance**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/937-fontaine-s-always-level-endurance-ale/) by Fontaine.
- [Port Thread](https://discord.com/channels/1175114933713776690/1234004472410144808/1234004472410144808)
- Mod Version: **1.4.0**

[**Healing AutoCancel**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1779-healing-autocancel/#overview) by IhanaMies.
- Mod Version: **1.0.0**

[**Inspectionless Malfunctions**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/661-fontaine-s-inspectionless-malfs/) by Fontaine.
- [Port Thread](https://discord.com/channels/1175114933713776690/1238238230063874138/1238238230063874138)
- Mod Version: **1.3.0**

[**LootValue**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1606-lootvalue/) by IhanaMies, CactusPie & Mattdokn.
- Mod Version: **1.2.2**

[**Open Sesame**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1660-open-sesame/#overview) by DanW.
- Mod Version: **2.3.0**

[**Quick Move To Container**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1859-quick-move-to-containers/) by DrakiaXYZ.
- Mod Version: **1.0.2**

[**Quick Weapon Rack Access**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1887-quick-weapon-rack-access/) by mpstark.
- [Port Thread](https://discord.com/channels/1175114933713776690/1234616969207087115/1234616969207087115)
- Mod Version: **1.0.3**
- Known Issues: Does not work with Stash Search.

[**Search Open Containers**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1265-search-open-containers/) by DrakiaXYZ.
- [Port Thread](https://discord.com/channels/1175114933713776690/1238379937472319519/1238379937472319519)
- Mod Version: **1.0.2**

[**Task List Fixes**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1114-task-list-fixes/) by DrakiaXYZ.
- [Port Thread](https://discord.com/channels/1175114933713776690/1238261218309963816/1238261218309963816)
- Mod Version: **1.4.0**

[**UI Fixes**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1860-ui-fixes/) by Tyfon.
- [Port Thread](https://discord.com/channels/1175114933713776690/1235474676495417344/1235474676495417344)
- Mod Version: **1.3.2**

[**Virtual's Custom Quest Loader**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/885-virtual-s-custom-quest-loader/) by Virtual.
- [Port Thread](https://discord.com/channels/1175114933713776690/1228890753086787607/1228890753086787607)
- Mod Version: **2.0.0**




# Client Mods - Not Ported / Works.
**These are mods not ported to work specifically with SIT, but are reported working with the current SIT. No support will be given for these.**

[**Fast-Forward Search**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1178-fast-forward-search-ffs/#overview) by CactusPie.
- Mod Version: **1.2.0**

[**Ram Cleaner Interval**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1827-ram-cleaner-fix/) by CactusPie & Devraccoon.
- Mod Version: **1.0.0**

[**Fontaine's Red Dot Tweaker**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1335-fontaine-s-red-dot-tweaker/) by Fontaine.
- Mod Version: **1.1.1**

[**Reflex Sights Rework**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1753-reflex-sights-rework-updated/#overview) by SamSWAT & stckytwl.
- Mod Version: **1.0.3**

[**Use Loose Loot**](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases) - [Original Mod](https://hub.sp-tarkov.com/files/file/1264-use-loose-loot/?highlight=use) by gaylatea & DrakiaXYZ.
- Mod Version: **1.1.2**






