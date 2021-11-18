document.body.style.backgroundColor = "aqua";

var container = document.createElement("div");
container.setAttribute("class", "container");

var btn = document.getElementsByTagName("button");

var heading = document.createElement("div");
heading.setAttribute("class", "heading");
heading.innerHTML = "GitHub Repository Search Engine";

var input = document.createElement("input");
input.setAttribute("class", "search-user");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Enter GitHub Username");

function createElementDOM(a, b, c, d) {
  var inputDiv = document.createElement(a);
  inputDiv.classList.add(...b);

  for (var [key, value] of Object.entries(c)) {
    inputDiv.setAttribute(key, value);
  }
  inputDiv.innerHTML = d;
  return inputDiv;
}

async function fetchAPI(url, cb) {
  try {
    var resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    var data = await resp.json();
    cb(data);
  } catch (error) {
    rowDiv.innerHTML = "";
    alert("Error");
  }
}
// async function getUserAsync(name)
// {
//   let response = await fetch(`https://api.github.com/users/${name}`);
//   let data = await response.json()
//   return data;
// }

// getUserAsync('BlesingJeff')
//   .then(data => console.log(data));

var h1Div = createElementDOM(
  "h1",
  ["display-2", "text-center", "mb-3"],
  {},
  "Github Repos"
);
var formDiv = createElementDOM(
  "form",
  ["form-inline", "justify-content-center"],
  {},
  ""
);
var DivEl = createElementDOM("div", ["form-group", "mx-sm-3", "mb-2"], {}, "");
var labelDiv = createElementDOM(
  "label",
  ["sr-only"],
  { for: "userid" },
  "Username"
);
var inputDiv = createElementDOM("input", ["form-control"], {
  type: "text",
  id: "userid",
  placeholder: "Enter username ",
  title: "Hint: Try with Github username",
});
var buttonDiv = createElementDOM(
  "button",
  ["btn", "btn-primary", "mb-2"],
  { type: "submit", title: "Hint: Click" },
  "Search"
);

DivEl.append(labelDiv, inputDiv);

formDiv.append(DivEl, buttonDiv);

document.body.append(h1Div, formDiv);

btn[0].addEventListener("click", (e) => {
  e.preventDefault();
  var userBtn = document.getElementById("userid");
  if (userBtn.value) {
    fetchAPI(
      `https://api.github.com/users/${userBtn.value}/repos`,
      createRepoDom
    );
  } else {
    alert("Enter username");
  }
});

var containerDiv = createElementDOM("div", ["container", "my-5"], {}, "");

var rowDiv = createElementDOM("div", ["row", "row-cols-2"], {}, "");

function createRepoDom(data) {
  rowDiv.innerHTML = "";
  if (data) {
    data.forEach((el) => {
      var columnDiv = createElementDOM("div", ["col", "d-flex"], {}, "");

      var cardDiv = createElementDOM(
        "div",
        ["card", "flex-fill", "mb-3", "border-success", "bg-warning"],
        { style: "max-width:240px" },
        ""
      );

      var childRowDiv = createElementDOM("div", ["row", "no-gutters"], {}, "");

      var childColDiv = createElementDOM("div", ["col-md-4"], {}, "");

      var imgDiv = createElementDOM(
        "img",
        ["card-img"],
        {
          src: el.owner.avatar_url,
          alt: "user image",
        },
        ""
      );

      var colCardDiv = createElementDOM("div", ["col-md-8"], {}, "");

      var CardBodyDiv = createElementDOM("div", ["card-body"], {}, "");

      var CardTitleDiv = createElementDOM(
        "h5",
        ["card-header", "font-weight-bold", "mb-3"],
        {},
        el.name[0].toUpperCase() + el.name.slice(1)
      );

      var linkDiv = createElementDOM(
        "a",
        ["card-text"],
        { target: "_blank", role: "button", href: el.html_url },
        el.html_url
      );

      var DescriptionDiv = createElementDOM(
        "p",
        ["card-text"],
        {},
        el.description
      );

      var forkDiv = createElementDOM("p", ["card-text"], {});

      CardBodyDiv.append(CardTitleDiv, DescriptionDiv, forkDiv, linkDiv);

      colCardDiv.append(CardBodyDiv);

      childColDiv.append(imgDiv);

      childRowDiv.append(childColDiv, colCardDiv);

      cardDiv.append(childRowDiv);

      columnDiv.append(cardDiv);

      rowDiv.append(columnDiv);
    });
  } else {
    alert("Please check with the user");
  }

  containerDiv.append(rowDiv);

  document.body.append(containerDiv);
}
