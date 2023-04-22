import * as React from "react";
import { useDebounce } from "use-debounce";
import {
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";
import {
    Button,
    Card,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export function SendTransaction() {
    const [to, setTo] = React.useState("");
    const [debouncedTo] = useDebounce(to, 500);

    const [amount, setAmount] = React.useState("");
    const [debouncedAmount] = useDebounce(amount, 500);

    const { config } = usePrepareSendTransaction({
        request: {
            to: debouncedTo,
            value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
        },
    });
    const { data, sendTransaction } = useSendTransaction(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendTransaction?.();
            }}
        >
            <FormControl mt={4}>
                <FormLabel>Recipient</FormLabel>
                <Input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTo(e.target.value)
                    }
                    value={to}
                    placeholder="0xA0Cf…251e"
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAmount(e.target.value)
                    }
                    value={amount}
                    placeholder="0.05"
                />
            </FormControl>
            <Button
                mt={4}
                w="full"
                isLoading={isLoading}
                isDisabled={isLoading || !sendTransaction || !to || !amount}
                colorScheme="teal"
                variant="solid"
                type="submit"
            >
                {isLoading ? "Sending..." : "Send"}
            </Button>

            {isSuccess && (
                <Card mt={5} p={5} bg="gray.100">
                    <Flex justifyContent="space-between">
                        <Text>
                            Successfully sent {amount} ether to {to}
                        </Text>
                        <Link href={`https://etherscan.io/tx/${data?.hash}`} isExternal>
                            Etherscan <ExternalLinkIcon mx="2px" />
                        </Link>
                    </Flex>
                </Card>
            )}
        </form>
    );
}