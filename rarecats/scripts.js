var raritySprites = [
    "../assets/images/cat-001.gif",
    "../assets/images/cat-002.gif",
    "../assets/images/cat-003.gif",
    "../assets/images/cat-004.gif",
    "../assets/images/cat-005.gif",
    "../assets/images/cat-006.gif",
    "../assets/images/cat-007.gif",
    "../assets/images/cat-008.gif"
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

var currentRarity = 1;

var rarities =
[
    {
        type: "normal",
        chance: 0
    },
    {
        type: "blueora",
        chance: 10
    },
    
]

var bouncing = true;
var canClick = true;

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

        wrapper.style.left = x + "px"
        wrapper.style.top = y + "px"
    }
    requestAnimationFrame(bounce)
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

        if (currentRarity >= 0)
        {
            //playSound(sprinkle);
            //addScore();
            spriteToUse = raritySprites[0];
        }
        if (currentRarity >= 15)
        {
            //playSound(sprinkle, 1.05);
            //addScore(15);
            spriteToUse = raritySprites[1];
        }
        if (currentRarity >= 20)
        {
            //playSound(sprinkle, 1.1);
            //addScore(20);
            spriteToUse = raritySprites[2];
        }
        if (currentRarity >= 25)
        {
            //playSound(sprinkle, 0.8);
            //addScore(25);
            spriteToUse = raritySprites[3];
        }
        if (currentRarity >= 50)
        {
            //playSound(guitar, 0.95);
            //addScore(50);
            spriteToUse = raritySprites[4];
        }

        //to fix: TypeError: spriteToUse is not a function
        switch (raritySprites.findIndex(spriteToUse))
        {
            case 0:
                playSound(sprinkle);
                addScore();
                break;
            case 1:
                playSound(sprinkle, 1.05);
                addScore(15);
                break;
            case 2:
                playSound(sprinkle, 1.1);
                addScore(20);
                break;
            case 3:
                playSound(sprinkle, 0.8);
                addScore(25);
                break;
            case 4:
                playSound(guitar, 0.95);
                addScore(50);
                break; 
        }

        currentRarity = Math.floor(Math.random() * 8000) + 1;

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
        console.log(cat.src);
    }
}

bounce()