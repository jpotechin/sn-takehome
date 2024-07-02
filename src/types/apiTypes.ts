import z from "zod";

export const BookingListSchema = z.object({
  cancelled: z.boolean(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  currencyCode: z.string(),
  hotelName: z.string(),
  id: z.number(),
  occupancy: z.number(),
  paid: z.boolean(),
  total: z.number(),
});

export const BookingTypeSchema = z.object({
  cancelledAt: z.string().nullable(),
  checkInDate: z.string(),
  createdAt: z.string(),
  checkOutDate: z.string(),
  currencyCode: z.string(),
  customer: z.object({
    bookingIds: z.array(z.number()),
    email: z.string(),
    firstName: z.string(),
    id: z.number(),
    lastName: z.string(),
  }),
  hotel: z.object({ id: z.number(), name: z.string() }),
  id: z.number(),
  occupancy: z.number(),
  notes: z.string().nullable(),
  paidInFullAt: z.string().nullable(),
  room: z.object({
    id: z.number(),
    maxUnits: z.number(),
    maxOccupancy: z.number(),
    name: z.string(),
  }),
  total: z.number(),
  updatedAt: z.string(),
});

export type BookingListType = z.infer<typeof BookingListSchema>;
export type BookingType = z.infer<typeof BookingTypeSchema>;
