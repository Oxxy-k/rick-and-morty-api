import React, { useContext } from "react";
import { Select } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import { LngContext } from "../../contex/locale";

const locales = ["ru", "en"];

const LocaleDropdown = () => {
  const intl = useIntl();
  const { locale, changeLocale } = useContext(LngContext);

  const onChange = (key) => {
    changeLocale(key);
  };

  return (
    <Select
      w="120px"
      value={locale}
      onChange={(i) => onChange(i.target.value)}
      border="none"
      _focus={{ outline: "none" }}
      cursor="pointer"
      size="lg"
      color="gray"
      height="40px"
    >
      {locales.map((item) => (
        <option
          key={item}
          value={item}
          style={{
            backgroundColor: "black",
          }}
        >
          {intl.formatMessage({ id: `languages.${item}` })}
        </option>
      ))}
    </Select>
  );
};

export default LocaleDropdown;
