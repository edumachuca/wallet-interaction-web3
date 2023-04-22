import { Card, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const toast = useToast();
  console.log(chains)
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

  if (!chain) return null;

  return (
    <VStack mt={10}>
      <Card w="full" p={5} textAlign="center" bg="blue.100">
        <Text>Connected to {chain?.name ?? chain?.id}</Text>
        <Text>{chain?.unsupported && " (unsupported)"}</Text>
      </Card>

      {switchNetwork && (
        <VStack w="full">
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <Card
                key={x.id}
                onClick={() => switchNetwork(x.id)}
                w="full"
                p={5}
                textAlign="center"
                bg="gray.100"
                mt={5}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
              >
                <Text>{x.name}</Text>
                <Text>
                  {isLoading && x.id === pendingChainId && " (switching)"}
                </Text>
              </Card>
            )
          )}
        </VStack>
      )}
    </VStack>
  );
}