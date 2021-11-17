<template>
  <div id="clist">
    <div class="conatiner-fluid" id="display">
      <h1 style="text-align: center">List Of All Customers</h1>
      <div class="row" id="banner">
        <p>Browse Our Library</p>
      </div>
      <div class="conatiner-fluid" id="listcontent">
        <h2>All Readers</h2>
        <br />
        <table class="table table-hover table-striped">
          <thead>
            <th>Reader ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="(cust, i) in custinfo" :key="i">
              <td>{{ cust.cust_id }}</td>
              <td>{{ cust.fname }}</td>
              <td>{{ cust.lname }}</td>
              <td>{{ cust.email }}</td>
              <td>{{ cust.phone }}</td>
              <td>
                <button
                  class="btn btn-link"
                  @click="removecustomer(cust.cust_id)"
                >
                  <i
                    class="fa fa-trash-alt"
                    style="font-size: 24px; color: red"
                  ></i>
                </button>
                <button class="btn btn-link" @click="editcust(cust)">
                  <i
                    class="fa fa-edit"
                    style="font-size: 24px; color: blue"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Modal for Edit -->
        <div
          class="modal fade"
          id="edit-cust"
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
                  Edit Customer Information
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
                      <span>First Name</span>
                      <input
                        type="text"
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="upfname"
                        v-model="form.fname"
                        required
                      />
                      <br />
                      <span>Last Name</span>
                      <input
                        type="text"
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="uplname"
                        v-model="form.lname"
                        required
                      />
                      <br />
                      <span>Email</span>
                      <input
                        type="text"
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="upemail"
                        v-model="form.email"
                        required
                      />
                      <br />
                      <span>Phone</span>
                      <input
                        type="text"
                        class="form-control"
                        style="width: 70%; margin-left: 15%"
                        id="upphone"
                        v-model="form.phone"
                        required
                      />
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
                    <button type="submit" class="btn btn-primary">
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

<script>
export default {
  name: "clist",
  data() {
    return {
      custinfo: [],
      form: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
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
        success: function (data, status) {
          if (status === "success") {
            $this.custinfo = data;
            console.log($this.custinfo);
          }
        },
      });
    },
    editcust: function (cust) {
      $("#edit-cust").modal("show");
      this.form.fname = cust.fname;
      this.form.lname = cust.lname;
      this.form.email = cust.email;
      this.form.phone = cust.phone;
      this.updateid = cust.cust_id;
    },
    savecustedit: function () {
      let $this = this;
      $.ajax({
        type: "PUT",
        url: `${backendurl}/customers/updatecustomers/${this.updateid}`,
        data: this.form,
        success: function (data, status) {
          if (status == "success") {
            alert("Data updated successfully!");
            $this.getcustinfo();
          }
        },
      });
      $("#edit-cust").modal("hide");
    },
    removecustomer: function (id) {
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
            url: `${backendurl}/customers/deletecustomers/${id}`,
            type: "DELETE",
            success: (data, status) => {
              if (status === "success") {
                swal(
                  "Deleted!",
                  "Your imaginary file has been deleted.",
                  "success"
                );
                $this.getcustinfo();
              }
            },
          });
        }
      );
    },
  },
  mounted() {
    this.getcustinfo();
  },
};
</script>