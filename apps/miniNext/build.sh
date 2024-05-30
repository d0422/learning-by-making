babel src --extensions .ts,.tsx --out-dir dist 
node dist/core/makeClientFiles.js
rollup --config rollup.config.js 
