import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <nav class="flex w-full flex-col bg-white px-6 py-4 text-center font-sans shadow sm:flex-row sm:items-baseline sm:justify-between sm:text-left">
      <div class="mb-2 sm:mb-0">
        <a
          href="/"
          class="text-grey-darkest hover:text-blue-dark text-2xl no-underline"
        >
          Bookings App Home
        </a>
      </div>
      <div>
        <a
          href="/bookings"
          class="ml-2 text-lg text-slate-500 no-underline hover:text-slate-800"
        >
          View Bookings
        </a>
      </div>
    </nav>
  );
});
