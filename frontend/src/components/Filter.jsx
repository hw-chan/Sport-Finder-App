import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { GetCountries, GetState } from "react-country-state-city";
import { useState, useEffect } from "react";
import { IoOptionsOutline, IoClose } from "react-icons/io5";

function Filter({
  handleSport,
  handleCountry,
  handleStateOfCountry,
  sport,
  country,
  stateOfCountry,
  handleFilter,
  handleReset,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateOfCountryList, setStateOfCountryList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      const updatedCountryList = [{ id: 0, name: "Default" }, ...result];
      setCountryList(updatedCountryList);
    });
  }, []);

  if (countryList.length === 0) return;

  return (
    <button
      className="ml-auto flex h-8 cursor-pointer items-center gap-2 self-end rounded-lg border border-black px-3 hover:bg-gray-200"
      onClick={() => setIsOpen(true)}
    >
      <IoOptionsOutline />
      Filter
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="h-[400px] w-[400px] border bg-white px-12 py-6">
            <IoClose
              className="ml-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <DialogTitle className="font-bold">Filter</DialogTitle>
            <hr className="mb-4 mt-2" />
            <div className="flex flex-col gap-4">
              <label className="flex">
                <p className="w-16 text-right">Sport: </p>
                <select
                  name="sports"
                  className="ml-4 w-48 rounded border-2 border-black px-3 py-1"
                  onChange={handleSport}
                  value={sport}
                >
                  <option hidden disabled value=""></option>
                  <option value="Default">Default</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Football">Football</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Volleyball">Volleyball</option>
                </select>
              </label>
              <label className="flex">
                <p className="w-16 text-right">Country: </p>
                <select
                  onChange={(e) => {
                    const selectedCountry = countryList.find(
                      (item) => item.name === e.target.value,
                    );
                    handleCountry(selectedCountry.name);
                    GetState(selectedCountry.id).then((result) => {
                      const updatedStateOfCountryList = [
                        { id: 0, name: "Default" },
                        ...result,
                      ];
                      setStateOfCountryList(updatedStateOfCountryList);
                    });
                  }}
                  value={country}
                  className="ml-4 w-48 rounded border-2 border-black px-3 py-1"
                >
                  {countryList.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex">
                <p className="w-16 text-right">State: </p>
                <select
                  onChange={(e) => {
                    const selectedState = stateOfCountryList.find(
                      (item) => item.name === e.target.value,
                    );
                    handleStateOfCountry(selectedState.name);
                  }}
                  value={stateOfCountry}
                  disabled={stateOfCountryList.length === 0}
                  className="ml-4 w-48 rounded border-2 border-black px-3 py-1"
                >
                  {stateOfCountryList.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-32 flex gap-4">
              <button
                onClick={() => {
                  handleReset();
                  setIsOpen(false);
                }}
                className="ml-auto rounded-lg border bg-red-600 px-4 text-white"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  handleFilter();
                  setIsOpen(false);
                }}
                className="rounded-lg border bg-blue-400 px-4 text-white"
              >
                Filter
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </button>
  );
}

export default Filter;
