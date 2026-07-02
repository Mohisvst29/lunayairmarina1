const { MongoMemoryServer } = require('mongodb-memory-server');
const { spawn } = require('child_process');

async function runCommand(command, args, env) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            env: { ...process.env, ...env },
            stdio: 'inherit',
            shell: true
        });
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command ${command} ${args.join(' ')} failed with code ${code}`));
            }
        });
    });
}

async function main() {
    console.log('Starting local In-Memory MongoDB Server...');
    const mongod = await MongoMemoryServer.create({
        instance: {
            port: 27017, // default MongoDB port so standard tools can connect if needed
            dbName: 'luneer'
        }
    });

    let uri = mongod.getUri();
    if (!uri.endsWith('/luneer') && !uri.endsWith('/luneer/')) {
        uri = uri.endsWith('/') ? uri + 'luneer' : uri + '/luneer';
    }
    console.log(`\n========================================`);
    console.log(`Local MongoDB is running at:`);
    console.log(`=> ${uri}`);
    console.log(`========================================\n`);

    // Seed the database using full migration script
    console.log('Running database migration and seeding...');
    try {
        await runCommand('npx', ['tsx', 'scripts/migrate-local-to-mongo.ts'], { MONGODB_URI: uri });
        console.log('Database migrated and seeded successfully!');
    } catch (e) {
        console.warn('Warning: migrate-local-to-mongo.ts failed, continuing anyway...', e.message);
    }

    console.log('Starting Next.js development server with local database...');
    const devProcess = spawn('npm', ['run', 'dev'], {
        env: { ...process.env, MONGODB_URI: uri },
        stdio: 'inherit',
        shell: true
    });

    process.on('SIGINT', async () => {
        console.log('\nShutting down Next.js and In-Memory MongoDB...');
        devProcess.kill();
        await mongod.stop();
        process.exit(0);
    });
}

main().catch(console.error);
