#!/usr/bin/env node

// ENV Var Confessional - Where your environment variables come to confess their sins
// Usage: node env-confessional.js

const requiredVars = [
    { name: 'DATABASE_URL', type: 'string', description: 'Where your data sleeps' },
    { name: 'API_KEY', type: 'string', description: 'The magic password' },
    { name: 'NODE_ENV', type: 'string', description: 'Are we pretending to be in production?' },
    { name: 'PORT', type: 'number', description: 'The door number' }
];

console.log('\n🔍 ENVIRONMENT VARIABLE INTERROGATION ROOM 🔍\n');
console.log('Confess your sins, variables! The truth shall set you free...\n');

let sinsFound = 0;
const confessions = [];

requiredVars.forEach(variable => {
    const value = process.env[variable.name];
    
    if (value === undefined) {
        sinsFound++;
        confessions.push(`❌ ${variable.name}: MISSING - ${variable.description}`);
        return;
    }
    
    if (variable.type === 'number') {
        const numValue = Number(value);
        if (isNaN(numValue)) {
            sinsFound++;
            confessions.push(`❌ ${variable.name}: NOT A NUMBER (it's "${value}") - ${variable.description}`);
            return;
        }
    }
    
    if (value.trim() === '') {
        sinsFound++;
        confessions.push(`❌ ${variable.name}: EMPTY - Like my soul - ${variable.description}`);
        return;
    }
    
    confessions.push(`✅ ${variable.name}: Present and accounted for - ${variable.description}`);
});

confessions.forEach(confession => console.log(confession));

console.log('\n' + '='.repeat(50));

if (sinsFound === 0) {
    console.log('🎉 All variables confessed! You may proceed to production (and pray).');
} else {
    console.log(`💀 ${sinsFound} sin(s) found. Go fix them before production haunts you.`);
    process.exit(1);
}

console.log('='.repeat(50) + '\n');