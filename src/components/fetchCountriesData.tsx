export const fetchAllCountriesData = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    if (!res.ok) {
      console.log(res);
      return;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleCountryData = async (countryCode: string) => {
  console.log("this is rock !", countryCode);
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    if (!response.ok) {
      alert("Something went worng");
      console.log(response);
      return;
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const fetchNeigbouringCountries = async (list: []) => {
  const allCountries = await fetchAllCountriesData();

  const res = [];

  for (let i = 0; i < list.length; i++) {
    let country = allCountries.find((item) => item.cca3 === list[i]);
    let item = {};
    item.name = country.name.common;
    item.flag = country.flags.svg;
    res.push(item);
  }
  // console.log("ssssssssss", res);

  return res;
};
