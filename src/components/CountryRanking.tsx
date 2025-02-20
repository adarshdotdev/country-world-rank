import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCountriesData } from "./fetchCountriesData";

const REGIONS_LIST = [
  "Americas",
  "Antarctic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];
const STATUS_LIST = ["Member of the United Nation", "Independent"];
const SORT_BY_LIST = ["population", "area", "alphabetical order"];

const CheckBox = ({ text, handleClick, status }) => {
  const isSelected = status.includes(text);

  return (
    <div>
      <div
        onClick={() => handleClick(text)}
        className="inline-flex items-center cursor-pointer"
      >
        <label className="flex items-center relative">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleClick(text)}
            className="peer bg-none h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
          />
          <span className="absolute text-xl  text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            ✅
          </span>
        </label>
        <p className="pl-2">{text}</p>
      </div>
    </div>
  );
};

function CountryRanking() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("population");
  const [status, setStatus] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [allCountryData, setAllCountryData] = useState<null | []>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetchAllCountriesData();
        setAllCountryData(res);
        setCountries(res); // Set initial countries data
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    }
    fetchData();
  }, []);

  const filterData = useCallback(() => {
    if (!allCountryData) return;

    let filteredData = [...allCountryData];

    // Apply region filtering
    if (selectedRegion.length) {
      filteredData = filteredData.filter((country) =>
        selectedRegion.includes(country.region)
      );
    }

    // Apply status filtering
    if (status.length) {
      filteredData = filteredData.filter((country) => {
        const isUnMember = Boolean(country.unMember);
        const isIndependent = Boolean(country.independent);

        return (
          (status.includes("Member of the United Nation") && isUnMember) ||
          (status.includes("Independent") && isIndependent)
        );
      });
      console.log(filteredData);
    }

    // Apply search query filtering
    if (query) {
      filteredData = filteredData.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply sorting
    if (selectedSort === "population") {
      filteredData.sort((a, b) => b.population - a.population);
    } else if (selectedSort === "area") {
      filteredData.sort((a, b) => b.area - a.area);
    } else {
      filteredData.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    setCountries(filteredData);
  }, [allCountryData, selectedRegion, selectedSort, query, status]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const handleStatusSelector = useCallback((status: string) => {
    setStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  }, []);

  const handleRegionSelector = useCallback((region: string) => {
    setSelectedRegion((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  }, []);

  return (
    <div className="p-5   rounded-xl mx-4 max-w-[1100px] md:w-9/10 md:mx-auto border font-medium border-[#6C727F]  bg-[#1C1D1F] md:p-10">
      <div className="flex flex-col md:flex-row gap-6 md:justify-between md:items-center mb-5">
        <p>Found {countries.length} countries</p>
        <div className="text-[#D2D5DA] bg-[#282B30] flex  gap-2 shadow-md px-3 font-medium md:w-[450px]  w-full rounded-xl">
          <img src="/Search.svg" alt="search-icon" width={20} height={20} />
          <input
            type="search"
            placeholder="Search by Name, Region..."
            className="  py-3 w-full border-none outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
        <div className=" md:w-[240px] p-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="border border-[#6C727F] rounded-lg  p-3  "
            >
              {SORT_BY_LIST.map((item) => (
                <option className="bg-[#282B30]  " key={item} value={item}>
                  {item.replace(/\b\w/g, (char) => char.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <h3>Region</h3>
            <div className="flex gap-3 flex-wrap">
              {REGIONS_LIST.map((item) => (
                <div
                  key={item}
                  className={`py-2 px-3 inline-block font-medium rounded-xl cursor-pointer ${
                    selectedRegion.includes(item) ? "bg-[#282B30]" : ""
                  }`}
                  onClick={() => handleRegionSelector(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3>Status</h3>
            {STATUS_LIST.map((item) => (
              <CheckBox
                key={item}
                handleClick={handleStatusSelector}
                status={status}
                text={item}
              />
            ))}
          </div>
        </div>
        <div className=" px-3 max-w-[700px]">
          <ContentTable data={countries} />
        </div>
      </div>
    </div>
  );
}

const ContentTable = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-x-auto max-w-[800px] mx-auto ">
      <table className="w-full table-fixed     text-left text-gray-500 dark:text-gray-400 ">
        <thead className=" ">
          <tr className=" w-full   border-b border-[#282B30] ">
            <th scope="col" className=" py-5 text-center  font-semibold w-1/4">
              Flag
            </th>
            <th scope="col" className="px-4  font-semibold w-1/4">
              Name
            </th>
            <th scope="col" className="px-4  font-semibold w-1/4">
              Population
            </th>
            <th scope="col" className="px-4   font-semibold w-1/4">
              Area (km²)
            </th>
          </tr>
        </thead>
        <tbody className="  ">
          {data.map((country) => (
            <tr key={country.name.common} className="  ">
              <td
                onClick={() => navigate(`/countryDetail/${country?.cca2}`)}
                className="px-4 cursor-pointer py-4 w-1/4  "
              >
                <img
                  className="rounded-lg mx-auto max-w-[60px] h-auto"
                  src={country.flags.svg}
                  alt={country.name.common}
                />
              </td>
              <td
                onClick={() => navigate(`/countryDetail/${country?.cca2}`)}
                className="px-4 py-4 w-1/4 text-base cursor-pointer"
              >
                {country.name.common}
              </td>
              <td className="px-4 py-4 w-1/4 text-base">
                {country.population.toLocaleString()}
              </td>
              <td className="px-4 py-4 w-1/4 text-base">
                {country.area.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryRanking;
