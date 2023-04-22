import { Card, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <VStack spacing={5}>
      {isConnected && (
        <Card
          onClick={() => disconnect()}
          w="full"
          p={5}
          textAlign="center"
          bg="gray.500"
          textColor="white"
          cursor="pointer"
          _hover={{ bg: "gray.600" }}
        >
          Disconnect from {connector?.name}
        </Card>
      )}

      {!isConnected &&
        connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <Card
              key={x.id}
              onClick={() => connect({ connector: x })}
              w="full"
              p={5}
              textAlign="center"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              textColor="white"
              cursor="pointer"
            >
              <Text>{x.name}</Text>
              <Text>
                {isLoading && x.id === pendingConnector?.id && " (connecting)"}
              </Text>
            </Card>
          ))}
    </VStack>
  );
}