import validateFormData from "./utils/validateFormData.js";
import LoadingSpinner from "./utils/LoadingSpinner.js";
const loader = new LoadingSpinner();

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = validateFormData({
      name: form.elements["nome"],
      attractions: form.elements["atracoes"],
      description: form.elements["descricao"],
      scheduled: form.elements["data"],
      number_tickets: form.elements["lotacao"],
    });
    loader.show();
    const res = await sendNewEvent(formData);
    loader.hide();
    if (res.ok) {
      alert("Evento cadastrado com sucesso.");
      form.reset();
    } else {
      alert(
        "Houve uma falha com a requisição, por favor tente novamente mais tarde."
      );
    }
  } catch (error) {
    alert(
      "Houve um erro ao cadastrar este evento, por favor revise os dados fornecidos"
    );
  }
});

async function sendNewEvent(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("https://soundgarden-api.vercel.app/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      resolve(res);
    } catch (error) {
      reject(null);
    }
  });
}
