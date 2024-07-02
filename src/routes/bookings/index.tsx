import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import BookingsTable from "~/components/bookingsTable";
import type { BookingListType } from "~/types/apiTypes";

export const useFetchBookings = routeLoader$(async (requestEvent) => {
  const apiKey = requestEvent.env.get("API_KEY");
  const apiURL = requestEvent.env.get("API_URL");
  if (!apiKey || !apiURL) return { error: true, data: null };
  const response = await fetch(`${apiURL}/bookings`, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  });
  const responseData = await response.json();
  return { error: false, data: responseData as BookingListType[] };
});

export default component$(() => {
  const bookings = useFetchBookings();
  const hasTableData = !bookings.value.error;

  if (!hasTableData || !bookings.value.data)
    return (
      <div class="flex flex-col">
        No Data Found{" "}
        <a href="/" class=" text-slate-500 no-underline hover:text-slate-800 ">
          Back
        </a>
      </div>
    );
  return (
    <>
      <BookingsTable tableData={bookings.value.data} />
    </>
  );
});
