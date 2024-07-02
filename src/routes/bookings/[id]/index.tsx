import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import BookingData from "~/components/bookingData";
import type { BookingType } from "~/types/apiTypes";

export const useBooking = routeLoader$(async ({ params, env }) => {
  const { id } = params;

  const apiKey = env.get("API_KEY");
  const apiURL = env.get("API_URL");
  if (!apiKey || !apiURL) return { error: true, data: null };
  const response = await fetch(`${apiURL}/bookings/${id}`, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return { error: true, data: null };
  }

  const responseData = await response.json();

  return { error: false, data: responseData as BookingType };
});

export default component$(() => {
  const bookingResource = useBooking();
  const hasTableData = !bookingResource.value.error;

  if (!hasTableData || !bookingResource.value.data)
    return (
      <div class="flex flex-col">
        No Data Found{" "}
        <a
          href="/bookings"
          class=" text-slate-500 no-underline hover:text-slate-800 "
        >
          Back
        </a>
      </div>
    );

  return (
    <div>
      <BookingData tableData={bookingResource.value.data} />
    </div>
  );
});
