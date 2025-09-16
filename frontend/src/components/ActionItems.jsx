export const ActionItems = (value) => {
    return (
        <>
            {value ? <li className="p-4 w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex item-center">
                        <input id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label className="w-full mx-4 text-sm font-medium text-gray-900 dark:text-gray-300">{value.items.action_item}</label>
                    </div>
                </li>
            : <div>LOADING</div>}
        </>
        
    )
}