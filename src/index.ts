import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import fs from "fs/promises";
import { Readable, pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);
const wait = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(wait);
    }, 1000);
  });
};

const sendMessage = async (c: Client, number: string): Promise<void> => {
  await c.sendMessage(
    number,
    `Olá, tudo bem?\n\nSou *Juliana Gomes* consultora comercial da Game Sticker. Somos uma loja focada no universo de *Jogos Antigos*, com alta portabilidade e diversidades de jogos. Estamos com uma mega promoção hoje para nosso principal produto. *Game Sticker* é um vídeo game portátil com poder de alto armazenamento de jogos antigos (1990-2005). De fácil Integração com sua televisão suportando resoluções 4k.\n\n🐉 Entre os Jogos estão:\n          Super Mario\n          Metal Slug\n          Mortal Kombat\n          ...Mais de 10 mil\n\n🏪 A Game Sticker, está com um mega desconto hoje 26/09/2022 (Dia do Comércio)\n\n          Game Stick 4k de ~689.90~ por apenas 287.50.\n\nJá conhece nosso produto?\n\n*Para saber mais visite nosso site: https://www.gamestickretro4k.com*, *ou fale comigo 😁*`
  ,);

};

const c = new Client({
  authStrategy: new LocalAuth({
    clientId: "gamesticker",
    dataPath: "gamesticker",
  }),
});

c.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

c.on("ready", async () => {
  console.log("Chat ready");
  const file = JSON.parse(
    (await fs.readFile("./gamesticker.json")).toString()
  ) as string[];

    for(const f of file) {
      sendMessage(c, f)
      await wait();
    }

});

c.on("authenticated", () => {
  console.log("Logged in");
});

c.initialize();
