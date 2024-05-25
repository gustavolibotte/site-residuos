import Devolução from "../components/descarte";
import { getResiduos } from "../lib/residuosApi";
import { AuthenticatedPagesLayout } from "../layout/AuthenticatedPagesLayout";

export default function (props) {
  const residuos = props.data;

  return (
    <AuthenticatedPagesLayout residuos={residuos}>
      <Devolução />
    </AuthenticatedPagesLayout>
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
