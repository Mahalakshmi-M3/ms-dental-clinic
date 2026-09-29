const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("appointmentDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
dateInput.min = localToday;

document.getElementById("appointmentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const error = document.getElementById("formError");
  error.textContent = "";

  const name = document.getElementById("patientName").value.trim();
  const phone = document.getElementById("patientPhone").value.trim();
  const date = dateInput.value;
  const service = document.getElementById("serviceSelect").value;
  const message = document.getElementById("patientMessage").value.trim();

  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    error.textContent = "Please enter a valid 10-digit Indian mobile number.";
    return;
  }
  if (!date || date < localToday) {
    error.textContent = "Please choose today or a future date.";
    return;
  }

  const clinicWhatsAppNumber = "91XXXXXXXXXX";
  if (!/^91[6-9][0-9]{9}$/.test(clinicWhatsAppNumber)) {
    error.textContent = "Website setup needed: replace the sample WhatsApp number in script.js with the clinic's number (91 followed by 10 digits).";
    return;
  }

  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const text = [
    "Hello M.S. Dental Clinic, I would like to request an appointment.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Preferred date: ${formattedDate}`,
    `Service: ${service}`,
    message ? `Message: ${message}` : ""
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${clinicWhatsAppNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});
