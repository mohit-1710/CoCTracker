import { Card, Progress, Text, Spacer } from "@nextui-org/react";

const superTroopsList = [
  "Super Barbarian",
  "Super Archer",
  "Sneaky Goblin",
  "Super Wall Breaker",
  "Super Giant",
  "Rocket Balloon",
  "Super Wizard",
  "Super Dragon",
  "Inferno Dragon",
  "Super Minion",
  "Super Valkyrie",
  "Super Witch",
  "Ice Hound",
  "Super Bowler",
  "Super Miner",
  "Super Hog Rider",
  // Add other super troops as needed
];

const ProfileProgress = ({ data, position , hide }) => {
  const textSize = position === "player" && 15 || position === "clan" && 11;
  const textSizeOfPercentage = position === "player" && 13 || position === "clan" && 10;
  const maxWidthText = position === "player" && 90 || position === "clan" && 60;
  const paddingWise = position === "player" && 4 || position === "clan" && 0;
  const progressSize = position === "player" && "lg" || position === "clan" && "md";

  // Add null checks for troops, heroes, spells, and achievements
  const troops = data?.troops || [];
  const heroes = data?.heroes || [];
  const spells = data?.spells || [];
  const achievements = data?.achievements || [];

  // Calculate troop progress with null safety
  const troopsLevel = troops.reduce((total, a) => {
    if (superTroopsList.includes(a.name)) {
      // Exclude super troops from calculation
      return total;
    }
    return total + Number(a.level);
  }, 0);
  
  const troopsMaxLevel = troops.reduce((total, a) => {
    if (superTroopsList.includes(a.name)) {
      // Exclude super troops from calculation
      return total;
    }
    return total + Number(a.maxLevel);
  }, 0);

  const troopsPercent = troopsMaxLevel > 0 ? Math.floor((troopsLevel / troopsMaxLevel) * 100) : 0;

  // Calculate hero progress with null safety
  const heroesLevel = heroes.reduce((total, a) => total + Number(a.level), 0);
  const heroesMaxLevel = heroes.reduce((total, a) => total + Number(a.maxLevel), 0);
  const heroesPercent = heroesMaxLevel > 0 ? Math.floor((heroesLevel / heroesMaxLevel) * 100) : 0;

  // Calculate spell progress with null safety
  const spellsLevel = spells.reduce((total, a) => total + Number(a.level), 0);
  const spellsMaxLevel = spells.reduce((total, a) => total + Number(a.maxLevel), 0);
  const spellsPercent = spellsMaxLevel > 0 ? Math.floor((spellsLevel / spellsMaxLevel) * 100) : 0;

  // Calculate achievement progress with null safety
  const achievementsLevel = achievements.reduce((total, a) => total + Number(a.stars), 0);
  const achievementsMaxLevel = achievements.length * 3;
  const achievementsPercent = achievementsMaxLevel > 0 ? Math.floor((achievementsLevel / achievementsMaxLevel) * 100) : 0;

  return (
    <>
      <main className={`px-${paddingWise}`}>
        <div className={`flex gap-4 ${position === "clan" ? "" : "flex-row"} justify-start items-center`}>
          <Progress squared shadow value={troopsPercent || 40} color="secondary" size={progressSize} status="secondary" css={{position:"relative"}} >
            <Text h6 weight="semibold" size={textSizeOfPercentage} className="absolute flex justify-center min-w-full">{troopsPercent || "null"}{" "}%</Text>
          </Progress>
          {hide === "true" ? <></> : <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Troops</Text>} 
          </div>
        <Spacer y={.5} />
        <div className={`flex gap-4 justify-start items-center ${position === "clan" ? "" : "flex-row"} sm:flex-row`}>
          <Progress squared shadow value={heroesPercent || 50} color="warning" size={progressSize} status="warning" css={{position:"relative"}}>
            <Text h6 weight="semibold" size={textSizeOfPercentage} className="absolute min-w-full flex justify-center">{heroesPercent || "null"}{" "}%</Text>
          </Progress>
          {hide === "true" ? <></> : <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Heroes</Text>} 
          </div>
        <Spacer y={.5} />
        <div className={`flex gap-4 justify-start items-center ${position === "clan" ? "" : "flex-row"} sm:flex-row`}>
          <Progress squared shadow value={spellsPercent || 70} color="success" size={progressSize} status="success" css={{position:"relative"}}>
            <Text h6 weight="semibold" size={textSizeOfPercentage} className="absolute min-w-full flex justify-center">{spellsPercent || "null"}{" "}%</Text></Progress>
          {hide === "true" ? <></> : <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Spells</Text>} 
            </div>
        <Spacer y={.5} />
        <div className={`flex gap-4 justify-start items-center ${position === "clan" ? "" : "flex-row"} sm:flex-row`}>
          <Progress squared value={achievementsPercent || 60} color="error" size={progressSize} status="error" css={{position:"relative"}}>
            <Text h6 weight="semibold" size={textSizeOfPercentage} className="absolute min-w-full flex justify-center">{achievementsPercent || "null"}{" "}%</Text></Progress>
          {hide === "true" ? <></> : <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Achievements</Text>} 
          </div>
      </main>
    </>
  );
}

export default ProfileProgress;