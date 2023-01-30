import * as ReactDOM from "react-dom";
import ToastManager from "./ToastManager";
// 컴포넌트가 아닌 토스트를 관리하는 역할의 Class

class Toast {
  portal = null;

  show(message, duration = 2000) {
    this.createToast(message, duration);
  }

  constructor() {
    const portalId = "toast-portal";
    const portalElement = document.getElementById(portalId);

    if (portalId) {
      this.portal = portalElement;
      return;
    } else {
      this.portal = document.createElement("div");
      this.portal.id = portalId;
      document.body.appendChild(this.portal);
    }

    ReactDOM.render(
      <ToastManager
        bind={(createToast) => {
          this.createToast = createToast;
        }}
      />,
      this.portal
    );
  }
}

// Toast.show(''); <= 동작할 수 있도록

export default Toast;
