import type { SVGProps } from "react";

const Helzar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Helzar UI Icon"
    role="img"
    {...props}
  >
    <path d="M22 16C22 24.8366 19.3137 32 16 32C12.6863 32 10 24.8366 10 16C10 7.16344 12.6863 0 16 0C19.3137 0 22 7.16344 22 16Z" />
    <path d="M16 10C24.8366 10 32 12.6863 32 16C32 19.3137 24.8366 22 16 22C7.16344 22 1.44847e-07 19.3137 0 16C-1.44847e-07 12.6863 7.16344 10 16 10Z" />
  </svg>
);

export default Helzar;
