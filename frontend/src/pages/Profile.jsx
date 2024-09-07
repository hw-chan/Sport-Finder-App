import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchProfile, createProfile } from "../features/profile/profileSlice";
import ProfileModal from "../components/ProfileModal";
import profilepic from "../assets/profilepic.png";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const name = useSelector((state) => state.profile.name);
  const email = useSelector((state) => state.profile.email);
  const country = useSelector((state) => state.profile.country);
  const stateOfCountry = useSelector((state) => state.profile.stateOfCountry);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return;

  const handleProfile = () => setIsOpen(!isOpen);

  const onSubmit = async (data) => {
    dispatch(createProfile(data));
    setIsOpen(!isOpen);
  };

  const handleClose = () => setIsOpen(!isOpen);

  return (
    <div className="mx-10 my-8">
      <p className="py-4 text-3xl font-bold desktop:ml-32">
        Profile information
      </p>
      <hr />
      <div className="flex flex-col gap-12 desktop:mt-12 desktop:h-[300px] desktop:flex-row desktop:justify-center desktop:gap-6">
        <img
          src={profilepic}
          className="mt-8 h-48 w-48 self-center desktop:my-auto"
        />
        <div className="desktop:my-auto">
          <section className="flex flex-col items-center justify-center gap-3">
            <div className="flex w-96 items-center">
              <span className="mr-2 w-[50%] text-right text-lg font-bold">
                Name:
              </span>{" "}
              {name}
            </div>
            <div className="flex w-96 items-center">
              <span className="mr-2 w-[50%] text-right text-lg font-bold">
                Email:
              </span>
              {email}
            </div>
            <div className="flex w-96 items-center">
              <span className="mr-2 w-[50%] text-right text-lg font-bold">
                Country:
              </span>
              {country}
            </div>
            <div className="flex w-96 items-center">
              <span className="mr-2 w-[50%] text-right text-lg font-bold">
                State:
              </span>
              {stateOfCountry}
            </div>
          </section>
          <div className="flex justify-center">
            <button
              className="mt-12 w-32 rounded bg-blue-500 py-2 text-white"
              onClick={handleProfile}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <ProfileModal
          handleFormSubmit={handleSubmit(onSubmit)}
          register={register}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default Profile;
