import { getCountries } from "@/_lib/data-service";

type IProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

async function SelectCountry({ defaultCountry, name, id, className }: IProps) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">选择国家...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
