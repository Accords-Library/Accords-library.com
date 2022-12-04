import { useCallback } from "react";
import { useRouter } from "next/router";
import { Chip } from "./Chip";
import { Ico, Icon } from "./Ico";
import { Img } from "./Img";
import { UpPressable } from "./Containers/UpPressable";
import { DatePickerFragment, PricePickerFragment, UploadImageFragment } from "graphql/generated";
import { cIf, cJoin } from "helpers/className";
import { prettyDate, prettyDuration, prettyPrice, prettyShortenNumber } from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { TranslatedProps } from "types/TranslatedProps";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  thumbnailAspectRatio?: string;
  thumbnailForceAspectRatio?: boolean;
  thumbnailRounded?: boolean;
  href: string;
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  description?: string | null | undefined;
  topChips?: string[];
  bottomChips?: string[];
  keepInfoVisible?: boolean;
  metadata?: {
    releaseDate?: DatePickerFragment | null;
    releaseDateFormat?: Intl.DateTimeFormatOptions["dateStyle"];
    price?: PricePickerFragment | null;
    views?: number;
    author?: string;
    position: "Bottom" | "Top";
  };
  infoAppend?: React.ReactNode;
  hoverlay?:
    | {
        __typename: "Video";
        duration: number;
      }
    | { __typename: "anotherHoverlayName" };
  disabled?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PreviewCard = ({
  href,
  thumbnail,
  thumbnailAspectRatio = "4/3",
  thumbnailForceAspectRatio = false,
  thumbnailRounded = true,
  pre_title,
  title,
  subtitle,
  description,
  topChips,
  bottomChips,
  keepInfoVisible,
  metadata,
  hoverlay,
  infoAppend,
  disabled = false,
}: Props): JSX.Element => {
  const currency = useAtomGetter(atoms.settings.currency);
  const currencies = useAtomGetter(atoms.localData.currencies);
  const isHoverable = useDeviceSupportsHover();
  const router = useRouter();

  const metadataJSX = (
    <>
      {metadata && (metadata.releaseDate || metadata.price) && (
        <div className="flex w-full flex-row flex-wrap gap-x-3">
          {metadata.releaseDate && (
            <p className="text-sm">
              <Ico icon={Icon.Event} className="mr-1 translate-y-[.15em] !text-base" />
              {prettyDate(metadata.releaseDate, router.locale)}
            </p>
          )}
          {metadata.price && (
            <p className="justify-self-end text-sm">
              <Ico icon={Icon.ShoppingCart} className="mr-1 translate-y-[.15em] !text-base" />
              {prettyPrice(metadata.price, currencies, currency)}
            </p>
          )}
          {metadata.views && (
            <p className="text-sm">
              <Ico icon={Icon.Visibility} className="mr-1 translate-y-[.15em] !text-base" />
              {prettyShortenNumber(metadata.views)}
            </p>
          )}
          {metadata.author && (
            <p className="text-sm">
              <Ico icon={Icon.Person} className="mr-1 translate-y-[.15em] !text-base" />
              {metadata.author}
            </p>
          )}
        </div>
      )}
    </>
  );

  return (
    <UpPressable className="grid items-end text-left" href={href} noBackground disabled={disabled}>
      <div className={cJoin("group", cIf(disabled, "pointer-events-none touch-none select-none"))}>
        {thumbnail ? (
          <div
            className="relative"
            style={{
              aspectRatio: thumbnailForceAspectRatio ? thumbnailAspectRatio : "unset",
            }}>
            <Img
              className={cJoin(
                cIf(
                  thumbnailRounded,
                  cIf(keepInfoVisible, "rounded-t-md", "rounded-md notHoverable:rounded-b-none")
                ),
                cIf(thumbnailForceAspectRatio, "h-full w-full object-cover")
              )}
              src={thumbnail}
              quality={ImageQuality.Medium}
            />

            {hoverlay && hoverlay.__typename === "Video" && (
              <>
                <div
                  className="group absolute inset-0 grid place-content-center bg-shade bg-opacity-0
                  text-light transition-colors
                  hover:bg-opacity-50">
                  <Ico
                    icon={Icon.PlayCircleOutline}
                    className="!text-6xl text-black opacity-0 drop-shadow-lg transition-opacity
                  shadow-shade group-hover:opacity-100"
                  />
                </div>
                <div
                  className="absolute right-2 bottom-2 rounded-full bg-black bg-opacity-60 px-2
                  text-light">
                  {prettyDuration(hoverlay.duration)}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            style={{ aspectRatio: thumbnailAspectRatio }}
            className={cJoin(
              "relative w-full bg-highlight",
              cIf(keepInfoVisible, "rounded-t-md", "rounded-md notHoverable:rounded-b-none")
            )}
          />
        )}
        <div
          className={cJoin(
            "z-20 grid gap-2 p-4 transition-opacity linearbg-obi",
            cIf(
              !keepInfoVisible && isHoverable,
              `-inset-x-0.5 bottom-2 opacity-0 shadow-shade
               [border-radius:10%_10%_10%_10%_/_1%_1%_3%_3%]
               group-hover:opacity-100 hoverable:absolute hoverable:drop-shadow-lg
               notHoverable:rounded-b-md notHoverable:opacity-100`,
              "[border-radius:0%_0%_10%_10%_/_0%_0%_3%_3%]"
            )
          )}>
          {metadata?.position === "Top" && metadataJSX}
          {topChips && topChips.length > 0 && (
            <div
              className="grid grid-flow-col place-content-start gap-1 overflow-x-scroll
            scrollbar-none">
              {topChips.map((text, index) => (
                <Chip key={index} text={text} />
              ))}
            </div>
          )}
          <div className="my-1">
            {pre_title && <p className="mb-1 leading-none break-words">{pre_title}</p>}
            {title && (
              <p className="font-headers text-lg font-bold leading-none break-words">{title}</p>
            )}
            {subtitle && <p className="leading-none break-words">{subtitle}</p>}
          </div>
          {description && <p>{description}</p>}
          {bottomChips && bottomChips.length > 0 && (
            <div
              className="grid grid-flow-col place-content-start gap-1 overflow-x-scroll
            scrollbar-none">
              {bottomChips.map((text, index) => (
                <Chip key={index} className="text-sm" text={text} />
              ))}
            </div>
          )}

          {metadata?.position === "Bottom" && metadataJSX}

          {infoAppend}
        </div>
      </div>
    </UpPressable>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedPreviewCard = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Props, "description" | "pre_title" | "subtitle" | "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });
  return (
    <PreviewCard
      pre_title={selectedTranslation?.pre_title ?? fallback.pre_title}
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      description={selectedTranslation?.description ?? fallback.description}
      {...otherProps}
    />
  );
};
