import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div>
        <a
          href="/bookings"
          class="ml-2 text-lg text-slate-500 no-underline hover:text-slate-800"
        >
          Check out your Bookings
        </a>
        <br />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Bookings App Take Home",
  meta: [
    {
      name: "description",
      content: "Take Home for Suitenes",
    },
  ],
};
