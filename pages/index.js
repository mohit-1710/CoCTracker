import { Navbar, Button,Grid,Badge,Row,Col, Link,Spacer, Text, Card, Radio, Switch } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import "@theme-toggles/react/css/Classic.css"
import { motion,AnimatePresence,useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import {useRouter} from "next/router"
import axios from "axios";
import { useRecoilState } from 'recoil';
import { locationsState, userState } from "@/recoil/storage";
import { useSession } from "next-auth/react";
import Footer from "@/utils/Footer";
import { GoArrowSwitch } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { Loading } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import PlayerProfile from '@/components/PlayerProfile';

// Dynamically import components that use window/document
const IndexCaraousal = dynamic(() => import('@/components/IndexCaraousal'), {
  ssr: false
});

const RevealText = dynamic(() => import('@/utils/RevealText'), {
  ssr: false
});

// Add this sample data before the Home component
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

export default function Home({data}) {
  const {data:session} = useSession();
  const [user, setUser] = useRecoilState(userState);
  const [locations, setLocations] = useRecoilState(locationsState);
  const [isMounted, setIsMounted] = useState(false);
  
  const controls = useAnimation();
  const router = useRouter();
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [loader, setLoader] = useState(false);
  
  // Client-side only code
  useEffect(() => {
    setIsMounted(true);
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 1.5, type: "spring", stiffness: 100, damping: 20 }
        });
      }
    });

    const target = document.querySelector("#image-container");
    if (target) {
      observer.observe(target);
    }

    setTimeout(() => {
      setLoader(false)
    }, 500);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [controls]);

  const handleCompareCard = () => router.push("/compareplayers");
  const handleSearchCard = () => router.push("/player");
  const cardData = [
    {
      key: 'search-card',
      className: 'group threeDShadowLight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-300/80 via-violet-600/80 to-violet-900 border-none rounded-[20px]',
      onPress: handleSearchCard,
      headerText: 'Search for profile',
      subHeaderText: 'Enter your clan or profile tag',
      imageSrc: '/assets/backgroundPng/MagicWardenCropped.png',
      altText: 'Search card bg',
      icon:<IoSearchSharp />
    },
    {
      key: 'compare-card',
      className: 'group threeDShadowLight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-300/80 via-emerald-600/80 to-emerald-900 border-none rounded-[20px]',
      onPress: handleCompareCard,
      headerText: 'Compare profile',
      subHeaderText: 'Enter two tags to compare',
      imageSrc: '/assets/backgroundPng/shadowRcCropped.png',
      altText: 'compare card bg',
      icon:<GoArrowSwitch />
    },
  ];
  
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading size="xl" />
      </div>
    );
  }
  
  return (
    <>
      {(loader) ? <div className="flex justify-center items-center h-screen w-screen">
        <div className="relative">
          <Loading size="xl" />
        </div>
      </div> :
        <>
          <main className="relative transition-all pt-6">
            <section className="flex flex-col items-center justify-center px-4">
              <div className="flex flex-col-reverse">
            <motion.div 
              initial={{
                opacity: 0,
                scale: 0.9,
                filter: "blur(7px)",
              }}
              transition={{
                duration: 0.3,
                delay:0,
                ease:"easeIn",
                stiffness:50
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              className={`z-10 gap-4 max-w-5xl flex flex-col md:flex-row rounded-3xl p-6 backdrop-blur-[4px] ${isDark ? "bg-gray-500/10 " : "bg-gray-500/10 "}`}>
                <Grid.Container>
                  <Grid>
                  <Text h2 weight="semibold" className="text-justify">Track and analyze your progress in Clash of Clans with ease. Simply enter your player tag or clan tag in the form below to retrieve valuable insights and statistics.</Text>
                  <Spacer />
                  </Grid>
                  <Grid>
                  <Text h2 >With our Profile Tracker, you can:</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="error" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>View your player profile information, including your level, trophies, and achievements.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="primary" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Monitor your clan's performance, such as its members, clan level, top members with war stars , etc.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="warning" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Compare your performance with other players and clans to stay competitive.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="secondary" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Analyze your attack and defense strategies to enhance your gameplay.<p className="text-violet-500 text-xs">coming soon ...</p></Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="success" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Keep track of your progress over time with historical data and trends.<p className="text-violet-500 text-xs">coming soon ...</p></Text>
                  </Grid>
                  </Grid.Container>

        </motion.div>
        <Spacer y={1.5}/>
            <div className="flex flex-col sm:flex-row gap-6">
            {cardData.map((data) => (
        <Card
          key={data.key}
          isPressable
          className={data.className}
          onPress={data.onPress}
        >
          <Card.Header css={{ position: 'absolute', zIndex: 1, bottom: 0 }} className="px-4">
           
            <Col>
              <Text size={15} weight="black" className="group-hover:tracking-[.27rem] transition-all duration-200 ease-in" transform="uppercase" css={{ letterSpacing: '0.1rem' }} color="#ffffff">
                {data.headerText}
              </Text>
              <Text size={12} color="#ffffffAA" weight="semibold" transform="uppercase" css={{ letterSpacing: '0.08rem' }}>
                {data.subHeaderText}
              </Text>
            </Col>
            <Col className="max-w-fit">
            <Row justify="flex-end">
            <div className="text-2xl text-white pt-2">{data.icon}</div>
            </Row>
            </Col>
          </Card.Header>
          <Card.Image
            src={data.imageSrc}
            objectFit="cover"
            width="100%"
            className="opacity-75 group-hover:brightness-50 group-hover:scale-105 group-hover:blur-sm group-hover:bg-black/30 transition-all ease-in duration-200"
            height={140}
            alt={data.altText}
          />
        </Card>
      ))}
            </div>

            </div>
              <Text weight="thin" className="p-6 text-justify">
              We're dedicated to continuously improving our Profile Tracker to meet the needs of Clash of Clans players like you. Stay tuned for exciting updates and new features!
              </Text>
              </section>
            <Spacer y={1}/>
            {data && isMounted && 
          <IndexCaraousal data={data} />
          }
          <Footer />
          </main>
        </>}

      <div className="my-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Sample Profile</h2>
        <p className="mb-8">This is how your profile will look when you search for a player</p>
        <div className="flex justify-center">
          {/* This is the sample profile that will use the fixed InfoCard component */}
          <PlayerProfile allData={[samplePlayerData, sampleGoldPassData]} />
        </div>
      </div>

    </>
  )
}

// export async function getServerSideProps() {
//   const locationId = 32000113;
//   const limit = 10;
//   const endpoints = [
//     'players',
//     'clans',
//     'clans-versus',
//     'players-versus',
//     'capitals',
//   ];

//   // Create an array of promises for each endpoint request
//   const requests = endpoints.map(async (endpoint) => {
//     const url = `https://cocproxy.royaleapi.dev/v1/locations/${locationId}/rankings/${endpoint}?limit=${limit}`;
//     const options = {
//       method: 'GET',
//       url,
//       headers: {
//         Authorization: `Bearer ${process.env.COC_API}`
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       return { [endpoint]: response.data };
//     } catch (error) {
//       console.error(`Error fetching data for endpoint "${endpoint}":`, error);
//       return { [endpoint]: null };
//     }
//   });

//   // Add request for the locations endpoint
//   const locationsUrl = `https://cocproxy.royaleapi.dev/v1/locations`;
//   const locationsOptions = {
//     method: 'GET',
//     url: locationsUrl,
//     headers: {
//       Authorization: `Bearer ${process.env.COC_API}`
//     }
//   };

//   // Add the location request to the array of promises
//   requests.push(
//     axios
//       .request(locationsOptions)
//       .then((response) => ({ locations: response.data }))
//       .catch((error) => {
//         console.error('Error fetching data for locations:', error);
//         return { locations: null };
//       })
//   );

//   // Use Promise.all to wait for all requests to complete
//   const results = await Promise.all(requests);

//   // Combine the results into a single data object
//   const data = results.reduce((acc, result) => ({ ...acc, ...result }), {});

//   return {
//     props: {
//       data,
//     },
//   };
// }

export async function getServerSideProps() {
  const locationId = 32000113;
  const limit = 10;
  const endpoints = [
    'players',
    'clans',
    'clans-builder-base',
    'players-builder-base',
    'capitals',
  ];

  const data = {};

  for (const endpoint of endpoints) {
    const url = `https://cocproxy.royaleapi.dev/v1/locations/${locationId}/rankings/${endpoint}?limit=${limit}`;
    const options = {
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${process.env.COC_API}`
      }
    };

    try {
      const response = await axios.request(options);
      data[endpoint] = response.data;
    } catch (error) {
      console.error(`Error fetching data for endpoint "${endpoint}":`, error);
      data[endpoint] = null;
    }
  }
  return {
    props: {
      data,
    },
  };
}