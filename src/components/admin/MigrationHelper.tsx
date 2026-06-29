"use client";

import { useState } from 'react';
import styles from './MigrationHelper.module.css';

export default function MigrationHelper() {
    const [migrating, setMigrating] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message?: string;
        updates?: Array<{ slug: string; section: string; count: number }>;
        totalUpdated?: number;
        error?: string;
    } | null>(null);

    const handleMigrate = async () => {
        if (!confirm('This will update all existing images to assign them to the correct sections based on their slugs and categories. Continue?')) {
            return;
        }

        setMigrating(true);
        setResult(null);

        try {
            const res = await fetch('/api/admin/migrate-images', {
                method: 'POST',
            });

            const data = await res.json();
            setResult(data);
        } catch (error) {
            setResult({
                success: false,
                error: error instanceof Error ? error.message : 'Migration failed'
            });
        } finally {
            setMigrating(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h3 className={styles.title}>Image Section Migration</h3>
                <p className={styles.description}>
                    This tool will organize your existing images into the correct sections based on their slugs and categories.
                </p>

                <div className={styles.info}>
                    <h4>What will be migrated:</h4>
                    <ul>
                        <li><strong>ocean-sunrise</strong> ➝ Experience Section</li>
                        <li><strong>relationship-crew</strong> ➝ Why Choose Us</li>
                        <li><strong>portrait-vip-1 to 12</strong> ➝ Testimonials</li>
                        <li><strong>category=services</strong> ➝ Services Primary</li>
                        <li><strong>Uncategorized</strong> ➝ General</li>
                    </ul>
                </div>

                <button
                    onClick={handleMigrate}
                    disabled={migrating}
                    className={styles.button}
                >
                    {migrating ? 'Migrating...' : 'Migrate Images to Sections'}
                </button>

                {result && (
                    <div className={result.success ? styles.success : styles.error}>
                        {result.success ? (
                            <>
                                <h4>✓ Migration Completed</h4>
                                <p>{result.message}</p>
                                <p><strong>Total images updated:</strong> {result.totalUpdated}</p>
                                {result.updates && result.updates.length > 0 && (
                                    <div className={styles.updates}>
                                        <h5>Details:</h5>
                                        <ul>
                                            {result.updates.map((update, i) => (
                                                <li key={i}>
                                                    {update.slug} ➝ {update.section} ({update.count} image{update.count !== 1 ? 's' : ''})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <h4>✗ Migration Failed</h4>
                                <p>{result.error}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
