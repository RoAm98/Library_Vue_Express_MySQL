<template>
  <div id="blist">
    <div class="conatiner-fluid">
      <h1 style="text-align: center">List Of All Books</h1>
      <div class="row" id="banner">
        <p>Browse Our Library</p>
      </div>
      <div class="row" id="listcontent">
        <div class="col-2 sidenav" style="font-size: 16px">
          <h3>Our Books</h3>
          <ul>
            <li>Adventure</li>
            <li>Biography</li>
            <li>Classics</li>
            <li>Comedy</li>
            <li>Drama</li>
            <li>Fantasy</li>
            <li>Historical</li>
            <li>Historical Fiction</li>
            <li>Horror</li>
            <li>Instructional</li>
            <li>Memoir</li>
            <li>Mystery</li>
            <li>Romance</li>
            <li>Science Fiction</li>
          </ul>
          <br />
          <h3>Authors</h3>
          <ul>
            <li>Adventure</li>
            <li>Biography</li>
            <li>Classics</li>
            <li>Comedy</li>
            <li>Drama</li>
            <li>Historical</li>
            <li>Historical Fiction</li>
            <li>Horror</li>
            <li>Instructional</li>
            <li>Memoir</li>
            <li>Mystery</li>
            <li>Romance</li>
            <li>Science Fiction</li>
          </ul>
        </div>
        <div class="col">
          <div class="row mt-5">
            <div
              v-for="(book, i) in bookinfo"
              :key="i"
              class="col-3 mb-5"
              style="text-align: center"
            >
              <img :src="'/images/' + book.cover" width="200" height="285" />
              <h5>{{ book.title }}</h5>
              <p>Author: {{ book.author }}</p>
              <p>Genre: {{ book.genre }}</p>
              <button
                type="button"
                class="btn btn-light"
                @click="editbook(book)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-light"
                @click="removebook(book.book_id)"
              >
                Remove
              </button>
              <br />
              <button
                type="button"
                class="btn btn-warning"
                @click="rentbook(book)"
              >
                Rent
              </button>
            </div>
          </div>
        </div>
        <!-- Modal for Edit -->
        <div
          class="modal fade"
          id="edit-book"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div
              class="modal-content"
              style="width: 900px; margin-left: -40%; margin-top: 30%"
            >
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Book Information
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="savebookedit">
                  <div class="row">
                    <div class="col" style="font-weight: 500; font-size: 20px">
                      <span style="margin-left: -75%">Book Title</span>
                      <input
                        type="text"
                        class="form-control"
                        style="width: 70%"
                        id="seltitle"
                        v-model="form.title"
                        required
                      />
                      <br />
                      <span style="margin-left: -68%">Author Name</span>
                      <input
                        type="text"
                        class="form-control"
                        style="width: 70%"
                        id="selauthor"
                        v-model="form.author"
                        required
                      />
                      <br />
                      <span style="margin-left: -85%">Genre</span>
                      <select
                        name=""
                        id="selgenre"
                        class="form-control"
                        style="width: 70%; font-size: 20px"
                        v-model="form.genre"
                        required
                      >
                        <option value="" selected>Choose...</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Biography">Biography</option>
                        <option value="Classic">Classics</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Historical">Historical</option>
                        <option value="Historical fiction">
                          Historical Fiction
                        </option>
                        <option value="Horror">Horror</option>
                        <option value="Instructional">Instructional</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science fiction">Science Fiction</option>
                      </select>
                    </div>
                    <div class="col">
                      <div style="text-align: center">
                        <img
                          alt=""
                          width="200"
                          height="285"
                          id="preview"
                          style="border: 1px solid black"
                          :src="'/images/' + form.cover"
                        />
                        <br />
                        <span>Book Cover</span>
                      </div>
                      <div class="input-group mb-3">
                        <input
                          type="file"
                          class="form-control"
                          required
                          aria-describedby="basic-addon2"
                          @change="preview"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal for Rent -->
        <div
          class="modal fade"
          id="rent-book"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div
              class="modal-content"
              style="width: 900px; margin-left: -40%; margin-top: 30%"
            >
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Rent Book</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="row">
                    <div class="col" style="font-weight: 500; font-size: 20px">
                      <span style="margin-left: -75%">Rent Date</span>
                      <input
                        type="date"
                        class="form-control"
                        style="width: 70%"
                        required
                        id="rentdate"
                        @change="rentdate"
                        v-model="rentform.rentdate"
                      />
                      <br />
                      <span style="margin-left: -85%">Reader</span>
                      <select
                        name=""
                        class="form-control"
                        id="custs"
                        style="width: 70%; font-size: 20px"
                        required
                        v-model="rentform.cust_id"
                      >
                        <option value="" selected disabled>
                          Choose a Reader
                        </option>
                        <option
                          :value="cust.cust_id"
                          v-for="(cust, i) in custinfo"
                          :key="i"
                        >
                          {{ cust.fname }} {{ cust.lname }}
                        </option>
                      </select>
                      <br />
                    </div>
                    <div class="col" style="font-weight: 500; font-size: 20px">
                      <span style="margin-left: -75%">Return Date</span>
                      <input
                        type="date"
                        class="form-control"
                        style="width: 70%"
                        id="returndate"
                        required
                        disabled
                        v-model="rentform.returndate"
                      />
                      <br />
                      <span style="margin-left: -75%">Book Title</span>
                      <input
                        type="text"
                        class="form-control"
                        style="width: 70%"
                        id="bookrenttitle"
                        v-model="rentform.book_title"
                        disabled
                      />
                      <br />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="confirmrent"
                    >
                      Rent
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
#banner {
  background-image: url("../assets/bookshelf.jpg");
  text-align: center;
  color: aliceblue;
  font-size: 30px;
  opacity: 90%;
  margin-bottom: 2%;
}

#listcontent {
  padding-left: 3%;
  padding-right: 3%;
  text-align: center;
}

#Title {
  padding: 1%;
}
</style>

<script>
export default {
  name: "blist",
  data() {
    return {
      bookinfo: [],
      custinfo: [],
      rentform: {
        rentdate: new Date().toISOString().substr(0, 10),
        returndate: "",
        cust_id: "",
        book_id: "",
        book_title: "",
      },
      form: {
        title: "",
        author: "",
        genre: "",
        cover: "",
      },
      updateid: "",
    };
  },
  methods: {
    getcustinfo: function () {
      let $this = this;
      $.ajax({
        url: `${backendurl}/customers/listcusts`,
        type: "GET",
        success: (data, status) => {
          if (status === "success") {
            $this.custinfo = data;
            console.log($this.custinfo);
          }
        },
      });
    },
    getbookinfo: function () {
      let $this = this;
      $.ajax({
        url: `${backendurl}/books/listbooks`,
        type: "GET",
        success: (data, status) => {
          if (status === "success") {
            $this.bookinfo = data;
            console.log($this.bookinfo);
          }
        },
      });
    },
    editbook: function (book) {
      console.log(book);
      $("#edit-book").modal("show");
      this.form.title = book.title;
      this.form.author = book.author;
      this.form.genre = book.genre;
      this.form.cover = book.cover;
      this.updateid = book.book_id;
    },
    removebook: function (id) {
      swal(
        {
          title: "Are you sure?",
          text: "Your will not be able to recover this imaginary file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false,
        },
        function () {
          let $this = this;
          $.ajax({
            url: `${backendurl}/books/deletebooks/${id}`,
            type: "DELETE",
            success: (data, status) => {
              if (status === "success") {
                swal(
                  "Deleted!",
                  "Your imaginary file has been deleted.",
                  "success"
                );
                $this.getbookinfo();
              }
            },
          });
        }
      );
    },
    preview: function () {
      var image = document.querySelector("#preview");
      image.src = URL.createObjectURL(event.target.files[0]);

      image.onload = function () {
        URL.revokeObjectURL(image.src);
      };
    },
    savebookedit: function () {
      let $this = this;
      var formData = new FormData(); //It creates a new FormData object to save the fields in the form
      formData.append("title", $("#seltitle").val());
      formData.append("author", $("#selauthor").val());
      formData.append("genre", $("#selgenre").val());
      formData.append("image", $("input[type=file]")[0].files[0]);
      $.ajax({
        type: "PUT",
        url: `${backendurl}/books/updatebook/${this.updateid}`,
        data: formData,
        enctype: "multipart/form-data", //To combine regular inputs with file-type inputs
        processData: false, // Important!
        contentType: false,
        success: function (data, status) {
          if (status == "success") {
            alert("Data saved successfully!");
            $this.getbookinfo();
          }
        },
      });
      $("#edit-book").modal("hide");
    },
    rentbook: function (book) {
      this.getcustinfo();
      this.rentform.book_id = this.updateid;
      let rntdate = document.querySelector("#rentdate");
      let rtrndate = document.querySelector("#returndate");
      $("#rent-book").modal("show");
      rntdate.valueAsDate = new Date();
      let fdate = new Date(rntdate.value);
      let datems = fdate.setDate(fdate.getDate() + 7);
      returndate.value = new Date(datems).toISOString().substr(0, 10);
      this.rentform.returndate = new Date(datems).toISOString().substr(0, 10);
      this.rentform.book_title = book.title;
      this.rentform.book_id = book.book_id;
    },
    rentdate: function () {
      let rntdate = document.querySelector("#rentdate");
      let rtrndate = document.querySelector("#returndate");
      let fdate = new Date(rntdate.value);
      let datems = fdate.setDate(fdate.getDate() + 7);
      this.rentform.returndate = new Date(datems).toISOString().substr(0, 10);
    },
    confirmrent: function () {
      console.log(this.rentform);
      delete this.rentform["book_title"];
      $.ajax({
        type: "POST",
        url: `${backendurl}/rents/rentbook`,
        data: this.rentform,
        success: function (data, status) {
          if (status == "success") {
            alert("Thank you for renting books from us!");
          }
        },
      });
      $("#rent-book").modal("hide");
      this.rentform["book_title"] = "";
    },
  },
  mounted() {
    this.getbookinfo();
  },
};
</script>