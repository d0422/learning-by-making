rm -d dist
rm -d public
babel src --extensions .ts,.tsx --out-dir dist 
node dist/core/createClientFiles.js
rollup --config rollup.config.js 
