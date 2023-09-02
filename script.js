// category api part
const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="handleCard(${category.category_id})" class="btn">${category.category}</a>
    `;
    tabContainer.appendChild(div);
  });
};

// card api part
const handleCard = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const data = await response.json();
  // console.log(data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (data.data.length === 0) {
    console.log("no found");

    cardContainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-3"
    );

    cardContainer.innerHTML = `
<div class="flex flex-col text-center items-center text-3xl font-bold mt:20 lg:mt-40">
<div>
  <img src="images/Icon.png" alt="">
</div>
<div>
  <p>Oops!! Sorry, There is no <br> content here</p>
</div>
</div>

`;
  } else {
    cardContainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-3"
    );
  }
  // .............................................

  // ------cauculate time--------------
  // console.log(cards.others.posted_date);

  data.data.forEach((category) => {
    // .............................................

    let second = category.others.posted_date;

    console.log(second);
    let minutes = 0;
    let hours = 0;

    hours = parseInt(second / 3600);
    console.log(hours);

    second = parseInt(second % 3600);
    minutes = parseInt(second / 60);
    console.log(minutes);

    second = parseInt(second % 60);
    console.log(second);

    // ........................................
    const div = document.createElement("div");

    div.innerHTML = `
    <div class="card card-compact w-72 bg-base-100 shadow-xl">
        <figure><img src=${category?.thumbnail} alt='${
      category?.title
    }' class="rounded-lg w-80 h-52" />
          <div class="absolute">
            ${
              category.others.posted_date > 0
                ? `<p class="relative left-16 top-20 bg-black text-white px-1 py-1 rounded-md text-xs w-32 text-center">${hours}hrs ${minutes}min ago</p>`
                : ``
            } 

          </div>
        </figure>
        <div class="card-body">
          <div class="flex gap-3">
            <div>
              <figure><img class="rounded-full w-10 h-10" src=${
                category?.authors[0]?.profile_picture
              } /></figure>
            </div>
            <div>
              <h2 class="card-title">${category?.title}</h2>
              <p class="py-2">${
                category?.authors[0]?.profile_name
              }                        <span  class="pl-1 text-blue-600">
              ${
                category?.authors[0]?.verified
                  ? '<i class="fa-solid fa-circle-check"></i>'
                  : ""
              }

            </span></p>
              <p>${category?.others?.views}</p>
            </div>
          </div>
        </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
};
handleCategory();
handleCard("1000");
