import { render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe("<FabDelete />", () => {
  it("should render", () => {
    const { container } = render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );
    // screen.debug();

    expect(container).toMatchSnapshot();
  });
});