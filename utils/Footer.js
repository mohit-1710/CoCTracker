import { Button } from "@nextui-org/react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-row w-full justify-center p-6 gap-2">
        <Link href="https://github.com/mohit-1710/CoCTracker">
            <Button
              id="github"
              iconOnly
              bordered
              css={{borderWidth:"0.5px",borderColor:"#6b728050"}}
              color="neutral"
              icon={<AiFillGithub className="scale-125"/>}
            />
          </Link>
      </div>
  );
}

export default Footer;