import { UserIconParams } from './type';

export default function UserIconSvg({ color = '#FFA555' }: UserIconParams) {
  return (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.08333 26C2.08333 26 0 26 0 23.8333C0 21.6667 2.08333 15.1667 12.5 15.1667C22.9167 15.1667 25 21.6667 25 23.8333C25 26 22.9167 26 22.9167 26H2.08333ZM12.5 13C14.1576 13 15.7473 12.3152 16.9194 11.0962C18.0915 9.87721 18.75 8.22391 18.75 6.5C18.75 4.77609 18.0915 3.12279 16.9194 1.90381C15.7473 0.68482 14.1576 0 12.5 0C10.8424 0 9.25268 0.68482 8.08058 1.90381C6.90848 3.12279 6.25 4.77609 6.25 6.5C6.25 8.22391 6.90848 9.87721 8.08058 11.0962C9.25268 12.3152 10.8424 13 12.5 13Z"
        fill={color}
      />
    </svg>
  );
}
