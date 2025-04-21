import React from 'react';
import PlayerProfile from '@/components/PlayerProfile';
import { Container, Text } from '@nextui-org/react';

// Sample data for player profile
const samplePlayerData = {
  "tag": "#2LQUJU9YC",
  "name": "Chief Sample",
  "townHallLevel": 14,
  "townHallWeaponLevel": 5,
  "expLevel": 215,
  "trophies": 5481,
  "bestTrophies": 5832,
  "warStars": 1243,
  "attackWins": 84,
  "defenseWins": 12,
  "builderHallLevel": 9,
  "versusTrophies": 4212,
  "bestVersusTrophies": 4553,
  "versusBattleWins": 1783,
  "role": "coLeader",
  "warPreference": "in",
  "donations": 2439,
  "donationsReceived": 1210,
  "clan": {
    "tag": "#2Q2YVGCV2",
    "name": "Sample Clan",
    "clanLevel": 12,
    "badgeUrls": {
      "small": "https://api-assets.clashofclans.com/badges/70/9b1096f2b0d79008abe37383110d32cd.png",
      "large": "https://api-assets.clashofclans.com/badges/512/9b1096f2b0d79008abe37383110d32cd.png",
      "medium": "https://api-assets.clashofclans.com/badges/200/9b1096f2b0d79008abe37383110d32cd.png"
    }
  },
  "league": {
    "id": 29000022,
    "name": "Legend League",
    "iconUrls": {
      "small": "https://api-assets.clashofclans.com/leagues/72/R6CoC4QiavGK0gZ6gOT8UbHLFnKGVQZRADbB18LuBGU.png",
      "tiny": "https://api-assets.clashofclans.com/leagues/36/R6CoC4QiavGK0gZ6gOT8UbHLFnKGVQZRADbB18LuBGU.png",
      "medium": "https://api-assets.clashofclans.com/leagues/288/R6CoC4QiavGK0gZ6gOT8UbHLFnKGVQZRADbB18LuBGU.png"
    }
  },
  "legendStatistics": {
    "legendTrophies": 5481,
    "bestSeason": {
      "id": "2023-04",
      "rank": 22435
    },
    "currentSeason": {
      "trophies": 5481
    }
  },
  "achievements": [
    {
      "name": "Bigger Coffers",
      "stars": 3,
      "value": 14,
      "target": 14,
      "info": "Upgrade a Gold Storage to level 14",
      "completionInfo": "Highest Gold Storage level: 14",
      "village": "home"
    },
    {
      "name": "Get those Goblins!",
      "stars": 3,
      "value": 150,
      "target": 150,
      "info": "Win 150 Stars on the Campaign Map",
      "completionInfo": "Stars in Campaign Map: 150",
      "village": "home"
    }
  ],
  "labels": [
    {
      "id": 57000000,
      "name": "Clan Wars",
      "iconUrls": {
        "small": "https://api-assets.clashofclans.com/labels/64/lXaIuoTlfoNOY5fKcQGeT57apz1KFWkN9-Nq-T6Iw0Q.png",
        "medium": "https://api-assets.clashofclans.com/labels/128/lXaIuoTlfoNOY5fKcQGeT57apz1KFWkN9-Nq-T6Iw0Q.png"
      }
    },
    {
      "id": 57000001,
      "name": "Clan War League",
      "iconUrls": {
        "small": "https://api-assets.clashofclans.com/labels/64/5w60_3bdtYUe9SM6rkxBRyV_8VvWw_jTlDS5ieU3IsI.png",
        "medium": "https://api-assets.clashofclans.com/labels/128/5w60_3bdtYUe9SM6rkxBRyV_8VvWw_jTlDS5ieU3IsI.png"
      }
    }
  ],
  "troops": [
    {
      "name": "Barbarian",
      "level": 10,
      "maxLevel": 10,
      "village": "home"
    },
    {
      "name": "Archer",
      "level": 10,
      "maxLevel": 10,
      "village": "home"
    },
    {
      "name": "Giant",
      "level": 10,
      "maxLevel": 10,
      "village": "home"
    },
    {
      "name": "Goblin",
      "level": 8,
      "maxLevel": 8,
      "village": "home"
    },
    {
      "name": "Wall Breaker",
      "level": 10,
      "maxLevel": 10,
      "village": "home"
    },
    {
      "name": "Balloon",
      "level": 10,
      "maxLevel": 10,
      "village": "home"
    },
    {
      "name": "Wizard",
      "level": 10,
      "maxLevel": 10,
      "village": "home"
    },
    {
      "name": "Healer",
      "level": 7,
      "maxLevel": 7,
      "village": "home"
    },
    {
      "name": "Dragon",
      "level": 9,
      "maxLevel": 9,
      "village": "home"
    },
    {
      "name": "P.E.K.K.A",
      "level": 9,
      "maxLevel": 9,
      "village": "home"
    },
    {
      "name": "Raged Barbarian",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Sneaky Archer",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Boxer Giant",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Beta Minion",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Bomber",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Baby Dragon",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Cannon Cart",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Night Witch",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    },
    {
      "name": "Drop Ship",
      "level": 18,
      "maxLevel": 18,
      "village": "builderBase"
    }
  ],
  "heroes": [
    {
      "name": "Barbarian King",
      "level": 85,
      "maxLevel": 85,
      "village": "home"
    },
    {
      "name": "Archer Queen",
      "level": 85,
      "maxLevel": 85,
      "village": "home"
    },
    {
      "name": "Grand Warden",
      "level": 60,
      "maxLevel": 60,
      "village": "home"
    },
    {
      "name": "Royal Champion",
      "level": 35,
      "maxLevel": 35,
      "village": "home"
    },
    {
      "name": "Battle Machine",
      "level": 30,
      "maxLevel": 30,
      "village": "builderBase"
    }
  ],
  "spells": [
    {
      "name": "Lightning Spell",
      "level": 9,
      "maxLevel": 9,
      "village": "home"
    },
    {
      "name": "Healing Spell",
      "level": 8,
      "maxLevel": 8,
      "village": "home"
    },
    {
      "name": "Rage Spell",
      "level": 6,
      "maxLevel": 6,
      "village": "home"
    },
    {
      "name": "Jump Spell",
      "level": 4,
      "maxLevel": 4,
      "village": "home"
    },
    {
      "name": "Freeze Spell",
      "level": 7,
      "maxLevel": 7,
      "village": "home"
    }
  ]
};

const sampleGoldPassData = {
  "startTime": "2023-06-01T08:00:00.000Z",
  "endTime": "2023-06-30T08:00:00.000Z",
  "items": [
    {
      "type": "gold",
      "amount": 1000000
    },
    {
      "type": "elixir",
      "amount": 1000000
    }
  ]
};

const PlayerPage = () => {
  return (
    <Container fluid>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <Text h1 className="text-3xl font-bold mb-8 text-center">
          Sample Clash of Clans Player Profile
        </Text>
        <div className="w-full">
          <PlayerProfile allData={[samplePlayerData, sampleGoldPassData]} />
        </div>
      </div>
    </Container>
  );
};

export default PlayerPage;