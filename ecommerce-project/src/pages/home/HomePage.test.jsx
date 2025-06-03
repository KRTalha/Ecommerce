// import { HomePage } from "./HomePage";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router";
// import { describe, expect, it, vi, beforeEach } from "vitest";
// import { userEvent } from "@testing-library/user-event";
// import axios from "axios";
// vi.mock("axios");

// describe("Testing HomePage ", () => {
//   let loadPage;
//   beforeEach(() => {
//     loadPage = vi.fn();

//     axios.get.mockImplementation(async (urlPath) => {
//       if (urlPath === "/api/products") {
//         return {
//           data: [
//             {
//               id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//               image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//               name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//               rating: {
//                 stars: 4.5,
//                 count: 87,
//               },
//               priceCents: 1090,
//               keywords: ["socks", "sports", "apparel"],
//             },
//             {
//               id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//               image: "images/products/intermediate-composite-basketball.jpg",
//               name: "Intermediate Size Basketball",
//               rating: {
//                 stars: 4,
//                 count: 127,
//               },
//               priceCents: 2095,
//               keywords: ["sports", "basketballs"],
//             },
//           ],
//         };
//       }
//     });
//   });
//   it("checking if the page is rendring the objects", () => {
//     render(
//       <MemoryRouter>
//         <HomePage cart={[]} loadPage={loadPage} />
//       </MemoryRouter>
//     );
//   });
// });

// describe("HomePage Component", () => {
//   it("Checking if rendering everthing in good way", () => {
//     let loadPage;
//     beforeEach(() => {
//       loadPage = vi.fn();

//       axios.get.Implementation(async (urlPath) => {
//         if (urlPath === "/api/products") {
//           return {
//             data: [
//               {
//                 id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//                 image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//                 name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//                 rating: {
//                   stars: 4.5,
//                   count: 87,
//                 },
//                 priceCents: 1090,
//                 keywords: ["socks", "sports", "apparel"],
//               },
//               {
//                 id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//                 image: "images/products/intermediate-composite-basketball.jpg",
//                 name: "Intermediate Size Basketball",
//                 rating: {
//                   stars: 4,
//                   count: 127,
//                 },
//                 priceCents: 2095,
//                 keywords: ["sports", "basketballs"],
//               },
//             ],
//           };
//         }
//       });
//     });
//     render(<HomePage cart={[]} loadPage={loadPage} />);
//   });
// });
