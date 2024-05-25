import Header from "../components/header";
import Receptor from "../components/cadastro-receptior/receptor";
import Footer from "../components/footer";
import { getResiduos } from "../lib/residuosApi";
import { getCategories } from "../lib/categoriesApi";

export default function (props) {
  return (
    <>
      <Header residuos={props.residuos} />
      <Receptor {...props} />
      <Footer/>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const residuos = await getResiduos(true);
    const categories = await getCategories(true);
    return {
      props: {
        residuos: residuos.data,
        categorias: categories.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
