import React from "react";
import investmentIdea from "../public/images/Market-launch-pana.png";
import { Country, City } from "country-state-city";

function SignUpSecondStep({ formData, setFormData, onBack, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Load countries from library
  const countries = Country.getAllCountries();

  // Load cities only for the selected country
  const cities = formData.country
    ? City.getCitiesOfCountry(formData.country) // expects ISO code
    : [];

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4 py-6 bg-gray-50">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between items-center gap-12 p-6 rounded-lg">
        
        {/* Left - Image */}
        <div className="hidden lg:flex w-full lg:w-3/3 aspect-[51/0] mx-auto">
          <img
            src={investmentIdea}
            alt="Investment Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="mb-8 text-center">
            <p className="text-2xl font-bold mb-1">SIGNUP</p>
            <p className="text-lg font-bold">Create New Account</p>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Join our startup community
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
            
            {/* Age */}
            <div>
              <label className="block text-sm font-medium mb-1">Age:</label>
              <input
                type="number"
                name="age"
                placeholder="e.g. 25"
                value={formData.age}
                onChange={handleChange}
                className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    country: e.target.value,
                    city: "", // reset city when country changes
                  }));
                }}
                required
                className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                disabled={!formData.country}
                className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select city</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={onBack}
                className="py-2 w-full rounded-lg bg-gray-300 text-black text-sm font-medium hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="py-2 w-full rounded-lg bg-[#1E40AF] text-white text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpSecondStep;
