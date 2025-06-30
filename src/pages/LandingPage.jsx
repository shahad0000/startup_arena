import { headerImage } from "../public/ExporImage";
import { MdRocketLaunch } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

function LandingPage() {
  return (
    <>
      <div className="">
        {/* Nav Section */}
        <section className=" flex flex-col items-center  min-h-screen max-w-screen  bg-linear-to-b from-[#1E40AF] to-white">
          <nav className="flex items-center justify-between h-20 w-full">
            {/* Logo */}
            {/* <img src="" alt="" /> */}
            <p className="text-2xl text-blue-700 font-bold w-50 text-center">
              Startup Arena Hub
            </p>
            <div className=" fixed w-full flex justify-center items-start top-5">
              <ul className="flex items-center justify-around py-2 px-2 bg-white w-150 rounded-lg">
                <li className="text-gray-600 font-medium text-sm hover:text-blue-500">
                  Home
                </li>
                <li className="text-gray-600 font-medium text-sm hover:text-blue-500">
                  Explore
                </li>
                <li className="text-gray-600 font-medium text-sm hover:text-blue-500">
                  Dashboard
                </li>
                <li className="text-gray-600 font-medium  text-sm hover:text-blue-500">
                  Watch Meetings
                </li>
              </ul>
            </div>
            <div className="flex justify-center  w-50">
              <button className="py-1 px-6 rounded border   text-white  hover:bg-blue-800s font-medium  ">
                SignIn
              </button>
            </div>
          </nav>
          {/* </section> */}
          {/* section two */}
          {/* <section> */}
          <div className="w-full">
            <div className="flex py-5">
              <div className=" px-4 py-6 w-full flex flex-col items-center justify-center gap-5 text-white">
                <div className="flex flex-col gap-3 ">
                  <p className="text-4xl w-150 font-bold text-center">
                    Turn Your Startup Ideas Into Reality
                  </p>
                  <p className="text-lg text-center w-150">
                    Submit your startup concepts, get valuable feedback from our
                    community, and connect with investors ready to fund your
                    next big idea.
                  </p>
                </div>
                <div className="flex justify-center items-center gap-5 ">
                  <button className="bg-[#FFBF00] hover:bg-[#d2ba74] py-3 px-5 rounded-lg text-black font-medium flex items-center gap-3 ">
                    <MdRocketLaunch /> Submit Your Startup Idea
                  </button>
                  <button className=" font-medium py-3 bg-blue-600 px-5 rounded-lg hover:bg-white hover:text-blue-600">
                    SignIn
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-40 flex flex-col items-center justify-center">
            <p className=" text-center text-3xl font-bold text-[#1E40AF]">
              How It Works
            </p>
            <p className="text-center text-[#1E40AF] font-medium text-lg ">
              Three simple steps to get your startup idea in front of investors
              and the community
            </p>
          </div>
        </section>
        {/* section three */}
        <section>
          <div className="flex justify-center gap-5  items-start h-70">
            <div className="flex flex-col items-center justify-center gap-3 w-80">
              <p className="py-3 px-5 rounded-full bg-[#1E40AF] w-fit text-lg font-bold text-white">
                1
              </p>
              <p className="text-2xl font-medium">Submit Your Idea</p>
              <p className="text-center text-sm text-[#757575]">
                Share your startup concept with detailed description, MVP links,
                and choose relevant industry tags.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 w-80">
              <p className="py-3 px-5 rounded-full bg-[#FFCC00] w-fit text-lg font-bold text-white">
                2
              </p>
              <p className="text-2xl font-medium">Get Community Votes</p>
              <p className="text-center text-sm text-[#757575]">
                Receive feedback and votes from our diverse community of
                critics, entrepreneurs, and industry experts.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 w-80">
              <p className="py-3 px-5 rounded-full bg-[#3ABB6B] w-fit text-lg font-bold text-white">
                3
              </p>
              <p className="text-2xl font-medium">Get Featured</p>
              <p className="text-center text-sm text-[#757575]">
                Ideas with 100+ upvotes get featured to investors who can
                schedule live meetings with you.
              </p>
            </div>
          </div>
        </section>
        {/* section four */}
        <section className="bg-gray-50 py-5 justify-center flex flex-col items-center gap-8 w-full">
          <div className="flex items-center justify-between w-250">
            <p className="text-3xl font-bold  text-center">
              Top Trending Ideas
            </p>
            <p className="flex items-center  text-[#1E40AF] text-sm font-bold">
              View All
              <span className="">
                <FaArrowRight />
              </span>
            </p>
          </div>
          <div className="flex justify-center items-center gap-8 ">
            {/* card 1 */}
            <div className="flex flex-col gap-3 w-80 border-2  border-gray-100 shadow shadow-gray-400 p-4 rounded-lg">
              <div className="flex items-center justify-between ">
                <p className="text-sm p-1 px-2 bg-[#BFDBFE] text-[#1E40AF] rounded-full">
                  Technology
                </p>
                <p className="flex items-center  text-[#4B5563] font-bold">
                  <AiFillLike className="font-medium" />
                  430
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Innovative Tech Solutions</p>
                <p className="text-sm text-[#4B5563]">
                  Explore the latest advancements in technology that can drive
                  your startup forward.
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-[#4B5563]">
                  <span className="text-black">By: </span> Alex Chen Alkharj
                </p>
                <p className="text-xs text-[#4B5563]">2 day ago</p>
              </div>
            </div>
            {/* card 2 */}
            <div className="flex flex-col gap-3 w-80 border-2  border-gray-100 shadow shadow-gray-400 p-4 rounded-lg">
              <div className="flex items-center justify-between ">
                <p className="text-sm p-1 px-2 bg-[#FECACA] text-[#991B1B] rounded-full">
                  Education
                </p>
                <p className="flex items-center  text-[#4B5563] font-bold">
                  <AiFillLike className="font-medium" />
                  133
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Online Learning Platforms</p>
                <p className="text-sm text-[#4B5563]">
                  Explore the latest advancements in technology that can drive
                  your startup forward.
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-[#4B5563]">
                  <span className="text-black">By: </span> Alex Chen Alkharj
                </p>
                <p className="text-xs text-[#4B5563]">2 day ago</p>
              </div>
            </div>
            {/* card 3 */}
            <div className="flex flex-col gap-3 w-80 border-2  border-gray-100 shadow shadow-gray-400 p-4 rounded-lg">
              <div className="flex items-center justify-between ">
                <p className="text-sm p-1 px-2 bg-[#E9D5FF] text-[#6B21A8] rounded-full">
                  Health
                </p>
                <p className="flex items-center  text-[#4B5563] font-bold">
                  <AiFillLike className="font-medium" />
                  238
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">Innovative Tech Solutions</p>
                <p className="text-sm text-[#4B5563]">
                  Explore the latest advancements in technology that can drive
                  your startup forward.
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="text-xs text-[#4B5563]">
                  <span className="text-black">By: </span> Alex Chen Alkharj
                </p>
                <p className="text-xs text-[#4B5563]">2 day ago</p>
              </div>
            </div>
          </div>
        </section>
        {/* section five */}
        <section className="h-60 ">
          <div className="h-40 flex flex-col items-center justify-center">
            <p className=" text-center text-3xl font-bold">
              Trusted by Industry Leaders
            </p>
            <p className="text-center font-medium text-[#4B5563] text-lg ">
              Join thousands of entrepreneurs and investors already using our
              platform
            </p>
          </div>
          <div className=" flex w-full font-bold justify-around text-[#585d64]">
            <p>TechCorp VC</p>
            <p>Innovation Fund</p>
            <p>StartupX Capital</p>
            <p>Future Ventures</p>
          </div>
        </section>
        {/* card ratting section */}
        <section>
          <div className="flex justify-center items-center gap-5 p-5">
            {/* rating card 1 */}
            <div>
              <div className="flex flex-col gap-5 w-80 border-2  border-gray-100 shadow shadow-gray-400 p-4 rounded-lg">
                <div className="flex items-center justify-between ">
                  <p className="flex items-center  text-[#FFCB00] font-bold">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">
                    Explore the latest advancements in technology that can drive
                    your startup forward.
                  </p>
                </div>
                <div className="flex flex-col justify-between ">
                  <p className="text-xs text-[#4B5563]">
                    <span className="text-black">By: </span> Alex Chen Alkharj
                  </p>
                  <p className="text-xs text-[#4B5563]">2 day ago</p>
                </div>
              </div>
            </div>
            {/* rating card 2 */}
            <div>
              <div className="flex flex-col gap-5 w-80 border-2  border-gray-100 shadow shadow-gray-400 p-4 rounded-lg">
                <div className="flex items-center justify-between ">
                  <p className="flex items-center  text-[#FFCB00] font-bold">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">
                    Explore the latest advancements in technology that can drive
                    your startup forward.
                  </p>
                </div>
                <div className="flex flex-col justify-between ">
                  <p className="text-xs text-[#4B5563]">
                    <span className="text-black">By: </span> Alex Chen Alkharj
                  </p>
                  <p className="text-xs text-[#4B5563]">2 day ago</p>
                </div>
              </div>
            </div>
            {/* rating card 3 */}
            <div>
              <div className="flex flex-col gap-5 w-80 border-2  border-gray-100 shadow shadow-gray-400 p-4 rounded-lg">
                <div className="flex items-center justify-between ">
                  <p className="flex items-center  text-[#FFCB00] font-bold">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#4B5563]">
                    Explore the latest advancements in technology that can drive
                    your startup forward.
                  </p>
                </div>
                <div className="flex flex-col justify-between ">
                  <p className="text-xs text-[#4B5563]">
                    <span className="text-black">By: </span> Alex Chen Alkharj
                  </p>
                  <p className="text-xs text-[#4B5563]">2 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* section six */}
        <section className="bg-[#1E40AF] h-70">
          <div className=" px-4 py-6 flex flex-col justify-center items-center h-full gap-5 text-white">
            <div className="flex flex-col gap-6">
              <p className="text-3xl font-bold text-center">
                Ready to Launch Your Startup?
              </p>
              <p className="text-lg text-center w-150">
                Join our community of entrepreneurs and investors. Submit your
                idea today and get the feedback you need to succeed.
              </p>
            </div>
            <div className="flex justify-center items-center gap-5 ">
              <button className="bg-[#FFBF00] py-2 px-4 rounded-lg text-black font-medium flex items-center gap-3 hover:bg-amber-600 ">
                Submit Your Idea Now
              </button>
              <button className="border font-medium py-2 px-4 rounded-lg hover:bg-white hover:text-blue-600">
                Browse Existing Ideas
              </button>
            </div>
          </div>
        </section>

        {/* section sven */}
        <section className="bg-[#0B1841] text-white  py-5 ">
          <div className="flex items-start justify-around">
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold">Startup Evaluation Hub</p>
              <p className="text-sm text-[#9CA3AF] w-70">
                Connecting innovative startups with investors and community
                feedback.
              </p>
              <div className="flex gap-3">
                <FaXTwitter />
                <FaLinkedin />
                <FaFacebook />
                <FaInstagram />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg">Platform</p>
              <ul className="pl-3 text-[#9CA3AF">
                <li className="text-[#9CA3AF] hover:text-white">
                  Explore Ideas
                </li>
                <li className="text-[#9CA3AF] hover:text-white">Submit Idea</li>
                <li className="text-[#9CA3AF] hover:text-white">
                  Featured Ideas
                </li>
                <li className="text-[#9CA3AF] hover:text-white">
                  Watch Meetings
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg">Resources</p>
              <ul className="pl-3 text-[#9CA3AF">
                <li className="text-[#9CA3AF] hover:text-white">Help Center</li>
                <li className="text-[#9CA3AF] hover:text-white">Guidelines</li>
                <li className="text-[#9CA3AF] hover:text-white">
                  API Documentation
                </li>
                <li className="text-[#9CA3AF] hover:text-white">
                  Success Stories
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <p className="text-lg font-bold">Startup Evaluation Hub</p>
              <p className="text-sm text-[#9CA3AF] w-70">
                Connecting innovative startups with investors and community
                feedback.
              </p>
              <div className="flex gap-3">
                <button className="bg-[#FFBF00] py-2 px-4 rounded-lg text-black font-medium flex items-center gap-3 hover:bg-amber-600 ">
                  Partner With Us
                </button>
              </div>
            </div>
          </div>
          <div className="m-8 border rounded-lg h-full items-center">
            <div className=" flex items-end justify-around py-5 text-[#9CA3AF] h-full ">
              <div>
                <p>© 2024 Startup Evaluation Hub. All rights reserved.</p>
              </div>
              <div className="flex items-end">
                <ul className="flex  items-center gap-8">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
