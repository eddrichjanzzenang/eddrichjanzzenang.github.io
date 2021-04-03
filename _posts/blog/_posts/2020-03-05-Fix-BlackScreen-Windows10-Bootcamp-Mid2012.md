---
title: Fix Black Screen in Windows 10 Bootcamp Assistant
layout: blog-specific
author: eddrichjanzzen
date: 2020-03-05
category: blog
tags: 
- tech
description: A short article about fixing that black screen when trying to Bootcamp to a Mid2012 Macbook Pro.
---

#### Macbook Pro Mid 2012 "13

The Macbook Pro Mid 2012 "13 (non-retina), is arguably one of the most versatile models released by Apple. Not only does it offer a wide possibility of upgradability; it also offers built-in ports without needing to buy those external dongles. With 2 USB ports, a Lightning Cable port, an Ethernet port, a Firewire 800 port, a Headphone jack, and SD Card slot, I could attest that this model is definitely designed for pros! The device is indeed very flexible with most of the important parts being easily replaceable/upgradable. As a matter of fact, with a few upgrades the device can still be up to par with todays standards. 

At the time of this writing, I have went along to upgrade my machine by replacing the original 2 x 2Gb DDR3 RAMs with 2 x 8Gb DDR3 RAMs to get a maximum of 16Gb memory. I also switched out the original HDD with to an SSD to increase processing speed. Lastly, I've also went along to buy a bracket or "caddy case" to replace the optical drive with additional storage. 

#### Bootcamping this Device

![Bootcamp](/assets/images/blog/bootcamp.png){:class="img-blog"}

One of the problems I've encountered when trying to Bootcamp this device was a black screen after the download when booting the system after following along with Bootcamp Assistant.

There are two important caveats to consider when bootcamping this Macbook model using Bootcamp Assistant. (especially if you're using additional storage like me: with the bracket or "caddy case".) 

1. Install Windows on Main Storage slot
* You can only run and install Windows on the main storage slot, not on the secondary slot. This means you can't run Windows from the secondary storage by default. 

2. Install Windows with Optical Drive attached
* You must install Windows with the optical drive attached because the system checks for a Windows installer CD before checking for a USB flash drive. This means that if you have the "caddy case" connected you must remove it and put back your optical drive. Leaving the optical drive slot unconnected also will not work. The optical drive must be connected for the installation to work. 
 
Following these two steps helped me Bootcamp my machine without any hiccups. 
:clap: :clap: :clap:










