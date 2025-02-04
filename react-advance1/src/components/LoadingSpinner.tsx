import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner: React.FC = () => (
    <Center h={"100vh"}>
        <Spinner />
    </Center>
);

export default LoadingSpinner;
