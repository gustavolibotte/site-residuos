import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Residuo from "../../components/residuo";
import { getResiduoBySlug, getResiduos } from "../../lib/residuosApi";


export default function(props) {
  return (
    <>
      <Head>
        <title>{props.residuo.attributes.Title}</title>
        <meta name="description" content={props.residuo.attributes.Subtitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header residuos={props.residuos.data} />
      <Residuo {...props.residuo.attributes} />
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  //Chamada a api de informações do residuo
  const residuos = await getResiduos();

  //Mapa de parâmetros
  const paths = residuos.data.map(({ attributes }) => ({
    params: {
      Title: attributes.Title,
      Subtitle: attributes.Subtitle,
      Description: attributes.Description,
      Content: attributes.Content,
      Image: attributes.Image,
      Button: attributes.button,
      slug: attributes.Slug,
    },
  }));
  return {paths, fallback:false}
}

export async function getStaticProps (context){
  const residuo = await getResiduoBySlug(context.params.slug);
  const residuos = await getResiduos(true);
  return {
    props: {
      residuo: residuo.data[0],
      residuos,
    },
  };
}

