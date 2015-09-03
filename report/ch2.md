#Chapter 3
##Problem analysis
###2.1 State of art review

The game industry is on the rise, producing games with budgets that rival some of the most expensive films. Teams of tens or hundreds are spending years to create astonishing games. The sector has been enough time to see its age spectrum wide enough to make game of all sorts of themes and all type of devices. 

But also the indie game industry is expanding, development engines such as unity or Unreal are making free licensing plans. Mobile games allow small teams to bring fun simple games, with original mechanics and not so focused on costly visual effects. Along this current of small indie development a new technology is gaining a lot momentum: web.
 
Web is present everywhere and with the rise of JavaScript server side a lot of developers are shifting from other languages, building a very powerful ecosystem. Included in this shift are game developers. Getting away from flash due to banning in mobile devices and the increasing number of browsers that are restricting its functionality, added to the fact that APIs for the same areas where flash is required are being deployed natively to HTML5 make sense for the change.

Setting a development environment for game development in HTML5 is pretty easy with the right tools and projects like CooconJS and NW.js (previously known as node-webkit), allow to package our game into native mobile apps our desktop programs for every platform with little to non effort.

To make certain the grade of usefulness to this technologies, we will make a SWOT analysis.

![alt text](https://raw.githubusercontent.com/demipel8/crazy-volley/develop/report/assets/swot.png "")

####2.1.1 Strengths and weaknesses

#####Strengths

Fast Coding: JavaScript is a very easy language to start with, lack of typed variables, dynamic memory manage via garbage collector, object management, etc. With the right understatement of its coding patterns and asynchronous programming a game can be fast prototyped and shipped to most types of hosting services or other Paas/Iaas (Paas: platform as a service. Iaas: Infrastructure as a service) around the internet.

Full Stack: The whole game programmed and manage in the same language is a very big advantage and can speed up development. With a versatile team people can be switched between front-end, back-end, db or network teams. Models can be shared between the client program and the server side. Data can stay in json format through the whole flow, from the player input event to the data base and return.

#####weaknesses

Lack of editor: Scene and animation editor are very handy in game development. The fact that we don't have it integrated with our environment is a major drawback, but this is changing, in fact, this weaknesses exists do to the premise that all software used directly on the game must be 0 cost. Some paid frameworks or IDEs already offer these tools for HTML5 development.

####2.1.2 Opportunities and Threats

#####Opportunities

Frameworks: There are lots of options to choose, implementing with very diverse patterns and for multiple fields. With different renders, extension via plugins and very active in the open source community, getting lots of bug testing. The fact the professional studios use them on a daily bases can give an image of the state of maturity this young sector is getting.

Documentation: As commented on the opportunity above, some frameworks are very active in the open source community, having some members focused on the creating lots of learning  material and quality docs. Although some times under valuated, this material can help smoothing the learning curve.

Packing tools: The *One development every platform* pattern is a very sought one. With the use of a couple packing tools it is possible for HTML5 to apply this technique with small changes.

#####Threats

High dependency: Even though the quantity of tools for building a good development environment is extraordinary it can backfire us. Editor, linter, code style checker, dependencies tool, template creator, task automation, local server,... Can make some errors hard to find and debugged if not mounted adequately.

Performance: Resources have to be transmitted through the internet, JavaScript compiled and processed at the client. This process hinders its performance when compared with other programming languages. But its getting closer, larger bandwidth, engines optimization and new technologies are making JavaScript up to a level that programs made in other languages are compiled into JavaScript to be run in the browser. A gaming example, in 2013 epic ame's Unreal Engine 3 was fully ported to JavaScript with the use of asm.js, and only a year later the technology greow so much the Unreal Engine 4 was also ported. [UE4](https://blog.mozilla.org/blog/2014/03/12/mozilla-and-epic-preview-unreal-engine-4-running-in-firefox/)

Going over all the analysis, the pros outdo the cons, so know that the utility of the technology  has been established. Why this thesis? At the UPV right know there are subjects and learning material oriented to game development, but none specific to the HTML5 field. This thesis pretends to fill that gap.

###2.2 Proposal

So to fill the knowledge gap in this area, the most appropriate solution seem to choose one of the most competitive frameworks out there and make a game. During the development of the game document the different features a student might want to use in their game and provide examples for each part. The whole code of the game at the moment of the thesis presentation will be in an annex and as the evolution of the technology is speeding up, a public repository will be set to document the advancement of the game past the scope of the thesis. 

Crazy Volley is a simple volleyball mechanic where 2 to 4 players have to avoid the ball from touching their teams ground. The game tries to unite the widespread of the web with traditional console playing as all the players will be controlled from the same keyboard.

Having a simple game developed, makes easier to focus on a small code base centered on the teaching material rather than a big implementation where the architecture of the game and its maintainability would gather more importance.

More information about the whole game can be found at the game design document or GDD, provided as an annex.
