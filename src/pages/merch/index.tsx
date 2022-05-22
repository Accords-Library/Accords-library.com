import { AppLayout } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { Icon } from "components/Ico";

interface Props extends AppStaticProps {}
export default function Merch(props: Immutable<Props>): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon={Icon.Store}
        title={langui.merch}
        description={langui.merch_description}
      />
    </SubPanel>
  );

  return <AppLayout navTitle={langui.merch} subPanel={subPanel} {...props} />;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
