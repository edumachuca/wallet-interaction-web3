import { Box, Card, CardBody, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { MintNFT } from "./components/MinstNFT";

import { Account, Connect, NetworkSwitcher, SendTransaction } from "./components";


export function App() {
  const { isConnected } = useAccount();

  return (
    <Flex bg="gray.50" p={16} justifyContent="center" h="100vh">
      <Box>
        <Card minW="4xl" minH="4xl">
          <CardBody>
            <Connect />
            {isConnected && (
              <>
                <Account />
                <NetworkSwitcher />
                <SendTransaction />
                <MintNFT/>
              </>
            )}
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
}