"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin');
                router.refresh(); // Refresh to ensure middleware picks up the cookie
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.heading}>Admin Login</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.submit}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
