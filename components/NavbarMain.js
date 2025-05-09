import { Navbar, Button, Link, Text, Card, Radio, Switch,Dropdown,Avatar } from "@nextui-org/react";
import { Lightbulb } from '@theme-toggles/react';
import "@theme-toggles/react/css/Lightbulb.css"
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import { useRouter } from "next/router";
import { useSession,signIn,signOut } from "next-auth/react";


const NavbarMain = () => {
  const {data : session} = useSession()
  const router = useRouter()
  const collapseItems = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Search clan/player",
      link: "/player"
    },
    {
      name: "Compare",
      link: "/compareplayers"
    },
    {
      name: "My Teams",
      link: "/teams"
    },
    {
      name: "Log In",
      link: "/auth/login"
    },
    {
      name: "Sample Profile",
      link: "/playerData/2LQUJU9YC"
    },
    {
      name: "Global chat",
      link: "/globalchat"
    },
  ];  
  const filteredCollapseItems = session?.user
  ? collapseItems.filter(item => item.name !== "Log In")
  : collapseItems;
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  console.log(session?.user)
  return (
    <Navbar shouldHideOnScroll isBordered variant="floating" height={54} css={{paddingTop:"8px"}} 
    >
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs">
          <Navbar.Link href="/">
            Home
          </Navbar.Link>
          <Navbar.Link href="/teams">My Teams</Navbar.Link>
          <Navbar.Link href="/player" css={{'&:focus': {
            outlineColor: '$pink400',
          },}}>Search</Navbar.Link>
          <Navbar.Link href="/playerData/2LQUJU9YC">Sample profile</Navbar.Link>
          <Navbar.Link href="/compareplayers">Compare</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
        <Navbar.Item>
          {!session?.user ? 
            <Button auto size="sm" flat color="secondary" onClick={()=> router.push("/auth/login")}>
              Sign In
            </Button> : <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="sm"
                  alt="user image"
                  src={session?.user.image}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              className="borderGray500"
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }} className="outline-none">
                <Text size={12}  color="inherit" css={{ d: "flex" }}>
                  Signed in as :
                </Text>
                <Text weight="semibold" color="inherit" css={{ d: "flex" }}>
                  {session?.user.name}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider className="outline-none">
                <Button auto flat color="secondary" onClick={()=>router.push("/teams")}>
                My Teams
              </Button>
              </Dropdown.Item>
              <Dropdown.Item key="team_settings" className="outline-none">
              <Button disabled auto flat color="secondary" onClick={()=>router.push("/teams")}>
                Team Settings (upcoming...)
              </Button>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error" className="outline-none">
              <Button auto flat color="error" onClick={()=> signOut()}>
              Sign Out
              </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
          </Navbar.Item>
          <Navbar.Item>
          <Lightbulb
                className={`scale-150 ${!isDark ? "text-yellow-500" : ""} font-bold pr-2 pb-[2px]`}
                aria-label="Theme Toggle Switch"
                toggled={isDark}
                toggle={() => setTheme(!isDark ? "dark" : "light")}
              />
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse  aria-label="Collapse main"  className="nav-content px-4 max-w-xs top-8 transition-all ease-in duration-300" >
        {filteredCollapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item} activeColor="warning" >
            <Link
              color="inherit"
              css={{ minWidth: "100%",
              }}
              href={item.link}
            >
              <Text size={18} className="hover:underline-offset-1 hover:underline hover:translate-x-1 transition-all ease-in duration-900">
                  {item.name}
                </Text>
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      </Navbar>
  );
}

export default NavbarMain;