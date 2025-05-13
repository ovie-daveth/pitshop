"use client"

import Folder from "./item";

const Collection = () => {

    const folders = [
        { name: "Landscape pictures", count: 3 },
        { name: "Portrait pictures", count: 3 },
        { name: "Blue pictures", count: 2 },
      ];
    return (
        <div className="p-4 min-h-screen w-full">
                <div className="flex w-full flex-wrap gap-5">
                    {folders.map((folder, index) => (
                    <div key={index} className="w-[30%]">
                        {Array.from({ length: folder.count }).map((_, i) => (
                        <Folder key={i} name={folder.name} />
                        ))}
                    </div>
                    ))}
                </div>
                </div>

    )
}

export default Collection