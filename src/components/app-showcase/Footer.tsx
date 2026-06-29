import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div className={styles.column}>
                    <span className={styles.logo}>YACHT MGT</span>
                    <p>
                        123 Marina Blvd, Suite 400<br />
                        Fort Lauderdale, FL 33316<br />
                        United States
                    </p>
                    <p>+1 (954) 555-0123</p>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Services</h4>
                    <a href="#" className={styles.link}>Yacht Management</a>
                    <a href="#" className={styles.link}>Crew Placement</a>
                    <a href="#" className={styles.link}>Financial Administration</a>
                    <a href="#" className={styles.link}>Safety Management</a>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Follow Us</h4>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialIcon}>F</a>
                        <a href="#" className={styles.socialIcon}>I</a>
                        <a href="#" className={styles.socialIcon}>L</a>
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Stay in Touch</h4>
                    <p>Subscribe to our newsletter for the latest updates.</p>
                    {/* Simple form placeholder */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; 2024 Yacht Management Services. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#" className={styles.link}>Privacy Policy</a>
                    <a href="#" className={styles.link}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
