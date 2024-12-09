
// import "@radix-ui/themes/styles.css"; // 确保在其他样式之前导入
import '../styles/globals.css';
import Image from "next/image";
import { Box, Theme, Flex, Container } from "@radix-ui/themes";
import NavigationMenu from './header'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Theme accentColor="amber">
      <Flex direction={'row'} style={{display: 'flex'}} className='container'>
        <Image src="./assets/logo.svg" alt="logo" width={30} height={30} />
        <NavigationMenu/>
      </Flex> 
      <>{children}</>
    </Theme>
  )
}