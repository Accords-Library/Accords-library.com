import { useCallback } from "react";
import { Link } from "components/Inputs/Link";
import { DatePickerFragment } from "graphql/generated";
import { cIf, cJoin } from "helpers/className";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  date: DatePickerFragment;
  title: string;
  url: string;
  isActive?: boolean;
}

const ChroniclePreview = ({ date, url, title, isActive }: Props): JSX.Element => (
  <Link
    href={url}
    className={cJoin(
      `flex w-full cursor-pointer gap-4 rounded-2xl py-4 px-5 text-left align-top outline outline-2
      -outline-offset-2 outline-mid transition-all hover:bg-mid hover:shadow-inner-sm
      hover:shadow-shade hover:outline-transparent hover:active:shadow-inner
      hover:active:shadow-shade`,
      cIf(isActive, "bg-mid shadow-inner-sm shadow-shade outline-transparent")
    )}>
    <div className="text-right">
      <p>{date.year}</p>
      <p className="text-sm text-dark">{prettyMonthDay(date.month, date.day)}</p>
    </div>
    <p className="text-lg leading-tight">{title}</p>
  </Link>
);

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedChroniclePreview = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Parameters<typeof ChroniclePreview>[0], "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });

  return <ChroniclePreview title={selectedTranslation?.title ?? fallback.title} {...otherProps} />;
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const prettyMonthDay = (
  month?: number | null | undefined,
  day?: number | null | undefined
): string => {
  let result = "";
  if (month) {
    result += month.toString().padStart(2, "0");
    if (day) {
      result += "/";
      result += day.toString().padStart(2, "0");
    }
  }
  return result;
};
