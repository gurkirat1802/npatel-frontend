import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaImage, FaDownload, FaSearch, FaColumns } from 'react-icons/fa';
import './AboutPage.css';

function AboutPage() {
    return (
        <div className="about-container">
            <Navbar />

            <main className="about-main">
                {/* Who We Are Section */}
                <section className="who-we-are-section">
                    <h1 className="section-title">Who We Are?</h1>

                    <div className="about-cards-grid">
                        <div className="about-card about-image-card">
                            <img
                                src="/npatelLogoName.svg"
                                alt="Team collaborating"
                                className="about-image"
                            />
                        </div>

                        <div className="about-card about-text-card">
                            <p>
                                PicHub is more than just a platform—it's a dynamic community where creativity meets connection. As a hub "Built for Creativity," we are redefining how people share, discover, and engage with digital content.
                            </p>
                        </div>

                        <div className="about-card about-text-card">
                            <p>
                                PicHub is a space to express yourself—whether you're an artist, storyteller, or idea explorer. Upload, download, follow, chat, and share through likes and comments, all while fostering meaningful connections.
                            </p>
                        </div>

                        <div className="about-card about-text-card">
                            <p>
                                With features like flexible pricing, collaborative tools, and a vibrant community, PicHub is designed to empower individuals and businesses alike. Join us to turn your creative ideas into inspiring experiences and connect with a world of possibilities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="section-title">Features you get</h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon-container">
                                <FaImage className="feature-icon" />
                            </div>
                            <h3 className="feature-title">High-Resolution Images</h3>
                            <p className="feature-description">
                                Download stunning, high-quality images in HD and 4K resolutions. Perfect for professional projects, presentations, and personal use.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-container">
                                <FaDownload className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Free Downloads</h3>
                            <p className="feature-description">
                                Download stunning, high-quality images in HD and 4K resolutions. Perfect for professional projects, presentations, and personal use.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-container">
                                <FaSearch className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Easy Search</h3>
                            <p className="feature-description">
                                Download stunning, high-quality images in HD and 4K resolutions. Perfect for professional projects, presentations, and personal use.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-container">
                                <FaColumns className="feature-icon" />
                            </div>
                            <h3 className="feature-title">User-Friendly Interface</h3>
                            <p className="feature-description">
                                Download stunning, high-quality images in HD and 4K resolutions. Perfect for professional projects, presentations, and personal use.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default AboutPage;