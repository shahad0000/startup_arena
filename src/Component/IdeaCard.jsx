import { GoArrowUp } from "react-icons/go";
import tagColors from "../Component/CatagoryColors"



export const IdeaCard = ({ ideas }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-white border border-[#E0E0E0] rounded-lg p-4 relative transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-1 ">
            <div className="absolute right-4 top-4 text-amber-300  px-2 py-1 rounded flex items-center gap-1">
              <GoArrowUp /> {idea.totalUpvotes}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {idea.categorys.map((category, idx) => (
                <span
                  key={idx}
                  className={`${tagColors[category] || 'bg-gray-200 text-gray-700'} px-2 py-1 text-xs rounded-full`}
                >
                  {category}
                </span>
              ))}
            </div>

            <h2 className="text-[18px] font-semibold mb-2">{idea.title}</h2>

            <p className="text-[14px] text-[#666666] line-clamp-3">
              {idea.description}
            </p>

<p className="text-[14px] flex gap-2 font-semibold text-[#666666] my-3">
            <p className=" text-black">Target market:</p>  <p className="text-blue-800 ">{idea.targetMarket}</p>
            </p>

            <div className="flex items-center gap-3">
              <div className="text-[13px] text-[#888888]">
                by {idea.founder}<br />
                <span className="italic text-xs font-light">{idea.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="border border-gray-300 px-6 py-3 rounded-[10px] text-[16px] font-medium focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 ">
          Load More Ideas
        </button>
      </div>
    </>
  );
};
