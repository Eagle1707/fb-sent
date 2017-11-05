## Inspiration

I was bullied when I was young and it was very emotionally challenging. I wanted to do something to improve the life of my fellow teenagers so I decided to tackle this major problem head-on.

## What it does

This project provides you with an anti-bullying chrome-extension and a parent portal. The project is targeted towards people under the age of 18. The chrome extension looks out for new facebook messages and whenever it detects a new message it does sentiment analysis over it using the IBM Watson Tone Analyzer API. If it finds out that the message has an angry tone then it will censor it and submit it to the parent portal for further inspection by the parents of the child.

## How we built it

- Used Python (flask) on the server side for the parental control
- Used Javascript for the chrome web-extension 
- Used IBM Watson Tone Analyzer API for sentiment analysis

## Challenges I ran into

Making the ```background.js``` file to work properly and saving data locally was the most challenging task. The last time I worked with chrome extension development was a couple of years ago so I had to learn everything all over again. A lot of times the Javascript stopped executing without any error and it took me a long time to figure out what was going wrong.

## Accomplishments that we're proud of

Made a complete, workable and beneficial product which can actually be used by people. I also got to use the IBM Watson API for the first time which was pretty awesome.

## What we learned

There is always a right way to solve a problem and then there is always a quick way to solve a problem and for hackathons always go with the quick way :D

## What's next for Bully-be-Gone

Currently, it is using Watson to classify each message as "angry" and "not angry". I want to improve that and start classifying messages as "bully" or "not bully" because cyber-bullying doesn't necessarily stem from angry messages only.

- [Devpost link](https://devpost.com/software/bully-be-gone)