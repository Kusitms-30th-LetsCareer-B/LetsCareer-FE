import { useFavorite } from "../../shared/hooks/useFavorite";

interface FavoriteButtonProps {
  recruitmentId: number;
}

export const FavoriteButton = ({ recruitmentId }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorite(recruitmentId);

  return (
    <div onClick={toggleFavorite} className="cursor-pointer">
      {isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.2827 3.45356C11.5131 2.98662 11.6284 2.75315 11.7848 2.67856C11.9209 2.61366 12.0791 2.61366 12.2152 2.67856C12.3717 2.75315 12.4869 2.98662 12.7174 3.45356L14.9041 7.88353C14.9721 8.02138 15.0061 8.0903 15.0558 8.14382C15.0999 8.1912 15.1527 8.22959 15.2113 8.25687C15.2776 8.28767 15.3536 8.29878 15.5057 8.32102L20.397 9.03595C20.9121 9.11124 21.1696 9.14888 21.2888 9.27468C21.3925 9.38414 21.4412 9.53454 21.4215 9.68402C21.3988 9.85582 21.2124 10.0374 20.8395 10.4006L17.3014 13.8467C17.1912 13.9541 17.136 14.0078 17.1004 14.0717C17.0689 14.1283 17.0487 14.1905 17.0409 14.2548C17.0321 14.3274 17.0451 14.4032 17.0711 14.555L17.906 19.4224C17.994 19.9357 18.038 20.1924 17.9553 20.3447C17.8833 20.4773 17.7554 20.5702 17.6071 20.5977C17.4366 20.6293 17.2061 20.5081 16.7451 20.2657L12.3724 17.9661C12.2361 17.8944 12.168 17.8586 12.0962 17.8445C12.0327 17.8321 11.9673 17.8321 11.9038 17.8445C11.832 17.8586 11.7639 17.8944 11.6277 17.9661L7.25492 20.2657C6.79392 20.5081 6.56341 20.6293 6.39297 20.5977C6.24468 20.5702 6.11672 20.4773 6.04474 20.3447C5.962 20.1924 6.00603 19.9357 6.09407 19.4224L6.92889 14.555C6.95491 14.4032 6.96793 14.3274 6.95912 14.2548C6.95132 14.1905 6.93111 14.1283 6.89961 14.0717C6.86402 14.0078 6.80888 13.9541 6.69859 13.8467L3.16056 10.4006C2.78766 10.0374 2.60121 9.85582 2.57853 9.68402C2.55879 9.53454 2.60755 9.38414 2.71125 9.27468C2.83044 9.14888 3.08797 9.11124 3.60304 9.03595L8.49431 8.32102C8.64642 8.29878 8.72248 8.28767 8.78872 8.25687C8.84736 8.22959 8.90016 8.1912 8.94419 8.14382C8.99391 8.0903 9.02793 8.02138 9.09597 7.88353L11.2827 3.45356Z"
            fill="#FFC700"
            stroke="#FFC700"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.2827 3.45356C11.5131 2.98662 11.6284 2.75315 11.7848 2.67856C11.9209 2.61366 12.0791 2.61366 12.2152 2.67856C12.3717 2.75315 12.4869 2.98662 12.7174 3.45356L14.9041 7.88353C14.9721 8.02138 15.0061 8.0903 15.0558 8.14382C15.0999 8.1912 15.1527 8.22959 15.2113 8.25687C15.2776 8.28767 15.3536 8.29878 15.5057 8.32102L20.397 9.03595C20.9121 9.11124 21.1696 9.14888 21.2888 9.27468C21.3925 9.38414 21.4412 9.53454 21.4215 9.68402C21.3988 9.85582 21.2124 10.0374 20.8395 10.4006L17.3014 13.8467C17.1912 13.9541 17.136 14.0078 17.1004 14.0717C17.0689 14.1283 17.0487 14.1905 17.0409 14.2548C17.0321 14.3274 17.0451 14.4032 17.0711 14.555L17.906 19.4224C17.994 19.9357 18.038 20.1924 17.9553 20.3447C17.8833 20.4773 17.7554 20.5702 17.6071 20.5977C17.4366 20.6293 17.2061 20.5081 16.7451 20.2657L12.3724 17.9661C12.2361 17.8944 12.168 17.8586 12.0962 17.8445C12.0327 17.8321 11.9673 17.8321 11.9038 17.8445C11.832 17.8586 11.7639 17.8944 11.6277 17.9661L7.25492 20.2657C6.79392 20.5081 6.56341 20.6293 6.39297 20.5977C6.24468 20.5702 6.11672 20.4773 6.04474 20.3447C5.962 20.1924 6.00603 19.9357 6.09407 19.4224L6.92889 14.555C6.95491 14.4032 6.96793 14.3274 6.95912 14.2548C6.95132 14.1905 6.93111 14.1283 6.89961 14.0717C6.86402 14.0078 6.80888 13.9541 6.69859 13.8467L3.16056 10.4006C2.78766 10.0374 2.60121 9.85582 2.57853 9.68402C2.55879 9.53454 2.60755 9.38414 2.71125 9.27468C2.83044 9.14888 3.08797 9.11124 3.60304 9.03595L8.49431 8.32102C8.64642 8.29878 8.72248 8.28767 8.78872 8.25687C8.84736 8.22959 8.90016 8.1912 8.94419 8.14382C8.99391 8.0903 9.02793 8.02138 9.09597 7.88353L11.2827 3.45356Z"
            stroke="#CFCFCF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};