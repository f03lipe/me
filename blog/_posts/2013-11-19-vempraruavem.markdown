---
layout: post
title: "VemPraRuaVem.org"
date: 2013-11-19 20:58:24 -0200
postCover: /assets/images/post/1-ODA5n-Ktb5-ZSI4Sids4dg.png
categories: [project]
---

_“Acompanhe Ninjas e Manifestações pelo Brasil”_

For the past month, I've been developing [vempraruavem.org](http://vempraruavem.org), an online platform for following the protests here in Brazil.

Last month I realized that I had "missed" a big opportunity of building some web app focused on "community empowering" during the June/July protests. I started wondering why I hadn't bumped into that thought back then. I was too busy organizing students with the Student Council.

Contrary to what usually happens in my projects, I knew what kind of positive impact I wanted to make, but now which idea for a website would get me there. I think it didn't take more than half a dozen minutes of background processing in my head – you know, while surfing the web or something – to arrive at the following question: how could I use data publicly available on the internet to help estimate where and when the next public demonstrations are going to take place? R: *Facebook*, naturally. In a couple of days after answering that question, I had built [a _Node.js_ prototype](https://github.com/f03lipe/vempraruavem/tree/5c7247f5aada833a54124a438f5c58790887d3ce) that fetched data of public events on Facebook, using queries like `protesto`, `manifestação`, `passeata+contra` and displayed these on a map, using Google Maps's beautifully¹ documented [Javascript API V3](https://developers.google.com/maps/documentation/javascript).

The first version looked like this.
<a href="http://i.imgur.com/n4CMOWt.png">![](http://i.imgur.com/n4CMOWt.png)</a>

The second version, with a lousy interface and a panel featuring a list of events, looked like this.

<a href="http://i.imgur.com/eSCoEuY.png">![](http://i.imgur.com/eSCoEuY.png)</a>

I recently refactored the front-end to work with Backbone.js, in order to organize the views before adding what is probably the website's most important perk: the ability to see the live streams of people covering the events and their whereabouts. This feature wasn't part the original concept, and I don't remember exactly when the idea of adding it came into mind. Now it seems like a _no-brainer_, though. It had to be implemented.

I have been following the protests for many months using streaming services. Most of the times when I cannot attend a manifestation I end up watching it online, using mostly [TwitCasting](http://twitcasting.tv). And that’s not only me, actually. Since June, the independent media has been playing the major role in the covering of the public demonstrations here in Brazil. As far as I can remember, the first major “live streamers” were st major "live streamers" were [midianinja_rj](http://twitcasting.tv/midianinja_rj) and [midianinja_sp](http://twitcasting.tv/midianinja_sp), both part of a group of streamers called [Ninja](http://facebook.com/midianinja). Following their success, the term _midia ninja_ was born as a way of referring to other people who started streaming demonstrations online.

The getting-to-know of other ninjas has been a very decentralized process since the beginning. People usually learn about the existence of others through the comment section of __TwitCasting__ or by watching ninjas talking to each other during the protests. There was no service, AFAIK, that lists them online, for people to see who is covering what. The objective of the website was now to answer that demand: ninjas would log into the website with their mobile devices, point on the map their location (with the help of html5 geolocation) and become visible to the users on the map for a certain period of time, before having to save their new location.

Well, Twitcasting is a Japanese platform. It’s much like UStream or LiveStream: it has an iPhone app that allow people to do streaming and an online interface for people to watch it and comment. Unlike the latter services, though, it’s kind of a crappy product. Their API is mostly malfunctioning. Want to use it the service to log in? Sorry, the “Login API” has been “depricated” for months now, because the solution they found violates cross-origin policy². Still, by some twist of fate, TwitCasting became ubiquitous in Brazil during the protests (so much that they had to Google Translate their entire website to Portuguese).

With those limitations in mind – and after asking nagging their support on twitter for a week – I thought it best to require the ninja to log in using either Facebook or Twitter, depending on which he/her used to sign into TwitCasting. I could use them to associate accounts with Twitcasting.

<a href="http://i.imgur.com/X2G1ca4.png">![](http://i.imgur.com/X2G1ca4.png)<a/>

I also designed a responsive panel.

<a href="http://i.imgur.com/dsYLnuV.png">![](http://i.imgur.com/dsYLnuV.png)</a>

The service is currently functional. **More updates to come in the following days.**

# Technology stack

for any eventual newbie learning from this.

### Back-end

- **Nodejs** (w/ [**CoffeeScript**](coffeescript.org) on the server side)

- **[Express](expressjs.com)**: essentially a small – 932+1143 "SLOC"³ – wrapper around **[Connect](https://github.com/senchalabs/connect)**

- **[Passport](passportjs.org)**: for TwitCasting authentication using Twitter ([_passport-twitter_](https://github.com/jaredhanson/passport-twitter)) and Facebook ([_passport-facebook_](https://github.com/jaredhanson/passport-facebook)) interfaces

- **[Mongoose](mongoosejs.com)**: a nodejs wrapper for MongoDB

Hosted on **Heroku**, free of charge so far.

### Front-end

- **[Bootstrap 3](getbootstrap.com)** (check out [Initializr](http://www.initializr.com/))

- **Backbone.js**, **Require.js** for client-side MVC.

- **[Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/)**

<hr>

1 - My understanding is that _Ninja_ is the (registered?) trademark of a group of people that started doing streaming back in 2012.

2 - Their idea was to make you open this popup window for authentication, that, after the user logs in, tries to call a function on the parent window (the website using the service). No, really, inspecting the source code I see `opener.TwitCastingLiveLoginEventReceived(true, "<userid>");`. Needless to say, that violates 7375234 cross-origin rules and doesn't work.

3 - [How big is the Express codebase?](http://expressjs.com/faq.html#size)