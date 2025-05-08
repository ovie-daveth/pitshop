import { ChevronDownIcon } from "@heroicons/react/solid";
import { BiChevronDown, BiChevronDownCircle } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

 const Filters = () => {

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-gray-500">
                <CiFilter className="text-lg text-black" />
                Filter:
            </div>
            <select className="text-green-800 text-sm flex items-center font-bold">
               <option value="">Single</option>
               <option value="">Both</option>
            </select>
        </div>
    )
 }


 export default Filters