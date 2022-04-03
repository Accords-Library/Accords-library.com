interface Props {
  children: React.ReactNode;
}

export default function SubPanel(props: Props): JSX.Element {
  return (
    <div className="grid pt-10 pb-20 px-6 desktop:py-8 desktop:px-10 gap-y-2 text-center">
      {props.children}
    </div>
  );
}
