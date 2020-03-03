import request from 'superagent';

    export async function getRandomColor() {
        const generateHex = Math.floor(Math.random()*16777215).toString(16);
        return await request.get(`https://www.thecolorapi.com/id?hex=${generateHex}`);
    }

    //eventually add second paramter to change the mode
    export async function getScheme(hex) {
      const cleanHex = hex.slice(1)
      const schemeData = await request.get(`https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=quad&count=10`);
      return schemeData.body.colors.map(color => color.hex.value)
    }

