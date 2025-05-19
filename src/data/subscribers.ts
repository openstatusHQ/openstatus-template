export const subscribers = [
  {
    id: "1",
    email: "john.doe@example.com",
    createdAt: "2021-01-01",
    validatedAt: "2021-01-01",
  },
  {
    id: "2",
    email: "jane.doe@example.com",
    createdAt: "2021-01-01",
    validatedAt: "2021-01-01",
  },
];

export type Subscriber = (typeof subscribers)[number];
