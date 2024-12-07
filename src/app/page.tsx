import NavigationMenuComponent from "@/components/header";
import { Theme, Flex, ThemePanel } from "@radix-ui/themes";
import "./globals.css";

export default function Home() {
  return (
    <Flex className="flex min-h-screen min-w-screen flex-col items-center justify-between">
      This is the home page
    </Flex>
  );
}

