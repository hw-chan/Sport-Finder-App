function AuthPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-hidden bg-mobileBackground bg-cover bg-center tablet:bg-tabletBackground desktop:block">
      <div className="mt-16 w-[75%] text-center text-white tablet:mt-24">
        <p className="mb-4 text-2xl font-bold tablet:text-4xl desktop:text-5xl">
          Find your <span className="text-[#FFE047]">Game</span>, Anytime,
          Anywhere!
        </p>
        <p className="tablet:text-lg desktop:text-xl">
          Discover local <span className="text-[#FFE047]">sports events</span>{" "}
          and join the action near you with ease and convenience.
        </p>
      </div>
      <div className="absolute bottom-0 h-8 w-full bg-black text-center text-sm text-white">
        @WeSport 2024
      </div>
    </div>
  );
}

export default AuthPage;
