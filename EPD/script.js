document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const ime = document.getElementById("ime");
  const email = document.getElementById("email");
  const usluga = document.getElementById("usluga");
  const poruka = document.getElementById("poruka");

  const imeError = document.getElementById("imeError");
  const emailError = document.getElementById("emailError");
  const uslugaError = document.getElementById("uslugaError");
  const porukaError = document.getElementById("porukaError");
  const successMsg = document.getElementById("successMsg");

  const clearErrors = () => {
    imeError.textContent = "";
    emailError.textContent = "";
    uslugaError.textContent = "";
    porukaError.textContent = "";
    successMsg.textContent = "";
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("epdKontakt", JSON.stringify(data));
  };

  const lastSaved = localStorage.getItem("epdKontakt");
  if (lastSaved) {
    const data = JSON.parse(lastSaved);
    ime.value = data.ime || "";
    email.value = data.email || "";
    usluga.value = data.usluga || "";
    poruka.value = data.poruka || "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (ime.value.trim().length < 3) {
      imeError.textContent = "Unesi ime i prezime.";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Unesi ispravnu email adresu.";
      valid = false;
    }

    if (usluga.value.trim() === "") {
      uslugaError.textContent = "Odaberi uslugu.";
      valid = false;
    }

    if (poruka.value.trim().length < 10) {
      porukaError.textContent = "Poruka mora imati barem 10 znakova.";
      valid = false;
    }

    if (!valid) return;

    const data = {
      ime: ime.value.trim(),
      email: email.value.trim(),
      usluga: usluga.value.trim(),
      poruka: poruka.value.trim(),
      datum: new Date().toLocaleString("hr-HR")
    };

    saveToLocalStorage(data);
    successMsg.textContent = "Upit je spremljen lokalno i forma je uspješno validirana.";
    form.reset();
  });
});