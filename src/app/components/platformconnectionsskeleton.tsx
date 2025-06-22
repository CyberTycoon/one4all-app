const PlatformConnectionsSkeleton = () => (
    <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mx-2">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4 md:mb-6 animate-pulse"></div>

        <div className="space-y-4 md:space-y-6">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                                <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 sm:gap-0">
                                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end space-x-2 md:space-x-3 flex-shrink-0">
                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default PlatformConnectionsSkeleton;