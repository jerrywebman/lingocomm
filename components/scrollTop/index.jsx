"use client";
import ScrollToTop from "react-scroll-to-top";

import { FaArrowUp } from "react-icons/fa";

export default function index() {
  return (
    <ScrollToTop
      smooth
      component={
        <FaArrowUp className="mx-auto text-secondary-purple text-2xl" />
      }
    />
  );
}
