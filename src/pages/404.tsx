import AppLayout from "components/AppLayout";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface Props extends AppStaticProps {}

export default function FourOhFour(props: Props): JSX.Element {
  const { langui } = props;
  const contentPanel = (
    <ContentPanel>
      <h1>404 - {langui.page_not_found}</h1>
      <ReturnButton
        href="/"
        title="Home"
        langui={langui}
        displayOn={ReturnButtonType.both}
      />
    </ContentPanel>
  );
  return <AppLayout navTitle="404" contentPanel={contentPanel} {...props} />;
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
