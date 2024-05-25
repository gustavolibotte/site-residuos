
import Header from "../components/header";
import Erro from "../components/erro";
import { getResiduos } from "../lib/residuosApi";
import { Flex, Spacer } from "@chakra-ui/react";
import Footer from "../components/footer";

export default function (props) {
  return (
    <>
      <Header residuos={props.data} />
      <Flex
        flexDirection="column"
        style={{
          height: "70vh",
        }}
      >
        <Spacer />
        <Erro/>
        <Spacer />
      </Flex>
      <Footer/>
    </>
  );
}
export async function getStaticProps(context) {
  try {
    const residuos = await getResiduos(true);
    return {
      props: residuos,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
