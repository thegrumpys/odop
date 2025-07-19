import React from "react";
import * as ReactDOMClient from "react-dom/client";
import ConfirmModal from "../components/ConfirmModal";

it("renders ConfirmModal without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOMClient.createRoot(div);
  root.render(
    <ConfirmModal
      show
      message="Are you sure?"
      onHide={() => {}}
      onConfirm={() => {}}
    />,
  );
  root.unmount();
});
