import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Center, Spinner } from "@chakra-ui/react";

export const AuthenticatedPagesLayout = ({ children, residuos }) => {
  const authContext = useAuthContext();
  const router = useRouter();

  if (authContext.loading) {
    return (
      <>
        <Header residuos={residuos} />
        <Center h="80vh" color="white">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.400"
            size="xl"
          />
        </Center>
        <Footer />
      </>
    );
  }
  if (!authContext.loading && authContext.isAuthenticated) {
    return (
      <>
        <Header residuos={residuos} />
        {children}
        <Footer />
      </>
    );
  }

  router.push("/login");
  return null;
};
