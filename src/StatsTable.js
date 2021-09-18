import React from 'react'
import { getFlyerStats } from './utils'

export default function StatsTable() {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getFlyerStats()

      setData(response.data.data)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col w-9/12 mx-auto">
      <h1 className="mt-32 mb-12 text-3xl text-center">Flyer Stats</h1>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Event ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Scans
                  </th>
                  {/* <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((record, index) => (
                  <tr key={record.eventId}>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {record.eventId}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-500 whitespace-nowrap">
                      {record.scans}
                    </td>
                    {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
