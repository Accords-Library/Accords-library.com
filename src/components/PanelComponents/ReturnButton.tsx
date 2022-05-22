import { HorizontalLine } from "components/HorizontalLine";
import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";

interface Props {
  href: string;
  title: string | null | undefined;
  langui: AppStaticProps["langui"];
  displayOn: ReturnButtonType;
  horizontalLine?: boolean;
  className?: string;
}

export enum ReturnButtonType {
  mobile = "mobile",
  desktop = "desktop",
  both = "both",
}

export function ReturnButton(props: Immutable<Props>): JSX.Element {
  const appLayout = useAppLayout();

  return (
    <div
      className={`${
        props.displayOn === ReturnButtonType.mobile
          ? "desktop:hidden"
          : props.displayOn === ReturnButtonType.desktop
          ? "mobile:hidden"
          : ""
      } ${props.className}`}
    >
      <Button
        onClick={() => appLayout.setSubPanelOpen(false)}
        href={props.href}
        className="grid grid-flow-col gap-2"
        text={`${props.langui.return_to} ${props.title}`}
        icon={Icon.NavigateBefore}
      />
      {props.horizontalLine && <HorizontalLine />}
    </div>
  );
}
