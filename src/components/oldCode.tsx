import { useCallback, useEffect, useState } from "react";
const REGIONs_LIST = [
  "America",
  "Antarctic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];
const STATUS_LIST = ["Member of the United Nation", "Independent"];

const SORT_BY_LIST = ["population", "area", "alphabetical order"];

const CheckBox = ({ text, handleClick, status }) => {
  const isSelected = status.indexOf(text) !== -1;
  return (
    <div>
      <div
        onClick={() => handleClick(text)}
        className="inline-flex items-center  "
      >
        <label className="flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            checked={isSelected}
            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
            id="check1"
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <p className="pl-2">{text}</p>
      </div>
    </div>
  );
};

function ContryRanking() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedSort, setSelectedSort] = useState("population");
  const [status, setStatus] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    // fetch data from api
  }, [selectedRegion, selectedSort]);

  const handleStatusSelector = useCallback((status: string): void => {
    setStatus((prevStatus) => {
      const present = prevStatus.indexOf(status);
      const copy = [...prevStatus];

      if (present !== -1) {
        copy.splice(present, 1);
      } else {
        copy.push(status);
      }

      return copy;
    });
  });

  const handleRegionSelector = useCallback(
    (region: string): void => {
      setSelectedRegion((prevSelected) => {
        const present = prevSelected.indexOf(region);
        const copy = [...prevSelected];

        if (present !== -1) {
          copy.splice(present, 1); // Remove the region if already selected
        } else {
          copy.push(region); // Add the region if not selected
        }

        return copy;
      });
    },
    [] // No external dependencies needed
  );

  return (
    <div>
      <div>
        <div>Found 234 countreis</div>
        <form className="max-w-md mx-auto">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
          </div>
        </form>
      </div>

      <div>
        <div>
          <div>
            <label
              for="sort"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Sort by
            </label>
            <select
              id="sort"
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {SORT_BY_LIST.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-sm font-medium">Region</h3>
            <div className="flex gap-4">
              {REGIONs_LIST.map((item) => (
                <div
                  className={`${
                    selectedRegion.indexOf(item) !== -1 && "bg-[#282B30]"
                  }   p-2 px-3 inline-block text-sm font-medium text-[#AEB1B6] rounded-xl`}
                  onClick={() => handleRegionSelector(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm">Status</h3>
            {STATUS_LIST.map((item) => (
              <CheckBox
                handleClick={handleStatusSelector}
                status={status}
                text={item}
              />
            ))}
          </div>
        </div>
        <div>
          <table>
            <thead className="text-sm">
              <tr className="flex gap-2">
                <th>Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>Area (km²)</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContryRanking;
