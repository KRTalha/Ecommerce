import { Products } from "./Products";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import { loadESLint } from "eslint";
vi.mock("axios");

// describe("Product component", () => {
//   it("displays the product details correctly", () => {
//     const product = {
//       id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//       name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//       rating: {
//         stars: 4.5,
//         count: 87,
//       },
//       priceCents: 1090,
//       keywords: ["socks", "sports", "apparel"],
//     };

//     const loadCart = vi.fn();

//     render(<Products product={product} loadCart={loadCart} />);

//     expect(
//       screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
//     ).toBeInTheDocument();

//     expect(screen.getByText("$10.90")).toBeInTheDocument();

//     expect(screen.getByTestId("product-image")).toHaveAttribute(
//       "src",
//       "images/products/athletic-cotton-socks-6-pairs.jpg"
//     );

//     expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
//       "src",
//       "images/ratings/rating-45.png"
//     );
//     expect(screen.getByText("87")).toBeInTheDocument();
//   });
// });

describe("Check the Product component", () => {
  it("Load the component and see the result", () => {
    const product = {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    };
    const loadPage = vi.fn();
    render(<Products product={product} loadPage={loadPage} />);

    expect(
      screen.getByText("Intermediate Size Basketball")
    ).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/intermediate-composite-basketball.jpg"
    );
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-40.png"
    );
    expect(screen.getByText("127")).toBeInTheDocument();
  });

  // it("checking the user Button is working or not", async () => {
  //   const product = {
  //     id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  //     image: "images/products/intermediate-composite-basketball.jpg",
  //     name: "Intermediate Size Basketball",
  //     rating: {
  //       stars: 4,
  //       count: 127,
  //     },
  //     priceCents: 2095,
  //     keywords: ["sports", "basketballs"],
  //   };
  //   const loadPage = vi.fn();
  //   render(<Products product={product} loadPage={loadPage} />);
  //   const user = userEvent.setup();
  //   const addToCartButton = screen.getByTestId("add-to-cart-button");
  //   await user.click(addToCartButton);

  //   expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
  //     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  //     quantity: 1,
  //   });
  //   expect(loadPage).toHaveBeenCalled();
  // });
  it("Check Add To Cart Button", async () => {
    const product = {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    };
    const loadPage = vi.fn();
    render(<Products product={product} loadPage={loadPage} />);
    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    });
    expect(loadPage).toHaveBeenCalled();
  });
});
