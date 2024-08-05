

export default function Skeleton() {
  return (
    <div className="container mx-auto p-4">
    <div className="block md:flex items-center justify-center mb-4 mt-2">
        <div className="skeleton skeleton-text" style={{ width: "100%", height: "40px" }}></div>
    </div>
    <div className="block md:flex items-center justify-center mb-4 mt-2">
        <div className="skeleton skeleton-text" style={{ width: "100%", height: "40px" }}></div>
    </div>
    <div className="rounded-xl">
        <div className="overflow-x-auto">
            <table className="border-collapse block md:table min-w-full table-auto bg-white border border-gray-200 skeleton-table">
                <thead className="block md:table-header-group">
                    <tr className="border text-base border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative bg-yellow-500 text-black">
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                        <th className="p-2 font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group text-sm md:text-xs">
                    {[...Array(6)].map((_, index) => (
                        <tr key={index} className="bg-gray-500 md:bg-white text-left md:text-center hover:bg-gray-200 transition-colors duration-200 border border-gray-500 md:border-none block md:table-row">
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                            <td className="p-1 md:border md:border-gray-500 block md:table-cell">
                                <div className="skeleton skeleton-text"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex justify-center mt-4">
            <div className="skeleton skeleton-text" style={{ width: "200px", height: "40px" }}></div>
        </div>
    </div>
</div>
  );
}
