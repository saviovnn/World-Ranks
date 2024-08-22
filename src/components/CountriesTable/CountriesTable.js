import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import styles from "./CountriesTable.module.css";
import { useState } from "react";
import Link from "next/link";

const orderBy = (countries, value, direction) => {
  if (value === "name") {
    return [...countries].sort((a, b) => {
      if (direction === "asc") {
        return a[value].common.localeCompare(b[value].common);
      } else if (direction === "desc") {
        return b[value].common.localeCompare(a[value].common);
      }
      return 0;
    });
  } else if (value === "population") {
    return [...countries].sort((a, b) => {
      if (direction === "asc") {
        return a[value] - b[value];
      } else if (direction === "desc") {
        return b[value] - a[value];
      }
      return 0;
    });
  }

  return countries;
};
const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div>
        <div className={styles.heading}>
          <button
            className={styles.heading_name}
            onClick={() => setValueAndDirection("name")}
          >
            <div>Name</div>

            {value === "name" && <SortArrow direction={direction} />}
          </button>

          <button
            className={styles.heading_population}
            onClick={() => setValueAndDirection("population")}
          >
            <div>Population</div>

            {value === "population" && <SortArrow direction={direction} />}
          </button>
        </div>

        {orderCountries.map((country) => (
          <Link href={`/country/${country.alpha3Code}`}>
            <div className={styles.row}>
              <div className={styles.name}>{country.name.common}</div>

              <div className={styles.population}>{country.population}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountriesTable;
