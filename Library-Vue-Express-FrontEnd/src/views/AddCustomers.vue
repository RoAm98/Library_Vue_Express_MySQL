<template>
  <div id="custs">
    sdgdg
    <div class="conatiner-fluid">
      <h1 style="text-align: center">Add new Customer</h1>
    </div>
    <div class="container" style="margin-top: 2%" id="newcusts">
      <hr />
      <h2 style="text-align: center">Customer Information</h2>
      <hr />
      <div class="row" style="margin-left: 10%">
        <div class="col" style="font-weight: 500; font-size: 20px">
          <label for="">First Name</label>
          <input
            type="text"
            class="form-control"
            style="width: 70%"
            id="title"
            v-model="form.fname"
          />
          <br />
          <label for="">Last Name</label>
          <input
            type="text"
            class="form-control"
            style="width: 70%"
            id="author"
            v-model="form.lname"
          />
          <br />
          <br />
        </div>
        <div class="col" style="font-weight: 500; font-size: 20px">
          <label for="">Email Address</label>
          <input
            type="email"
            class="form-control"
            style="width: 70%"
            id="emailaddress"
            v-model="form.email"
          />
          <br />
          <label for="">Phone Number</label>
          <input
            type="tel"
            class="form-control"
            style="width: 70%"
            id="phone"
            placeholder="(000)-345-6789"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            v-model="form.phone"
          />
        </div>
      </div>
      <div class="row" style="text-align: center; margin-left: 30%">
        <button
          type="button"
          class="btn btn-warning"
          id="submit"
          @click="savecusts()"
          style="width: 50%"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custs",
  data() {
    return {
      form: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    savecusts() {
      $.ajax({
        type: "POST",
        url: `${backendurl}/customers/savecustomers`,
        data: this.form,
        success: function (data, status) {
          if (status == "success") alert("Data saved successfully!");
        },
      });
    },
  },
};
</script>