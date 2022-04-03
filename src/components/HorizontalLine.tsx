interface Props {
  className?: string;
}

export default function HorizontalLine(props: Props): JSX.Element {
  return (
    <div
      className={`h-0 w-full my-8 border-t-[3px] border-dotted border-black ${props.className}`}
    ></div>
  );
}
