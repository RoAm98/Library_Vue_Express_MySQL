<template>
  <div id="abook">
    <div class="container" style="margin-top: 2%" id="viewtiful">
      <hr />
      <h2 style="text-align: center">Book Information</h2>
      <hr />
      <div class="row">
        <div
          class="col"
          style="font-weight: 500; font-size: 20px; text-align: left"
        >
          <label for="">Book Title</label>
          <input
            type="text"
            class="form-control"
            style="width: 70%"
            id="title"
          />
          <br />
          <label for="author">Author Name</label>
          <input
            type="text"
            class="form-control"
            style="width: 70%"
            id="author"
          />
          <br />
          <label for="">Genre</label>
          <select
            name=""
            id="genre"
            class="form-control"
            style="width: 70%; font-size: 20px"
          >
            <option value="" selected>Choose...</option>
            <option value="Adventure">Adventure</option>
            <option value="Biography">Biography</option>
            <option value="Classic">Classics</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Historical fiction">Historical Fiction</option>
            <option value="Horror">Horror</option>
            <option value="Instructional">Instructional</option>
            <option value="Memoir">Memoir</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science fiction">Science Fiction</option>
          </select>
          <br />
          <br />
          <div class="row">
            <div class="col-4">
              <button
                type="button"
                class="btn btn-warning"
                id="submit"
                @click.prevent="savebook()"
                style="width: 220px"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <div style="text-align: center">
            <img
              src=""
              alt=""
              width="200"
              height="285"
              id="preview"
              style="border: 1px solid black"
            />
            <br />
            <span>Book Cover</span>
          </div>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control"
              aria-describedby="basic-addon2"
              accept="image/*"
              @change="preview"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "abook",
  data() {
    return {
      image: "",
    };
  },
  methods: {
    savebook: function () {
      //Prevents from submitting the data from the form
      var formData = new FormData(); //It creates a new FormData object to save the fields in the form
      formData.append("title", $("#title").val());
      formData.append("author", $("#author").val());
      formData.append("genre", $("#genre").val());
      formData.append("image", $("input[type=file]")[0].files[0]);
      //AJAX request to the back-end
      $.ajax({
        type: "POST",
        url: `${backendurl}/books/savebook`,
        data: formData,
        enctype: "multipart/form-data", //To combine regular inputs with file-type inputs
        processData: false, // Important!
        contentType: false,
        success: function (data, status) {
          if (status == "success") alert("Data saved successfully!");
        },
      });
    },
    preview: function () {
      var image = document.querySelector("#preview");
      image.src = URL.createObjectURL(event.target.files[0]);
      console.log(image.src);
      image.onload = function () {
        URL.revokeObjectURL(image.src);
      };
    },
  },
};
</script>