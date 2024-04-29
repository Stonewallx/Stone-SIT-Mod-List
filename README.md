# SIT Mod List

**Game Version:** 0.14.1.3.29351

**SIT Version:** 1.10.8882.41069

# **Important Links/Info:**

- Install Instructions / Documentation: [Link](https://docs.stayintarkov.com/)
- SIT Manager: [Link](https://github.com/stayintarkov/SIT.Manager.Avalonia/releases)
- SIT Discord: [Link](https://discord.gg/f4CN4n3nP2)

**Download and open the .zip folders of the mod you want in [Releases](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases), and extract/drag and drop the contents to your SIT folder.**
---

# Update and please run your SIT and make sure it works and you can connect to your server before installing mods.

There are 2 types of mods: Server and Client.

**Server Mods**

- Server mods go here: **`SIT/Server/user/mods`,** and consist of a folder with a package.json in it.
- **Only the server needs these installed.**
- **Only the server host needs to have the Server installed, everyone else can just join through the launcher.**
- Server mods gotten from SPT will mostly work out of the box on the server.

Client Mods

- Client Mods go here: **`SIT/Game/BepInEx/plugins`,** and have .dll files that will usually need to be ported to work with SIT due to the differences in code between them.
- To find ports for mods you can check at my [SIT Mod Collection](https://github.com/Stonewallx/Stone-SIT-Mod-List/releases/tag/1.10.8882.41069), [SIT Compatible Mods Thread](https://discord.com/channels/1175114933713776690/1175168404878008320), and possibly [SIT Port Requests](https://discord.com/channels/1175114933713776690/1175169674057621575).
- These mods can have just a .dll for them or have a .dll and a folder with other files.
- **All clients should have the same mods installed in their `Game/BepInEx/plugins` folder.**

Load Order should be done to ensure mods are loading in the proper order. Mods load from top to bottom. You can edit the order easily using this: [Load Order Editor](https://hub.sp-tarkov.com/files/file/1082-loe-load-order-editor/)


Disclaimer:

- I do not take credit for any ports or mods, you can find the authors of both the original mods and ports in the links below. I simply have put mods in a list to easily install.
- A few mods have had changes done to improve general stability/performance, changes are listed below.

**Any and all issues should be taken up in their respective port threads or at in the Discord** [Support Channel](https://discord.com/channels/1175114933713776690/1175127842737094656).

# Please ensure your game runs fine before installing mods.
---

# BigBrain

- [Original Mod](https://hub.sp-tarkov.com/files/file/1219-bigbrain/) - DrakiaXYZ
- [Ported Mod](https://discord.com/channels/1175114933713776690/1226055276629594122/1226055276629594122) - Estrogenesis
- Mod Version: **0.4.0**

---

# Waypoints

- [Original Mod](https://hub.sp-tarkov.com/files/file/1119-waypoints-expanded-navmesh/) - DrakiaXYZ
- [Ported Mod](https://discord.com/channels/1175114933713776690/1226055276629594122/1226055276629594122) - LegolasCage
- Mod Version: **1.4.3**

---

# SAIN

- [Original Mod](https://hub.sp-tarkov.com/files/file/1062-sain-2-0-solarint-s-ai-modifications-full-ai-combat-system-replacement/) - Solarint & DrakiaXYZ
- [Ported Mod](https://discord.com/channels/1175114933713776690/1226055276629594122/1226055276629594122) - Estrogenesis
- Mod Version: **2.2.2**
- Requires: BigBrain, Waypoints.
- Changes Made: Disabled grenades for bots.

---

# SWAG & Donuts

- [Original Mod](https://hub.sp-tarkov.com/files/file/878-swag-donuts-dynamic-spawn-waves-and-custom-spawn-points/) - nooky & Props
- [Ported Mod](https://discord.com/channels/1175114933713776690/1226055276629594122/1226055276629594122) - Estrogenesis
- Mod Version: 3.3.5
- Requires: BigBrain, Waypoints.
- Changes Made:
    - Despawn turned off.
    - Bot Hard Cap on.
    - Scav Sniper Group fixed.

---

# Looting Bots

- [Original Mod](https://hub.sp-tarkov.com/files/file/1096-looting-bots/) - Skwizzy
- [Ported Mod](https://github.com/stayintarkov/SIT-Mod-Ports) - Unknown to me.
- Mod Version: **1.3.0**
- Requires: BigBrain.

---

# Questing Bots

- [Original Mod](https://hub.sp-tarkov.com/files/file/1534-questing-bots/) - DanW
- [Ported Mod](https://discord.com/channels/1175114933713776690/1229157836030869586) - kap
- Mod Version: **0.5.0**
- Requires: BigBrain, Waypoints.
- Changes Made:
    - Spawning disabled for use with SWAG.
    - AI Limiting enabled for performance at 200m away; makes AI use less CPU outside of range.

---

# More Checkmarks

- [Original Mod](https://hub.sp-tarkov.com/files/file/1159-morecheckmarks/) - VIPkiller17
- [Ported Mod](https://discord.com/channels/1175114933713776690/1227359245658488895/1233300154048712795) - Seaturtleman, kap
- Mod Version: **1.5.13**

---

# Skills Extended

- [Original Mod](https://hub.sp-tarkov.com/files/file/1722-beta-skills-extended/#overview) - Dirtbikercj
- [Ported Mod](https://discord.com/channels/1175114933713776690/1229922127801749574/1229922127801749574) - Chewie
- Mod Version: **0.5.3**

---

# Rai’s Hidden Caches

- [Original Mod](https://hub.sp-tarkov.com/files/file/1770-rai-s-hidden-caches/) - RaiRaiTheRaichu
- [Ported Mod](https://discord.com/channels/1175114933713776690/1232433240888053810/1232433240888053810) - Ru Kira
- Mod Version: **1.0**

---

# CWX Debugging Tool

- [Original Mod](https://hub.sp-tarkov.com/files/file/1874-botmonitor-cwx-s-debugging-tool/#overview) - CWX, nooky
- [Ported Mod](https://discord.com/channels/1175114933713776690/1232426761824768181/1232426761824768181) - kap
- Mod Version: **2.3.0**

---

# Fontaine’s FOV Fix & Variable Optics

- [Original Mod](https://hub.sp-tarkov.com/files/file/942-fontaine-s-fov-fix-variable-optics/) - Fontaine
- [Ported Mod](https://discord.com/channels/1175114933713776690/1229982011301826581/1229982011301826581) - Chewie
- Mod Version: **1.11.0**
- Known Issues: Cycling alternate reticles is very delayed.

---

# That’s Lit

- [Original Mod](https://hub.sp-tarkov.com/files/file/1453-that-s-lit/#overview) - 3371
- [Ported Mod](https://discord.com/channels/1175114933713776690/1228091760492675203/1228091760492675203) - Estrogenesis
- Mod Version: **1.380.10**

---

# Accurate Circular Radar

- [Original Mod](https://hub.sp-tarkov.com/files/file/1522-accurate-circular-radar/) - Leonana69
- [Ported Mod](https://discord.com/channels/1175114933713776690/1228847129741754368/1231998007235313767) - pein
- Mod Version: **1.1.3**
- Changes Made: HUD moved to top right of screen.

---

# WTT - Pack & Strap

- [Original Mod](https://hub.sp-tarkov.com/files/file/1790-wtt-pack-n-strap/) - GrooveypenguinX
- [Ported Mod](https://discord.com/channels/1175114933713776690/1229669368346972221/1229669368346972221) - Chewie
- Mod Version: **1.0.3**

---

# Time & Weather Changer

- [Original Mod](https://hub.sp-tarkov.com/files/file/487-time-weather-changer/) - SamSWAT
- Mod Version: **2.3.1**

---

# Amands’ Graphics

- [Original Mod](https://hub.sp-tarkov.com/files/file/813-amands-s-graphics/) - Amands2Mello
- [Ported Mod](https://github.com/stayintarkov/SIT-Mod-Ports) - Unknown to me.
- Mod Version: **1.5.3**

---

# Amands’ Sense

- [Original Mod](https://hub.sp-tarkov.com/files/file/1361-amands-sense/) - Amands2Mello
- [Ported Mod](https://github.com/stayintarkov/SIT-Mod-Ports) - Unknown to me.
- Mod Version: **1.1.0**

---

# Prop’s In-Raid Modding

- Original Mod - Props
- [Ported Mod](https://discord.com/channels/1175114933713776690/1226180239076360212) - uprior
- Mod Version: **1.8.0**

---

# Use Items Anywhere

- [Original Mod](https://hub.sp-tarkov.com/files/file/1416-use-items-anywhere/) - Dirtbikercj
- [Ported Mod](https://discord.com/channels/1175114933713776690/1226180239076360212) - uprior
- Mod Version: **1.1.0**

---

# Stash Search

- [Original Mod](https://hub.sp-tarkov.com/files/file/1769-stash-search/) - Dirtbikercj
- [Ported Mod](https://discord.com/channels/1175114933713776690/1227986279396806676/1227986279396806676) - LegolasCage
- Mod Version: **1.0.5**

---

# Inventory Organizing Features

- [Original Mod](https://hub.sp-tarkov.com/files/file/1152-inventory-organizing-features/) - Nightingale
- Mod Version: **1.1.0-spt371**

---

# Fontaine’s Weapon Modding QoL

- [Original Mod](https://hub.sp-tarkov.com/files/file/1188-fontaine-s-weapon-modding-quality-of-life) -  Fontaine
- Mod Version: **1.3.0**

---

# Kaeno-Trader Scrolling

- [Original Mod](https://hub.sp-tarkov.com/files/file/1508-kaeno-traderscrolling/) - CWX
- Mod Version: **1.0.2**
