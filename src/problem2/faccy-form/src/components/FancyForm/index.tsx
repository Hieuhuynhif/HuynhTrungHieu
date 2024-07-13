import { currency } from "../../seed";

type Props = {
  title: string;
};

export default function Fancyform({ title }: Props) {

  const currencies = currency
  console.log(currencies)

  return <div>Fancyform:{title}</div>;
}
