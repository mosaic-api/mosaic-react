import request from 'superagent';

    export async function getRandomColor() {
        const generateHex = Math.floor(Math.random()*16777215).toString(16);
        return await request.get(`https://www.thecolorapi.com/id?hex=${generateHex}`);
    }
    export async function getScheme(hex) {
      return await request.get(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=quad&count=8`).body;
    }