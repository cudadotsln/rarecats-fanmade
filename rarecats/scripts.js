var raritySprites = [
    "../assets/images/cat-001.gif",
    "../assets/images/cat-002.gif",
    "../assets/images/cat-003.gif",
    "../assets/images/cat-004.gif",
    "../assets/images/cat-005.gif",
    "../assets/images/cat-006.gif",
    "../assets/images/cat-007.gif",
    "../assets/images/cat-008.gif",
    "../assets/images/cat-009.gif",
    "../assets/images/cat-010.gif"
];

var spriteToUse = raritySprites[0];

var sprinkle = new Howl({
    src: ["../assets/sounds/sprinkle.webm", "../assets/sounds/sprinkle.mp3"],
    volume: .5
});

var guitar = new Howl({
    src: ["../assets/sounds/guitar.webm", "../assets/sounds/guitar.mp3"],
    volume: .5
});

var heavenly = new Howl({
    src: ["../assets/sounds/heavenly.webm", "../assets/sounds/heavenly.mp3"],
    volume: .5
});

var idiot = new Howl({
    src: ["../assets/sounds/idiot.webm", "../assets/sounds/idiot.mp3"],
    volume: .5
});

var pinballlaunch = new Howl({
    src: ["../assets/sounds/pinball1.webm", "../assets/sounds/pinball1.mp3"],
    volume: .5
});

var pinballbounce = new Howl({
    src: ["../assets/sounds/pinballbounce.webm", "../assets/sounds/pinballbounce.mp3"],
    volume: .5
});

var pinballclick = new Howl({
    src: ["../assets/sounds/pinballclick.webm", "../assets/sounds/pinballclick.mp3"],
    volume: .5
});

var currentRarity = 1;
var pastRarity = 1;

var bouncing = true;
var canClick = true;

var debug = false;

var isMetallic = false;

function playSound(sound, rate = 1.0)
{
    soundreal = sound.play();
    sound.rate(rate, soundreal);
}

const wrapper = document.getElementById("bouncer")
const cat = document.getElementById("cat")
let x = 100, y = 100
let dx = 1, dy = 1

if (localStorage.getItem("pointscate"))
{
    document.getElementById("gai").innerText = "(" + localStorage.getItem("pointscate").toString() + " Points)"
}

function bounce() {
    if (bouncing == true)
    {
        const w = window.innerWidth - wrapper.offsetWidth
        const h = window.innerHeight - wrapper.offsetHeight

        x += dx
        y += dy

        if (x <= -63 || x >= w) dx = -dx
        if (y <= -65 || y >= h) dy = -dy
        if (x <= -63 || x >= w)
        {
            if (isMetallic)
            {
                playSound(pinballbounce);
            }
        }
        if (y <= -65 || y >= h)
        {
            if (isMetallic)
            {
                playSound(pinballbounce);
            }
        }

        wrapper.style.left = x + "px"
        wrapper.style.top = y + "px"
    }
    requestAnimationFrame(bounce)
}

function weightedRandom(min, max, exponent = 2)
{
    const rand = Math.random(); // uniform 0-1
    const biased = Math.pow(rand, exponent); // bias towards 0
    return Math.floor(min + (max - min + 1) * biased);
}  

function addScore(score = 10)
{
    if (localStorage.getItem("pointscate"))
    {
        localStorage.setItem("pointscate", parseInt(localStorage.getItem("pointscate")) + score);
    }
    else
    {
        localStorage.setItem("pointscate", score);
    }
    document.getElementById("gai").innerText = "(" + localStorage.getItem("pointscate").toString() + " Points)"
}

wrapper.onclick = async () => {
    if (canClick)
    {
        if (isMetallic = true)
        {
            isMetallic = false;
        }
        canClick = false;
        bouncing = false;

        const maxX = window.innerWidth - wrapper.offsetWidth
        const maxY = window.innerHeight - wrapper.offsetHeight

        x = Math.random() * maxX
        y = Math.random() * maxY

        const dirs = [
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1],
        ]

        const [newDx, newDy] = dirs[Math.floor(Math.random() * dirs.length)]
        dx = newDx
        dy = newDy

        /*
        switch(currentRarity)
        {
            case 1:
                playSound(sprinkle);
                addScore();
                break;
            case 2:
                playSound(sprinkle, 1.05);
                addScore(15);
                break;
            case 3:
                playSound(sprinkle, 1.1);
                addScore(20);
                break;
            case 4:
                playSound(sprinkle, 0.8);
                addScore(25);
                break;
            case 5:
                playSound(guitar, 0.95);
                addScore(50);
                break;
            case 6:
                playSound(sprinkle, 1.1);
                playSound(heavenly, 1.1);
                addScore(100);
                break;
            case 7:
                playSound(sprinkle, 0.5);
                playSound(heavenly, 0.9);
                addScore(1000);
                break;
            case 8:
                playSound(sprinkle, 0.5);
                playSound(heavenly, 0.9);
                addScore(5000);
                break;
        }
        */

        pastRarity = currentRarity;
        //currentRarity = Math.floor(Math.random() * 3001) + 1;
        currentRarity = weightedRandom(1, 12000, 10);

        if (debug)
        {
            console.log("Past Rarity: " + pastRarity);
            console.log("Current Rarity: " + currentRarity);
        }


        if (pastRarity >= 11000)
        {
            playSound(pinballclick);
            addScore(10000);
        }
        else if (pastRarity >= 7000)
        {
            playSound(idiot);
            addScore(5500);
        }
        else if (pastRarity >= 5000)
        {
            playSound(sprinkle, 0.5);
            playSound(heavenly, 0.9);
            addScore(3000);
        }
        else if (pastRarity >= 3000)
        {
            playSound(sprinkle, 0.5);
            playSound(heavenly, 0.9);
            addScore(1000);
        }
        else if (pastRarity >= 1000)
        {
            playSound(sprinkle, 1.1);
            playSound(heavenly, 1.1);
            addScore(100);
        }
        else if (pastRarity >= 100)
        {
            playSound(guitar, 0.95);
            addScore(50);
        }
        else if (pastRarity >= 50)
        {
            playSound(sprinkle, 0.8);
            addScore(40);
        }
        else if (pastRarity >= 40)
        {
            playSound(sprinkle, 1.1);
            addScore(20);
        }
        else if (pastRarity >= 20)
        {
            playSound(sprinkle, 1.05);
            addScore(15);
        }
        else if (pastRarity >= 0)
        {
            playSound(sprinkle);
            addScore();
        }

        //currentrarity spritetouse starts here
        if (currentRarity >= 11000)
        {
            spriteToUse = raritySprites[9];
        }
        else if (currentRarity >= 7000)
        {
            spriteToUse = raritySprites[8];
        }
        else if (currentRarity >= 5000)
        {
            spriteToUse = raritySprites[7];
        }
        else if (currentRarity >= 3000)
        {
            spriteToUse = raritySprites[6];
        }
        else if (currentRarity >= 1000)
        {
            spriteToUse = raritySprites[5];
        }
        else if (currentRarity >= 100)
        {
            spriteToUse = raritySprites[4];
        }
        else if (currentRarity >= 50)
        {
            spriteToUse = raritySprites[3];
        }
        else if (currentRarity >= 40)
        {
            spriteToUse = raritySprites[2];
        }
        else if (currentRarity >= 20)
        {
            spriteToUse = raritySprites[1];
        }
        else if (currentRarity >= 0)
        {
            spriteToUse = raritySprites[0];
        }

        // scale up
        cat.style.transform = "scale(1.5)"
        await new Promise(r => setTimeout(r, 300))

        // scale back down
        cat.style.transform = "scale(1)"
        await new Promise(r => setTimeout(r, 300))

        // fade out
        cat.style.opacity = 0
        await new Promise(r => setTimeout(r, 200))

        // fade out
        cat.style.opacity = 1

        bouncing = true;
        canClick = true;
        // FIXED [find some way to fix the url going to cat-000 instead of 1-8]
        cat.src = spriteToUse;
        if (spriteToUse == raritySprites[9])
        {
            playSound(pinballlaunch);
            isMetallic = true;
        }
        if (debug)
        {
            console.log(cat.src);
        }
    }
}

bounce()