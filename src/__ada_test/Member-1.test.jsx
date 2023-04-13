let calledTimes = 0;

const SuspenseMock = () => {
  calledTimes++;
  return "suspended component";
};

import { describe, it } from "vitest";
import { render, userEvent } from "../../test-config/utils";
import { App } from "../App";
import * as React from "react";

vi.mock("react", () => {
  const originalReact = import("react").then((reactModule) => {
    return { ...reactModule, Suspense: SuspenseMock };
  });
  return originalReact;
});

describe("__AdaTest:Member-1 React Lazy", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should use routing with react router links", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<App />);

    const navigation = getByRole("navigation");
    const ticketsMenu = navigation.querySelector('a[href="/about"]');

    await user.click(ticketsMenu);
    expect(window.location.pathname).toEqual("/about");

    const homeMenu = navigation.querySelector('a[href="/"]');

    await user.click(homeMenu);
    expect(window.location.pathname).toEqual("/");
  });

  it("should load routes using react lazy", async () => {
    const { queryByText } = render(<App />);

    const suspendedHomePage = queryByText("suspended component");
    const actualHomePage = queryByText("Home Page");

    expect(suspendedHomePage).not.toBeNull();
    expect(actualHomePage).toBeNull();
    expect(calledTimes).toBeGreaterThanOrEqual(2);
  });
});
