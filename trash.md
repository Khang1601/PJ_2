    //=====================Toast function===========================
    // Toast function
    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
            main.appendChild(toast);
        }
    }
    // =======================Toast message============================
    function showSuccessToast() {
        toast({
            title: "Thành công!",
            message: "Bạn đã đăng ký thành công tài khoản tại Booken.",
            type: "success",
            duration: 5000
        });
    }

    function showErrorToast_userName() {
        toast({
            title: "Thất bại!",
            message: "UserName không đúng định dạng.",
            type: "error",
            duration: 5000
        });
    }
    function showErrorToast_email() {
        toast({
            title: "Thất bại!",
            message: "Email không đúng định dạng.",
            type: "error",
            duration: 5000
        });
    }

    function showErrorToast_email_noticlude_admin() {
        toast({
            title: "Thất bại!",
            message: "Email không được chứa từ admin.",
            type: "error",
            duration: 5000
        });
    }

    function showErrorToast_emailexist() {
        toast({
            title: "Thất bại!",
            message: "Email đã tồn tại.",
            type: "error",
            duration: 5000
        });
    }
    function showErrorToast_password() {
        toast({
            title: "Thất bại!",
            message: "Mật khẩu không đúng định dạng.",
            type: "error",
            duration: 5000
        });
    }
    function showErrorToast_passwordwrong() {
        toast({
            title: "Thất bại!",
            message: "Mật khẩu nhập lại không chính xác.",
            type: "error",
            duration: 5000
        });
    }
    function showErrorToast_phonenumber() {
        toast({
            title: "Thất bại!",
            message: "Số điện thoại không đúng định dạng.",
            type: "error",
            duration: 5000
        });
    }
    function showErrorToast_address() {
        toast({
            title: "Thất bại!",
            message: "Địa chỉ không đúng định dạng.",
            type: "error",
            duration: 5000
        });
    }