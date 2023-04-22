import { Text, VStack } from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  return (
    <VStack mt={10}>
      <Text fontSize="xl">Account: {ensName ?? address}</Text>
      <Text>{ensName ? ` (${address})` : null}</Text>
    </VStack>
  );
}