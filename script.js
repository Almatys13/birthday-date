/* =========================================================
   CUSTOMIZE YOUR WEBSITE HERE
   ========================================================= */

const CONFIG = {

    /* ---------- PAGE TEXT ---------- */

    hungryTitle: "Who's hungry?",

    hungrySubtitle:
        "Be honest... we both know the answer.",


    moodTitle:
        "What are you in the mood for?",

    moodSubtitle:
        "Pick whatever sounds best right now.",


    restaurantTitle:
        "Pick your favorite.",

    restaurantSubtitle:
        "Here are the best spots I found",


    doneTitle:
        "It's a date.",

    doneSubtitle:
        "You picked. I plan the rest.",


    finalMessage:
        "Kocham Cie!",


    /* =====================================================
       RESTAURANTS

       Change the names, descriptions and links below.

       IMPORTANT:
       Replace the example URLs with the actual restaurant
       URLs you want her to visit.
       ===================================================== */


    restaurants: {

        "Italian": [

            {
                name: "Restaurant One",
                description: "Italian • Dinner",
                icon: "🍝",
                link: "https://www.basilicoct.com"
            },

            {
                name: "Restaurant Two",
                description: "Italian • Cozy",
                icon: "🍷",
                link: "https://www.mercatoitaliankitchen.com/locations/shelton"
            },

            {
                name: "Restaurant Three",
                description: "Italian • Date night",
                icon: "🍕",
                link: "https://ilgabbianonewhaven.com/all-day-menu/"
            }

        ],


        "Sushi": [

            {
                name: "Sushi Spot One",
                description: "Sushi • Dinner",
                icon: "🍣",
                link: "https://www.maru67.com"
            },

            {
                name: "Sushi Spot Two",
                description: "Sushi • Upscale",
                icon: "🍱",
                link: "https://www.izumisushi111.com"
            },

            {
                name: "Sushi Spot Three",
                description: "Sushi • Casual",
                icon: "🥢",
                link: "https://wildkanjihibachi.com"
            }

        ],


        "Steak": [

            {
                name: "Steakhouse One",
                description: "Steak • Dinner",
                icon: "🥩",
                link: "https://www.texasroadhouse.com/global-menu"
            },

            {
                name: "Steakhouse Two",
                description: "Steak • Date night",
                icon: "🍷",
                link: "https://www.longhornsteakhouse.com/menu/legendary-steaks-combos"
            }

        ],


        "Chinese Buffet": [

            {
                name: "Chinese spot numero uno",
                description: "Chinese + seafood all you can eat",
                icon: "🐉",
                link: "https://www.umibuffet.com/menu"
            },

            {
                name: "Chinese spot numero dos",
                description: "Classic chinese spot in Stratford",
                icon: "🐉🐉",
                link: "https://www.yelp.com/biz/osaka-hibachi-buffet-stratford"
            }

        ],


        "Casual": [

            {
                name: "Casual Spot One",
                description: "Casual • Easy dinner",
                icon: "🍔",
                link: "https://thehousatonichouse.com/food-menu"
            },

            {
                name: "Casual Spot Two",
                description: "Casual • food",
                icon: "🍟",
                link: "http://spottedhorsetavernct.com/shelton/menus.php"
            }

        ],


        "Surprise me": [

            {
                name: "Please go back and think harder",
                description: "Just kidding I cooked up a great spot",
                icon: "✨",
                link: "https://bangkokroomansonia.com/menu"
            },

            {
                name: "Surprise Option Two",
                description: "Trust the process.",
                icon: "❤️",
                link: "https://thelandingatfivetwenty.com/food-menu"
            }

        ]

    },


    /* =====================================================
       EMAIL / FORM SUBMISSION

       OPTION 1:
       Leave this blank while testing.

       OPTION 2:
       Create a free Formspree form and put the endpoint here.

       Example:
       https://formspree.io/f/xxxxxxxx
       ===================================================== */

    formEndpoint: "https://formspree.io/f/xkjnkpbw"

};


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let currentScreen = 1;

let answers = {
    hungry: "",
    mood: "",
    restaurant: ""
};


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    applyCustomText();

    updateProgress();

});


/* =========================================================
   CUSTOM TEXT
   ========================================================= */

function applyCustomText() {

    document.getElementById("hungryTitle").textContent =
        CONFIG.hungryTitle;

    document.getElementById("hungrySubtitle").textContent =
        CONFIG.hungrySubtitle;


    document.getElementById("moodTitle").textContent =
        CONFIG.moodTitle;

    document.getElementById("moodSubtitle").textContent =
        CONFIG.moodSubtitle;


    document.getElementById("restaurantTitle").textContent =
        CONFIG.restaurantTitle;

    document.getElementById("restaurantSubtitle").textContent =
        CONFIG.restaurantSubtitle;


    document.getElementById("doneTitle").textContent =
        CONFIG.doneTitle;

    document.getElementById("doneSubtitle").textContent =
        CONFIG.doneSubtitle;


    document.getElementById("finalMessage").textContent =
        CONFIG.finalMessage;

}


/* =========================================================
   SELECT "WHO'S HUNGRY?"
   ========================================================= */

function selectChoice(button) {

    const buttons =
        document.querySelectorAll(".choice-button");

    buttons.forEach(btn => {
        btn.classList.remove("selected");
    });


    button.classList.add("selected");


    answers.hungry =
        button.dataset.answer;


    document.getElementById("continue1").disabled =
        false;

}


/* =========================================================
   SELECT MOOD
   ========================================================= */

function selectMood(button) {

    const cards =
        document.querySelectorAll(".mood-card");

    cards.forEach(card => {
        card.classList.remove("selected");
    });


    button.classList.add("selected");


    answers.mood =
        button.dataset.answer;


    document.getElementById("continue2").disabled =
        false;

}


/* =========================================================
   SHOW RESTAURANTS
   ========================================================= */

function loadRestaurants() {

    const list =
        document.getElementById("restaurantList");


    list.innerHTML = "";


    const restaurants =
        CONFIG.restaurants[answers.mood] || [];


    if (restaurants.length === 0) {

        list.innerHTML = `
            <div class="restaurant-card">
                <div class="restaurant-info">
                    <div class="restaurant-icon">❤️</div>

                    <div>
                        <div class="restaurant-name">
                            We'll figure it out together
                        </div>

                        <div class="restaurant-description">
                            You picked ${answers.mood}.
                        </div>
                    </div>
                </div>
            </div>
        `;

        return;
    }


    restaurants.forEach((restaurant, index) => {

        const card =
            document.createElement("div");

        card.className =
            "restaurant-card";


        card.dataset.restaurant =
            restaurant.name;


        card.innerHTML = `

            <div class="restaurant-info">

                <div class="restaurant-icon">
                    ${restaurant.icon}
                </div>

                <div>

                    <div class="restaurant-name">
                        ${restaurant.name}
                    </div>

                    <div class="restaurant-description">
                        ${restaurant.description}
                    </div>

                </div>

            </div>


            <a
                href="${restaurant.link}"
                target="_blank"
                rel="noopener noreferrer"
                class="restaurant-link"
                onclick="event.stopPropagation();"
            >
                View →
            </a>

        `;


        card.addEventListener("click", () => {

            document
                .querySelectorAll(".restaurant-card")
                .forEach(item => {
                    item.classList.remove("selected");
                });


            card.classList.add("selected");


            answers.restaurant =
                restaurant.name;


            document.getElementById("continue3").disabled =
                false;

        });


        list.appendChild(card);

    });

}


/* =========================================================
   NEXT SCREEN
   ========================================================= */

function nextScreen() {

    /*
       THIS FIXES THE CONTINUE BUTTON ISSUE.

       Instead of relying on hidden/disabled elements,
       we explicitly check which screen we're on.
    */


    if (currentScreen === 1) {

        if (!answers.hungry) {
            return;
        }

        showScreen(2);

        return;
    }


    if (currentScreen === 2) {

        if (!answers.mood) {
            return;
        }

        loadRestaurants();

        showScreen(3);

        return;
    }


    if (currentScreen === 3) {

        if (!answers.restaurant) {
            return;
        }

        updateSummary();

        submitAnswers();

        showScreen(4);

        return;
    }

}


/* =========================================================
   PREVIOUS SCREEN
   ========================================================= */

function previousScreen() {

    if (currentScreen <= 1) {
        return;
    }


    showScreen(currentScreen - 1);

}


/* =========================================================
   SHOW SCREEN
   ========================================================= */

function showScreen(number) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });


    const next =
        document.getElementById(`screen${number}`);


    if (!next) {
        return;
    }


    next.classList.add("active");


    currentScreen =
        number;


    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   PROGRESS BAR
   ========================================================= */

function updateProgress() {

    const percentage =
        (currentScreen / 4) * 100;


    document.getElementById("progressFill")
        .style.width =
        `${percentage}%`;


    document.getElementById("stepText")
        .textContent =
        `${currentScreen} of 4`;

}


/* =========================================================
   UPDATE FINAL SUMMARY
   ========================================================= */

function updateSummary() {

    document.getElementById("summaryHungry")
        .textContent =
        answers.hungry || "—";


    document.getElementById("summaryMood")
        .textContent =
        answers.mood || "—";


    document.getElementById("summaryRestaurant")
        .textContent =
        answers.restaurant || "—";

}


/* =========================================================
   SUBMIT ANSWERS
   ========================================================= */

async function submitAnswers() {

    /*
       Store answers locally first.
       This means the answers aren't lost if the page
       is refreshed.
    */

    localStorage.setItem(
        "birthdayDateAnswers",
        JSON.stringify(answers)
    );


    /*
       If you haven't added Formspree yet,
       stop here.

       The website will still work perfectly.
    */

    if (!CONFIG.formEndpoint) {
        console.log(
            "Answers:",
            answers
        );

        return;
    }


    /*
       Fill hidden form fields.
    */

    document.getElementById("formHungry").value =
        answers.hungry;


    document.getElementById("formMood").value =
        answers.mood;


    document.getElementById("formRestaurant").value =
        answers.restaurant;


    /*
       Submit to Formspree.
    */

    try {

        await fetch(
            CONFIG.formEndpoint,
            {
                method: "POST",

                headers: {
                    "Accept": "application/json"
                },

                body:
                    new FormData(
                        document.getElementById(
                            "submissionForm"
                        )
                    )
            }
        );

        console.log(
            "Answers successfully submitted."
        );

    } catch (error) {

        console.error(
            "Could not submit answers:",
            error
        );

    }

}


/* =========================================================
   START OVER
   ========================================================= */

function restart() {

    answers = {
        hungry: "",
        mood: "",
        restaurant: ""
    };


    document
        .querySelectorAll(".choice-button")
        .forEach(button => {
            button.classList.remove("selected");
        });


    document
        .querySelectorAll(".mood-card")
        .forEach(card => {
            card.classList.remove("selected");
        });


    document.getElementById("continue1").disabled =
        true;

    document.getElementById("continue2").disabled =
        true;

    document.getElementById("continue3").disabled =
        true;


    localStorage.removeItem(
        "birthdayDateAnswers"
    );


    showScreen(1);

}