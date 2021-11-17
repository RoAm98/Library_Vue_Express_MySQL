<template>
  <div id="rlist">
    <div class="conatiner-fluid" id="rentdisplay">
      <h1 style="text-align: center">List Of All Customers</h1>
      <div class="row" id="banner">
        <p>Browse Our Library</p>
      </div>
      <div class="conatiner-fluid" id="listcontent">
        <h2>All Readers</h2>
        <br />
        <table class="table table-hover table-striped">
          <thead>
            <th>Rent #</th>
            <th>Rent Date</th>
            <th>Return Date</th>
            <th>Customer Name</th>
            <th>Book</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="(rent, i) in rentinfo" :key="i">
              <td>{{ rent.rent_id }}</td>
              <td>{{ rent.rentdate }}</td>
              <td>{{ rent.returndate }}</td>
              <td>{{ rent.fullname }}</td>
              <td>{{ rent.title }}</td>
              <td>
                <button class="btn btn-link" @click="editrent(rent)">
                  <i
                    class="fa fa-edit"
                    style="font-size: 24px; color: rgb(255, 187, 0)"
                  ></i>
                </button>
                <button class="btn btn-link" @click="deleterent(rent.rent_id)">
                  <i
                    class="fa fa-trash-alt"
                    style="font-size: 24px; color: rgb(255, 187, 0)"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Modal for Edit -->
        <div
          class="modal fade"
          id="edit-rent"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div
              class="modal-content"
              style="width: 600px; margin-left: -40%; margin-top: 30%"
            >
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Rent Information
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="savecustedit">
                  <div class="row">
                    <div
                      class="col"
                      style="
                        font-weight: 500;
                        font-size: 20px;
                        text-align: center;
                      "
                    >
                      <span>Rent Date</span>
                      <input
                        type="date"
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="uprentdate"
                        v-model="form.rentdate"
                        required
                      />
                      <br />
                      <span>Return Date</span>
                      <input
                        type="date"
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="upreturndate"
                        v-model="form.returndate"
                        required
                      />
                      <br />
                      <span>Customer</span>
                      <select
                        name=""
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="upcusts"
                        required
                        v-model="form.cust_id"
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
                      <span>Book</span>
                      <select
                        name=""
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="upbook"
                        v-model="form.book_id"
                        required
                      >
                        <option value="" selected disabled>
                          Choose a Book
                        </option>
                        <option
                          :value="book.book_id"
                          v-for="(book, i) in bookinfo"
                          :key="i"
                        >
                          {{ book.title }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click="saverentedit"
                    >
                      Save changes
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

<style>
#banner {
  background-image: url("../assets/bookshelf.jpg");
  text-align: center;
  color: aliceblue;
  font-size: 30px;
  opacity: 90%;
  margin-bottom: 2%;
}
</style>

<script>
export default {
  name: "rlist",
  data() {
    return {
      rentinfo: [],
      custinfo: [],
      bookinfo: [],
      form: {
        rent_id: "",
        rentdate: "",
        returndate: "",
        cust_id: "",
        book_id: "",
      },
      updaterent: "",
    };
  },
  methods: {
    getrentinfo: function () {
      let $this = this;
      $.ajax({
        url: `${backendurl}/rents/listrents`,
        type: "GET",
        success: (data, status) => {
          if (status === "success") {
            $this.rentinfo = data;
          }
        },
      });
    },
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
    editrent: function (rent) {
      $("#edit-rent").modal("show");
      this.form.rentdate = rent.rentdate.substr(0, 10);
      this.form.returndate = rent.returndate.substr(0, 10);
      this.form.cust_id = rent.cust_id;
      this.form.book_id = rent.book_id;
      this.updaterent = rent.rent_id;
    },
    saverentedit: function () {
      let $this = this;
      delete this.form["rent_id"];
      $.ajax({
        type: "PUT",
        url: `${backendurl}/rents/updaterents/${this.updaterent}`,
        data: this.form,
        success: function (data, status) {
          if (status == "success") {
            alert("Data updated successfully!");
            $this.getrentinfo();
          }
        },
      });
      $("#edit-rent").modal("hide");
      this.form["rent_id"] = "";
    },
    deleterent: function (id) {
      let $this = this;
      swal(
        {
          title: "Are you sure you want to remove this?",
          text: "Your will not be able to recover this checkout file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false,
        },
        function () {
          $.ajax({
            url: `${backendurl}/rents/deleterents/${id}`,
            type: "DELETE",
            success: (data, status) => {
              if (status === "success") {
                swal(
                  "Deleted!",
                  "Your checkout file has been deleted.",
                  "success"
                );
                $this.getrentinfo();
              }
            },
          });
        }
      );
    },
  },

  mounted() {
    this.getrentinfo();
    this.getcustinfo();
    this.getbookinfo();
  },
};
</script>