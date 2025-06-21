import { PrismaClient } from "@prisma/client";
import { createConsoles } from "./consoleSeed";

const db = new PrismaClient();

export async function createConsoleVariants() {
  // Obter todos os consoles
  const consoles = await createConsoles();

  // Função auxiliar para criar variações
  const createVariant = async (
    consoleId: number,
    slug: string,
    namePt: string,
    nameEn: string,
    launchDate: Date,
    storage: string,
    imageUrl: string,
  ) => {
    return db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId, slug } },
      update: {},
      create: {
        consoleId,
        slug,
        launchDate,
        storage,
        imageUrl,
        translations: {
          create: [
            { locale: "pt", name: namePt },
            { locale: "en", name: nameEn },
          ],
        },
      },
    });
  };

  // Sony PlayStation
  const ps1Fat = await createVariant(
    consoles.ps1.id,
    "ps1-fat",
    "Modelo Original",
    "Original Model",
    new Date("1994-12-03"),
    "1 MB",
    "images/consoles/sony/ps1-fat.webp",
  );

  const ps1Slim = await createVariant(
    consoles.ps1.id,
    "ps1-slim",
    "PS One",
    "PS One",
    new Date("2000-07-07"),
    "1 MB",
    "images/consoles/sony/ps1-slim.webp",
  );

  const ps2Fat = await createVariant(
    consoles.ps2.id,
    "ps2-fat",
    "Modelo Original",
    "Original Model",
    new Date("2000-03-04"),
    "40 GB",
    "images/consoles/sony/ps2-fat.webp",
  );

  const ps2Slim = await createVariant(
    consoles.ps2.id,
    "ps2-slim",
    "Slim",
    "Slim",
    new Date("2004-11-01"),
    "40 GB",
    "images/consoles/sony/ps2-slim.webp",
  );

  const ps3Fat = await createVariant(
    consoles.ps3.id,
    "ps3-fat",
    "Fat",
    "Fat",
    new Date("2006-11-11"),
    "20/60/80 GB",
    "images/consoles/sony/ps3-fat.webp",
  );

  const ps3Slim = await createVariant(
    consoles.ps3.id,
    "ps3-slim",
    "Slim",
    "Slim",
    new Date("2009-09-01"),
    "120/250/500 GB",
    "images/consoles/sony/ps3-slim.webp",
  );

  const ps3SuperSlim = await createVariant(
    consoles.ps3.id,
    "ps3-super-slim",
    "Super Slim",
    "Super Slim",
    new Date("2012-09-01"),
    "250/500 GB",
    "images/consoles/sony/ps3-super-slim.webp",
  );

  const ps4Fat = await createVariant(
    consoles.ps4.id,
    "ps4-fat",
    "Original",
    "Original",
    new Date("2013-11-15"),
    "500 GB",
    "images/consoles/sony/ps4-fat.webp",
  );

  const ps4Slim = await createVariant(
    consoles.ps4.id,
    "ps4-slim",
    "Slim",
    "Slim",
    new Date("2016-09-15"),
    "500 GB / 1 TB",
    "images/consoles/sony/ps4-slim.webp",
  );

  const ps4Pro = await createVariant(
    consoles.ps4.id,
    "ps4-pro",
    "Pro",
    "Pro",
    new Date("2016-11-10"),
    "1 TB",
    "images/consoles/sony/ps4-pro.webp",
  );

  const ps5Standard = await createVariant(
    consoles.ps5.id,
    "ps5-standard",
    "Com Leitor de Discos",
    "Standard Edition",
    new Date("2020-11-12"),
    "825 GB",
    "images/consoles/sony/ps5-standard.webp",
  );

  const ps5Digital = await createVariant(
    consoles.ps5.id,
    "ps5-digital",
    "Digital Edition",
    "Digital Edition",
    new Date("2020-11-12"),
    "825 GB",
    "images/consoles/sony/ps5-digital.webp",
  );

  const ps5Slim = await createVariant(
    consoles.ps5.id,
    "ps5-slim",
    "Slim",
    "Slim",
    new Date("2023-11-10"),
    "1 TB",
    "images/consoles/sony/ps5-slim.webp",
  );

  const ps5Pro = await createVariant(
    consoles.ps5.id,
    "ps5-pro",
    "Pro",
    "Pro",
    new Date("2024-11-10"), // Data estimada
    "1 TB",
    "images/consoles/sony/ps5-pro.webp",
  );

  // Microsoft Xbox
  const xboxFat = await createVariant(
    consoles.xbox.id,
    "xbox-fat",
    "Original",
    "Original",
    new Date("2001-11-15"),
    "8/10 GB",
    "images/consoles/microsoft/xbox-fat.webp",
  );

  const xbox360Fat = await createVariant(
    consoles.xbox360.id,
    "xbox360-fat",
    "Original",
    "Original",
    new Date("2005-11-22"),
    "20/60/120 GB",
    "images/consoles/microsoft/xbox360-fat.webp",
  );

  const xbox360Slim = await createVariant(
    consoles.xbox360.id,
    "xbox360-slim",
    "Slim",
    "Slim",
    new Date("2010-06-14"),
    "250 GB",
    "images/consoles/microsoft/xbox360-slim.webp",
  );

  const xbox360E = await createVariant(
    consoles.xbox360.id,
    "xbox360-e",
    "Modelo E",
    "E Model",
    new Date("2013-06-10"),
    "250 GB",
    "images/consoles/microsoft/xbox360-e.webp",
  );

  const xboxOneFat = await createVariant(
    consoles.xboxOne.id,
    "xboxone-fat",
    "Original",
    "Original",
    new Date("2013-11-22"),
    "500 GB",
    "images/consoles/microsoft/xbox-one-fat.webp",
  );

  const xboxOneS = await createVariant(
    consoles.xboxOne.id,
    "xboxone-s",
    "One S",
    "One S",
    new Date("2016-08-02"),
    "500 GB / 1 TB / 2 TB",
    "images/consoles/microsoft/xbox-one-s.webp",
  );

  const xboxOneX = await createVariant(
    consoles.xboxOne.id,
    "xboxone-x",
    "One X",
    "One X",
    new Date("2017-11-07"),
    "1 TB",
    "images/consoles/microsoft/xbox-one-x.webp",
  );

  const xboxSeriesX = await createVariant(
    consoles.xboxSeriesX.id,
    "xboxseriesx-standard",
    "Série X",
    "Series X",
    new Date("2020-11-10"),
    "1 TB",
    "images/consoles/microsoft/xbox-series-x.webp",
  );

  const xboxSeriesS = await createVariant(
    consoles.xboxSeriesS.id,
    "xboxseriess-standard",
    "Série S",
    "Series S",
    new Date("2020-11-10"),
    "512 GB",
    "images/consoles/microsoft/xbox-series-s.webp",
  );

  // Nintendo
  const nesFrontLoader = await createVariant(
    consoles.nes.id,
    "nes-front-loader",
    "Front Loader",
    "Front Loader",
    new Date("1985-07-15"),
    "Cartucho",
    "images/consoles/nintendo/nes-front.webp",
  );

  const nesTopLoader = await createVariant(
    consoles.nes.id,
    "nes-top-loader",
    "Top Loader",
    "Top Loader",
    new Date("1993-06-01"),
    "Cartucho",
    "images/consoles/nintendo/nes-top.webp",
  );

  const gameBoyOriginal = await createVariant(
    consoles.gameBoy.id,
    "gameboy-original",
    "Original",
    "Original",
    new Date("1989-04-21"),
    "Cartucho",
    "images/consoles/nintendo/gb-original.webp",
  );

  const gameBoyPocket = await createVariant(
    consoles.gameBoy.id,
    "gameboy-pocket",
    "Pocket",
    "Pocket",
    new Date("1996-07-21"),
    "Cartucho",
    "images/consoles/nintendo/gb-pocket.webp",
  );

  const gameBoyColor = await createVariant(
    consoles.gameBoy.id,
    "gameboy-color",
    "Color",
    "Color",
    new Date("1998-10-21"),
    "Cartucho",
    "images/consoles/nintendo/gbc.webp",
  );

  const snesOriginal = await createVariant(
    consoles.snes.id,
    "snes-original",
    "Modelo Original",
    "Original Model",
    new Date("1990-08-23"),
    "Cartucho",
    "images/consoles/nintendo/snes-original.webp",
  );

  const snesJunior = await createVariant(
    consoles.snes.id,
    "snes-junior",
    "Snes Jr",
    "Snes Jr",
    new Date("1997-10-01"),
    "Cartucho",
    "images/consoles/nintendo/snes-jr.webp",
  );

  const n64Standard = await createVariant(
    consoles.n64.id,
    "n64-standard",
    "Modelo Padrão",
    "Standard Model",
    new Date("1996-09-29"),
    "Cartucho",
    "images/consoles/nintendo/n64.webp",
  );

  const gameCubeStandard = await createVariant(
    consoles.gameCube.id,
    "gamecube-standard",
    "Modelo Padrão",
    "Standard Model",
    new Date("2001-09-14"),
    "Proprietary Disc",
    "images/consoles/nintendo/gamecube.webp",
  );

  const dsOriginal = await createVariant(
    consoles.ds.id,
    "ds-original",
    "DS Original",
    "DS Original",
    new Date("2004-11-21"),
    "Cartucho",
    "images/consoles/nintendo/ds.webp",
  );

  const dsLite = await createVariant(
    consoles.ds.id,
    "ds-lite",
    "DS Lite",
    "DS Lite",
    new Date("2006-03-02"),
    "Cartucho",
    "images/consoles/nintendo/ds-lite.webp",
  );

  const wiiOriginal = await createVariant(
    consoles.wii.id,
    "wii-original",
    "Original",
    "Original",
    new Date("2006-11-19"),
    "512 MB",
    "images/consoles/nintendo/wii.webp",
  );

  const wiiMini = await createVariant(
    consoles.wii.id,
    "wii-mini",
    "Mini",
    "Mini",
    new Date("2012-11-18"),
    "512 MB",
    "images/consoles/nintendo/wii-mini.webp",
  );

  const threeDSOriginal = await createVariant(
    consoles.threeDS.id,
    "3ds-original",
    "3DS Original",
    "3DS Original",
    new Date("2011-02-26"),
    "2 GB",
    "images/consoles/nintendo/3ds.webp",
  );

  const threeDSXL = await createVariant(
    consoles.threeDS.id,
    "3ds-xl",
    "3DS XL",
    "3DS XL",
    new Date("2012-07-28"),
    "4 GB",
    "images/consoles/nintendo/3ds-xl.webp",
  );

  const wiiUBasic = await createVariant(
    consoles.wiiU.id,
    "wiiu-basic",
    "Basic",
    "Basic",
    new Date("2012-11-18"),
    "8 GB",
    "images/consoles/nintendo/wiiu-basic.webp",
  );

  const wiiUDeluxe = await createVariant(
    consoles.wiiU.id,
    "wiiu-deluxe",
    "Deluxe",
    "Deluxe",
    new Date("2012-11-18"),
    "32 GB",
    "images/consoles/nintendo/wiiu-deluxe.webp",
  );

  const switchStandard = await createVariant(
    consoles.switchConsole.id,
    "switch-standard",
    "Standard",
    "Standard",
    new Date("2017-03-03"),
    "32 GB",
    "images/consoles/nintendo/switch.webp",
  );

  const switchOLED = await createVariant(
    consoles.switchConsole.id,
    "switch-oled",
    "OLED",
    "OLED",
    new Date("2021-10-08"),
    "64 GB",
    "images/consoles/nintendo/switch-oled.webp",
  );

  const switchLite = await createVariant(
    consoles.switchConsole.id,
    "switch-lite",
    "Lite",
    "Lite",
    new Date("2019-09-20"),
    "32 GB",
    "images/consoles/nintendo/switch-lite.webp",
  );

  // Sega
  const masterSystemOriginal = await createVariant(
    consoles.masterSystem.id,
    "mastersystem-original",
    "Modelo 1",
    "Model 1",
    new Date("1985-10-20"),
    "Cartucho",
    "images/consoles/sega/master-system.webp",
  );

  const masterSystemII = await createVariant(
    consoles.masterSystem.id,
    "mastersystem-ii",
    "Master System II",
    "Master System II",
    new Date("1990-01-01"),
    "Cartucho",
    "images/consoles/sega/master-system-ii.webp",
  );

  const megaDriveModel1 = await createVariant(
    consoles.megaDrive.id,
    "megadrive-model1",
    "Modelo 1",
    "Model 1",
    new Date("1988-10-29"),
    "Cartucho",
    "images/consoles/sega/megadrive-model1.webp",
  );

  const megaDriveModel2 = await createVariant(
    consoles.megaDrive.id,
    "megadrive-model2",
    "Modelo 2",
    "Model 2",
    new Date("1993-01-01"),
    "Cartucho",
    "images/consoles/sega/megadrive-model2.webp",
  );

  const saturnModel1 = await createVariant(
    consoles.saturn.id,
    "saturn-model1",
    "Modelo 1",
    "Model 1",
    new Date("1994-11-22"),
    "CD",
    "images/consoles/sega/saturn-model1.webp",
  );

  const saturnModel2 = await createVariant(
    consoles.saturn.id,
    "saturn-model2",
    "Modelo 2",
    "Model 2",
    new Date("1996-01-01"),
    "CD",
    "images/consoles/sega/saturn-model2.webp",
  );

  const dreamcastStandard = await createVariant(
    consoles.dreamcast.id,
    "dreamcast-standard",
    "Modelo Padrão",
    "Standard Model",
    new Date("1999-11-27"),
    "GD-ROM",
    "images/consoles/sega/dreamcast.webp",
  );

  // Atari
  const atari2600Heavy = await createVariant(
    consoles.atari2600.id,
    "atari2600-heavy-sixer",
    "Heavy Sixer",
    "Heavy Sixer",
    new Date("1977-09-11"),
    "Cartucho",
    "images/consoles/atari/2600-heavy.webp",
  );

  const atari2600Light = await createVariant(
    consoles.atari2600.id,
    "atari2600-light-sixer",
    "Light Sixer",
    "Light Sixer",
    new Date("1978-01-01"),
    "Cartucho",
    "images/consoles/atari/2600-light.webp",
  );

  const atari26004Switch = await createVariant(
    consoles.atari2600.id,
    "atari2600-4-switch",
    "4 Switch",
    "4 Switch",
    new Date("1980-01-01"),
    "Cartucho",
    "images/consoles/atari/2600-4switch.webp",
  );

  const atari2600Junior = await createVariant(
    consoles.atari2600.id,
    "atari2600-junior",
    "Junior",
    "Junior",
    new Date("1986-01-01"),
    "Cartucho",
    "images/consoles/atari/2600-junior.webp",
  );

  const atari7800Standard = await createVariant(
    consoles.atari7800.id,
    "atari7800-standard",
    "Modelo Padrão",
    "Standard Model",
    new Date("1986-05-01"),
    "Cartucho",
    "images/consoles/atari/7800.webp",
  );

  const atari5200Standard = await createVariant(
    consoles.atari5200.id,
    "atari5200-standard",
    "Modelo Padrão",
    "Standard Model",
    new Date("1982-11-01"),
    "Cartucho",
    "images/consoles/atari/5200.webp",
  );

  return {
    // Sony
    ps1Fat,
    ps1Slim,
    ps2Fat,
    ps2Slim,
    ps3Fat,
    ps3Slim,
    ps3SuperSlim,
    ps4Fat,
    ps4Slim,
    ps4Pro,
    ps5Standard,
    ps5Digital,
    ps5Slim,
    ps5Pro,
    // Microsoft
    xboxFat,
    xbox360Fat,
    xbox360Slim,
    xbox360E,
    xboxOneFat,
    xboxOneS,
    xboxOneX,
    xboxSeriesX,
    xboxSeriesS,
    // Nintendo
    nesFrontLoader,
    nesTopLoader,
    gameBoyOriginal,
    gameBoyPocket,
    gameBoyColor,
    snesOriginal,
    snesJunior,
    n64Standard,
    gameCubeStandard,
    dsOriginal,
    dsLite,
    wiiOriginal,
    wiiMini,
    threeDSOriginal,
    threeDSXL,
    wiiUBasic,
    wiiUDeluxe,
    switchStandard,
    switchOLED,
    switchLite,
    // Sega
    masterSystemOriginal,
    masterSystemII,
    megaDriveModel1,
    megaDriveModel2,
    saturnModel1,
    saturnModel2,
    dreamcastStandard,
    // Atari
    atari2600Heavy,
    atari2600Light,
    atari26004Switch,
    atari2600Junior,
    atari7800Standard,
    atari5200Standard,
  };
}
