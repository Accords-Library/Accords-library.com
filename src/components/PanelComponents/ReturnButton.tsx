import Button from "components/Button";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";

type ReturnButtonProps = {
  href: string;
  title: string;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  return <Button href={props.href}>❮&emsp;{props.langui.global_return_label} {props.title}</Button>;
}
