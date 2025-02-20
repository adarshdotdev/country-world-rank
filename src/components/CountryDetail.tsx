import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchNeigbouringCountries,
  fetchSingleCountryData,
} from "./fetchCountriesData";

export default function ContrayDetail() {
  const { id } = useParams<{ id: string }>();

  const [countryData, setCountryData] = useState<object | null>(null);
  const [neighbourContries, setNeibourContreis] = useState<null | []>(null);
  console.log(countryData);
  useEffect(() => {
    async function fetch() {
      try {
        const res = await fetchSingleCountryData(id);
        setCountryData(res);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await fetchNeigbouringCountries(countryData?.borders);
        setNeibourContreis(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [countryData]);

  // console.log(countryData, neighbourContries);
  //   console.log(allCountryData[id]);
  if (countryData === null) return <div>loading...</div>;
  return (
    <div className="bg-[#1C1D1F] mx-auto border shadow-xl p-5 border-[#282B30] rounded-xl max-w-[800px] relative flex flex-col items-center gap-6 mb-15 text-base">
      <div className="w-70 overflow-hidden rounded-xl   -top-8   absolute ">
        <img src={countryData?.flags?.svg} alt="flag-image" />
      </div>
      <div className="mt-41   text-center">
        <p className="font-bold text-2xl">{countryData.name.common}</p>
        <p className="font-medium">{countryData.altSpellings[1]}</p>
      </div>
      <div className="flex gap-6 font-medium text-base">
        <div className="bg-[#282B30] py-2 px-5 rounded-lg flex items-center">
          <p className="border-r-2 py-2 pr-4 mr-4 border-[#1C1D1F]">
            Population
          </p>
          <p>{countryData.population.toLocaleString()}</p>
        </div>
        <div className="bg-[#282B30] py-2 px-5 rounded-lg flex items-center">
          <p className="border-r-2 py-2 pr-4 mr-4 border-[#1C1D1F]">
            Area(km²)
          </p>
          <p>{countryData.area.toLocaleString()}</p>
        </div>
      </div>
      <ul className="font-medium w-full">
        <li className="flex border-t justify-between items-center py-4 border-b border-[#282B30] ">
          <p>Capital</p>
          <p>{countryData.capital[0]}</p>
        </li>
        <li className="flex justify-between items-center py-4 border-b border-[#282B30] ">
          <p>Subregion</p>
          <p>{countryData.subregion}</p>
        </li>
        <li className="flex justify-between items-center py-4 border-b border-[#282B30] ">
          <p>Language</p>

          <p>{Object.values(countryData.languages).join(", ")}</p>
        </li>
        <li className="flex justify-between items-center py-4 border-b border-[#282B30] ">
          <p>Currencies</p>
          <p>{Object.values(countryData.currencies)[0].name}</p>
        </li>
        <li className="flex justify-between items-center py-4 border-b border-[#282B30] ">
          <p>Continents</p>
          <p>{Object.values(countryData.continents).join(", ")}</p>
        </li>
      </ul>

      <div className="flex flex-col gap-5 w-full mb-10 ">
        <p>Neigbouring Contaries</p>
        <div className="flex gap-5 flex-wrap  ">
          {neighbourContries?.map((item) => (
            <div className="flex flex-col items-center">
              <div className="w-22 h-15 rounded-md overflow-hidden">
                <img
                  src={item.flag}
                  alt="flag image"
                  className="w-full h-full"
                />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
