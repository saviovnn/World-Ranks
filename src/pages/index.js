import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ countries }) {
  // console.log(countries);

  const [keyword, setKeyword] = useState("");

  const filterCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>

      <SearchInput
        placeholder="Filter by Name Region or SubRegion"
        onChange={onInputChange}
      />

      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
