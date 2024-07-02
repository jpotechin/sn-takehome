import { component$ } from "@builder.io/qwik";

import {
  daysBetween,
  handleCurrency,
  handleDate,
  handleStatus,
} from "~/helpers/utils";
import type { BookingType } from "~/types/apiTypes";

interface BookingTableType {
  tableData: BookingType;
}

function handleName(firstName: string, lastName: string): string {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  return "Unknown";
}

function handleCustomerBooking(ids: number[] | null) {
  if (ids) {
    return ids.map((id) => (
      <a
        key={id}
        href={`/bookings/${id}`}
        class="gap-3 text-blue-600 hover:text-indigo-900"
      >
        {id}
      </a>
    ));
  }
  return <p>"No additional bookings"</p>;
}

function handleNullDate(date: string | null, nullMsg: string) {
  if (date) {
    return handleDate(date);
  }

  return nullMsg;
}
function handleAboveMaxOccupants(bookingData: BookingType): boolean {
  if (!bookingData.room.maxOccupancy || !bookingData.occupancy) return false;
  if (bookingData.room.maxOccupancy < bookingData.occupancy) return true;
  return false;
}

export default component$(({ tableData }: BookingTableType) => {
  const aboveMaxOccupants = handleAboveMaxOccupants(tableData);
  const customerName = handleName(
    tableData.customer.firstName,
    tableData.customer.lastName,
  );
  return (
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">
            Booking details for {tableData.hotel.name} - {tableData.room.name}{" "}
            for: {customerName}
          </h1>
          <p class="mt-2 text-sm text-gray-700">
            Check In Date: {handleDate(tableData.checkInDate)}
          </p>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <p class="font-medium">Customer Details:</p>
            <p>Customer Name: {customerName}</p>
            <p>Customer Email: {tableData.customer.email}</p>
            <div class="flex flex-wrap gap-2">
              Additional Customer bookings:{" "}
              {handleCustomerBooking(tableData.customer.bookingIds)}
            </div>
            <div class="mt-4">
              <p class="font-medium">Hotel Details:</p>
              <p>
                Reservation Status:{" "}
                {handleStatus(tableData.paidInFullAt, tableData.cancelledAt)}
              </p>

              <p>Hotel Name: {tableData.hotel.name}</p>
              <p>Room Name: {tableData.room.name}</p>
              <p>Room max units: {tableData.room.maxUnits}</p>
              <p>Max Room Occupants: {tableData.room.maxOccupancy}</p>
              <p
                class={`${aboveMaxOccupants ? "font-semibold text-red-500" : ""}`}
              >
                Occupants: {tableData.occupancy}
              </p>
              <p>Created: {handleDate(tableData.createdAt)}</p>
              <p>Check In Date: {handleDate(tableData.checkInDate)}</p>
              <p>Check Out Date: {handleDate(tableData.checkOutDate)}</p>
              <p>
                Length of Stay:{" "}
                {daysBetween(tableData.checkInDate, tableData.checkOutDate)}
              </p>
              <p>
                Total: {handleCurrency(tableData.total, tableData.currencyCode)}
              </p>
              <p>
                Paid in Full:{" "}
                {handleNullDate(tableData.paidInFullAt, "Not paid in full")}{" "}
              </p>
              <p>
                Cancelled At :{" "}
                {handleNullDate(tableData.cancelledAt, "Not Cancelled")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
