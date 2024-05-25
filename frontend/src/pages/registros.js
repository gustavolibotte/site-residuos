import { AuthenticatedPagesLayout } from "../layout/AuthenticatedPagesLayout";
import Registro from "../components/registros";
import { getResiduos } from "../lib/residuosApi";

export default function (props) {
  const residuos = props.data;

  return (
    <AuthenticatedPagesLayout residuos={residuos}>
      <Registro />
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
