const formContato = document.querySelector("#form-contato");
const formResultSuccess = document.querySelector(
  ".formcontato__result--success"
);
const formResultError = document.querySelector(".formcontato__result--error");

(() => emailjs.init("IYsikQUinHwRUpjxT"))();

const sendEmail = (formData) => {
  emailjs.sendForm("service_5ghcvxp", "template_v8znfnl", formData).then(
    () => {
      formResultSuccess.classList.remove("hidden-message");
      formResultError.classList.add("hidden-message");

      formContato.reset();
    },
    () => {
      formResultError.classList.remove("hidden-message");
      formResultSuccess.classList.add("hidden-message");
    }
  );
};

const nameValidator = (inputValue) => {
  return /^[A-Za-z\s]{2,}$/g.test(inputValue);
};

const emailValidator = (inputValue) => {
  return /^[a-z0-9-_\.]{2,}@([a-z]{2,}\.)+[a-z]{2,}$/g.test(inputValue);
};

formContato.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formContato);
  const [nome, email, assunto, mensagem] = Array.from(formData.values());

  if (!nameValidator(nome)) return;

  if (!emailValidator(email)) return;

  if (assunto.length < 5 || mensagem.length < 5) return;

  sendEmail(this);
});
