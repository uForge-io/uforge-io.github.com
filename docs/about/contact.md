---
icon: lucide/mail
description: "Contact form for μForge.io covering sales, technical support, partnerships, media, and documentation feedback on the SF32 MCU family."
---

# Contact μForge.io

Have a question, a partnership idea, or feedback on the docs? Fill out the form below and we'll get back to you.

<form class="uf-contact-form" id="uf-contact-form">

<div class="uf-form-group">
<label for="uf-topic">Topic <span class="uf-required">*</span></label>
<select id="uf-topic" name="topic" required>
<option value="" selected disabled>Select a topic</option>
<option value="sales">Sales / Purchasing</option>
<option value="support">Technical Support</option>
<option value="partnership">Partnership / Business Development</option>
<option value="media">Media / Press</option>
<option value="docs-feedback">Documentation Feedback</option>
<option value="other">Other</option>
</select>
</div>

<div class="uf-form-group">
<label for="uf-product">μForge.io Products <span class="uf-required">*</span></label>
<select id="uf-product" name="product" required>
<option value="" selected disabled>Select a product</option>
<option value="sf32lb52x">SF32LB52x — Essential Wearable MCU</option>
<option value="sf32lb55x">SF32LB55x — Mainstream AIoT MCU</option>
<option value="sf32lb56x">SF32LB56x — Graphics-Optimized MCU</option>
<option value="sf32lb58x">SF32LB58x — Flagship AIoT Platform MCU</option>
<option value="modules">Modules</option>
<option value="devkits">Development Boards</option>
<option value="sdk-tools">SDK &amp; Tools</option>
<option value="other">General Inquiry / Not Sure Yet</option>
</select>
</div>

<div class="uf-form-group">
<label for="uf-psram">Expected PSRAM Capacity <span class="uf-required">*</span></label>
<select id="uf-psram" name="psram" required>
<option value="" selected disabled>Select expected capacity</option>
<option value="none">None</option>
<option value="4mb">4 MB</option>
<option value="8mb">8 MB</option>
<option value="16mb">16 MB</option>
<option value="32mb">32 MB</option>
<option value="64mb">64 MB</option>
</select>
</div>

<div class="uf-form-row uf-form-row-2">
<div class="uf-form-group">
<label for="uf-name">Your Name <span class="uf-required">*</span></label>
<input type="text" id="uf-name" name="name" autocomplete="name" required>
</div>
<div class="uf-form-group">
<label for="uf-email">Email <span class="uf-required">*</span></label>
<input type="email" id="uf-email" name="email" autocomplete="email" required>
</div>
</div>

<div class="uf-form-row uf-form-row-3">
<div class="uf-form-group">
<label for="uf-company">Company (optional)</label>
<input type="text" id="uf-company" name="company" autocomplete="organization">
</div>
<div class="uf-form-group">
<label for="uf-phone">Phone (optional)</label>
<input type="tel" id="uf-phone" name="phone" autocomplete="tel">
</div>
<div class="uf-form-group">
<label for="uf-country">Country / Region (optional)</label>
<input type="text" id="uf-country" name="country" autocomplete="country-name">
</div>
</div>

<div class="uf-form-group">
<label for="uf-message">Your Message <span class="uf-required">*</span></label>
<textarea id="uf-message" name="message" rows="6" required></textarea>
</div>

<button type="submit" class="uf-form-submit">Send Message</button>
<p class="uf-form-status" id="uf-form-status" role="status"></p>

</form>

<script>
(function () {
  var form = document.getElementById("uf-contact-form");
  var status = document.getElementById("uf-form-status");
  if (!form) return;

  // Formspree endpoint. Replace FORMSPREE_ID with the ID from your form's
  // endpoint URL (https://formspree.io/f/FORMSPREE_ID) after creating a
  // form at formspree.io.
  var ENDPOINT = "https://formspree.io/f/FORMSPREE_ID";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var submitBtn = form.querySelector(".uf-form-submit");
    status.classList.remove("uf-form-status--info", "uf-form-status--error");
    status.textContent = "Sending...";
    if (submitBtn) submitBtn.disabled = true;

    fetch(ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          status.textContent = "Thanks — your message was sent. We'll get back to you soon.";
          status.classList.add("uf-form-status--info");
          form.reset();
        } else {
          return response.json().then(function (data) {
            var msg = (data && data.errors && data.errors.length)
              ? data.errors.map(function (er) { return er.message; }).join(", ")
              : "Something went wrong sending your message.";
            throw new Error(msg);
          });
        }
      })
      .catch(function (err) {
        status.textContent = "Couldn't send your message (" + err.message + "). Please email us directly at contact@uforge.io.";
        status.classList.add("uf-form-status--error");
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
</script>
