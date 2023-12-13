const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');

const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

(async ()=>{
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox','--disable-setuid-sandbox'],
    });

    await browser.close();
})();

const motivationalQuotes = [
    "Believe you can and you're halfway there.",
    "Your time is limited, don't waste it living someone else's life.",
    "The only way to do great work is to love what you do.",
    "Live life to the fullest, and focus on the positive."    
  ];


client.on('qr', (qr)=>{
    qrcode.generate(qr, {small: true});
});

client.on('ready', ()=>{
    console.log('Client is Readyy!!');
});

client.on('message', async (message) => {
    const { body, from, chat } = message;
    if(message.body === '!help'){
        message.reply(
            `Hello, this is MotiveWaveBot (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)
            
Here are my feature:
~!help - lists all the features of the bot
~!quote - genrates a random quote to make your day better :)
~!music - suggests a playlist for motivational songs >_<
~!surprise - Try it at your own risk :P
            `)
    }
    if(message.body === '!quote'){
        try {
            const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
            const quote = motivationalQuotes[randomIndex];
      
            client.sendMessage(from, quote);
          } catch (error) {
            console.error('Error sending motivational quote:', error);
          }
    }
    if(message.body ==='!music'){
        message.reply('Here\'s a motivational playlist for you: https://youtu.be/QtRfKnz__FA?si=WgyEFH069zJY6ZgT')
        
    }
    if (body === '!surprise') {
        try {
          const chat = await client.getChatById(from);
          const media = MessageMedia.fromFilePath('pxfuel.jpg');
          await chat.sendMessage(media, { caption: 'You are doing great! Keep going! ❤️' });
          console.log('Surprise message sent successfully.');
        } catch (error) {
          console.error('Error sending surprise message:', error);
        }
    }

})
client.initialize();