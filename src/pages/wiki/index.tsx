import AppLayout from "components/AppLayout";
import NavOption from "components/PanelComponents/NavOption";
import PanelHeader from "components/PanelComponents/PanelHeader";
import SubPanel from "components/Panels/SubPanel";
import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface WikiProps extends AppStaticProps {}

export default function Wiki(props: WikiProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="travel_explore"
        title={langui.wiki}
        description={langui.wiki_description}
      />
      <NavOption title="Chronology" url="/wiki/chronology" border />
    </SubPanel>
  );

  return <AppLayout navTitle={langui.wiki} subPanel={subPanel} {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: WikiProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
