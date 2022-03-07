
// Storage for token
require('dotenv').config()

// Discord stuff 
const Discord = require('discord.js')
const Client = new Discord.Client()

Client.on('ready', ()=>{
    console.log('ready')
})


// Checks to see if people have entered a vc 
Client.on("voiceStateUpdate", function(NewUpdate, OldUpdate){

    if(NewUpdate.id === process.env.userId && NewUpdate.channelID === null){ // checks to see if the man in question has joined
        const voiceChannel = Client.channels.cache.get(OldUpdate.channelID);
 
            voiceChannel.join().then(connection =>{// joins and then we can play the funny tune
                const dispatcher = connection.play('./thesong.mp3');
                dispatcher.on("finish", Idunno => { // once it ends we can leave
                    voiceChannel.leave(); 
                })
            })


    }else{ // he left :(
        if(NewUpdate.id === process.env.userId){ // makes sure its still the right guy
            const voiceChannel = Client.channels.cache.get(NewUpdate.channelID); 
            voiceChannel.leave() // leaves channel since the man in question is no longer there to listen
        }
    }
});


process.on("unhandledRejection", console.error); // error catching
Client.login(process.env.token) // login