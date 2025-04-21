import { Card, Image, Spacer, Badge, Text, Col, Grid, Container, Row, User, Avatar, Table, Tooltip } from "@nextui-org/react";
import { Star, ChevronUp, ShieldDone, ChevronDown } from "react-iconly";
import ProfileProgress from '@/utils/ProfileProgress';
import { motion } from 'framer-motion';
import NavbarMain from "@/components/NavbarMain";
import { useEffect, useState } from 'react';

const ProfileMainDetails = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  
  // This ensures we only render on client side to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  console.log(data , "data zzzzzzzzzzzzzzzzzzzzzz");
  
  // Early return with loading state if data isn't available
  if (!isClient || !data) {
    return (
      <div className='w-full'>
        <Card className="threeDShadowLight" css={{ border: 'none', borderRadius:"20px", padding:"0px", margin:"0px" }}>
          <Card.Body>
            <div className="flex justify-center items-center p-4">
              <Text>Loading profile data...</Text>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
  
  const roleOfPlayer = data?.role ? (data.role === "admin" ? "elder" : data.role) : "member";
  
  const mainDetails =  [
    {
      id: 'Role',
      text: roleOfPlayer ? roleOfPlayer.toUpperCase() : "-",
      url: '/assets/others/sheild.png',
      color: 'error'
    },
    {
      url: '/assets/others/Star.png',
      text: data?.warStars || "-",
      id: 'War Stars',
      color: 'warning',
    },
    {
      url: data?.league?.iconUrls?.small || '/assets/others/no_league.png',
      id: data?.league?.name || 'Unranked',
      text: data.trophies,
      color: 'secondary',
    },
    {
      url: '/assets/others/legendTrophy.png',
      text: data?.legendStatistics?.legendTrophies|| "-",
      id: 'Legend Trophies',
      color: 'secondary',
    },
    {
      url: '/assets/others/builderTrophy.png',
      text: data?.versusTrophies|| "-",
      id: 'Versus Battle Trophies',
      color: 'warning',
    },
    {
      url: '/assets/others/arrowUp.png',
      text: data?.donations|| "-",
      id: 'Troops Donated',
      color: 'success',
    },
    {
      url: '/assets/others/arrowDown.png',
      text: data?.donationsReceived|| "-",
      id: 'Troops Recieved',
      color: 'error',
    },
    {
      url: '/assets/others/battle.png',
      text: data?.attackWins|| "-",
      id: 'Battle Wins',
      color: "secondary",
    },
    {
      url: '/assets/others/defence.png',
      text: data?.defenseWins || "-",
      id: 'Defense Won',
      color: 'success',
    },
    {
      url: '/assets/others/Axes.png',
      text: data?.versusBattleWins|| "-",
      id: 'Versus Battle Wins',
      color: 'warning',
    },
    {
      url: '/assets/others/GoldC.png',
      text: data?.clanCapitalContributions|| "-",
      id: 'Clan Capital Total Contribution',
      color: 'warning',
    },
   ]

  const xp = data.expLevel
  const totalXp = () => {
    return (


      (2 <= xp && xp <= 200) ?
        xp * 50 :
        (201 <= xp && xp <= 299) ?
          (500 * (xp) + 9500) :
          (1000 * (xp) + 60000)
    )
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const containerVariants = {
    hidden: { width: '50%' },
    visible: { width: '100%', transition: { duration: 1, ease: "easeOut", } },
  };

  const springAnimation = {
    type: "spring",
    damping: 10,
    stiffness: 200,
    delay:0.5,
  };

  return (
    <>
      <div className='w-full'>
        <Card
          className="threeDShadowLight"
          css={{
            border: 'none',
            borderRadius:"20px",
            padding:"0px",
            margin:"0px",
          }}
        >
          <Card.Body>
            <div className="flex justify-center items-center mb-4">
              <div className="flex flex-row space-x-6">
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 flex items-center justify-center">
                    <Image 
                      src="/assets/others/battle.png"
                      width={80}
                      height={80}
                      alt="Town Hall"
                      css={{ objectFit: 'contain' }}
                    />
                  </div>
                  <Text size={14} weight="bold" css={{mt: "5px"}}>Town Hall {data?.townHallLevel || "?"}</Text>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 flex items-center justify-center">
                    <Image 
                      src="/assets/others/builderTrophy.png"
                      width={80}
                      height={80}
                      alt="Builder Hall"
                      css={{ objectFit: 'contain' }}
                    />
                  </div>
                  <Text size={14} weight="bold" css={{mt: "5px"}}>Builder Hall {data?.builderHallLevel || "?"}</Text>
                </div>
              </div>
            </div>
            <Grid.Container gap={2} className="justify-around" >
              {mainDetails.map((a, i) => {
                // Skip rendering if important properties are missing
                if (!a || !a.id || !a.url) return null;
                
                return (
                  (a.url && a.text) ?
                    <Grid key={a.id} >
                      <Tooltip content={a.id} color={a.color} hideArrow css={{borderRadius:"8px"}} >
                        <div className="flex flex-row items-center">
                          <Image 
                          src={a.url}
                          alt={a.id}
                          height={40}
                          width={40}
                          quality={30}
                          className="cursor-pointer transition-all ease-linear absolute z-40"
                          />
                          <Spacer />
                          <Badge
                            size='md'
                            color={a.color}
                            className="relative z-0"
                            variant="flat"
                            isSquared
                            css={{
                              minWidth: '100px',
                              border:"none",
                            }}
                          >
                            {a.text || "-"}
                          </Badge>
                          </div>
                       
                      </Tooltip>
                     
                    </Grid>
                    : <></>
                )
              })}
            </Grid.Container>
            <Spacer y={1} />
            <Card.Divider />
            <Spacer y={1} />
            {data && <ProfileProgress data={data} position="player" />}
            </Card.Body>
          
        </Card>
      </div>
    </>
  )
}

export default ProfileMainDetails;

