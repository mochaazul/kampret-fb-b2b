// THIS IS CUSTOM RESOLVER FILE
// DOES NOT SHIP wITH CODEPUSH
require('dotenv').config()
const {spawn, exec} = require('child_process')

const version = process.env.RN_version

spawn('yarn push-command',[`-t "${version}"`] ,{stdio: 'inherit',shell:true})
