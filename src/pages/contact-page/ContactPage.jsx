import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MapPin, Mail, Clock, Twitter, Instagram, Linkedin } from "lucide-react";
import "./ContactPage.css";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        terms: false,
        privacy: false,
    });

    const [formMessage, setFormMessage] = useState({
        text: "",
        type: null,
    });

    const formMessageRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const showMessage = (text, type) => {
        setFormMessage({ text, type });

        // Scroll to the message
        if (formMessageRef.current) {
            formMessageRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        // Hide message after 5 seconds for success messages
        if (type === "success" && !text.includes("Sending")) {
            setTimeout(() => {
                setFormMessage({ text: "", type: null });
            }, 5000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message ||
            !formData.terms ||
            !formData.privacy
        ) {
            showMessage("Please fill in all required fields and accept the terms.", "error");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        // Simulate form submission
        showMessage("Sending your message...", "success");

        // In a real application, you would send the form data to your server here
        // For demonstration, we'll simulate a successful submission after a delay
        setTimeout(() => {
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
                terms: false,
                privacy: false,
            });
            showMessage("Thank you! Your message has been sent successfully. We will get back to you soon.", "success");
        }, 2000);
    };

    return (
        <div className="contact-page">
            <Navbar />
            
            <div className="contact-wrapper">
                <div className="container">
                    {/* Logo and Intro */}
                    <div className="logo">
                        <h1>PicHub</h1>
                        <p>
                            We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <section className="contact-section">
                        <div className="contact-container">
                            <div className="contact-info">
                                <h3>Contact Information</h3>
                                <div className="contact-info-item">
                                    <MapPin className="contact-icon" />
                                    <div>
                                        <h4>Our Location</h4>
                                        <p>NPATEL GROUP LTD, Leicester, United Kingdom</p>
                                    </div>
                                </div>
                                <div className="contact-info-item">
                                    <Mail className="contact-icon" />
                                    <div>
                                        <h4>Email Us</h4>
                                        <p>pichub@support.npatel.co.uk</p>
                                    </div>
                                </div>
                                <div className="contact-info-item">
                                    <Clock className="contact-icon" />
                                    <div>
                                        <h4>Working Hours</h4>
                                        <p>Saturday - Sunday: 9:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                                <div className="social-links">
                                    <a href="#" aria-label="Twitter">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" aria-label="Instagram">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" aria-label="LinkedIn">
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="contact-form">
                                <h3>Send us a Message</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject *</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="form-control"
                                            placeholder="What is this regarding?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="form-control"
                                            placeholder="Your message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name="terms"
                                            checked={formData.terms}
                                            onChange={handleCheckboxChange}
                                            required
                                        />
                                        <label htmlFor="terms">
                                            I agree to the <a href="/terms">Terms and Conditions</a> *
                                        </label>
                                    </div>
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="privacy"
                                            name="privacy"
                                            checked={formData.privacy}
                                            onChange={handleCheckboxChange}
                                            required
                                        />
                                        <label htmlFor="privacy">
                                            I have read the <a href="/privacy">Privacy Policy</a> and consent to the processing of my data *
                                        </label>
                                    </div>
                                    <button type="submit" className="submit-btn">
                                        Send Message
                                    </button>
                                    <div
                                        ref={formMessageRef}
                                        className={`form-message ${formMessage.type ? formMessage.type : ""}`}
                                        style={{ display: formMessage.type ? "block" : "none" }}
                                    >
                                        {formMessage.text}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default ContactPage;