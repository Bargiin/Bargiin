/*==================================================
BARGIIN
SEARCH.JS
Unified Version
==================================================*/

(function(){

    "use strict";


    /*==================================
    ELEMENTS
    ==================================*/

    const searchBtn =
        document.querySelector(".search-btn");

    const searchBox =
        document.querySelector(".search-box");

    const searchInput =
        document.querySelector("#liveSearch");

    const searchResults =
        document.querySelector("#searchResults");


    if(
        !searchBtn ||
        !searchBox ||
        !searchInput ||
        !searchResults
    ){
        return;
    }


    /*==================================
    STATE
    ==================================*/

    let fuse = null;

    let debounceTimer = null;

    let currentIndex = -1;

    const searchCache = new Map();


    /*==================================
    NORMALIZE PERSIAN
    ==================================*/

    function normalize(text){

        if(!text){
            return "";
        }

        return text
            .toString()
            .toLowerCase()
            .replace(/ي/g,"ی")
            .replace(/ك/g,"ک")
            .replace(/ة/g,"ه")
            .replace(/أ|إ|آ/g,"ا")
            .replace(/ؤ/g,"و")
            .replace(/ئ/g,"ی")
            .replace(/‌/g," ")
            .replace(/\s+/g," ")
            .trim();

    }


    /*==================================
    INITIALIZE FUSE
    ==================================*/

    function initializeSearch(){

        if(
            typeof Fuse === "undefined" ||
            typeof searchData === "undefined"
        ){
            console.warn(
                "Bargiin Search: Fuse.js or searchData is not loaded."
            );

            return;
        }


        fuse = new Fuse(

            searchData.map(function(item){

                return {

                    ...item,

                    title:
                        normalize(item.title),

                    keywords:
                        Array.isArray(item.keywords)
                            ? item.keywords.map(normalize)
                            : [],

                    type:
                        normalize(item.type),

                    category:
                        normalize(item.category)

                };

            }),

            {

                includeScore:true,

                shouldSort:true,

                ignoreLocation:true,

                threshold:.4,

                distance:200,

                minMatchCharLength:1,

                keys:[

                    {
                        name:"title",
                        weight:.45
                    },

                    {
                        name:"keywords",
                        weight:.40
                    },

                    {
                        name:"type",
                        weight:.10
                    },

                    {
                        name:"category",
                        weight:.05
                    }

                ]

            }

        );

    }


    /*==================================
    ESCAPE REGEX
    ==================================*/

    function escapeRegExp(text){

        return text.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

    }


    /*==================================
    HIGHLIGHT
    ==================================*/

    function highlight(text,keyword){

        if(!keyword){
            return text;
        }

        const words =
            normalize(keyword)
                .split(/\s+/)
                .filter(Boolean);


        let output =
            String(text);


        words.forEach(function(word){

            const regex =
                new RegExp(
                    escapeRegExp(word),
                    "gi"
                );


            output =
                output.replace(
                    regex,
                    "<mark>$&</mark>"
                );

        });


        return output;

    }


    /*==================================
    OPEN
    ==================================*/

    function openSearch(){

        searchBox.classList.add("active");

        searchInput.focus();

    }


    /*==================================
    CLEAR
    ==================================*/

    function clearSearch(){

        searchInput.value = "";

        searchResults.innerHTML = "";

        searchResults.classList.remove("show");

        currentIndex = -1;

    }


    /*==================================
    SEARCH BUTTON
    ==================================*/

    searchBtn.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            e.stopPropagation();


            if(
                searchBox.classList.contains("active")
            ){

                searchBox.classList.remove("active");

                clearSearch();

            }

            else{

                openSearch();

            }

        }
    );


    /*==================================
    INPUT
    ==================================*/

    searchInput.addEventListener(
        "input",
        function(){

            clearTimeout(
                debounceTimer
            );


            debounceTimer =
                setTimeout(
                    runSearch,
                    180
                );

        }
    );


    /*==================================
    SEARCH
    ==================================*/

    function runSearch(){

        const keyword =
            normalize(
                searchInput.value
            );


        searchResults.innerHTML = "";

        currentIndex = -1;


        if(keyword.length < 2){

            searchResults.classList.remove(
                "show"
            );

            return;

        }


        if(!fuse){

            initializeSearch();

        }


        if(!fuse){

            return;

        }


        if(
            searchCache.has(keyword)
        ){

            renderResults(
                searchCache.get(keyword),
                keyword
            );

            return;

        }


        const results =
            fuse.search(
                keyword,
                {
                    limit:8
                }
            );


        searchCache.set(
            keyword,
            results
        );


        renderResults(
            results,
            keyword
        );

    }


    /*==================================
    RENDER
    ==================================*/

    function renderResults(
        results,
        keyword
    ){

        searchResults.innerHTML = "";


        if(!results.length){

            searchResults.innerHTML = `

                <div class="search-empty">

                    نتیجه‌ای یافت نشد

                </div>

            `;


            searchResults.classList.add(
                "show"
            );


            return;

        }


        results.forEach(function(result){

            const item =
                result.item;


            searchResults.insertAdjacentHTML(

                "beforeend",

                `

                <a
                    class="search-item"
                    href="${getCorrectUrl(item.url)}"
                    data-title="${item.title}"
                >

                    <img
                        src="${getCorrectUrl(item.image)}"
                        alt="${item.title}"
                        loading="lazy"
                    >

                    <div class="search-info">

                        <div class="search-title">

                            ${highlight(
                                item.title,
                                keyword
                            )}

                        </div>

                        <div class="search-type">

                            ${item.type}

                        </div>

                    </div>

                </a>

                `

            );

        });


        searchResults.classList.add(
            "show"
        );

    }


    /*==================================
    PATH HANDLER
    ==================================*/

   function getCorrectUrl(path){

    if(!path){
        return "#";
    }

    if(
        path.startsWith("http://") ||
        path.startsWith("https://") ||
        path.startsWith("/")
    ){
        return path;
    }

    const currentPath =
        window.location.pathname;

    const insideProducts =
        currentPath.includes("/products/");

    const insideArticles =
        currentPath.includes("/articles/");

    if(insideProducts || insideArticles){
        return "../" + path;
    }

    return path;
}


    /*==================================
    HISTORY
    ==================================*/

    function getHistory(){

        try{

            return JSON.parse(

                localStorage.getItem(
                    "bargiin-search-history"
                ) || "[]"

            );

        }

        catch(error){

            return [];

        }

    }


    function saveHistory(keyword){

        let history =
            getHistory();


        history =
            history.filter(
                function(item){

                    return item !== keyword;

                }
            );


        history.unshift(keyword);


        history =
            history.slice(0,8);


        localStorage.setItem(

            "bargiin-search-history",

            JSON.stringify(history)

        );

    }


    /*==================================
    POPULAR SEARCHES
    ==================================*/

    const popularSearches = [

        "آرامیس",

        "ماه بانو",

        "سبزگام",

        "شوید خشک",

        "نعنا خشک",

        "به لیمو",

        "بابونه",

        "گل گاوزبان"

    ];


    /*==================================
    DEFAULT ITEMS
    ==================================*/

    searchInput.addEventListener(

        "focus",

        function(){

            if(
                searchInput.value.trim() !== ""
            ){

                return;

            }


            const history =
                getHistory();


            const list =
                history.length
                    ? history
                    : popularSearches;


            searchResults.innerHTML = "";


            list.forEach(function(word){

                searchResults.insertAdjacentHTML(

                    "beforeend",

                    `

                    <div
                        class="search-default-item"
                        data-key="${word}"
                    >

                        <i class="ri-history-line"></i>

                        <span>
                            ${word}
                        </span>

                    </div>

                    `

                );

            });


            searchResults.classList.add(
                "show"
            );

        }

    );


    /*==================================
    RESULT CLICK
    ==================================*/

    searchResults.addEventListener(

        "click",

        function(e){

            const searchItem =
                e.target.closest(
                    ".search-item"
                );


            if(searchItem){

                saveHistory(
                    searchItem.dataset.title
                );


                searchBox.classList.remove(
                    "active"
                );


                return;

            }


            const defaultItem =
                e.target.closest(
                    ".search-default-item"
                );


            if(defaultItem){

                searchInput.value =
                    defaultItem.dataset.key;


                runSearch();

            }

        }

    );


    /*==================================
    KEYBOARD NAVIGATION
    ==================================*/

    document.addEventListener(

        "keydown",

        function(e){

            if(
                !searchResults.classList.contains(
                    "show"
                )
            ){

                return;

            }


            const items =
                searchResults.querySelectorAll(
                    ".search-item"
                );


            if(!items.length){

                return;

            }


            if(e.key === "ArrowDown"){

                e.preventDefault();


                currentIndex++;


                if(
                    currentIndex >=
                    items.length
                ){

                    currentIndex = 0;

                }


                updateSelection(items);

            }


            else if(
                e.key === "ArrowUp"
            ){

                e.preventDefault();


                currentIndex--;


                if(currentIndex < 0){

                    currentIndex =
                        items.length - 1;

                }


                updateSelection(items);

            }


            else if(
                e.key === "Enter"
            ){

                if(
                    currentIndex >= 0
                ){

                    items[
                        currentIndex
                    ].click();

                }

            }

        }

    );


    function updateSelection(items){

        items.forEach(function(item){

            item.classList.remove(
                "active"
            );

        });


        if(
            items[currentIndex]
        ){

            items[
                currentIndex
            ].classList.add(
                "active"
            );


            items[
                currentIndex
            ].scrollIntoView({

                block:"nearest",

                behavior:"smooth"

            });

        }

    }


    /*==================================
    CLOSE OUTSIDE
    ==================================*/

    document.addEventListener(

        "click",

        function(e){

            if(
                e.target.closest(".search-box") ||
                e.target.closest(".search-btn")
            ){

                return;

            }


            searchBox.classList.remove(
                "active"
            );


            clearSearch();

        }

    );


    /*==================================
    ESC
    ==================================*/

    document.addEventListener(

        "keydown",

        function(e){

            if(e.key === "Escape"){

                searchBox.classList.remove(
                    "active"
                );


                clearSearch();

            }

        }

    );


    /*==================================
    INITIALIZE
    ==================================*/

    if(
        typeof Fuse !== "undefined" &&
        typeof searchData !== "undefined"
    ){

        initializeSearch();

    }


})();