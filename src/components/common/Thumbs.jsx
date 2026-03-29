export const ThumbUpIcon = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1
    1 0 0 0-.29-.7L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v8c0
    1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z" />
  </svg>
);

export const ThumbDownIcon = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22L1.14 11.27c-.09.23-.14.47-.14.73v1c0
    1.1.9 2 2 2h6.31l-.95 4.57-.03.32a1 1 0 0 0 .29.7l1.22 1.41
    6.59-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zM23
    3h-4v12h4V3z" />
  </svg>
);

export const NeutralIcon = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
