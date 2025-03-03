"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDirections,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DistanceFinder from "../DistanceFinder";

interface SearchProps {
  onSearch: (query: string) => void;
  map: L.Map | null;
}

const Search = ({ onSearch, map }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showDistanceFinder, setShowDistanceFinder] = useState(false);
  const [details, setDetails] = useState<{
    displayName: string;
    type?: string;
    country?: string;
    state?: string;
    coordinates?: string;
    population?: string;
    borders?: string[];
    languages?: string[];
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=5`,
        {
          headers: {
            "User-Agent": "World-Map-Explorer/1.0",
          },
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleResultClick = async (result: any) => {
    onSearch(result.display_name);
    setSearchResults([]);
    setSearchQuery(""); // Clear the search input after selection

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/details?format=json&place_id=${result.place_id}&addressdetails=1`,
        {
          headers: {
            "User-Agent": "World-Map-Explorer/1.0",
          },
        }
      );
      const data = await response.json();

      // Format the details
      const formattedDetails = {
        displayName: result.display_name.split(",")[0],
        type: result.type,
        country: data.address?.country,
        state: data.address?.state,
        coordinates: `${result.lat}, ${result.lon}`,
        population: data.extratags?.population,
        languages: data.extratags?.languages?.split(","),
        borders: data.extratags?.borders?.split(","),
      };

      setDetails(formattedDetails);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="box-input"
        id="search-container"
        aria-label="search places"
      >
        <div
          id="c-search-input"
          className="relative w-[300px] h-[30px] border-2 border-black rounded-lg bg-white"
        >
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Places"
              className="absolute inset-0 p-[7px] rounded-lg outline-none"
              tabIndex={0}
            />
            <button
              type="submit"
              id="searchbutton"
              aria-label="click to search"
              className="absolute right-0 top-0 bottom-0 w-[30px] opacity-50 cursor-pointer"
              tabIndex={0}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>

        {searchResults.length > 0 && (
          <ul
            id="search-results"
            className="list-none flex flex-col border-2 border-black w-[300px] p-0 mt-0.5 z-[1005] max-h-[200px] overflow-y-auto bg-white rounded-lg text-base"
          >
            {searchResults.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleResultClick(result)}
                className="cursor-pointer m-[3.5px] bg-[#efeaea] rounded p-0.5 text-sm hover:bg-[rgb(223,242,236)]"
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}

        {showDetails && details && (
          <div
            id="searchdetails"
            tabIndex={0}
            className="relative text-sm mt-2 w-[300px] max-h-[500px] overflow-y-auto border-2 border-black rounded-lg z-[1000] bg-white p-4"
            aria-label="Location details"
          >
            <button
              className="absolute right-2 top-2 border-none p-1 cursor-pointer hover:text-gray-600"
              id="closeBtnD"
              aria-label="Close details"
              onClick={() => setShowDetails(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="space-y-3">
              <h2 className="font-semibold text-base">{details.displayName}</h2>

              <div className="space-y-1">
                <h3 className="font-medium text-sm">Main Details</h3>
                {details.type && (
                  <p className="text-sm">Type: {details.type}</p>
                )}
                {details.state && (
                  <p className="text-sm">State: {details.state}</p>
                )}
                {details.country && (
                  <p className="text-sm">Country: {details.country}</p>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-medium text-sm">Additional Details</h3>
                {details.coordinates && (
                  <p className="text-sm">Coordinates: {details.coordinates}</p>
                )}
                {details.population && (
                  <p className="text-sm">Population: {details.population}</p>
                )}
                {details.languages && details.languages.length > 0 && (
                  <p className="text-sm">
                    Languages: {details.languages.join(", ")}
                  </p>
                )}
                {details.borders && details.borders.length > 0 && (
                  <p className="text-sm">
                    Borders: {details.borders.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className="bg-white p-2 rounded-lg border-2 border-black"
        onClick={() => setShowDistanceFinder(true)}
        aria-label="Find distance between places"
        title="Find distance between places"
      >
        <FontAwesomeIcon icon={faDirections} />
      </button>

      <div>
        {" "}
        {showDistanceFinder && (
          <DistanceFinder
            map={map}
            onClose={() => setShowDistanceFinder(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
