import {
  GetContentQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { prettySlug } from "queries/helpers";
import Button from "components/Button";
import Img, { ImageQuality } from "components/Img";

export type ThumbnailHeaderProps = {
  content: {
    slug: GetContentQuery["contents"]["data"][number]["attributes"]["slug"];
    thumbnail: GetContentQuery["contents"]["data"][number]["attributes"]["thumbnail"];
    titles: GetContentQuery["contents"]["data"][number]["attributes"]["titles"];
    type: GetContentQuery["contents"]["data"][number]["attributes"]["type"];
    categories: GetContentQuery["contents"]["data"][number]["attributes"]["categories"];
  };
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function ThumbnailHeader(
  props: ThumbnailHeaderProps
): JSX.Element {
  const content = props.content;
  const langui = props.langui;

  return (
    <>
      <div className="grid place-items-center gap-12  mb-12">
        <div className="drop-shadow-shade-lg dark:drop-shadow-dark-shade-lg">
          {content.thumbnail.data ? (
            <Img
              className=" rounded-xl"
              image={content.thumbnail.data.attributes}
              quality={ImageQuality.Medium}
              priority
            />
          ) : (
            <div className="w-full aspect-[4/3] bg-light dark:bg-dark-light rounded-xl"></div>
          )}
        </div>
        <div className="grid place-items-center text-center">
          {content.titles.length > 0 ? (
            <>
              <p className="text-2xl">{content.titles[0].pre_title}</p>
              <h1 className="text-3xl">{content.titles[0].title}</h1>
              <h2 className="text-2xl">{content.titles[0].subtitle}</h2>
            </>
          ) : (
            <h1 className="text-3xl">{prettySlug(content.slug)}</h1>
          )}
        </div>
      </div>

      <div className="grid grid-flow-col gap-8">
        {content.type ? (
          <div className="grid place-items-center place-content-start gap-2">
            <h3 className="text-xl">{langui.global_type}</h3>
            <Button>
              {content.type.data.attributes.titles.length > 0
                ? content.type.data.attributes.titles[0].title
                : prettySlug(content.type.data.attributes.slug)}
            </Button>
          </div>
        ) : (
          ""
        )}

        {content.categories.data.length > 0 ? (
          <div className="grid place-items-center place-content-start gap-2">
            <h3 className="text-xl">{langui.global_categories}</h3>
            {content.categories.data.map((category) => (
              <Button key={category.id}>{category.attributes.name}</Button>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
