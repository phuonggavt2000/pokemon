const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

const app = {
  data: "https://pokeapi.co/api/v2/pokemon",
  getDefault: {
    offset: 20,
    limit: 20,
  },

  getApi: (data, callback, callback2) => {
    axios
      .get(data, {
        params: app.getDefault,
      })
      .then((res) => {
        return res.data;
      })
      .then(callback)
      .then(callback2);
  },

  render: (data) => {
    const tb = document.querySelector(".tb-table");
    let html = data.results.map((value, index) => {
      return ` 
            <tr >
            <th scope="row">${index}</th>
            <td>${value.name}</td>
            <td> <a
            class="btn btn-primary"
            href="${value.url}"
            role="button"
            aria-disabled="true"
            >Click</a></td>
            </tr>
          `;
    });
    tb.innerHTML = html;
    return data;
  },

  checkControl: (data) => {
    const isPrevious = data.previous;
    const isNext = data.next;

    if (!isPrevious) {
      previous.classList.add("disabled");
    }
    if (!isNext) {
      next.classList.add("disabled");
    }
    if (isPrevious) {
      previous.classList.remove("disabled");
    }
    if (isNext) {
      next.classList.remove("disabled");
    }
  },

  handleEvent: (data) => {
    const handlePrevious = (e) => {
      const result = app.getDefault.offset - app.getDefault.limit;
      app.getDefault.offset = result;
      app.getApi(app.data, app.render, app.checkControl);
    };

    const handleNext = (e) => {
      const result = app.getDefault.offset + app.getDefault.limit;
      app.getDefault.offset = result;
      app.getApi(app.data, app.render, app.checkControl);
    };

    previous.addEventListener("click", handlePrevious);
    next.addEventListener("click", handleNext);
  },

  init: function () {
    this.getApi(this.data, this.render);
    this.getApi(this.data, this.handleEvent);
  },
};

app.init();
