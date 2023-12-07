import { http, HttpResponse } from "msw";

const handlers = [
  http.post("https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com", () => {
    return HttpResponse.json({
      active: true,
      id: "STR4897YTH1337",
      when: "2024-01-06T13:00",
      lanes: "1",
      people: "2",
      shoes: ["38", "43"],
      price: 340,
    });
  }),
];

export default handlers;
