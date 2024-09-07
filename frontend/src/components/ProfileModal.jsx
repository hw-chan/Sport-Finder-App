import { useState, useEffect } from "react";
import { GetCountries, GetState } from "react-country-state-city";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

export default function ProfileModal({
  handleFormSubmit,
  register,
  isOpen,
  handleClose,
}) {
  const [country, setCountry] = useState("");
  const [stateOfCountry, setStateOfCountry] = useState("");

  const [countryList, setCountryList] = useState([]);
  const [stateOfCountryList, setStateOfCountryList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountryList(result);
    });
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="my-8 min-h-[20.75rem] max-w-lg overflow-hidden rounded-lg bg-white px-8 py-4 text-left data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <DialogTitle className="text-2xl font-bold">
              Edit Profile
            </DialogTitle>
            <form
              className="flex flex-col gap-8 py-8"
              onSubmit={handleFormSubmit}
            >
              <label className="flex">
                <p className="mr-2 w-16 text-right">Name: </p>
                <input
                  {...register("name")}
                  type="text"
                  className="ml-auto w-72 rounded border-2 border-black px-3 py-1"
                />
              </label>
              <label className="flex">
                <p className="w-16 text-right">Email: </p>
                <input
                  {...register("email")}
                  type="email"
                  className="ml-auto w-72 rounded border-2 border-black px-3 py-1"
                />
              </label>
              <label className="flex">
                <p className="w-16 text-right">Country: </p>
                <select
                  {...register("country")}
                  onChange={(e) => {
                    const selectedCountry = countryList.find(
                      (item) => item.name === e.target.value,
                    );
                    setCountry(selectedCountry.name);
                    GetState(selectedCountry.id).then((result) => {
                      setStateOfCountryList(result);
                    });
                  }}
                  value={country}
                  className="ml-auto w-72 rounded border-2 border-black px-3 py-1"
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
                  {...register("state")}
                  onChange={(e) => {
                    const selectedState = stateOfCountryList.find(
                      (item) => item.name === e.target.value, 
                    );
                    setStateOfCountry(selectedState.name);
                  }}
                  value={stateOfCountry}
                  disabled={stateOfCountryList.length === 0}
                  className="ml-auto w-72 rounded border-2 border-black px-3 py-1"
                >
                  {stateOfCountryList.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="mx-auto mt-4 w-36 rounded bg-blue-500 py-2 text-white"
              >
                Save profile
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
