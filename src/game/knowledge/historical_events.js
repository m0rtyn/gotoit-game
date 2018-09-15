import TimeIcon from "../../assets/images/time_event.png";

export const historical_events = {
    // year :: month :: day :: hour
    "1991 11 25 1": {
        name: "Dissolution of the Soviet Union",
        description: "The Soviet flag was lowered for the last time.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1991 8 17 1": {
        name: "Linux OS release",
        description: "Linux operation system kernel was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1992 6 15 1": {
        name: "Virtual Fixtures release",
        description: "One of the first functioning AR systems was developed.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1992 5 2 1": {
        name: "European currency exchange rate crisis",
        description: "European currency exchange rate crisis was started.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1992 5 30 1": {
        name: "OpenGL release",
        description: "OpenGL release was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1993 2 22 1": {
        name: "The Pentium microprocessor was introduced",
        description: "It advances the use of graphics and music on PCs.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1993 3 22 1": {
        name: "Mosaic web-browser release",
        description: "Mosaic web-browser was released. Browser platform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            data.projects_unlocked_platforms.push("browser");
        }
    },
    "1994 11 01 1": {
        name: "Mexican peso crisis",
        description: "A sudden devaluation of the peso against the U.S. dollar.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1994 6 5 1": {
        name: "Amazon was founded",
        description: "From 1994 onward, build e-commerce websites are widely used.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1995 0 1 1": {
        name: "World Trade Organization was founded",
        description: "WTO is an organization that regulates international trade.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1995 7 15 1": {
        name: "Microsoft introduces Windows 95",
        description: "It makes Windows the standard operating system for most PCs.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1995 4 23 1": {
        name: "JAVA release",
        description: "Java programming language was released. Crossplatform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            data.projects_unlocked_platforms.push("crossplatform");
        }
    },
    "1995 9 26 1": {
        name: "Fast Ethernet was introduced",
        description: "It carries traffic at the nominal rate of 100 Mbit/s.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1995 9 10 1": {
        name: "Dotcoms boom",
        description: "Dotcoms boom has come.\nSome companies have started to trade their shares! (Go to 'Exchange' to check it out)",
        picture: TimeIcon,
        updateGameData: data => {
            data.exchange_unlocked_shares.push("share0");
            data.exchange_unlocked_shares.push("share1");
            data.exchange_unlocked_shares.push("share2");
            data.share0_unlock = true;
            data.share1_unlock = true;
            data.share2_unlock = true;
        }
    },
    "1996 10 26 1": {
        name: "DVDs release",
        description: "The first DVD disks and DVD players were sold.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1997 5 30 1": {
        name: "Asian financial crisis",
        description: "The financial crisis has gripped much of East Asia.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1997 11 11 1": {
        name: "The Kyoto Protocol international treaty",
        description: "Commits to reduce greenhouse gas emissions.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1998 7 17 1": {
        name: "Russian financial crisis",
        description: "The devaluation of the ruble was caused.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1998 4 20 1": {
        name: "Bluetooth specification",
        description: "Bluetooth specification was developed.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1998 8 1 1": {
        name: "WiFi introduction",
        description: "WiFi technology was introduced.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1999 1 22 1": {
        name: "The first Mobile Web Browser",
        description: "The first commercial launch of a mobile browser web service.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "1999 2 31 1": {
        name: "Matrix film",
        description: "Matrix film was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2000 2 10 1": {
        name: "Dotcoms bubble burst",
        description: "Bursting of the bubble.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2000 3 1 1": {
        name: "USB becomes popular",
        description: "USB is a wide-spread technology.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2000 0 1 1": {
        name: "Cloud computing was appeared",
        description: "Cloud computing has come into existence.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2000 2 4 1": {
        name: "PlayStation 2 release",
        description: "PlayStation 2 was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2001 1 1 1": {
        name: "The Agile Manifesto was launched",
        description: "Agile project management approaches grow in popularity.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2001 2 1 1": {
        name: "President George W. Bush announce",
        description: "The US would not implement the Kyoto Protocol to save US economy.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2001 8 11 1": {
        name: "9/11 terroristic act",
        description: "9/11 terroristic act has happened.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2002 0 1 1": {
        name: "Euro banknotes appearing",
        description: "Physical euro coins and banknotes entered into circulation.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2003 5 3 1": {
        name: "3G network was launched",
        description: "The first commercial 3G network was launched.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2003 7 29 1": {
        name: "Skype beta version release",
        description: "The first public Skype beta version was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2003 8 23 1": {
        name: "AMD's Athlon 64 release",
        description: "The Athlon 64 was the first 64-bit processor.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2003 9 7 1": {
        name: "Nokia N-Gage release",
        description: "Nokia N-Gage gaming phone was released. Mobile platform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            data.projects_unlocked_platforms.push("mobile");
        }
    },
    "2004 9 20 1": {
        name: "Ubuntu release",
        description: "The first release of the Ubuntu Linux distribution",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2005 1 14 1": {
        name: "Youtube was founded",
        description: "It offers a wide variety of media videos.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2005 3 1 1": {
        name: "Anti-Spyware Coalition was formed",
        description: "The ASC fights against controlling spyware.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2006 3 28 1": {
        name: "U.S. Economic Growth Rises Sharply",
        description: "The stock market increasing in value, home prices rising.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2007 3 11 1": {
        name: "iPhone release",
        description: "iPhone was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2006 3 27 1": {
        name: "Nintendo Wii release",
        description: "Wii Remote controller detects movement in three dimensions.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2007 7 15 1": {
        name: "Advertising market growth",
        description: "It has reached 1,225 billion dollars.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2008 8 23 1": {
        name: "Android release",
        description: "Android was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2007 9 9 1": {
        name: "Stock market collapse",
        description: "Stock market is collapsing rapidly.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2008 0 1 1": {
        name: "Global financial crisis",
        description: "The global financial crisis has started.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2008 10 15 1": {
        name: "The Internet continues to boom",
        description: "Еhe Internet continued to grow at a phenomenal pace.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2009 0 3 1": {
        name: "BTC is launching",
        description: "BTC cryptocurrency has released.\nWanna buy some? Go to 'Exchange'!",
        picture: TimeIcon,
        updateGameData: data => {
            data.exchange_unlocked_shares.push("btc");
            data.btc_unlock = true;
        }
    },
    "2010 1 1 1": {
        name: "Computer Wins on 'Jeopardy!'",
        description: "IBM Watson has won the quiz show 'Jeopardy!'",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2010 3 23 1": {
        name: "Greek government-debt crisis",
        description: "Thousands of well-educated Greeks are leaving the country.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2010 8 15 1": {
        name: "Cloud-based project management",
        description: "The most popular PM solutions are cloud-based.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2010 3 3 1": {
        name: "Apple debuts the iPad",
        description: "The iPad is Apple's first tablet computer.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2010 7 15 1": {
        name: "4G technology is spreading",
        description: "A lot of countries use 4G.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2011 1 1 1": {
        name: "Silk Road creating",
        description: "Silk Road was founded. BTC course is increasing.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2011 0 10 1": {
        name: "Freak weather incidents growing",
        description: "Since the year 2010, there has been a growing occurrence of freak weather incidents.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2011 1 11 1": {
        name: "Arab Revolutions",
        description: "A dramatic increase in oil prices.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2011 9 13 1": {
        name: "Litecoin starting",
        description: "Litecoin was an early bitcoin spinoff.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2012 8 1 1": {
        name: "Bitcoin Foundation established",
        description: "The Bitcoin Foundation was formed.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2013 2 29 1": {
        name: "The Oculus Rift DK1 release",
        description: "The Oculus Rift DK1 was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2013 8 1 1": {
        name: "Peak of popularity of Blackberry",
        description: "There are 85 million BlackBerry subscribers worldwide.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2013 10 15 1": {
        name: "Litecoin price is increasing",
        description: "The aggregate value of Litecoin experienced massive growth.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2013 3 15 1": {
        name: "Google Glass release",
        description: "AR/VR era has started. VR platform is available now!",
        picture: TimeIcon,
        updateGameData: data => {
            data.projects_unlocked_platforms.push("VR");
        }
    },
    "2014 5 25 1": {
        name: "Google Cardboard release",
        description: "A low-cost system to encourage interest in VR applications.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2014 4 20 1": {
        name: "Melting ice caps and rising sea waters",
        description: "Droughts. Wildfires. Massive flooding.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2014 8 3 1": {
        name: "Samsung Gear VR release",
        description: "Samsung Gear VR was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2015 11 12 1": {
        name: "The Paris Agreement was sealed",
        description: "An agreement within the United Nations Framework Convention on Climate Change.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2016 7 1 1": {
        name: "The first reprogrammable quantum computer",
        description: "The first reprogrammable quantum computer was built.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2016 2 25 1": {
        name: "Oculus Rift consumer version",
        description: "Oculus Rift VR headsets began shipping to consumers.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2016 3 5 1": {
        name: "HTC Vive release",
        description: "A display with a camera, 2 controllers, 2 basestations.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2016 9 1 1": {
        name: "Supercomputer has reached 100 petaflops",
        description: "Supercomputer has reached 100 petaflops.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2016 9 13 1": {
        name: "PlayStation VR release",
        description: "It was designed to be functional with the PlayStation 4.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2017 11 1 1": {
        name: "Quantum computers are being sold",
        description: "A 2000 qubit quantum computer is on the market.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2017 0 1 1": {
        name: "Cryptocurrency market boom",
        description: "Cryptocurrency market booms.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2017 5 1 1": {
        name: "Donald Trump announce",
        description: "The U.S. would withdrawal from the 2015 Paris Agreement on climate change mitigation.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2017 0 18 1": {
        name: "U.S. scientists officially declare 2016 the hottest year on record",
        description: "Sixteen of the seventeen warmest years on record have occurred since 2000.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2018 1 1 1": {
        name: "Cryptocurrency market recession",
        description: "Cryptocurrencies continues to lower.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2018 3 13 1": {
        name: "3-mode Fiber has reached new speed",
        description: "159 Tb/s Transmission over 1045 km with 3-mode Fiber.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2018 8 15 1": {
        name: "The Paris Climate Agreement continues",
        description: "194 states and the European Union have signed the Agreement.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2019 0 1 1": {
        name: "AR/VR is flowering",
        description: "AR/VR is getting more and more popular.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2020 10 1 1": {
        name: "5G technology release",
        description: "5G technology release was released.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2020 08 1 1": {
        name: "The global surface temperature was increased",
        description: "It's more than 0.5°C warmer than the 1986-2005 average.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    },
    "2020 11 1 1": {
        name: "The PlayStation 5 release",
        description: "It includes support for virtual, augmented, mixed reality.",
        picture: TimeIcon,
        updateGameData: data => {
            return data;
        }
    }
};
