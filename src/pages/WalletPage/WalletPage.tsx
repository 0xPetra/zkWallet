import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { IoLogInOutline } from 'react-icons/io5'
import { BsWindow } from 'react-icons/bs';
import { appWindow } from "@tauri-apps/api/window";
import { BoxAction, BoxFieldset, ButtonWithIcon } from '@/pages/WalletPage/components';

import {
  VscChromeClose,
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeRestore,
} from "react-icons/vsc";

interface CustomResponse {
  message: string
}

const WalletPage: React.FC = () => {

  const [rustMsg, setRustMessage] = useState<string>('N/A')
  const [isMaxsize, setIsMaxsize] = useState<boolean>(false);
  const [hasWallet, setHasWallet] = useState<boolean>(false);

  useEffect(() => {
    appWindow.isMaximized().then(setIsMaxsize);
  }, []);

  const callTauriBackend = async () => {
    const res: CustomResponse = await invoke('message_from_rust');
    if (res !== undefined) {
      setRustMessage(res.message)
    }
  }

  const handleMaximization = async () => {
    await appWindow.toggleMaximize()
    const isMaximized = await appWindow.isMaximized();
    setIsMaxsize(isMaximized);
  }

  const WalletInstance = () => {
    return (
      <>
        <Tabs isLazy>
          <TabList>
            <Tab>Balances</Tab>
            <Tab>Transfer</Tab>
            <Tab>Receive</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* Balances UI */}
              <Box p={4} bg="gray.200" borderRadius="md">
                {/* Balances content goes here */}
                <p>Display your balances here</p>
              </Box>
            </TabPanel>

            <TabPanel>
              {/* Transfer UI */}
              <Box p={4} bg="gray.200" borderRadius="md">
                {/* Transfer content goes here */}
                <p>Transfer crypto here</p>
              </Box>
            </TabPanel>

            <TabPanel>
              {/* Receive UI */}
              <Box p={4} bg="gray.200" borderRadius="md">
                {/* Receive content goes here */}
                <p>Receive crypto here</p>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    )
  }

  const CreateWallet = () => {
    return (
      <Box maxW="400px" mx="auto" p={4}>
        <Heading as='h5' mb={4}>Create a Wallet</Heading>
        <form>
          <FormControl mb={4}>
            <FormLabel>Wallet Name</FormLabel>
            <Input type="text" placeholder="Enter wallet name" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Private Key</FormLabel>
            <Input type="password" placeholder="0x..." />
          </FormControl>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit">
              Create Wallet
            </Button>
          </Box>
        </form>
      </Box>
    )
  }

  return (
    <BoxAction title="Wallet" icon={IoLogInOutline}>
      {hasWallet ? <WalletInstance /> : <CreateWallet />}
    </BoxAction>
  )
}

export default WalletPage;
