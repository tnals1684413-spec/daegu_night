document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".reservation-form");

  if (!(form instanceof HTMLFormElement)) {
    console.error("EmailJS setup failed: reservation form was not found.");
    return;
  }

  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector(".submit-btn");

  if (
    !(status instanceof HTMLElement) ||
    !(submitButton instanceof HTMLButtonElement)
  ) {
    form.addEventListener("submit", (event) => event.preventDefault());
    console.error("EmailJS setup failed: status message or submit button was not found.");
    return;
  }

  const successMessage =
    "예약 신청이 정상적으로 접수되었습니다. 확인 후 연락드리겠습니다.";
  const errorMessage =
    "예약 신청 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  const originalButtonMarkup = submitButton.innerHTML;
  let isSubmitting = false;
  let isEmailJSReady = false;

  const clearStatus = () => {
    status.hidden = true;
    status.classList.remove("is-success", "is-error");
    status.textContent = "";
  };

  const showStatus = (className, message) => {
    status.classList.remove("is-success", "is-error");
    status.classList.add(className);
    status.textContent = message;
    status.hidden = false;
  };

  try {
    if (!window.emailjs) {
      throw new Error("EmailJS Browser SDK did not load.");
    }

    window.emailjs.init({ publicKey: "LbsTOWCIkOG8OwNm6" });
    isEmailJSReady = true;
  } catch (error) {
    console.error("EmailJS initialization failed.", error);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting || !form.reportValidity()) {
      return;
    }

    clearStatus();

    if (!isEmailJSReady) {
      showStatus("is-error", errorMessage);
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "전송 중...";

    try {
      await window.emailjs.sendForm(
        "service_h8p5stv",
        "template_kyw0z6d",
        form,
      );

      form.reset();
      showStatus("is-success", successMessage);
    } catch (error) {
      console.error("EmailJS reservation submission failed.", error);
      showStatus("is-error", errorMessage);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonMarkup;
      isSubmitting = false;
    }
  });
});
