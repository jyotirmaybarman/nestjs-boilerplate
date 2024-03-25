import { readFileSync, writeFileSync, existsSync } from "node:fs";

(()=>{
    try {
        const content = readFileSync('.env.example', 'utf-8');
        
        if(!existsSync('.env.development')){
            writeFileSync('.env.development', content);
        }

        if(!existsSync('.env.test')){
            writeFileSync('.env.test', content);
        }
        
        if(!existsSync('.env.production')){
            writeFileSync('.env.production', content);
        }

        console.log('.env files generated');
    } catch (err) {
        console.error('.env files could not be generated', err);
    }
})();
