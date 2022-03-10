import { GetStaticPaths, GetStaticProps } from "next";
import { getContent, getContentsSlugs } from "graphql/operations";
import { GetContentQuery } from "graphql/operations-types";
import ContentPanel from "components/Panels/ContentPanel";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import AppLayout from "components/AppLayout";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import { prettyinlineTitle, prettySlug } from "queries/helpers";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface ContentIndexProps extends AppStaticProps {
  content: GetContentQuery["contents"]["data"][number]["attributes"];
}

export default function ContentIndex(props: ContentIndexProps): JSX.Element {
  const { content, langui } = props;
  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/contents"
        title={"Contents"}
        langui={langui}
        displayOn={ReturnButtonType.Desktop}
        horizontalLine
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/contents"
        title={"Contents"}
        langui={langui}
        displayOn={ReturnButtonType.Mobile}
        className="mb-10"
      />
      <div className="grid place-items-center">
        <ThumbnailHeader content={content} langui={langui} />

        <HorizontalLine />

        {content.text_set.length > 0 && (
          <Button href={`/contents/${content.slug}/read/`}>
            {langui.read_content}
          </Button>
        )}

        {content.audio_set.length > 0 && (
          <Button href={`/contents/${content.slug}/listen/`}>
            {langui.listen_content}
          </Button>
        )}

        {content.video_set.length > 0 && (
          <Button href={`/contents/${content.slug}/watch/`}>
            {langui.watch_content}
          </Button>
        )}
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle="Contents"
      title={
        content.titles.length > 0
          ? prettyinlineTitle(
              content.titles[0].pre_title,
              content.titles[0].title,
              content.titles[0].subtitle
            )
          : prettySlug(content.slug)
      }
      thumbnail={content.thumbnail.data?.attributes}
      contentPanel={contentPanel}
      subPanel={subPanel}
      description={`${langui.type}: ${
        content.type.data.attributes.titles.length > 0
          ? content.type.data.attributes.titles[0].title
          : prettySlug(content.type.data.attributes.slug)
      }
      ${langui.categories}: ${
        content.categories.data.length > 0 &&
        content.categories.data
          .map((category) => {
            return category.attributes.short;
          })
          .join(" | ")
      }
         
        ${content.titles.length > 0 ? content.titles[0].description : undefined}
        `}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: ContentIndexProps = {
    ...(await getAppStaticProps(context)),
    content: (
      await getContent({
        slug: context.params?.slug?.toString() || "",
        language_code: context.locale || "en",
      })
    ).contents.data[0].attributes,
  };
  return {
    props: props,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  type Path = { params: { slug: string }; locale: string };

  const data = await getContentsSlugs({});
  const paths: Path[] = [];
  data.contents.data.map((item) => {
    context.locales?.map((local) => {
      paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: false,
  };
};
