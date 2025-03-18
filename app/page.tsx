import { ArrowLeftCircleIcon } from "lucide-react";

export default function Home() {
  const loginCredentials = [
      'yewed65417@bankrau.com',
  ]
  return (
    <main>
      <div className="flex space-x-2 items-center animate-pulse pb-20">
        <ArrowLeftCircleIcon size="32" />
        <h1 className="font-bold">Get started with creating a new Document!</h1>
      </div>

      <h2>Testing Credentials: </h2>
      <div className="inline-block relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
            </tr>
          </thead>
          <tbody>
            {loginCredentials.map(login => {
              return <tr key={login} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {login}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {login}
                </th>
              </tr>
            })}
          </tbody>
        </table>
      </div>

    </main>
  );
}
