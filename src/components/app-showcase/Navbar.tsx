'use client';

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <Link href="/app" className={styles.logo}>
                YACHT MGT
            </Link>

            <div className={styles.navLinks}>
                <Link href="#services" className={styles.link}>Services</Link>
                <Link href="#features" className={styles.link}>Features</Link>
                <Link href="#gallery" className={styles.link}>Gallery</Link>
                <Link href="#contact" className={styles.link}>Contact</Link>
            </div>

            <button className={styles.mobileMenuBtn}>☰</button>
        </nav>
    );
}
