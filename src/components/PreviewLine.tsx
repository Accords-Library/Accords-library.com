import { UploadImageFragment } from "graphql/generated";
import { ImageQuality } from "helpers/img";
import { Immutable } from "helpers/types";
import Link from "next/link";
import Chip from "./Chip";
import Img from "./Img";

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  thumbnailAspectRatio?: string;
  href: string;
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  topChips?: string[];
  bottomChips?: string[];
}

export default function PreviewLine(props: Immutable<Props>): JSX.Element {
  const {
    href,
    thumbnail,
    pre_title,
    title,
    subtitle,
    topChips,
    bottomChips,
    thumbnailAspectRatio,
  } = props;

  return (
    <Link href={href} passHref>
      <div
        className="drop-shadow-shade-xl rounded-md bg-light cursor-pointer hover:scale-[1.02]
         transition-transform flex flex-row gap-4 overflow-hidden place-items-center pr-4 w-full h-36"
      >
        {thumbnail ? (
          <div className="h-full aspect-[3/2]">
            <Img image={thumbnail} quality={ImageQuality.Medium} />
          </div>
        ) : (
          <div style={{ aspectRatio: thumbnailAspectRatio }}></div>
        )}
        <div className="grid gap-2">
          {topChips && topChips.length > 0 && (
            <div className="grid grid-flow-col gap-1 overflow-hidden place-content-start">
              {topChips.map((text, index) => (
                <Chip key={index}>{text}</Chip>
              ))}
            </div>
          )}
          <div className="flex flex-col my-1">
            {pre_title && <p className="leading-none mb-1">{pre_title}</p>}
            {title && (
              <p className="font-headers text-lg leading-none">{title}</p>
            )}
            {subtitle && <p className="leading-none">{subtitle}</p>}
          </div>
          {bottomChips && bottomChips.length > 0 && (
            <div className="grid grid-flow-col gap-1 overflow-hidden place-content-start">
              {bottomChips.map((text, index) => (
                <Chip key={index} className="text-sm">
                  {text}
                </Chip>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
