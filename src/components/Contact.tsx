import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdSend } from "react-icons/md";
import "./styles/Contact.css";

const YOUR_EMAIL = "riconoblezada6@gmail.com";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // No backend needed — this opens the visitor's own email app with
    // everything pre-filled, addressed to YOUR_EMAIL above.
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>

        <div className="contact-grid">
          {/* ── Contact form ── */}
          <form className="contact-form blur-reveal" onSubmit={handleSubmit}>
            <h4 className="contact-form-title">Get in touch</h4>
            <p className="contact-form-subtitle"></p>

            <label className="contact-field">
              <span>Your Name</span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Dela Cruz"
              />
            </label>

            <label className="contact-field">
              <span>Your Email</span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="juan@email.com"
              />
            </label>

            <label className="contact-field">
              <span>Your Message</span>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Let's build something together..."
              />
            </label>

            <button type="submit" className="contact-submit" data-cursor="disable">
              {sent ? "Opening your email app…" : "Send"}
              <MdSend />
            </button>
          </form>

          {/* ── Existing info (unchanged) ── */}
          <div className="contact-flex">
            <div className="contact-box blur-reveal">
              <h4>Email</h4>
              <p>
                <a href="mailto:riconoblezada6@gmail.com" data-cursor="disable">
                  riconoblezada6@gmail.com
                </a>
              </p>
              <h4>Education</h4>
              <p>Bachelor of Science in Computer Science</p>
            </div>
            <div className="contact-box blur-reveal">
              <h4>Social</h4>
              <a
                href="https://www.instagram.com/coriiiiiiiiiiiiiiiiiiiiiiiiii_?igsi=MW1zZTgyaXRkZTB2Mg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Instagram <MdArrowOutward />
              </a>
              <a
                href="https://www.facebook.com/share/1QPx6jgZ9x/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Facebook <MdArrowOutward />
              </a>
              <a
                href="mailto:riconoblezada6@gmail.com"
                data-cursor="disable"
                className="contact-social"
              >
                Gmail <MdArrowOutward />
              </a>
              <a
                href="https://t.me/eitoooooo"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                Telegram <MdArrowOutward />
              </a>
            </div>
            <div className="contact-box blur-reveal">
              <h5>
                <MdCopyright /> 2026
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
