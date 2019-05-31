var Chance = require('chance'),
  chance = new Chance();

module.exports = {
  command: {
    "name": "deviantArt Link Previews",
    "desc": "Discord and deviantArt do not always get along.  Let SoulBot preview the images for you!",
    "priority": 500,
    "noMention": true,
    "noMentionLikelihood": 100,
    "prompts": [
      /https?:\/\/(?:[^\s/]*\.)?deviantart\.com\/(?:[^\s/]+\/)?art\/[\w\-~$*+=%]+-\d+/gi,
      /(?:https?:\/\/|www\.)?sta\.sh\/\w+/gi
    ],
    "role": "All",
    "channels": [
      "All"
    ]
  },

  execute: function(bot, args, message) {
    var self = this;

    setTimeout(function() {
      if (message.embeds.length == 0) {
        var nospoilers = message.content.replace(/<[^\s>]+>/g, ' ').replace(/\|\|[^|]+\|\|/g, ' ');

        self.command.prompts.forEach(function(prompt) {
          (nospoilers.match(prompt)||[]).forEach(function(link) {
            bot.helpers.getMETA(link, function(meta) {
              if (meta.image) {
                message.reply(chance.pickone(bot.soul('deviantArtResponses')), {embed: {image: {url: meta.image}}});
              }
            });
          });
        });
      }
    }, 5000);
  }
}