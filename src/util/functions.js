import { Store } from "react-notifications-component";
export const showMessage = (title, info, color) => {
  Store.addNotification({
    title: title,
    message: info,
    type: color,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__bounceIn"],
    animationOut: ["animate__animated", "animate__bounceOut"],
    dismiss: {
      duration: 10000,
      onScreen: true,
    },
  });
};
