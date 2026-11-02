<script src="script.js" defer></script>

/* =========================================
   SoleStreet Sneakers
   Section 2.1 and 2.2 JavaScript
   ========================================= */


/* =========================================
   2.2 DYNAMIC PRODUCT CONTENT
   ========================================= */

// Product information stored in an array

const products = [

    {
        id: "classic-runner",
        name: "SoleStreet Classic Runner",
        price: 1199,
        image: "Black sneaker.jpg",
        description: "An everyday sneaker designed for comfort and casual streetwear.",
        sizes: "6 - 12",
        colour: "Black and White",
        category: "Casual"
    },

    {
        id: "streetflex",
        name: "StreetFlex Low",
        price: 1399,
        image: "White sneaker.jpg",
        description: "A lightweight sneaker with a modern streetwear appearance.",
        sizes: "6 - 12",
        colour: "White and Grey",
        category: "Streetwear"
    },

    {
        id: "urban-court",
        name: "Urban Court 2",
        price: 1599,
        image: "Sneaker.jpg",
        description: "A versatile sneaker inspired by classic court styles.",
        sizes: "7 - 12",
        colour: "Black and Red",
        category: "Casual"
    },

    {
        id: "metro-high-top",
        name: "Metro High-Top",
        price: 1699,
        image: "High top.jpg",
        description: "A bold streetwear sneaker with additional ankle support.",
        sizes: "6 - 11",
        colour: "Black",
        category: "High-Top"
    },

    {
        id: "streetlite",
        name: "StreetLite Runner",
        price: 999,
        image: "Running shoe.jpg",
        description: "An affordable lightweight sneaker designed for comfort.",
        sizes: "5 - 12",
        colour: "White and Blue",
        category: "Running/Casual"
    }

];


/* =========================================
   2.2 DISPLAY PRODUCTS
   ========================================= */

const productList = document.getElementById("productList");


// Function to display products

function displayProducts(productArray) {

    if (!productList) {
        return;
    }

    productList.innerHTML = "";


    // Check if products are available

    if (productArray.length === 0) {

        productList.innerHTML =
            "<p>No sneakers found. Try another search.</p>";

        return;
    }


    // Generate product cards

    productArray.forEach(function(product) {

        const productCard = document.createElement("article");

        productCard.className = "product-card";

        productCard.innerHTML = `

            <button
                type="button"
                class="image-button"
                data-image="${product.image}"
                data-name="${product.name}"
                aria-label="View larger image of ${product.name}"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                >

            </button>

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <ul>
                <li>Price: R${product.price.toLocaleString("en-ZA")}</li>
                <li>Available Sizes: ${product.sizes}</li>
                <li>Colour: ${product.colour}</li>
                <li>Category: ${product.category}</li>
            </ul>

            <a href="enquiry.html?product=${product.id}">
                Enquire About This Product
            </a>

        `;


        productList.appendChild(productCard);

    });

}


/* =========================================
   2.2 SEARCH PRODUCTS
   ========================================= */

const productSearch = document.getElementById("productSearch");


if (productSearch) {

    productSearch.addEventListener("input", filterProducts);

}


/* =========================================
   2.2 FILTER PRODUCTS
   ========================================= */

const categoryFilter = document.getElementById("categoryFilter");


if (categoryFilter) {

    categoryFilter.addEventListener("change", filterProducts);

}


/* =========================================
   2.2 SORT PRODUCTS
   ========================================= */

const sortProducts = document.getElementById("sortProducts");


if (sortProducts) {

    sortProducts.addEventListener("change", filterProducts);

}


// Search, filter and sort function

function filterProducts() {

    let filteredProducts = [...products];


    // Search by product name

    const searchText = productSearch
        ? productSearch.value.toLowerCase().trim()
        : "";

    filteredProducts = filteredProducts.filter(function(product) {

        return product.name.toLowerCase().includes(searchText);

    });


    // Filter by category

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    if (selectedCategory !== "all") {

        filteredProducts = filteredProducts.filter(function(product) {

            return product.category === selectedCategory;

        });

    }


    // Sort by price

    const sortValue = sortProducts
        ? sortProducts.value
        : "default";

    if (sortValue === "low-high") {

        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });

    }

    else if (sortValue === "high-low") {

        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });

    }


    displayProducts(filteredProducts);

}


// Load products when the Products page opens

displayProducts(products);


/* =========================================
   2.1 INTERACTIVE FAQ ACCORDION
   ========================================= */

const faqQuestions = document.querySelectorAll(".faq-question");


faqQuestions.forEach(function(question) {

    question.addEventListener("click", function() {

        const answer = question.nextElementSibling;

        const isExpanded =
            question.getAttribute("aria-expanded") === "true";


        // Close all other FAQ answers

        faqQuestions.forEach(function(otherQuestion) {

            otherQuestion.setAttribute("aria-expanded", "false");

            otherQuestion.nextElementSibling.hidden = true;

        });


        // Open the selected answer

        if (!isExpanded) {

            question.setAttribute("aria-expanded", "true");

            answer.hidden = false;

        }

    });

});


/* =========================================
   2.1 IMAGE GALLERY LIGHTBOX
   ========================================= */

// Create the lightbox

const lightbox = document.createElement("div");

lightbox.id = "imageLightbox";

lightbox.className = "lightbox";

lightbox.setAttribute("role", "dialog");

lightbox.setAttribute("aria-modal", "true");

lightbox.setAttribute("aria-label", "Enlarged product image");

lightbox.hidden = true;


lightbox.innerHTML = `

    <button
        type="button"
        class="lightbox-close"
        aria-label="Close image"
    >
        &times;
    </button>

    <img src="" alt="">

    <p class="lightbox-caption"></p>

`;


document.body.appendChild(lightbox);


const lightboxImage = lightbox.querySelector("img");

const lightboxCaption = lightbox.querySelector(".lightbox-caption");

const closeLightboxButton =
    lightbox.querySelector(".lightbox-close");


// Open lightbox when a product image is clicked

document.addEventListener("click", function(event) {

    const imageButton = event.target.closest(".image-button");

    if (!imageButton) {
        return;
    }

    lightboxImage.src = imageButton.dataset.image;

    lightboxImage.alt = imageButton.dataset.name;

    lightboxCaption.textContent = imageButton.dataset.name;

    lightbox.hidden = false;

    document.body.classList.add("lightbox-open");

    closeLightboxButton.focus();

});


// Close lightbox

function closeLightbox() {

    lightbox.hidden = true;

    lightboxImage.src = "";

    document.body.classList.remove("lightbox-open");

}


closeLightboxButton.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// Close lightbox using Escape key

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape" && !lightbox.hidden) {

        closeLightbox();

    }

});


/* =========================================
   2.1 INTERACTIVE LEAFLET MAP
   ========================================= */

const storeMap = document.getElementById("storeMap");


if (storeMap && typeof L !== "undefined") {

    // Create map centred between the two locations

    const map = L.map("storeMap").setView(
        [-25.945, 28.165],
        9
    );


    // Load map tiles

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ).addTo(map);


    // Johannesburg store marker

    L.marker([-26.1076, 28.0567])
        .addTo(map)
        .bindPopup("<b>SoleStreet Johannesburg</b><br>Sandton City");


    // Pretoria store marker

    L.marker([-25.7836, 28.2753])
        .addTo(map)
        .bindPopup("<b>SoleStreet Pretoria</b><br>Menlyn Maine");

}


/* =========================================
   2.2 DYNAMIC ENQUIRY PRODUCT SELECTION
   ========================================= */

const enquiryProduct = document.getElementById("product");


if (enquiryProduct) {

    // Create product options dynamically

    products.forEach(function(product) {

        const option = document.createElement("option");

        option.value = product.id;

        option.textContent = product.name;

        enquiryProduct.appendChild(option);

    });


    // Select product when arriving from a product enquiry link

    const urlParameters = new URLSearchParams(window.location.search);

    const selectedProduct = urlParameters.get("product");

    if (selectedProduct) {

        const productExists = products.some(function(product) {

            return product.id === selectedProduct;

        });

        if (productExists) {

            enquiryProduct.value = selectedProduct;

        }

    }

}


const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        const selectedProductId =
            document.getElementById("product").value;

        const quantity =
            Number(document.getElementById("quantity").value);

        const selectedProduct =
            products.find(product => product.id === selectedProductId);

        const productDropdown = document.getElementById("product");

            if (productDropdown) {
            products.forEach(product => {
            const option = document.createElement("option");

            option.value = product.id;
            option.textContent = product.name;

            productDropdown.appendChild(option);
            });
        }

        const response =
            document.getElementById("enquiryResponse");

        if (!selectedProduct) {
            response.textContent =
                "Please select a valid product.";
            return;
        }

        const totalPrice = selectedProduct.price * quantity;

        response.innerHTML = `
            <h3>Enquiry Submitted Successfully</h3>
            <p>Product: ${selectedProduct.name}</p>
            <p>Quantity: ${quantity}</p>
            <p>Estimated Total: R${totalPrice.toLocaleString("en-ZA")}</p>
            <p>Thank you for your enquiry.
            Availability will be confirmed by our team.</p>
        `;

        enquiryForm.reset();
    });
}
