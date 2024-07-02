import { component$ } from "@builder.io/qwik";
import { daysBetween, handleCurrency, handleStatus } from "~/helpers/utils";

import type { BookingListType } from "~/types/apiTypes";

interface BookingTableType {
  tableData: BookingListType[];
}

function handleBoolean(value: boolean): "Yes" | "No" | null {
  if (typeof value !== "boolean") return null;
  return value ? "Yes" : "No";
}

export default component$(({ tableData }: BookingTableType) => {
  return (
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">
            Bookings
          </h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the bookings.</p>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Hotel Name
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Check In Date
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Check Out Date
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Length of Stay
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Occupants
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Paid
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Cancelled
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    View
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {tableData.map((reservation) => {
                  return (
                    <tr key={reservation.id}>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {reservation.hotelName}
                      </td>

                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {handleStatus(reservation.paid, reservation.cancelled)}
                      </td>

                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {reservation.checkInDate}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {reservation.checkOutDate}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {daysBetween(
                          reservation.checkInDate,
                          reservation.checkOutDate,
                        )}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {reservation.occupancy}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {handleCurrency(
                          reservation.total,
                          reservation.currencyCode,
                        )}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {handleBoolean(reservation.paid)}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {handleBoolean(reservation.cancelled)}
                      </td>
                      {/* <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {reservation.id}
                      </td> */}
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a
                          href={`/bookings/${reservation.id}`}
                          class="ml-2 text-slate-500 no-underline hover:text-slate-800 "
                        >
                          View Booking
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
